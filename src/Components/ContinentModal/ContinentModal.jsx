import flexible from '../../assets/flexible.jpg';
import europe from '../../assets/europe.jpg';
import greece from '../../assets/greece.jpg';
import seAsia from '../../assets/seAsia.jpg';
import italy from '../../assets/italy.jpg';
import usa from '../../assets/usa.jpg';
import './ContinentModal.css'
import { useRecoilState } from 'recoil';
import langs from '../../langs';

import { isEnglish, isStay, langCode, showContModal } from '../../StateMangement/State';
const ContinentModal = ({setDestination}) => {
    let [english,setEnglish]=useRecoilState(isEnglish);
    let [lang,setLang]=useRecoilState(langCode);
    const contImgs=[flexible,europe,italy,usa,greece,seAsia];
    const txts=[langs[lang].imFlexible,langs[lang].europe,langs[lang].italy,langs[lang].unitedStates,langs[lang].greece,langs[lang].southeastAsia]
    let [showCmodal,setShowCmodal]=useRecoilState(showContModal);
    
    return ( 
        <div className={`contModal ${showCmodal?'':'hidden'} ${english?'left-0':'right-0'} `}>
            <p className='mb-5 font-semibold'>{langs[lang].searchByRegion}</p>
            <div className='contContainer'>
                {contImgs.map((cont,index)=>(
                    <div onClick={()=>{
                        if(index==0){
                            setDestination(english?"flexible":'مرن')
                        }
                        else{
                           if(index==1){
                            setDestination(langs[lang].europe)
                           } 
                           else if(index==2){
                            setDestination(langs[lang].italy)
                           }
                           else if(index==3){
                            setDestination(langs[lang].unitedStates)
                           }
                           else if(index==4){
                            setDestination(langs[lang].greece)
                           }
                           else if(index==5){
                            setDestination(langs[lang].southeastAsia)
                           }
                        }
                    }} className='contCard'>
                        <img src={cont} alt="" />
                        <p className='mt-3'>{txts[index]}</p>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default ContinentModal;