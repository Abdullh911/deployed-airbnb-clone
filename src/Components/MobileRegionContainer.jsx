import flexible from '../assets/flexible.jpg';
import europe from '../assets/europe.jpg';
import greece from '../assets/greece.jpg';
import seAsia from '../assets/seAsia.jpg';
import italy from '../assets/italy.jpg';
import usa from '../assets/usa.jpg';
import langs from '../langs';
import { isEnglish, langCode } from '../StateMangement/State';
import { useRecoilState } from 'recoil';

const MobileRegionContainer = ({show,setDest}) => {
    let [english,setEnglish]=useRecoilState(isEnglish);
    let [lang,setLang]=useRecoilState(langCode);
    const contImgs=[flexible,europe,italy,usa,greece,seAsia];
    const txts=[langs[lang].imFlexible,langs[lang].europe,langs[lang].italy,langs[lang].unitedStates,langs[lang].greece,langs[lang].southeastAsia]
    return ( 
        <div dir={`${english?'ltr':'rtl'}`} className={`extendedDest ${show?'':'hidden'}`}>
            <h1 className='text-2xl font-bold mb-5'>{langs[lang].Where_to}</h1>
            <div className='flex items-center gap-4 p-3 rounded-xl border-[2px] w-[90%] mb-3'>
                <i style={{color:'black'}} class="fa-solid fa-magnifying-glass"></i>
                <input placeholder={langs[lang].searchDest} type="text" />
            </div>
            <div className='regionContainer'>
                {contImgs.map((cont,index)=>(
                    <div onClick={()=>{
                        if(index==0){
                            setDest(english?"flexible":'مرن')
                        }
                        else{
                           if(index==1){
                            setDest(langs[lang].europe)
                           } 
                           else if(index==2){
                            setDest(langs[lang].italy)
                           }
                           else if(index==3){
                            setDest(langs[lang].unitedStates)
                           }
                           else if(index==4){
                            setDest(langs[lang].greece)
                           }
                           else if(index==5){
                            setDest(langs[lang].southeastAsia)
                           }
                        }
                    }} className='regionCard'>
                        <img className='rounded-xl' src={cont} alt="" />
                        <p className='mt-3'>{txts[index]}</p>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default MobileRegionContainer;