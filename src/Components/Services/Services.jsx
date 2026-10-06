import {Bed,Users,Key,Bathtub} from '@phosphor-icons/react'
const Services = ({ bePut,title,slogan}) => {
    return ( 
        <div className="flex items-center gap-8 mb-4">
            <div>
               {title=='Room in a home' &&<Bed size={26} color="#0f0f0f" />}
               {title=='Shared common spaces' &&<Users size={26} color="#0f0f0f" />}
               {title=='Private attached bathroom' &&<Bathtub  size={26} color="#0f0f0f" />}
               {title=='Great check-in experience' &&<Key size={26} color="#0f0f0f" />}
            </div>
            <div>
                <h3 className="font-bold text-sm">{bePut}</h3>
                <p className='text-sm'>{slogan}</p>
            </div>
        </div>
     );
}
 
export default Services;