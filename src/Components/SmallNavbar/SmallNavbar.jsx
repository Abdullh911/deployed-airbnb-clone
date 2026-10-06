import { useRecoilState } from "recoil";
import SearchBarSmallD from "../SearchBarSmallD/SearchBarSmallD";
import TypeCarousel from "../TypeCarousel/TypeCarousel";
import './SmallNavbar.css'
import { mobileSearchModal, showModal } from "../../StateMangement/State";
const SmallNavbar = () => {
    let [showM,setShowM]=useRecoilState(showModal);
    
    return ( 
        <div className="small-navbar">
            <div className="navBody">
                <SearchBarSmallD/>
                <div onClick={()=>{
                    setShowM(true);
                }} className="filter">
                    <i class="fa-solid fa-sliders"></i>
                </div>
                
            </div>
            <TypeCarousel/>
        </div>
     );
}
 
export default SmallNavbar;