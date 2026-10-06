import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './Card.css';
import {Star,List,UserCircle} from '@phosphor-icons/react'
import homes from '../mockData';
import { useRecoilState } from 'recoil';
import { checkboxState, currUser, isEnglish, isLoading, langCode, showSignup, userFunctions } from '../../StateMangement/State';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loading from '../../assets/Loading.png'
import homesAr from '../mockDataAr';
import { useRecoilValue } from 'recoil';
import { imageSrcSet, imageWithWidth } from '../imageUtils';

const Card = ({ home, priority = false }) => {
    const [isChecked, setIsChecked] = useRecoilState(checkboxState);
    const { replaceUser } = useRecoilValue(userFunctions);
    let [curr,setCurr]=useRecoilState(currUser);
    let [showS,setShowS]=useRecoilState(showSignup);
    let [iconStyle,setIconStyle]=useState("");
    let [showText,setShowText]=useRecoilState(isLoading);
    let [english,setEnglish]=useRecoilState(isEnglish);
    let [data,setData]=useState(home);
    let navigate=useNavigate();
    useEffect(()=>{
        setData(home);
    },[english, home]);
    
    
    async function addFav() {
        if (curr) {
            let temp = { ...curr, wishlist: [...curr.wishlist] };
            if (checkIsFav()) {
                const index = temp.wishlist.findIndex(obj => obj === home.id);
                if (index !== -1) {
                    temp.wishlist.splice(index, 1); 
                }
            } else {
                temp.wishlist.push(home.id);
                console.log(`Added ${home.id} to wishlist.`);
            }
            console.log(temp);
            setCurr(temp);
            await replaceUser(temp);
            localStorage.setItem('user', JSON.stringify(temp));
        } else {
            setShowS(1); 
        }
    }
    
    function checkIsFav(){
        let isFavorite;
        if(curr){
            isFavorite = curr.wishlist.includes(home.id);
        }
        return isFavorite;
    }
    
    useEffect(()=>{
        let isFavorite=true;
        isFavorite=checkIsFav();
        setIconStyle(curr&&isFavorite ? 'fa-solid' : 'fa-regular');
    },[curr])
    return (
        <div onClick={()=>{
            
        }} className="cursor-pointer relative flex-shrink-0 w-full sm:w-[40%] md:w-[48%] lg:w-[31%] xl:w-[22%] mb-10 card z-0">
            
            <i onClick={addFav} className={`${iconStyle} fa-heart absolute right-3 top-3 z-10 text-[20px] cursor-pointer hover:scale-110`} style={{ color: '#ff385c' }}></i>
            <div className='w-full h-[280px] mb-3 swiperCont' >
                <Swiper
                    className='h-full swiperCard '
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
                    {data.pictures.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img onClick={()=>{
                                if(showText){
                                    return
                                }
                                navigate(`/stay/${home.id}`);
                            }}
                            className=' h-full object-cover w-full rounded-lg'
                            src={!showText ? imageWithWidth(image, 480) : loading}
                            srcSet={!showText ? imageSrcSet(image, [320, 480, 720]) : undefined}
                            sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 31vw, (min-width: 768px) 48vw, (min-width: 640px) 40vw, 100vw"
                            loading={priority && index === 0 ? "eager" : "lazy"}
                            fetchPriority={priority && index === 0 ? "high" : "low"}
                            decoding="async"
                            alt={data.title || data.cityCountry || "Home listing"} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div 
            onClick={()=>{
                navigate(`/stay/${home.id}`);
            }} className='w-full font-[Poppins] ' dir={`${english?'ltr':'rtl'}`} >
                <div className='flex w-full justify-between'>
                    <p className={`${!showText?'font-[450] text-[14px] flex justify-between truncate w-[90%]':'loadingCardContent'} `} >{data.cityCountry}</p>
                    <p className={`${!showText?'flex items-center text-[14px] gap-1 w-[10%]':'loadingCardContent'} `}><span className={`${!showText?'':'opacity-0'}`}><Star size={12} color="#0f0f0f" weight="fill" /></span> {data.rating} </p>
                </div>
                <p className={`${!showText?'text-gray-500 text-[15px]':'loadingCardContent'}`}>{data.kilometersAway+`${english?" Kilometers away":" كم"}`}</p>
                <p className={`${!showText?'text-gray-500 text-[15px]':'loadingCardContent'}`} >{`${english?"Oct 18-23":"اكتوبر 18-23"}`}</p>
                <p o className={`${!showText?' text-[15px]':'loadingCardContent'}`}><span className='font-semibold'>{isChecked?(data.pricePerNight/1.14).toFixed():data.pricePerNight}$</span> {`${english?" night":" الليلة"}`}</p>
            </div>
        </div>
    );
};

export default Card;
