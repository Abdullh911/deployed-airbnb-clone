import { useEffect, useState } from "react";
import './BedCounter.css'
import { useRecoilState } from "recoil";
import { initFilters } from "../../StateMangement/State";
const BedCounter = ({title ,set}) => {
    const [count,setCount]=useState(0);
    let [storeFltrs,setSetStoreFltrs]=useRecoilState(initFilters);
    function increaseCount(){
        console.log(count);
        let temp=count+1;
        setCount(x=>x+1);
        set(temp)
    }
    useEffect(()=>{
        if(title=='Bedrooms'){
            setCount(storeFltrs.minBedrooms);
        }
        else if(title=='Beds'){
            setCount(storeFltrs.minBeds);
        }
        else{
            setCount(0)
        }
    },[])
    function decreaseCount(){
        if(count!=0){
            let temp=count-1;
            setCount(x=>x-1);
            set(temp)
        }
    }
    return ( 
        <div className="w-full flex justify-between items-center">
            <p >{title}</p>
            <div className="x flex gap-9 justify-evenly">
                <button className={`${count==0?'opacity-50 ':'opacity-100'} hover:border-black w-8 h-8 rounded-full border-[1px] border-gray-400`} disabled={count==0}  onClick={decreaseCount}>-</button>
                <p className="w-5">{count==0?"Any":count+"+"}</p>
                <button className="hover:border-black w-8 h-8 rounded-full border-[1px] border-gray-400" onClick={increaseCount}>+</button>
            </div>
        </div>
     );
}
 
export default BedCounter;