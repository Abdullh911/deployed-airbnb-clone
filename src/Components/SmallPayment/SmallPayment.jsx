import { useState } from "react";
import SmallDate from "../SmallDateInput";
import './SmallPayment.css'
import { useRecoilState } from "recoil";
import { currUser, isEnglish } from "../../StateMangement/State";
import { useNavigate } from "react-router-dom";
import { langCode, mobileSearchModal } from '../../StateMangement/State';
import langs from '../../langs';
const SmallPayment = ({price,home}) => {
    let [total,setTotal]=useState(0);
    let [nights,setNights]=useState(0);
    let [start,setStart]=useState("");
    let [end,setEnd]=useState("");
    let [curr,setCurr]=useRecoilState(currUser);
    let [lang,setLang]=useRecoilState(langCode);
    let [english,setEnglish]=useRecoilState(isEnglish);

    let navigate=useNavigate()
    function setParams(nights,end,start){
        setTotal(nights*price);
        setNights(nights);
        setStart(start);
        setEnd(end);
    }
    function toResPage(){
        if(nights==0){
            return;
        }
        navigate(`/book/${home.id}/${home.pricePerNight}/${nights}/${start}/${end}`);
    }
    return ( 
        <div dir={`${english?'ltr':'rtl'}`} className="flex fixed bottom-0 md:hidden z-10 bg-white h-32 w-full p-5 justify-between items-start">
            <div className="w-1/2 m-0">
                <h2>{price}$ {langs[lang].night}</h2>
                <SmallDate setAll={setParams}/>
            </div>
            <div>
                <button onClick={toResPage} className="bg-[#e41d55] text-white px-7 rounded-lg h-12">
                {langs[lang].reserve}
                </button>
                <p className="flex justify-between"><span>{langs[lang].total}</span><span>{total}$</span></p>
            </div>
        </div>
     );
}
 
export default SmallPayment;