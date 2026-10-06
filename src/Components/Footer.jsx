import { useRecoilState } from 'recoil';
import langs from '../langs';
import { isEnglish, langCode, showLModal } from '../StateMangement/State';
import { Globe, List, UserCircle } from '@phosphor-icons/react';


const Footer = () => {
    let [lang,setLang]=useRecoilState(langCode);
    let [english, setEnglish]=useRecoilState(isEnglish);
    let [LmodalShow,setLmodalShow]=useRecoilState(showLModal);

    return ( 
        <div dir={`${english?'ltr':'rtl'}`} className='md:hidden relative bottom-0 top-32 pr-6 pt-3 pb-32 bg-[#f7f7f7] w-full'>
            <div onClick={()=>{
                setLmodalShow(true);
            }} className='flex items-center gap-3'>
                <Globe size={18} color="#0f0f0f" />
                <p className='underline'>{lang}</p>
            </div>
            
            <p>© 2024 Airbnb, Inc.</p>
            <p>{langs[lang].privacy} · {langs[lang].terms} · {langs[lang].siteMap}</p>
        </div>
     );
}
 
export default Footer;