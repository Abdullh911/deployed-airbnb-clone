import { useEffect, useState } from 'react';
import Shrunk from '../Shrunk';
import './MobileSearchModal.css'
import LargeDate from '../../LargeDate';
import MobileDate from '../../MobileDate';
import MobileRegionContainer from '../MobileRegionContainer';
import { useRecoilState } from 'recoil';
import { isEnglish, langCode, mobileSearchModal } from '../../StateMangement/State';
import { useNavigate } from 'react-router-dom';
import langs from '../../langs';

const MobileSearchModal = () => {
    let [chosenDest,setChosenDest]=useState("I'm flexible");
    let [chosenDates,setChosenDates]=useState("Add Dates");
    let [extendedDest,setExtendedDest]=useState(true);
    let [extendedDates,setExtendedDates]=useState(false);
    let [show,setShow]=useRecoilState(mobileSearchModal);
    let [english,setEnglish]=useRecoilState(isEnglish);
    let [lang,setLang]=useRecoilState(langCode);
    let navigate=useNavigate();
    useEffect(()=>{
        setChosenDest(langs[lang].searchDest);
        setChosenDates(langs[lang].addDate);
        
    },[lang]);
    function extendDestination(){
        setExtendedDest(true);
        setExtendedDates(false);
    }
    function extendDates(){
        setExtendedDest(false);
        setExtendedDates(true);
    }
    function nothing(){

    }
    function setRange(range){
        setChosenDates(range);
    } 
    function setDest(dest){
        setChosenDest(dest);
        extendDates();
    }
    return ( 
        <div dir={`${english?'ltr':'rtl'}`} className={`modalBody ${show?'':'hidden'}`}>
            <div className='exitStayExp'>
                    <div onClick={()=>{
                        setShow(false);
                    }} className={`${english?'':'mr-8'} w-8 bg-white  h-8 text-[13px] rounded-full border-[1px] border-gray-400 flex justify-center items-center`}>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <h1 className='border-b-black border-b-2 pb-1'>
                        {langs[lang].stays}
                    </h1>
                    <h1 className='text-[gray] pb-1'>
                        {langs[lang].experiences}
                    </h1>
            </div>
            <div className='searchmodalContent'>
                <div>
                    <Shrunk clicked={extendDestination} first={langs[lang].where} second={chosenDest} show={!extendedDest}/>
                    <MobileRegionContainer setDest={setDest} show={extendedDest}/>
                </div>
                <div>
                    <Shrunk clicked={extendDates} first={langs[lang].experiences} second={chosenDates} show={!extendedDates}/>
                    <div>
                        <MobileDate setRange={setRange} show={extendedDates}/>
                    </div>
                </div>
                <Shrunk clicked={nothing} first={langs[lang].who}  second={langs[lang].addGuests} show={true}/>
            </div>
            <div className='searchFooter'>
                <p className='underline'>{langs[lang].clearAll}</p>
                <button onClick={()=>{
                    setShow(false);
                    if(chosenDest==="I'm flexible"){
                        navigate(`/search/flexible`);
                    }
                    else{
                        navigate(`/search/${chosenDest.toLowerCase()}`);
                    }
                    
                }} className='bg-[#d80665] rounded-xl p-3 w-32 text-white'><i style={{color:'white'}} class="fa-solid fa-magnifying-glass"></i> {langs[lang].search}</button>
            </div>
        </div>
     );
}
 
export default MobileSearchModal;