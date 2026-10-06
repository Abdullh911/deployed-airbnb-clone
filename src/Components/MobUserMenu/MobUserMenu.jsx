import { useRecoilState } from "recoil";
import { currUser, isEnglish, langCode, showSignup } from "../../StateMangement/State";
import './MobUserMenu.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import langs from '../../langs';
const MobUserMenu = () => {
    let [lang,setLang]=useRecoilState(langCode);
    let [english, setEnglish]=useRecoilState(isEnglish);
    let [sClicked, setSclicked] = useState([true, ...Array(4).fill(false)]);
    let [uClicked, setUclicked] = useState([true, ...Array(2).fill(false)]);
    let [curr, setCurr] = useRecoilState(currUser);
    let [showS,setShowS]=useRecoilState(showSignup);
    let navigate=useNavigate();
    const menuSignedTxt = [langs[lang].explore, langs[lang].Wishlist, langs[lang].Trips, langs[lang].messages, langs[lang].account];
    const menuSignedTxtIcons = [
        <i style={{ color: sClicked[0] ? '#ff385c' : 'gray' }} class="fa-solid fa-magnifying-glass text-[25px]"></i>,
        <i style={{ color: sClicked[1] ? '#ff385c' : 'gray' }} class="fa-regular fa-heart text-[25px]"></i>,
        <i style={{ color: sClicked[2] ? '#ff385c' : 'gray' }} class="fa-brands fa-airbnb text-[25px]"></i>,
        <i style={{ color: sClicked[3] ? '#ff385c' : 'gray' }} class="fa-regular fa-message text-[25px]"></i>,
        <i style={{ color: sClicked[4] ? '#ff385c' : 'gray' }} class="fa-solid fa-user text-[25px]"></i>
    ];

    const menuUnsignedTxt = [langs[lang].explore, langs[lang].Wishlist, langs[lang].log_in];
    const menuUnsignedTxtIcons = [
        <i style={{ color: uClicked[0] ? '#ff385c' : 'gray' }} class="fa-solid fa-magnifying-glass text-[25px]"></i>,
        <i style={{ color: uClicked[1] ? '#ff385c' : 'gray' }} class="fa-regular fa-heart text-[25px]"></i>,
        <i style={{ color: uClicked[2] ? '#ff385c' : 'gray' }} class="fa-solid fa-user text-[25px]"></i>
    ];
    function select(type,index){
        if(type ==='signed'){
            let temp=sClicked;
            temp=Array(temp.length).fill(false);
            temp[index]=true;
            setSclicked(temp);
            if(index===0){
                navigate('/');
            }
            else if(index===1){
                navigate('/wishlist');
            }
            else if(index===2){
                navigate('/trips');
            }
            else if(index===3){

            }
            else if(index===4){
                if(curr!=null){
                    navigate('/account');
                }
            }
        }
        else{
            let temp=uClicked;
            temp=Array(temp.length).fill(false);
            temp[index]=true;
            setUclicked(temp);
            if(index===0){
                setShowS(0);
                navigate('/');
                
            }
            else if(index===1){
                setShowS(0);
                navigate('/wishlist');
            }
            else if(index===2){
                setShowS(1);
            }
        }
    }

    return (
        <div className="mobMenu">
            {curr&&<div className="flex justify-evenly p-1">
                {menuSignedTxt.map((txt, index) => (
                    <div onClick={()=>{
                        select('signed',index)
                    }} key={index} className="flex justify-center relative top-2 items-center flex-col font-[Poppins]">
                        {menuSignedTxtIcons[index]}
                        <p style={{ color: sClicked[index] ? '#ff385c' : 'gray' }} className="text-[12px]">{txt}</p>
                    </div>
                ))}
            </div>}
            {!curr&&<div className="flex justify-evenly p-1">
                {menuUnsignedTxt.map((txt, index) => (
                    <div onClick={()=>{
                        select('unsigned',index)
                    }} key={index} className="flex justify-center relative top-2 items-center flex-col font-[Poppins]">
                        {menuUnsignedTxtIcons[index]}
                        <p style={{ color: uClicked[index] ? '#ff385c' : 'gray' }} className="text-[12px]">{txt}</p>
                    </div>
                ))}
            </div>}
        </div>
    );
};

export default MobUserMenu;
