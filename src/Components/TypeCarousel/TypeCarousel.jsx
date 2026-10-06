import { useEffect, useState } from "react";
import TypeCard from "../TypeCard/TypeCard";
import './TypeCarousel.css';
import {Ticket,Farm,SwimmingPool,SmileyXEyes,Snowflake,Tent,Dresser,Panorama,BeachBall,TrendUp,Island,Tornado,Waves,HouseLine,BuildingApartment} from '@phosphor-icons/react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useRecoilState } from "recoil";
import { currCat, isEnglish, isStay, isTrips, isWishlist, selectedCat } from "../../StateMangement/State";
import homes from "../mockData";
import homesAr from "../mockDataAr";
const TypeCarousel = () => {
    const types=['Icons','Farms','Amazing pools','OMG!','Arctic','Camping','Rooms','Amazing Views','Beach Front',"Trending",'Islands','Lakefront', "Surfing",'Cabins','Mansions'];
    const typesAr = ['أيقونات','مزارع', 'مسابح مذهلة','يا إلهي!','قطبي','تخييم','غرف','مناظر مذهلة', 'واجهة شاطئية','رائجة','جزر','على ضفاف البحيرة','ركوب الأمواج','أكواخ','قصور'];
    const icons=[
        <Ticket  size={25}  weight="fill" />,
        <Farm  size={25}  weight="fill" />,
        <SwimmingPool  size={25}  weight="fill" />,
        <SmileyXEyes  size={25}  weight="fill" />,
        <Snowflake size={25} weight="fill" />,
        <Tent size={25}  weight="fill" />,
        <Dresser size={25}  weight="fill" />,
        <Panorama size={25}  weight="fill" />,
        <BeachBall size={25}  weight="fill" />,
        <TrendUp size={25}  weight="fill" />,
        <Island size={25}  weight="fill" />,
        <Tornado size={25}  weight="fill" />,
        <Waves size={25}  weight="fill" />,
        <HouseLine size={25}  weight="fill" />,
        <BuildingApartment size={25}  weight="fill" />
    ]
    let [isRoomPage,setIsRoomPage]=useRecoilState(isStay);
    let [isWish,setIsWish]=useRecoilState(isWishlist);
    let [isTp,setIsTp]=useRecoilState(isTrips);
    let [selected, setSelected]=useRecoilState(selectedCat);
    let [catCurr, setCatCurr]=useRecoilState(currCat);
    let [english, setEnglish]=useRecoilState(isEnglish);
    function changeSelected(index) {
        const newSelected = Array(15).fill(false);
        newSelected[index] = true;
        console.log(newSelected);
        
        setSelected(newSelected);
        setCatCurr(english ? types[index] : typesAr[index]);
    }
    
    useEffect(()=>{
        const path = window.location.pathname;
        const extractedPart = path.substring(1);
        for(let i=0;i<types.length;i++){
            if(extractedPart.toLowerCase()==types[i] ||extractedPart.toLowerCase()==typesAr[i]){
                changeSelected(i);
                break;
            }
        }
    },[])
    return ( 
        <div className={`typeC `}>
            <Swiper
                    className="swiperType"
                    spaceBetween={6}
                    navigation
                    modules={[Navigation,Pagination,Autoplay]}
                    breakpoints={{
                        320: { slidesPerView: 5, spaceBetween: 6 },
                        480: { slidesPerView: 6, spaceBetween: 6 },
                        640: { slidesPerView: 7, spaceBetween: 6 },
                        768: { slidesPerView: 8, spaceBetween: 6 },
                        1024: { slidesPerView: 9, spaceBetween: 6 },
                        1200: { slidesPerView: 10, spaceBetween: 6 },
                    }}
                >
                    {(english?types:typesAr).map((typeText, index) => (
                        <SwiperSlide key={index}>
                            <TypeCard selected={selected} change={changeSelected} text={typeText} icon={icons[index]} ind={index} />
                        </SwiperSlide>
                    ))}
                </Swiper>
        </div>
     );
}
 
export default TypeCarousel;