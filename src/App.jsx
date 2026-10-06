import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Homepage/Homepage";
import Navbar from "./Components/Navbar/Navbar";
import SmallNavbar from "./Components/SmallNavbar/SmallNavbar";
import FilterModal from "./Components/FilterModal/FilterModal";
import { useRecoilState } from "recoil";
import {
  isLoading,
  isStay,
  showLModal,
  showModal,
  showSignup,
} from "./StateMangement/State";
import SignupLogin from "./Components/SignupLogin/SignupLogin";
import Wishlist from "./Pages/Wishlist/Wishlist";
import MobUserMenu from "./Components/MobUserMenu/MobUserMenu";
import StayPage from "./Pages/StayPage/StayPage";
import Reservations from "./Pages/Reservations/Reservations";
import Category from "./Pages/Category/Category";
import SearchPage from "./Pages/SearchPage/SearchPage";
import { useEffect, useRef, useState } from "react";
import MobileSearchModal from "./Components/MobileSearchModal/MobileSearchModal";
import ReservePage from "./Pages/ReservePage/ReservePage";
import LanguageModal from "./Components/LanguageModal/LanguageModal";
import AccountPage from "./Pages/Account/AccountPage";
import { replaceData } from "./Components/dataRplace";

function App() {
  let [showM, setShowM] = useRecoilState(showModal);
  let [showS, setShowS] = useRecoilState(showSignup);
  let [isRoom, setIsRoom] = useRecoilState(isStay);
  let [showText, setShowText] = useRecoilState(isLoading);
  let [LmodalShow, setLmodalShow] = useRecoilState(showLModal);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Router>
        <Navbar />
        {showM && <FilterModal />}
        {showS != 0 && <SignupLogin />}
        {!isRoom && <SmallNavbar />}
        {!isRoom && <MobUserMenu />}
        {<LanguageModal />}
        <MobileSearchModal />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/stay/:id" element={<StayPage />} />
          <Route path="/trips" element={<Reservations />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/:category" element={<Category />} />
          <Route path="/search/:destination" element={<SearchPage />} />
          <Route
            path="/book/:id/:price/:nights/:inDate/:outDate"
            element={<ReservePage />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
