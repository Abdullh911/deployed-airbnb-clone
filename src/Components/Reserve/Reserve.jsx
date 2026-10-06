import { useState } from "react";
import SmallDate from "../SmallDateInput";
import { useRecoilState } from "recoil";
import { currUser, isEnglish, langCode } from "../../StateMangement/State";
import { useNavigate } from "react-router-dom";
import langs from '../../langs';

const Reserve = ({price,home}) => {
    let [total,setTotal]=useState(0);
    let [nights,setNights]=useState(0);
    let [start,setStart]=useState("");
    let [end,setEnd]=useState("");
    let [curr,setCurr]=useRecoilState(currUser);
    let [lang,setLang]=useRecoilState(langCode);
    let [english,setEnglish]=useRecoilState(isEnglish)
    let navigate=useNavigate();
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
        navigate(`/book/${home}/${price}/${nights}/${start}/${end}`);
    }
    return ( 
        <>
            <div dir={`${english?'ltr':'rtl'}`}>
            <h1 className="mb-5 text-[20px]"> {price}$ {langs[lang].night}</h1>
            <SmallDate setAll={setParams}/>
            <div  className="border-2 rounded-lg mt-3 p-2">
                <p className=''>{1} {langs[lang].adults}, {1} {langs[lang].children}, {1} {langs[lang].infants} & {1} {langs[lang].pet}</p>
            </div>
            <div className="flex justify-center mt-3">
                <button onClick={toResPage}  className="bg-[#e41d55] text-white w-full rounded-lg h-12">{langs[lang].reserve}</button>
            </div>
            <div className="flex justify-center my-5">
                <p className="text-sm">{langs[lang].notCharged}</p>
            </div>
            <div >
                <div className="flex justify-between mb-3">
                    <p>{price}$  {nights}X  {langs[lang].night}</p>
                    <p>{total}$</p>
                </div>
                <div className="border-t-2 pb-8 flex justify-between mt-4 ">
                    <p>{langs[lang].totalBefore}</p>
                    <p>{total}$</p>
                </div>
            </div>
            </div>
        </>
     );
}
 
export default Reserve;