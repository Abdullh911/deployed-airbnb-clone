import { useRecoilState } from 'recoil';
import './UserMenu.css';
import { currUser, isEnglish, isStay, isTrips, isWishlist, langCode, showSignup, showUserMenu } from '../../StateMangement/State';
import { useNavigate } from 'react-router-dom';
import langs from '../../langs';

const UserMenu = () => {
    let [showS, setShowS] = useRecoilState(showSignup);
    let [curr, setCurr] = useRecoilState(currUser);
    let [showU, setShowU] = useRecoilState(showUserMenu);
    let [isRoomPage, setIsRoomPage] = useRecoilState(isStay);
    let [isWish,setIsWish]=useRecoilState(isWishlist);
    let [isTp,setIsTp]=useRecoilState(isTrips);
    let navigate = useNavigate();
    let [english, setEnglish]=useRecoilState(isEnglish);
    let [lang,setLang]=useRecoilState(langCode);

    const handleTripsClick = () => {
        setIsTp(true);
        navigate('/trips');
        setShowU(false);
    };

    const handleWishlistClick = () => {
        setIsWish(true);
        navigate('/wishlist');
        setShowU(false);
    };

    return (
        <div dir={`${english?'ltr':'rtl'}`} style={{ boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.1)' }} className={`userMenu ${english ? 'right-0' : 'left-0'}`}>
            {!curr && <div>
                <p onClick={() => {
                    setShowS(2);
                    setShowU(false);
                }} className='menuOptn'>{langs[lang].log_in}</p>
                <p onClick={() => {
                    setShowS(1);
                    setShowU(false);
                }} className='menuOptn'>{langs[lang].sign_up}</p>
            </div>}
            {curr && <div>
                <p onClick={()=>{
                    navigate('/account');
                    setShowU(false);
                }} className='menuOptn'>Account</p>
                <p onClick={handleWishlistClick} className='menuOptn'>{langs[lang].Wishlist}</p>
                <p onClick={handleTripsClick} className='menuOptn'>{langs[lang].Trips}</p>
            </div>}
            <div className='dummies'>
                <p className='menuOptn'>{langs[lang].gift_cards}</p>
                <p className='menuOptn'>{langs[lang].airbnb_your_home}</p>
                <p className='menuOptn'>{langs[lang].host_exp}</p>
                <p className='menuOptn'>{langs[lang].help_center}</p>
            </div>
            {curr && <p onClick={() => {
                setCurr(null);
                setShowU(false);
                localStorage.removeItem('user');
                navigate('/');
            }} className='menuOptn'>Log out</p>}
        </div>
    );
}

export default UserMenu;
