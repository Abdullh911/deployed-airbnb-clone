import { useRecoilState } from 'recoil';
import './TypeCard.css'
import { isLoading } from '../../StateMangement/State';
import { useNavigate } from 'react-router-dom';
const TypeCard = ({selected,icon,text,change,ind}) => {
   let [showText,setShowText]=useRecoilState(isLoading);
   let navigate=useNavigate();
    return ( 
        <div
        className='typecard'
        onClick={()=>{
            change(ind);
            navigate(`/${text}`);
        }} style={{
            cursor: 'pointer',
            color: selected[ind] ? '#000000' : '#686868',
            borderBottomColor: selected[ind] ? '#000000' : 'white',
            borderBottomWidth: '2px',
            borderBottomStyle: 'solid', // Add this line
            paddingBottom: '4px'
        }}
        >
            <p className={`${!showText?'':'loadingType mb-1'}`}>{icon}</p>
            <p className={`${!showText?'font-[Poppins] text-[11px] text-nowrap truncate':'loadingType'}`}>{text}</p>
        </div>
     );
}
 
export default TypeCard;