import { auth, db } from "./firebase";
import { setDoc, doc,getDoc,getDocs,collection  } from "firebase/firestore";
export async function getAllHomes(lang) {
    if(lang=='en'){
        const docRef = doc(db, 'homes', '2');
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const documentData = docSnap.data(); 
                const listingsData = documentData.data; 
                console.log("Fetched listings data:", listingsData);
                return listingsData;
            } else {
                console.log("No such document!");
                return null;
            }
        } catch (error) {
            console.error("Error fetching document:", error);
            throw error;
        }
    }
    else{
        const docRef = doc(db, 'homesArr', '1');
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const documentData = docSnap.data(); 
                const listingsData = documentData.data; 
                console.log("Fetched listings data:", listingsData);
                return listingsData;
            } else {
                console.log("No such document!");
                return null;
            }
        } catch (error) {
            console.error("Error fetching document:", error);
            throw error;
        }
    }    
}
export async function getDocumentById(collectionName, documentId) {
    if(collectionName=='homes'){
        const docRef = doc(db, 'homes', '2');
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const documentData = docSnap.data(); 
                const listingsData = documentData.data;
                for(let i=0;i<listingsData.length;i++){
                    if(listingsData[i].id==documentId){
                        return listingsData[i];
                    }
                }
            } else {
                console.log("No such document!");
                return null;
            }
        } catch (error) {
            console.error("Error fetching document:", error);
            throw error;
        }
    }
    else{
        const docRef = doc(db, 'homesArr', '1');
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const documentData = docSnap.data(); 
                const listingsData = documentData.data; 
                for(let i=0;i<listingsData.length;i++){
                    if(listingsData[i].id==documentId){
                        console.log(listingsData[i]);
                        
                        return listingsData[i];
                    }
                }
            } else {
                console.log("No such document!");
                return null;
            }
        } catch (error) {
            console.error("Error fetching document:", error);
            throw error;
        }
    }
}