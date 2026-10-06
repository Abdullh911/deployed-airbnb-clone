import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cats, initFilters, isEnglish, isLoading, isStay, isTrips, isWishlist, listings, selectedCat } from "../../StateMangement/State";
import CardContainer from "../../Components/CardContainer/CardContainer";
import homes from "../../Components/mockData";
import homesAr from "../../Components/mockDataAr";
import { getAllHomes } from "../../Components/dataFetch";

const Category = () => {
    let {category}=useParams();
    const [filtered, setFiltered] = useRecoilState(listings);
    let [categories,setCategories]=useRecoilState(cats);
    let [selected,setSelected] = useRecoilState(selectedCat);
    let [showText,setShowText]=useRecoilState(isLoading);
    let [isRoomPage,setIsRoomPage]=useRecoilState(isStay);
    let [isWish,setIsWish]=useRecoilState(isWishlist);
    let [isTp,setIsTp]=useRecoilState(isTrips);
    let [filters,setFilters]=useRecoilState(initFilters);
    let [english,setEnglish]=useRecoilState(isEnglish);
    useEffect(() => {
        setShowText(true);
        window.scrollTo(0, 0);
        const timer = setTimeout(() => {
            setShowText(false);
        }, 2000); 
        return () => clearTimeout(timer);
    }, [category]);
    useEffect(()=>{
        setIsTp(false);
        setIsWish(false);
        setIsRoomPage(false);

    },[]);


    useEffect(()=>{
        const filterListings = (listingss) => {
            console.log(filters);
            
            if(filters.type === 'Any'){
                return listingss.filter(listing => 
                    listing.category.toLowerCase()===category.toLowerCase()&&
                    listing.beds >= filters.minBeds &&
                    listing.bedrooms >= filters.minBedrooms &&
                    listing.pricePerNight >= filters.minPrice &&
                    listing.pricePerNight <= filters.maxPrice
                  )
            }
            return listingss.filter(listing => 
                listing.category.toLowerCase()===category.toLowerCase()&&
              listing.type === filters.type &&
              listing.beds >= filters.minBeds &&
              listing.bedrooms >= filters.minBedrooms &&
              listing.pricePerNight >= filters.minPrice &&
              listing.pricePerNight <= filters.maxPrice
            )
        }
        console.log(filters);
        async function update(){
            let language=english?'en':'ar';
            let preTemp=await getAllHomes(language);
            console.log(preTemp);
            
            let temp=filterListings(preTemp);
            console.log(temp);
            
            setFiltered(temp);
        }
        setShowText(true)
        update();
        const timer = setTimeout(() => {
            setShowText(false);
        }, 1500); 
        
        return () => clearTimeout(timer);
    },[filters,category]);


    useEffect(()=>{
        console.log(categories);
        console.log(english);
        
        let x=categories.findIndex(ct=>
            ct.toLowerCase()==category.toLowerCase()
        )
        console.log(category);
        
        let temp2=Array(15).fill(false);
        temp2[x]=true;
        setSelected(temp2);

    },[category])
    return ( 
        <div className="homepage">
            <CardContainer containerList={filtered}/>
        </div>
     );
}
 
export default Category;