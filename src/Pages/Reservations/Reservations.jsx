import { useRecoilState, useRecoilValue } from "recoil";
import { currUser, isStay, isTrips, userFunctions } from "../../StateMangement/State";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";

const Reservations = () => {
    let [curr,setCurr]=useRecoilState(currUser);
    let [isRoomPage,setIsRoomPage] = useRecoilState(isStay);
    let [isTp,setIsTp] = useRecoilState(isTrips);
    const { getUser } = useRecoilValue(userFunctions);
    let [load,setLoad]=useState(false);

    let navigate=useNavigate();
    useEffect(()=>{
        console.log(curr);
        setIsTp(true);
        async function setUser(){
            setLoad(true);
            setCurr(await getUser());
            setLoad(false);
        }
        setUser();
    },[])
    if(load){
        return(
            <Loader/>
        )
    }
    return ( 
        <div className="relative top-32  p-5">
            <h1 className="pl-7 text-4xl mb-5">Your trips</h1>
            {curr&&<div className="flex flex-wrap gap-5 pl-7">
                {curr.trips.map((trip,index)=>(
                    <div onClick={()=>{
                        navigate(`/stay/${trip.home.id}`);
                    }} className="cursor-pointer shadow-lg w-[90%] md:w-[40%] lg:w-[23%] p-5 rounded-xl font-[Poppins] flex flex-col gap-5 border-[1px]">
                        <div className="flex justify-between">
                            <p>Start: {trip.start}</p>
                            <p>End: {trip.end}</p>
                        </div>
                        <p>{trip.nights} nights</p>
                        <p>Total: {trip.total}$</p>
                    </div>
                ))}
            </div>}
        </div>
     );
}
 
export default Reservations;