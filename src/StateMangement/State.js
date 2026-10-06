import { atom, selector } from 'recoil';
import { db } from '../Components/firebase';
import { setDoc, doc,getDoc  } from "firebase/firestore";

import homes from '../Components/mockData';
import homesAr from '../Components/mockDataAr';
import { getAllHomes } from '../Components/dataFetch';
export const isEnglish = atom({
    key: 'isEnglish',
    default: JSON.parse(localStorage.getItem('isEnglish')) !== null 
        ? JSON.parse(localStorage.getItem('isEnglish')) 
        : true,
});
export const langCode = atom({
    key: 'langCode', 
    default: localStorage.getItem('langCode') || 'en',
});
export const isLarge = atom({
  key: 'isLarge', 
  default: true,
});
export const showLModal = atom({
    key: 'showLModal', 
    default: false,
  });
export const listings = atom({
    key: 'listings', 
    default: [],
});
export const showModal = atom({
    key: 'showModal', 
    default: false,
});
export const initFilters = atom({
    key: 'initFilters', 
    default: {
        type:'Any',
        minBeds:0,
        minBedrooms:0,
        minPrice:0,
        maxPrice:30000
    },
});
export const showUserMenu = atom({
    key: 'showUserMenu', 
    default: false,
});
export const currUser = atom({
    key: 'currUser', 
    default:getUser(),
});
export const users = atom({
    key: 'users', 
    default: [],
});
export const showSignup = atom({
    key: 'showSignup', 
    default: 0,
});
export const isStay = atom({
    key: 'isStay', 
    default: false,
});
export const isWishlist = atom({
    key: 'isWishlist', 
    default: false,
});
export const isTrips = atom({
    key: 'isTrips', 
    default: false,
});
export const isLoading = atom({
    key: 'isLoading', 
    default: true,
});
export const currCat = atom({
    key: 'currCat', 
    default: 'icons',
});
export const selectedCat = atom({
    key: 'selectedCat', 
    default: [true,Array(14).fill(false)],
});
export const checkboxState = atom({
    key: 'checkboxState', 
    default: false,       
});
export const cats = selector({
    key: 'cats',
    get: ({ get }) => {
        const english = get(isEnglish);
        return english 
            ? ['Icons', 'Farms', 'Amazing pools', 'OMG!', 'Arctic', 'Camping', 'Rooms', 'Amazing Views', 'Beach Front', "Trending", 'Islands', 'Lakefront', "Surfing", 'Cabins', 'Mansions'] 
            : ['أيقونات', 'مزارع', 'مسابح مذهلة', 'يا إلهي!', 'قطبي', 'تخييم', 'غرف', 'مناظر مذهلة', 'واجهة شاطئية', 'رائجة', 'جزر', 'على ضفاف البحيرة', 'ركوب الأمواج', 'أكواخ', 'قصور'];
    }
});
export const showContModal = atom({
    key: 'showContModal', 
    default: false,
});
export const showDateModal = atom({
    key: 'showDateModal', 
    default: false,
});
export const mobileSearchModal = atom({
    key: 'mobileSearchModal', 
    default: false,
});
export const isReservePage = atom({
    key: 'isReservePage', 
    default: false,
});
async function replaceUser(newUserObj) {
    const userRef = doc(db, "Users", newUserObj.uid);
    try {
        await setDoc(userRef, newUserObj);
        console.log("User replaced successfully");
    } catch (error) {
        console.log("Error replacing user: ", error); 
    }
}
async function getListings(lang){
    let x=await getAllHomes(lang);
    return x;
}
async function getUser(){
    let inUser=JSON.parse(localStorage.getItem('user'));
    if (inUser) {
        const userDocRef = doc(db, "Users", inUser.uid);
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
            const foundUser = userSnapshot.data();
            foundUser.uid=inUser.uid;
            
            localStorage.setItem('user', JSON.stringify(foundUser));
            return foundUser;
        } else {
            return null;
        }
    }
}
export const userFunctions = selector({
    key: 'userFunctions',
    get: () => ({
      replaceUser: replaceUser,
      getUser:getUser,
    })
});

