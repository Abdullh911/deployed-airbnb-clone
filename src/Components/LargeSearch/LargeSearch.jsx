import { useEffect, useState } from 'react';
import VDivider from '../VDivider';
import './LargeSearch.css';
import { useRecoilState } from 'recoil';
import { isEnglish, isLarge, isLoading, isReservePage, isStay, isTrips, isWishlist, langCode, showContModal, showDateModal } from '../../StateMangement/State';
import ContinentModal from '../ContinentModal/ContinentModal';
import { useLocation, useNavigate } from 'react-router-dom';
import LargeDate from '../../LargeDate';
import langs from '../../langs';
const LargeSearch = () => {
    let [isWish,setIsWish]=useRecoilState(isWishlist);
    let [isTp,setIsTp]=useRecoilState(isTrips);
    const [visible, setVisible] = useRecoilState(isLarge);

    let [lang,setLang]=useRecoilState(langCode);
    let [showText, setShowText] = useRecoilState(isLoading);
    let [showCmodal, setShowCmodal] = useRecoilState(showContModal);
    let [inDate,setInDate]=useState(langs[lang].addDate);
    let [outDate,setOutDate]=useState(langs[lang].addDate);
    let [dest,setDest]=useState(langs[lang].searchDest);
    const location = useLocation();
    const isStayRoute = location.pathname.startsWith('/stay');
    let [isRoomPage, setIsRoomPage] = useRecoilState(isStay);
    let [showDmodal, setShowDmodal] = useRecoilState(showDateModal);
    let [reserve,setReserve]=useRecoilState(isReservePage);
    let [english,setEnglish]=useRecoilState(isEnglish);
    useEffect(()=>{
        setDest(langs[lang].searchDest);
        setOutDate(langs[lang].addDate);
        setInDate(langs[lang].addDate)
        
    },[lang]);

    let navigate=useNavigate();
    function setDateRange(range){
        setInDate(range[0]);
        setOutDate(range[1]);
    }
    function setDestination(d){
        setDest(d);
        setShowCmodal(false);
    }
    return ( 
        <div dir={`${english?'ltr':'rtl'}`} className={`${(!isWish&&!isTp&&!isRoomPage&&visible)?' ':'overflow-hidden h-0 border-0'}  transition-all ease-in-out duration-300  ${reserve ? 'hidden' : ''} largeSearchCont font-[Poppins] flex flex-row items-center`}>
            
            <div onClick={()=>{
                setShowCmodal(x=>!x);
                setShowDmodal(false);
            }} className="searchcrit ">
                <h5 className={`${!showText?'searchTxth':'loading'}`}>{langs[lang].where}</h5>
                <p className={`${!showText?'searchTxtp':'loading'}`}>{dest}</p>
            </div>
            <VDivider/>
            <div onClick={()=>{
                setShowDmodal(x=>!x);
                setShowCmodal(false);
            }} className="searchcrit">
                <h5 className={`${!showText?'searchTxth':'loading'}`}>{langs[lang].checkIn}</h5>
                <p className={`${!showText?'searchTxtp':'loading'}`}>{inDate}</p>
            </div>
            <VDivider/>
            <div onClick={()=>{
                setShowDmodal(x=>!x);
                setShowCmodal(false);
            }} className="searchcrit">
                <h5 className={`${!showText?'searchTxth':'loading'}`}>{langs[lang].checkOut}</h5>
                <p className={`${!showText?'searchTxtp':'loading'}`}>{outDate}</p>
            </div>
            <VDivider/>
            <div className={`searchcrit ${english ? '' : 'ml-12'}`}>
                
                    <h5 className={`${!showText?'searchTxth':'loading'}`}>{langs[lang].who}</h5>
                    <p className={`${!showText?'searchTxtp':'loading'}`}>{langs[lang].addGuests}</p>
                
                
            </div>
            <div onClick={()=>{
                if(dest!=langs[lang].searchDest){
                    navigate(`/search/${dest}`);
                }
                
            }} className={`searchBtn  ${english ? 'right-2' : 'left-2'}`}>
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <ContinentModal setDestination={setDestination}/>
            <LargeDate onRangeSelect={setDateRange}/>
        </div>
     );
}
 
export default LargeSearch;