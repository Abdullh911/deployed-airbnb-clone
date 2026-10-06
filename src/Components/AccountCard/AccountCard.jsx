import { useNavigate } from "react-router-dom";

const AccountCard = ({icon,title,text,index}) => {
    let navigate=useNavigate();
    return ( 
        <div onClick={()=>{
            if(index==3){
                navigate('/wishlist');
            }
            if(index==4){
                navigate('/trips');
            }
        }} className="cursor-pointer w-full md:w-[48%] lg:w-[31%] p-6 shadow-2xl rounded-xl bg-white mb-3">
            <p className="text-3xl mb-3">{icon}</p>
            <p className="font-semibold">{title}</p>
            <p className="text-gray-500 text-sm">{text}</p>
        </div>
     );
}
 
export default AccountCard;