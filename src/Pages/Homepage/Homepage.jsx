import { useEffect, useState } from "react";
import CardContainer from "../../Components/CardContainer/CardContainer";
import "./Homepage.css";
import { useRecoilState } from "recoil";
import {
  initFilters,
  isEnglish,
  isLoading,
  listings,
  selectedCat,
  showContModal,
  showDateModal,
  isStay,
  isWishlist,
  isTrips,
} from "../../StateMangement/State";
import { getAllHomes } from "../../Components/dataFetch";

const Homepage = () => {
  "use memo";
  let [isRoomPage, setIsRoomPage] = useRecoilState(isStay);
  let [isWish, setIsWish] = useRecoilState(isWishlist);
  let [isTp, setIsTp] = useRecoilState(isTrips);
  let [showText, setShowText] = useRecoilState(isLoading);
  const [filtered, setFiltered] = useRecoilState(listings);
  let [categories, setCategories] = useRecoilState(selectedCat);
  let [filters, setFilters] = useRecoilState(initFilters);
  let [showCmodal, setShowCmodal] = useRecoilState(showContModal);
  let [showDmodal, setShowDmodal] = useRecoilState(showDateModal);
  let [english, setEnglish] = useRecoilState(isEnglish);

  const [lastIndex, setLastIndex] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [allHomes, setAllHomes] = useState([]);

  useEffect(() => {
    async function update() {
      let temp2 = Array(15).fill(false);
      temp2[0] = true;
      setCategories(temp2);

      let language = english ? "en" : "ar";
      let temp = await getAllHomes(language);
      setAllHomes(temp);

      const portionSize = Math.ceil(temp.length * 0.25);
      setPageSize(portionSize);

      const initialFiltered = filterListings(temp.slice(0, portionSize));
      setFiltered(initialFiltered);
      setLastIndex(portionSize);
    }
    setShowText(true);
    update();
    setShowText(false);
  }, [english, filters]);

  useEffect(() => {
    setIsTp(false);
    setIsWish(false);
    setIsRoomPage(false);
    setShowCmodal(false);
    setShowDmodal(false);
    setShowText(true);
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setShowText(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const filterListings = (listingsToFilter) => {
    if (filters.type === "Any") {
      return listingsToFilter.filter(
        (listing) =>
          listing.beds >= filters.minBeds &&
          listing.bedrooms >= filters.minBedrooms &&
          listing.pricePerNight >= filters.minPrice &&
          listing.pricePerNight <= filters.maxPrice,
      );
    }
    return listingsToFilter.filter(
      (listing) =>
        listing.type === filters.type &&
        listing.beds >= filters.minBeds &&
        listing.bedrooms >= filters.minBedrooms &&
        listing.pricePerNight >= filters.minPrice &&
        listing.pricePerNight <= filters.maxPrice,
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 200) {
        if (lastIndex >= allHomes.length) {
          return;
        }
        const nextItems = allHomes.slice(lastIndex, lastIndex + pageSize);
        const newFiltered = filterListings(nextItems);
        setFiltered((prev) => [...prev, ...newFiltered]);
        setLastIndex(lastIndex + pageSize);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastIndex, allHomes, pageSize, filters]);

  return (
    <div className="homepage">
      <CardContainer />
    </div>
  );
};

export default Homepage;
