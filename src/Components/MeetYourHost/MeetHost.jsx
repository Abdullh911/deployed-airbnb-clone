import {Globe,MapPin} from '@phosphor-icons/react'
import langs from '../../langs';
import { isEnglish, langCode } from '../../StateMangement/State';
import { useRecoilState } from 'recoil';
const MeetHost = () => {
    let [lang,setLang]=useRecoilState(langCode);
    let [english,setEnglish]=useRecoilState(isEnglish);
    return ( 
        <div dir={`${english?'ltr':'rtl'}`} className='mt-7 mb-96'>
            <h2 className="text-[25px] mb-5 font-semibold font-[Poppins]">{langs[lang].meetYourHost}</h2>
            <div className="w-full flex justify-center">
                <div className="flex flex-col items-center w-full shadow rounded-2xl ">
                    <div className="flex gap-10 shadow rounded-2xl mt-4 p-10 w-[90%] justify-center">
                        <div className="flex flex-col items-center">
                            <div id='pfp' className='w-8 h-8 p-12 rounded-full bg-gray-300 flex justify-center items-center'>
                                M
                            </div> 
                            <h1>Piava</h1>
                        </div>
                        <div className="flex flex-col">
                            <div className="border-b-2">
                                <p className="font-bold">473</p>
                                <p>{langs[lang].reviews}</p>
                            </div>
                            <div className="border-b-2">
                                <p className="font-bold">4.26</p>
                                <p>{langs[lang].rating}</p>
                            </div>
                            <div>
                                <p className="font-bold">8 {langs[lang].years}</p>
                                <p>{langs[lang].hosting}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-3/5 mt-5'>
                        <div className='flex gap-4 mb-3'>
                            <Globe size={18} color="#0f0f0f" />
                            <p className='text-sm'>{langs[lang].speaks}</p>
                        </div>
                        
                        <div className='flex gap-4 mb-3'>
                            <MapPin size={18} color="#0f0f0f" />
                            <p className='text-sm'>{langs[lang].livesIn}</p>
                        </div>
                        
                    </div>
                    <div className='m-0 p-0 w-3/5'>
                        <p className='break-words text-sm'>{langs[lang].hostBio}</p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default MeetHost;