import { useRecoilState } from 'recoil';
import VDivider from '../VDivider';
import './SmallSearch.css'
import { isEnglish, isLarge, isStay, langCode, showContModal, showDateModal } from '../../StateMangement/State';
import langs from '../../langs';
const SmallSearch = () => {
    let [visible,setVisible]=useRecoilState(isLarge);
    let [showCmodal,setShowCmodal]=useRecoilState(showContModal);
    let [isRoomPage,setIsRoomPage]=useRecoilState(isStay);
    let [showDmodal,setShowDmodal]=useRecoilState(showDateModal);
    let [lang,setLang]=useRecoilState(langCode);
    let [english,setEnglish]=useRecoilState(isEnglish);
    return ( 
        <div dir={`${english?'ltr':'rtl'}`} className={`SmallSearch font-[Poppins] `}>
            <div onClick={()=>{
                setVisible(true);
                setShowCmodal(true);
                setIsRoomPage(false);
                setShowDmodal(false);
            }} className={`SmSearchCrit `}>
                <p className='font-semibold'>{langs[lang].anywhere}</p>
            </div>
            <VDivider/>
            <div onClick={()=>{
                setVisible(true);
                setShowDmodal(true);
                setIsRoomPage(false);
                setShowCmodal(false);
            }} className="SmSearchCrit">
                <p className='font-semibold'>{langs[lang].anyWeek}</p>
            </div>
            <VDivider/>
            <div className={`  SmSearchCrit ${english?'mr-12':'ml-8'}`}>
                <p className='font-normal'>{langs[lang].addGuests}</p>
            </div>
            <div className={`searchBtnn  ${english?'right-1':'left-1'}`}>
                <i class="y fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
     );
}
 
export default SmallSearch;