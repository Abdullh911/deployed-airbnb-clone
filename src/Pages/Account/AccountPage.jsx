import './AccountPage.css'
import langs from '../../langs';
import { useRecoilState } from 'recoil';
import { currUser, isEnglish, isTrips, langCode } from '../../StateMangement/State';
import { useEffect } from 'react';
import AccountCard from '../../Components/AccountCard/AccountCard';
import { useNavigate } from 'react-router-dom';
const AccountPage = () => {
    let [curr,setCurr]=useRecoilState(currUser);
    let [tpPage,setTppage]=useRecoilState(isTrips);
    let [lang,setLang]=useRecoilState(langCode);
    let [english,setEnglish]=useRecoilState(isEnglish);
    let navigate=useNavigate();
    const icons=[
        <i class="fa-regular fa-id-card"></i>,
        <i class="fa-solid fa-shield-halved"></i>,
        <i class="fa-solid fa-money-bills"></i>,
        <i class="fa-solid fa-heart"></i>,
        <i class="fa-solid fa-suitcase"></i>
    ];
    const titles=[
        langs[lang].personalInfo,
        langs[lang].loginSecurity,
        langs[lang].paymentsPayouts,
        langs[lang].Wishlist,
        langs[lang].Trips

    ];
    const texts=[
        langs[lang].provideDetails,
        langs[lang].updatePassword,
        langs[lang].reviewPayments,
        langs[lang].viewWishlist,
        langs[lang].seeUpcomingTrips

    ];
    useEffect(()=>{
        setTppage(true);
        console.log(curr);
        
    },[]);
    return ( 
        <div dir={`${english?'ltr':'rtl'}`} className='accPage'>
            <h1 className='text-3xl font-semibold'>{langs[lang].Account}</h1>
            <p className='text-xl mb-12'><span className='font-semibold'>{curr.firstName+" "+curr.lastName+", "}</span>{curr.email} <span className='underline'>{langs[lang].Learn_More}</span></p>
            <div className='accCardsCont'>
                {icons.map((icon,index)=>(
                    <AccountCard index={index} icon={icon} title={titles[index]} text={texts[index]} />
                ))}
            </div>
            <button onClick={()=>{
                setCurr(null);
                localStorage.removeItem('user');
                navigate('/');
            }} className='bg-red-700 p-5 rounded-xl text-white'>Log out</button>
        </div>
     );
}
 
export default AccountPage;
