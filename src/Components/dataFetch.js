import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const TEXT_FIELDS = ["destination", "category", "title", "city", "country", "type"];

async function getHomesDocument(collectionName, documentId) {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        console.log("No such document!");
        return [];
    }

    return docSnap.data().data || [];
}

function withDisplayFields(home) {
    return {
        ...home,
        cityCountry: home.cityCountry || [home.city, home.country].filter(Boolean).join(", "),
    };
}

function mergeArabicText(englishHomes, arabicHomes) {
    const arabicById = new Map(arabicHomes.map((home) => [String(home.id), home]));

    return englishHomes.map((englishHome, index) => {
        const arabicHome = arabicById.get(String(englishHome.id)) || arabicHomes[index] || {};
        const mergedHome = { ...englishHome };

        TEXT_FIELDS.forEach((field) => {
            if (arabicHome[field]) {
                mergedHome[field] = arabicHome[field];
            }
        });

        return withDisplayFields(mergedHome);
    });
}

export async function getAllHomes(lang) {
    try {
        const englishHomes = await getHomesDocument("homes", "2");

        if (lang !== "ar") {
            return englishHomes.map(withDisplayFields);
        }

        const arabicHomes = await getHomesDocument("homesArr", "1");
        return mergeArabicText(englishHomes, arabicHomes);
    } catch (error) {
        console.error("Error fetching document:", error);
        throw error;
    }
}

export async function getDocumentById(collectionName, documentId) {
    const lang = collectionName === "homesArr" || collectionName === "homesAr" || collectionName === "ar" ? "ar" : "en";
    const listingsData = await getAllHomes(lang);

    return listingsData.find((home) => String(home.id) === String(documentId)) || null;
}
