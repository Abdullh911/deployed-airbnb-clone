import { useRecoilState } from 'recoil';
import './SearchBarSmallD.css'
import { langCode, mobileSearchModal } from '../../StateMangement/State';
import langs from '../../langs';

const SearchBarSmallD = () => {
    let [showMobileSearch,setMobileSearch]=useRecoilState(mobileSearchModal);
    let [lang,setLang]=useRecoilState(langCode);

    return ( 
        <div onClick={()=>{
            setMobileSearch(true);
        }} className="small-S">
            <i class="z fa-solid fa-magnifying-glass"></i>
            <div className='searchCont'>
                <p className='text-[14px] font-bold'>{langs[lang].Where_to}</p>
                <div className='searchHolder'>
                    <p className='uncomp'>{langs[lang].anywhere} </p>
                    <p>&nbsp;·&nbsp;</p>
                    <p className='uncomp'>{langs[lang].anyWeek} </p>
                    <p>&nbsp;·&nbsp;</p>
                    <p className='uncomp'>{langs[lang].addGuests} </p>
                </div>
            </div>
        </div>
     );
}
 
export default SearchBarSmallD;