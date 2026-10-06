import {Lock,Broadcast ,PawPrint,Snowflake,Calendar ,Drop,CarProfile ,Television,Broom,VideoCamera    } from '@phosphor-icons/react'
import Offer from './Offer';
import langs from '../../langs';
import { langCode } from '../../StateMangement/State';
import { useRecoilState } from 'recoil';

const Offers = () => {
    let [lang,setLang]=useRecoilState(langCode);

    return ( 
        <div className='w-full'>
            <h1 className='font-bold my-5'>
            {langs[lang].whatThisPlaceOffers}
            </h1>
            <div className='flex justify-between'>
                <div className='flex flex-col gap-2'>
                    <Offer icon={<Lock size={20} color="#0f0f0f" />} text={langs[lang].lockOnDoor}/>
                    <Offer icon={<Broadcast  size={20} color="#0f0f0f" />} text={langs[lang].wifi}/>
                    <Offer icon={<PawPrint size={20} color="#0f0f0f" />} text={langs[lang].petsAllowed}/>
                    <Offer icon={<Snowflake  size={20} color="#0f0f0f" />} text={langs[lang].airConditioning}/>
                    <Offer icon={<Calendar  size={20} color="#0f0f0f" />} text={langs[lang].longTermStays}/>
                </div>
                <div className='flex flex-col gap-2'>
                    <Offer icon={<Drop  size={20} color="#0f0f0f" />} text={langs[lang].lakeAccess}/>
                    <Offer icon={<CarProfile  size={20} color="#0f0f0f" />} text={langs[lang].freeParking}/>
                    <Offer icon={<Television  size={20} color="#0f0f0f" />} text={langs[lang].tv}/>
                    <Offer icon={<VideoCamera  size={20} color="#0f0f0f" />} text={langs[lang].securityCameras}/>
                    <Offer icon={<Broom  size={20} color="#0f0f0f" />} text={langs[lang].lockOnDoor}/>
                </div>
                
            </div>
            <button className='mt-4 border-gray-500 border-2 p-3 hover:bg-gray-300 rounded-xl'>{langs[lang].showAllAmenities}</button>
        </div>
     );
}
 
export default Offers;