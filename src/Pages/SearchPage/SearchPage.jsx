import { useParams } from "react-router-dom";
import CardContainer from "../../Components/CardContainer/CardContainer";
import { useRecoilState } from "recoil";
import { initFilters, isEnglish, isLarge, isLoading, listings } from "../../StateMangement/State";
import { useEffect } from "react";
import homes from "../../Components/mockData";
import homesAr from "../../Components/mockDataAr";
import { getAllHomes } from "../../Components/dataFetch";

const SearchPage = () => {
    let {destination}=useParams();
    let [filtered,setFiltered]=useRecoilState(listings);
    let [filters,setFilters]=useRecoilState(initFilters);
    let [english,setEnglish]=useRecoilState(isEnglish);
    let [showText,setShowText]=useRecoilState(isLoading);

    useEffect(()=>{
        async function update(){
            let language=english?'en':'ar';
            let temp=await getAllHomes(language);
            console.log(temp);
            
            if(destination.toLowerCase()=="flexible"||destination.toLowerCase()=="مرن"){
                temp=await getAllHomes(language)
            }
            else{
                temp=temp.filter(home=>(
                    home.destination.toLowerCase()==destination.toLowerCase()
                ));
            }
            console.log(temp);
            
            temp=filterListings(temp);
            setFiltered(temp);
        }
        window.scrollTo(0, 0);
        setShowText(true)
        update();
        const timer = setTimeout(() => {
            setShowText(false);
        }, 1500); 
        return () => clearTimeout(timer);
    },[destination,filters]);

    const filterListings = (listingss) => {
            
        if(filters.type === 'Any'){
            return listingss.filter(listing => 
                listing.beds >= filters.minBeds &&
                listing.bedrooms >= filters.minBedrooms &&
                listing.pricePerNight >= filters.minPrice &&
                listing.pricePerNight <= filters.maxPrice
              )
        }
        return listingss.filter(listing => 
          listing.type === filters.type &&
          listing.beds >= filters.minBeds &&
          listing.bedrooms >= filters.minBedrooms &&
          listing.pricePerNight >= filters.minPrice &&
          listing.pricePerNight <= filters.maxPrice
        )
    }
    return ( 
        <div className="homepage">
            <CardContainer containerList={filtered}/>
        </div>
     );
}
 
export default SearchPage;