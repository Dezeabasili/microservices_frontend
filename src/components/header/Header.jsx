import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCity, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { useNavigate, useLocation } from "react-router";
import { useSearchContext } from "../../context/searchContext";
import { useAuthContext } from "../../context/authContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const Header = ({ type }) => {
  const refDate = useRef();
  const refRoomOptions = useRef();
  const [hideDate, setHideDate] = useState(false);
  const [hideRoomOptions, setHideRoomOptions] = useState(false);
  const [cityData, setCityData] = useState();
  const [loading, setLoading] = useState(true);
  const [openHotels, setOpenHotels] = useState(false);
  const { auth } = useAuthContext();
  const apiURL = import.meta.env.VITE_HOTELS;

  const {
    date,
    destination,
    setDestination,
    roomOptions,
    checkinDateValue,
    checkoutDateValue,
    validateCheckoutDateValue,
    validateCheckinDateValue,
  } = useSearchContext();
  const navigate = useNavigate();
  const location = useLocation();
  const runOnce = useRef(false);

  useEffect(() => {
    if (runOnce.current === false) {
      const references = async () => {
        // const apiURL = import.meta.env.VITE_HOTELS;
        // console.log("apiURL: ", apiURL);
        setLoading(true);
        setDestination("");

        try {
          // const resp = await axios.get("/api/v1/hotels/allcityrefs");
          const resp = await axios.get("/api/v1/hotels/allcityrefs", {
            withCredentials: true,
          });
          console.log("hotels: ", resp.data.data);
          setCityData([...resp.data.data]);

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

      document.addEventListener("click", handleHide, true);

      references();
    }

    return () => {
      document.removeEventListener("click", handleHide, true);
      runOnce.current = true;
    };
  }, []);

  const handleHide = (e) => {
    if (refDate.current?.contains(e.target)) {
      setHideDate(true);
    } else if (refRoomOptions.current?.contains(e.target)) {
      setHideRoomOptions(true);
    } else {
      setHideRoomOptions(false);
      setHideDate(false);
    }
  };

  const handleSearch = () => {
    if (auth.accessToken) {
      if (!destination) {
        setOpenHotels(true);
      } else {
        navigate("/hotelslist", { state: { destination, date, roomOptions } });
      }
    } else {
      navigate("/logout");
    }
  };

  const handleSelectChange = (e) => {
    setDestination(e.target.value);
  };

  return (
    <div className="header">
      <div className="headerContainer">
        <>
          <div className="headerTitleDiv">
            <h3 className="headerTitle">Find deals for any season</h3>
            <p className="headerDesc">
              From cozy bed & breakfast to luxury rooms
            </p>
          </div>

          <div className="headerSearch">
            <div className="headerSearchItem headerSearchItem1">
              <div className="headerSearchItemTopDiv">
                <FontAwesomeIcon
                  icon={faCity}
                  className="headerSearchIcon headerSearchIcon1"
                />
                <span>Destination</span>
              </div>

              <select
                className="headerSearchInput"
                id="city"
                onChange={handleSelectChange}
              >
                <option
                  style={{ textTransform: "capitalize" }}
                  value={""}
                  onClick={() => setDestination(null)}
                >
                  --Select a city--
                </option>
                {cityData?.map((selectedCity) => (
                  <option
                    style={{ textTransform: "capitalize" }}
                    key={selectedCity._id}
                    value={selectedCity.cityName}
                  >
                    {selectedCity.cityName}
                  </option>
                ))}
              </select>
            </div>

            <div
              // onClick={hideDateFunc}
              className="headerSearchItem headerSearchItem2"
            >
              <div className="headerSearchItemTopDiv">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="headerSearchIcon headerSearchIcon2"
                />
                <p>Check in date</p>
              </div>

              <DatePicker
                selected={checkinDateValue}
                onChange={(date) => validateCheckinDateValue(date)}
                placeholderText="Select a date"
                dateFormat="dd/MMM/yyyy"
                minDate={new Date()}
                wrapperClassName="datepicker"
                className="red-border"
              />
            </div>

            <div
              // onClick={hideDateFunc}
              className="headerSearchItem headerSearchItem3"
            >
              <div className="headerSearchItemTopDiv">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="headerSearchIcon headerSearchIcon2"
                />
                <p>Check out date</p>
              </div>

              <DatePicker
                selected={checkoutDateValue}
                onChange={(date) => validateCheckoutDateValue(date)}
                placeholderText="Select a date"
                dateFormat="dd/MMM/yyyy"
                minDate={new Date()}
                wrapperClassName="datepicker"
                className="red-border"
              />
            </div>

            <div className="headerSearchItem headerSearchItem3">
              <div className="headerSearchItemTopDiv hideEmptyDiv"></div>
              <button onClick={handleSearch} className="headerSearchButton">
                Search
              </button>
            </div>
          </div>
        </>
        {openHotels && (
          <div className="selectDestination">
            <div className="selectDestinationDiv">
              <h3 style={{ marginBottom: "20px" }}>Select a destination</h3>
              <button onClick={() => setOpenHotels(false)}>Continue</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
