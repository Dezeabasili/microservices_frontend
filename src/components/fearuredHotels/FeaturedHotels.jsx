import "./featuredHotels.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import useWindowSize from "../../hooks/useWindowSize";

// //;

const FeaturedHotels = () => {
  const [hotelsData, setHotelsData] = useState([]);
  const [hotelsToDisplay, setHotelsToDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const runOnce = useRef(false);
  const apiURL = import.meta.env.VITE_HOTELS;

  const navigate = useNavigate();
  const location = useLocation();

  const screenSize = useWindowSize();

  const ref = useRef();

  ref.current = screenSize.width;

  useEffect(() => {
    if (runOnce.current === false) {
      const loadPage = async () => {
        // const apiURL = import.meta.env.VITE_HOTELS;
        // console.log("apiURL: ", apiURL);
        setLoading(true);
        try {
          const resp = await axios.get("/api/v1/hotels/countByType", {
            withCredentials: true,
          });
          console.log("resp.data: ", resp.data.data);
          setHotelsData([...resp.data.data]);

          if (ref.current <= 600) {
            setHotelsToDisplay((prev) => {
              prev = [...resp.data.data];
              prev?.pop();
              prev?.pop();

              return [...prev];
            });
          } else if (ref.current <= 900) {
            setHotelsToDisplay((prev) => {
              prev = [...resp.data.data];
              prev?.pop();
              return [...prev];
            });
          } else setHotelsToDisplay([...resp.data.data]);

          setLoading(false);
        } catch (err) {
          if (err.response.data.message) {
            navigate("/handleerror", {
              state: {
                message: err.response.data.message,
                path: location.pathname,
              },
            });
          } else {
            navigate("/somethingwentwrong");
          }
        }
      };

      loadPage();
    }

    return () => {
      runOnce.current = true;
    };
  }, []);

  useEffect(() => {
    if (screenSize.width <= 600) {
      setHotelsToDisplay((prev) => {
        prev = [...hotelsData];
        prev?.pop();
        prev?.pop();
        return [...prev];
      });
    } else if (screenSize.width <= 900) {
      setHotelsToDisplay((prev) => {
        prev = [...hotelsData];
        prev?.pop();
        return [...prev];
      });
    } else setHotelsToDisplay([...hotelsData]);
  }, [screenSize.width]);

  return (
    <div className="hotelContainer">
      <>
        {loading && (
          // <RotatingLines
          //   visible={true}
          //   height="96"
          //   width="96"
          //   color="grey"
          //   strokeWidth="5"
          //   animationDuration="0.75"
          //   ariaLabel="rotating-lines-loading"
          //   wrapperStyle={{}}
          //   wrapperClass=""
          // />
          <h1>Loading</h1>
        )}
      </>
      <>
        {!loading && (
          <>
            <h3 className="hotelContainerTitle">Explore our hotels</h3>
            <div className="hotelList">
              {hotelsToDisplay?.map((hotel, index) => {
                return (
                  <div className="hotelType" key={hotel?.hotelType}>
                    <img
                      src={hotel?.photo}
                      alt=""
                      className="hotelImg"
                      width="200"
                      height="200"
                    />
                    <h4 className="hotelTypeTitle">{hotel?.hotelType}</h4>
                    <h5 className="hotelTypeNum">
                      {hotel?.numberOfHotels}{" "}
                      {hotel?.numberOfHotels == 1 ? "property" : "properties"}
                    </h5>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default FeaturedHotels;
