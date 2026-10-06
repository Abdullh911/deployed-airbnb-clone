import './LanguageModal.css';
import langs from '../../langs';
import { useRecoilState } from 'recoil';
import { isEnglish, langCode, showLModal } from '../../StateMangement/State';
import { useNavigate } from 'react-router-dom';

const LanguageModal = () => {
    let [lang,setLang]=useRecoilState(langCode);
    let [english,setEnglish]=useRecoilState(isEnglish);
    let [LmodalShow,setLmodalShow]=useRecoilState(showLModal);
    const languages=['English','العربية','Spanish','French'];
    const slogans=['United Kingdom','العالم','Spain','France'];
    const codes=['en','ar','es','fr'];
    let navigate=useNavigate();
    function setLanguage(code){
        setLang(code);
        if(code=='ar'){
            setEnglish(false);
            localStorage.setItem('isEnglish', JSON.stringify(false));
        }
        else{
            setEnglish(true);
            localStorage.setItem('isEnglish', JSON.stringify(true));
        }
        localStorage.setItem('langCode', code);
        setLmodalShow(false);
        navigate('/');
        
    }
    return ( 
        <div dir={`${english?'ltr':'rtl'}`} className={`font-[Poppins]  z-40 inset-0 flex items-center justify-center ${LmodalShow?'fixed':'hidden'}`}>
            <div className='absolute bg-gray-500 opacity-50 z-50 w-full h-full'>

            </div>
            <div className="relative z-50 w-[70%] h-[70%] bg-white rounded-2xl p-8 pt-16 overflow-y-auto">
                <i onClick={()=>{
                    setLmodalShow(false);
                }} class="fa-solid fa-x absolute top-4 left-4 cursor-pointer"></i>
                <h1 className='text-[20px]'>{langs[lang].chooseLangRegion}</h1>
                <div className='flex justify-between mt-9 flex-wrap '>
                    {languages.map((lan,index)=>(
                        <div onClick={()=>{
                            setLanguage(codes[index]);
                        }} className={`${codes[index]==lang?'border-2 border-black':''} w-[150px] h-max rounded-xl p-2 cursor-pointer`}>
                            <p>{lan}</p>
                            <p className='text-gray-500 text-[12px]'>{slogans[index]}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default LanguageModal;