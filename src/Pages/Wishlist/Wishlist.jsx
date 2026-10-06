import { useRecoilState, useRecoilValue } from 'recoil';
import './Wishlist.css'
import { currUser, isEnglish, isStay, isWishlist, langCode, listings, userFunctions } from '../../StateMangement/State';
import Card from '../../Components/Card/Card';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import homes from '../../Components/mockData';
import homesAr from '../../Components/mockDataAr';
import Loader from '../../Components/Loader';
import { getDocumentById } from '../../Components/dataFetch';
import CardContainer from '../../Components/CardContainer/CardContainer';
import langs from '../../langs';
const Wishlist = () => {
    const [filtered, setFiltered] = useRecoilState(listings);
    let [curr, setCurr] = useRecoilState(currUser);
    let [isRoomPage, setIsRoomPage] = useRecoilState(isStay);
    let [isWish, setIsWish] = useRecoilState(isWishlist);
    let [english, setEnglish] = useRecoilState(isEnglish);
    let [lang, setLang] = useRecoilState(langCode);
    let navigate = useNavigate();
    const { getUser } = useRecoilValue(userFunctions);
    let [load, setLoad] = useState(false);
    let [homesData, setHomesData] = useState([]);

    useEffect(() => {
        setIsWish(true);
        async function setUser() {
            setLoad(true);
            setCurr(await getUser());
            setLoad(false);
        }
        setUser();
    }, []);

    useEffect(() => {
        if (curr?.wishlist?.length > 0) {
            const fetchHomes = async () => {
                const homeDataPromises = curr.wishlist.map(homeId => getDocumentById(english ? "homes" : "homesAr", homeId.toString()));
                const homeDataResults = await Promise.all(homeDataPromises);
                const filteredArray = homeDataResults.filter(value => value !== null && value !== undefined);
                console.log(filteredArray);
                setHomesData(filteredArray);
            };
            fetchHomes();
        }
    }, [curr, english]);
    
    return (
        <div>
            {load &&<Loader />}
            {curr&& (
                <div className="wishContainer">
                    <h1 className='text-2xl ml-14'>{langs[lang].Wishlist}</h1>
                    <div className='w-full flex flex-wrap gap-5 justify-center'>
                        {homesData.map((home, index) => (
                            <Card key={curr.wishlist[index]} home={home} />
                        ))}
                    </div>
            
                </div>
            )}
            {!curr && (
                <div className='relative top-20'>
                    <h1>Oops, nothing is here.....</h1>
                </div>
            )}
        </div>
    );
}

export default Wishlist;
