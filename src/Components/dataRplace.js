import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase"; // Change this path if needed

const CLOUDINARY_CLOUD_NAME = "mlkv9b4g";
const CLOUDINARY_UPLOAD_PRESET = "dataReplace";

const COLLECTION_NAME = "homes";
const DOCUMENT_ID = "2";

const DELAY_BETWEEN_UPLOADS_MS = 200;

/*
  Prevents React Strict Mode from starting the migration twice.
*/
let runningPromise = null;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isCloudinaryUrl(url) {
  return typeof url === "string" && url.includes("res.cloudinary.com/");
}

function isValidUrl(url) {
  if (typeof url !== "string" || !url.trim()) {
    return false;
  }

  try {
    const parsedUrl = new URL(url);

    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

async function uploadToCloudinary(sourceUrl) {
  const endpoint =
    `https://api.cloudinary.com/v1_1/` +
    `${CLOUDINARY_CLOUD_NAME}/image/upload`;

  const formData = new FormData();

  formData.append("file", sourceUrl);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  let result;

  try {
    result = await response.json();
  } catch {
    result = null;
  }

  if (!response.ok) {
    throw new Error(
      result?.error?.message ||
        `Cloudinary upload failed with status ${response.status}`,
    );
  }

  if (!result?.secure_url) {
    throw new Error("Cloudinary did not return a secure_url");
  }

  return result.secure_url;
}

async function migrateOneHome(home, homeIndex, totalHomes) {
  const originalPictures = Array.isArray(home?.pictures) ? home.pictures : [];

  if (originalPictures.length === 0) {
    console.warn(
      `[${homeIndex + 1}/${totalHomes}] ` + "Home has no pictures, skipped",
    );

    return {
      updatedHome: home,
      changed: false,
      uploadedCount: 0,
      failedCount: 0,
    };
  }

  const newPictures = [];

  let changed = false;
  let uploadedCount = 0;
  let failedCount = 0;

  for (
    let pictureIndex = 0;
    pictureIndex < originalPictures.length;
    pictureIndex += 1
  ) {
    const currentUrl = originalPictures[pictureIndex];

    if (isCloudinaryUrl(currentUrl)) {
      newPictures.push(currentUrl);

      console.log(
        `[${homeIndex + 1}/${totalHomes}] ` +
          `Picture ${pictureIndex + 1}/` +
          `${originalPictures.length} already uses Cloudinary`,
      );

      continue;
    }

    if (!isValidUrl(currentUrl)) {
      newPictures.push(currentUrl);
      failedCount += 1;

      console.warn(
        `[${homeIndex + 1}/${totalHomes}] ` +
          `Picture ${pictureIndex + 1} has an invalid URL`,
      );

      continue;
    }

    console.log(
      `[${homeIndex + 1}/${totalHomes}] ` +
        `Uploading picture ${pictureIndex + 1}/` +
        `${originalPictures.length}`,
    );

    try {
      const cloudinaryUrl = await uploadToCloudinary(currentUrl);

      newPictures.push(cloudinaryUrl);

      changed = true;
      uploadedCount += 1;

      console.log(
        `[${homeIndex + 1}/${totalHomes}] ` +
          `✅ Picture ${pictureIndex + 1} uploaded`,
      );
    } catch (error) {
      newPictures.push(currentUrl);

      failedCount += 1;

      console.error(
        `[${homeIndex + 1}/${totalHomes}] ` +
          `❌ Picture ${pictureIndex + 1} failed:`,
        error?.message || error,
      );
    }

    await sleep(DELAY_BETWEEN_UPLOADS_MS);
  }

  return {
    updatedHome: changed
      ? {
          ...home,
          pictures: newPictures,
        }
      : home,

    changed,
    uploadedCount,
    failedCount,
  };
}

async function saveHomesToFirestore(documentReference, homes, homeIndex) {
  console.log(`[${homeIndex + 1}/${homes.length}] Saving Firestore...`);

  try {
    await updateDoc(documentReference, {
      data: homes,
    });

    console.log(`[${homeIndex + 1}/${homes.length}] ✅ Firestore saved`);
  } catch (error) {
    if (
      error?.code === "permission-denied" ||
      error?.message?.includes("Missing or insufficient permissions")
    ) {
      throw new Error(
        "Firestore blocked the update. Check your Firestore security rules.",
      );
    }

    throw error;
  }
}

async function runMigration() {
  console.log("Starting Cloudinary image migration...");

  const documentReference = doc(db, COLLECTION_NAME, DOCUMENT_ID);

  const snapshot = await getDoc(documentReference);

  if (!snapshot.exists()) {
    throw new Error(`${COLLECTION_NAME}/${DOCUMENT_ID} does not exist`);
  }

  const documentData = snapshot.data();

  if (!Array.isArray(documentData?.data)) {
    throw new Error(
      `The "data" field inside ${COLLECTION_NAME}/${DOCUMENT_ID} is not an array`,
    );
  }

  const homes = documentData.data.map((home) => ({
    ...home,
    pictures: Array.isArray(home?.pictures) ? [...home.pictures] : [],
  }));

  console.log(`Found ${homes.length} homes`);

  let updatedHomesCount = 0;
  let skippedHomesCount = 0;
  let uploadedPicturesCount = 0;
  let failedPicturesCount = 0;

  for (let homeIndex = 0; homeIndex < homes.length; homeIndex += 1) {
    const home = homes[homeIndex];

    const pictures = Array.isArray(home?.pictures) ? home.pictures : [];

    const alreadyCompleted =
      pictures.length > 0 && pictures.every(isCloudinaryUrl);

    if (alreadyCompleted) {
      skippedHomesCount += 1;

      console.log(
        `[${homeIndex + 1}/${homes.length}] ` +
          "All pictures already use Cloudinary, skipped",
      );

      continue;
    }

    console.log(`[${homeIndex + 1}/${homes.length}] Processing home`);

    try {
      const result = await migrateOneHome(home, homeIndex, homes.length);

      homes[homeIndex] = result.updatedHome;

      uploadedPicturesCount += result.uploadedCount;

      failedPicturesCount += result.failedCount;

      if (result.changed) {
        await saveHomesToFirestore(documentReference, homes, homeIndex);

        updatedHomesCount += 1;
      } else {
        console.log(
          `[${homeIndex + 1}/${homes.length}] ` +
            "No successful uploads, Firestore not changed",
        );
      }
    } catch (error) {
      console.error(
        `[${homeIndex + 1}/${homes.length}] ` + "Home migration failed:",
        error?.message || error,
      );
    }
  }

  const summary = {
    totalHomes: homes.length,
    updatedHomes: updatedHomesCount,
    skippedHomes: skippedHomesCount,
    uploadedPictures: uploadedPicturesCount,
    failedPictures: failedPicturesCount,
  };

  console.log("✅ Cloudinary migration finished:", summary);

  return summary;
}

export function replaceData() {
  if (runningPromise) {
    console.log("Migration already running. Duplicate call ignored.");

    return runningPromise;
  }

  runningPromise = runMigration().catch((error) => {
    runningPromise = null;
    throw error;
  });

  return runningPromise;
}
