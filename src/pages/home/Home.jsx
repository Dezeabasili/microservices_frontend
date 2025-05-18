import "./home.css";
import Header from "../../components/header/Header.jsx";
import FeaturedHotels from "../../components/fearuredHotels/FeaturedHotels";
import FavProperties from "../../components/favProperties/FavProperties";
import Subscription from "../../components/subscription/Subscription.jsx";
import Cities from "../../components/cities/Cities.jsx";

const Home = () => {
  return (
    <>
      <Header />
      <div className="homeContainer">
        <Cities />
        <FeaturedHotels />
        <FavProperties />
        <Subscription />
      </div>
    </>
  );
};

export default Home;
