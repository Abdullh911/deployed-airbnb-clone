import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './ImgCarousel.css'
import {Star,List,UserCircle} from '@phosphor-icons/react'
import homes from '../mockData';
import { useRecoilState } from 'recoil';
import { currUser, isEnglish, showSignup } from '../../StateMangement/State';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ImgCarousel = ({images}) => {
    let [english,setEnglish]=useRecoilState(isEnglish);
    return ( 
        <div  className='md:hidden h-72 w-full relative top-20 '>
            <Swiper
                className='h-full swiperCard'
                spaceBetween={10}
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination, Autoplay]}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 10 },
                    480: { slidesPerView: 1, spaceBetween: 10 },
                    640: { slidesPerView: 1, spaceBetween: 10 },
                    768: { slidesPerView: 1, spaceBetween: 10 },
                    1024: { slidesPerView: 1, spaceBetween: 10 },
                    1200: { slidesPerView: 1, spaceBetween: 10 },
                }}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img className='h-full object-fill w-full ' src={image} alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
     );
}
 
export default ImgCarousel;