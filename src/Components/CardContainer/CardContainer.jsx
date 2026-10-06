import React, { useEffect } from 'react';
import './CardContainer.css';
import homes from '../mockData';
import Card from '../Card/Card';
import { useRecoilState } from 'recoil';
import { isLarge, showContModal, showDateModal, showModal } from '../../StateMangement/State';
import TypeCarousel from '../TypeCarousel/TypeCarousel';
import Switch from '../Switch/Switch';
import FilterModal from '../FilterModal/FilterModal';
import { listings } from '../../StateMangement/State';
import Footer from '../Footer';

const CardContainer = () => {
    "use memo"
    const [visible, setVisible] = useRecoilState(isLarge);
    const [filtered, setFiltered] = useRecoilState(listings);
    let [showM,setShowM]=useRecoilState(showModal);
    let [showCmodal,setShowCmodal]=useRecoilState(showContModal);
    let [showDmodal,setShowDmodal]=useRecoilState(showDateModal);
    useEffect(() => {
        const handleScrollStart = () => {
            if (visible) {
                setVisible(false);
                setShowCmodal(false);
                setShowDmodal(false);
            }
        };

        const handleScroll = () => {
            if (!visible && window.scrollY === 0) {
                setVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handleScrollStart);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handleScrollStart);
        };
    }, [visible]);

    return (
        <div className='flex flex-col items-center '>
            
            
            <div className="CardContainer">
                {filtered.map((home, index) => (
                    <Card key={home.id} home={home} priority={index < 4} />
                ))}
            </div>
            <Footer/>
        </div>
    );
};

export default CardContainer;
