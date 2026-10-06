import { useEffect, useState } from 'react';
import './FilterModal.css';
import PriceRange from '../PriceRange/PriceRange';
import BedCounter from '../BedCounter/BedCounter';
import { useRecoilState } from 'recoil';
import { currCat, initFilters, isEnglish, langCode, listings, showModal } from '../../StateMangement/State';
import homes from '../mockData';
import langs from '../../langs';
const FilterModal = () => {
    let tempFilters={
        type:'Any',
        minBeds:0,
        minBedrooms:0,
        minPrice:0,
        maxPrice:30000
    }
    let [list,setList]=useRecoilState(listings);
    const [chosens,setChosens]=useState([true,false,false]);
    let [storeFltrs,setSetStoreFltrs]=useRecoilState(initFilters)
    let [showM,setShowM]=useRecoilState(showModal);
    let [filters,setFilters]=useState(storeFltrs);
    let [catCurr, setCatCurr]=useRecoilState(currCat);
    let [lang,setLang]=useRecoilState(langCode);
    let [english,setEnglish]=useRecoilState(isEnglish);
    useEffect(()=>{
        setFilters(storeFltrs);
        if(storeFltrs.type=="Any"){
            select(0);

        }
        else if(storeFltrs.type=="Room"){
            select(1);
        }
        else{
            select(2);
        }
    },[])
    function reset(){
        setSetStoreFltrs(tempFilters);
        setShowM(false);
    }
    function select(index) {
        let temp = Array(3).fill(false);
        temp[index] = true;
        setChosens(temp);
        let updatedFilters = { ...filters };
        if (index === 0) {
            updatedFilters.type = 'Any';
        } else if (index === 1) {
            updatedFilters.type = 'Room';
        } else {
            updatedFilters.type = 'Home';
        }
        setFilters(updatedFilters); 
    }
    
    function setPriceRange(range) {
        let updatedFilters = { ...filters, minPrice: range[0], maxPrice: range[1] };
        setFilters(updatedFilters);
    }
    
    function setBeds(min) {
        let updatedFilters = { ...filters, minBeds: min };
        setFilters(updatedFilters);
    }
    
    function setBedrooms(min) {
        let updatedFilters = { ...filters, minBedrooms: min };
        setFilters(updatedFilters);
    }
    function startFilter(){
        console.log(filters);
        setSetStoreFltrs(filters);
        setShowM(false);
    }
    const amenities=[langs[lang].wifi,langs[lang].kitchen,langs[lang].washer,langs[lang].dryer,langs[lang].airConditioning,langs[lang].heating];
    const amenitiesIcons=[<i class="fa-solid fa-wifi"></i>,<i class="fa-solid fa-kitchen-set"></i>,<i class="fa-solid fa-hard-drive"></i>,<i class="fa-solid fa-wind"></i>,<i class="fa-regular fa-snowflake"></i>,<i class="fa-solid fa-temperature-three-quarters"></i>]
    const bookingOpts=[langs[lang].instantBook,langs[lang].selfCheckIn,langs[lang].freeCancellation,langs[lang].allowPets]
    const bookingOptsIcons=[<i class="fa-solid fa-bolt"></i>,<i class="fa-solid fa-key"></i>,<i class="fa-regular fa-calendar-xmark"></i>,<i class="fa-solid fa-paw"></i>]
    return ( 
        <div dir={`${english?'ltr':'rtl'}`} className="fixed w-full h-full z-40"> 
            <div className="backdrop" />
            <div className="filterModal">
                <div className="head">
                    <div className='title'>
                        <p>{langs[lang].filterBtnLabel}</p>
                    </div>
                    <div onClick={()=>{
                        setShowM(false);
                    }} className='close'>
                        <i class="text-[18px] fa-solid fa-xmark"></i>
                    </div>
                </div>
                <div className='body'>
                    <div className='type'>
                        <h1 className='mb-7 text-[19px]'>
                        {langs[lang].typeOfPlace}
                        </h1>
                        <div className='tabs'>
                            <button className={`${chosens[0]?'bg-gray-100 border-2 border-black':''}`} onClick={()=>{
                                select(0);
                            }}>
                                {langs[lang].anyType}
                            </button>
                            <button className={`${chosens[1]?'bg-gray-100 border-2 border-black':''}`} onClick={()=>{
                                select(1);
                            }}>
                                {langs[lang].rooms}
                            </button>
                            <button className={`${chosens[2]?'bg-gray-100 border-2 border-black':''}`} onClick={()=>{
                                select(2);
                            }}>
                                {langs[lang].entireHome}
                            </button>
                        </div>
                    </div>
                    <div className='pricee'>
                        <h1 className=' text-[19px]'>
                        {langs[lang].priceRange}
                        </h1>
                        <p>{langs[lang].nightlyPrices}</p>
                        <PriceRange setRange={setPriceRange}/>
                    </div>
                    <div className='beds'>
                        <h1 className=' text-[19px]'>
                        {langs[lang].roomsAndBeds}
                        </h1>
                        <BedCounter set={setBedrooms} title={langs[lang].bedrooms}/>
                        <BedCounter set={setBeds} title={langs[lang].beds}/>
                        <BedCounter title={langs[lang].bathrooms}/>
                    </div>
                    <div className='amenties'>
                        <h1 className='text-[19px] mb-5'>
                        {langs[lang].amenities}
                        </h1>
                        <div className='amenitiesCont'>
                            {amenities.map((amenity,index)=>(
                                <div className='select'>
                                    {amenitiesIcons[index]}
                                    <p>{amenity}</p>
                                </div>
                            ))}
                        </div>
                        <h1 className='showMore'>{langs[lang].showMore}    <i class="fa-solid fa-chevron-down"></i></h1>
                    </div>
                    <div className='bookingOpts'>
                        <h1 className='text-[19px] mb-5'>
                        {langs[lang].bookingOptions}
                        </h1>
                        <div className='amenitiesCont'>
                            {bookingOpts.map((opt,index)=>(
                                <div className='select'>
                                    {bookingOptsIcons[index]}
                                    <p>{opt}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='guestFav'>
                        <h1 className='text-[19px] mb-5'>{langs[lang].standoutStays}</h1>
                        <div className='guestFavorite w-[240px]'>
                            <i class="fa-solid fa-award text-[35px]"></i>
                            <div className='flex flex-col'>
                                <h2>{langs[lang].guestFavourite}</h2>
                                <p className='text-[14px] text-gray-500'>{langs[lang].mostLovedHomes}</p>
                            </div>
                        </div>
                    </div>
                    <div className='guestFav'>
                        <div className='flex justify-between items-center cursor-pointer'>
                            <h1 className='text-[19px]'>{langs[lang].propertyType}</h1>
                            <i class="fa-solid fa-chevron-down"></i>
                        </div>
                    </div>
                    <div className='guestFav'>
                        <div className='flex justify-between items-center cursor-pointer'>
                            <h1 className='text-[19px]'>{langs[lang].accessibilityFeatures}</h1>
                            <i class="fa-solid fa-chevron-down"></i>
                        </div>
                    </div>
                    <div className='guestFav'>
                        <div className='flex justify-between items-center cursor-pointer'>
                            <h1 className='text-[19px]'>{langs[lang].hostLanguage}</h1>
                            <i class="fa-solid fa-chevron-down"></i>
                        </div>
                    </div>
                </div>
                <div className='footer'>
                    <div className='showBtnCont'>
                        <button onClick={reset} className='p-3 hover:bg-gray-200 rounded-xl font-bold'>
                        {langs[lang].clearAll}
                        </button>
                        <button onClick={startFilter} className='p-3 bg-black text-white rounded-xl font-bold'>
                        {langs[lang].show}
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default FilterModal;
