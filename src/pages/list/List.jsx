import { useLocation, Navigate, useNavigate } from "react-router";
import "./list.css";
import { useState, useEffect, useRef } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import SearchItem from "../../components/searchItem/SearchItem";
import axios from "axios";
import { useSearchContext } from "../../context/searchContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const List = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef(false);
  const refDate1 = useRef();
  const refDate2 = useRef();
  const [hotelList, setHotelList] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000);
  const [hideCheckInDate, setHideCheckInDate] = useState(false);
  const [hideCheckOutDate, setHideCheckOutDate] = useState(false);
  const [cityData, setCityData] = useState();

  const {
    date,
    destination,
    setDestination,
    checkinDateValue,
    checkoutDateValue,
    validateCheckoutDateValue,
    validateCheckinDateValue,
  } = useSearchContext();

  console.log(
    "checkinDateValue, checkoutDateValue: ",
    checkinDateValue,
    checkoutDateValue
  );
  console.log(
    "date[0].startDate, date[0].endDate: ",
    date[0].startDate,
    date[0].endDate
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/v1/hotels?city=${destination}`, {
          withCredentials: true,
        });
        setHotelList([...res.data.data]);

        const resp = await axios.get("/api/v1/hotels/allcityrefs", {
          withCredentials: true,
        });
        // console.log("hotels: ", resp.data.data);
        setCityData([...resp.data.data]);

        let split1;
        let split2;
        let join1;
        let join2;
        let hotelArray = [];

        res.data.data?.forEach((hotel) => {
          split1 = hotel.name.split(".");
          join1 = split1.join("");
          split2 = join1.split(" ");
          join2 = split2.join("");
          hotelArray.push(join2);
        });
        // console.log("hotelTypeArray: ", hotelTypeArray);
        setPictures([...hotelArray]);

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
    if (ref.current === false) {
      fetchData();
    }

    document.addEventListener("click", handleHide, true);

    return () => {
      ref.current = true;
      document.removeEventListener("click", handleHide, true);
    };
  }, []);

  const handleHide = (e) => {
    if (refDate1.current?.contains(e.target)) {
      setHideCheckInDate(true);
    } else if (refDate2.current?.contains(e.target)) {
      setHideCheckOutDate(true);
    } else {
      setHideCheckInDate(false);
      setHideCheckOutDate(false);
    }
  };

  console.log(hotelList);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/v1/hotels/price?city=${destination}&min=${min}&max=${max}`,
        { withCredentials: true }
      );
      setHotelList([...res.data.data]);

      let split1;
      let split2;
      let join1;
      let join2;
      let hotelArray = [];

      res.data.data?.forEach((hotel) => {
        split1 = hotel.name.split(".");
        join1 = split1.join("");
        split2 = join1.split(" ");
        join2 = split2.join("");
        hotelArray.push(join2);
      });
      // console.log("hotelTypeArray: ", hotelTypeArray);
      setPictures([...hotelArray]);

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

  const handleSelectChange = (e) => {
    setDestination(e.target.value);
  };

  return (
    <>
      {location.state ? (
        <>
          {!loading && (
            // <div>

            <div className="listContainer">
              <div className="listWrapper">
                <div className="listSearch">
                  <h1 className="listTitle">Search</h1>
                  <div className="listItem">
                    <label>City name:</label>
                    {/* <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                      /> */}

                    <select
                      className="headerSearchInput"
                      id="city"
                      onChange={handleSelectChange}
                    >
                      <option
                        style={{ textTransform: "capitalize" }}
                        value={destination}
                        onClick={() => setDestination(destination)}
                      >
                        {destination}
                      </option>
                      {cityData?.map((selectedCity) => {
                        return (
                          <>
                            {selectedCity.cityName != destination ? (
                              <option
                                style={{ textTransform: "capitalize" }}
                                key={selectedCity._id}
                                value={selectedCity.cityName}
                              >
                                {selectedCity.cityName}
                              </option>
                            ) : (
                              ""
                            )}
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <div className="listItem">
                    <label>Check-in date:</label>
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
                  <div className="listItem">
                    <label>Check-out date:</label>
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

                  <h5>Options</h5>

                  <div className="listItem">
                    <label>
                      Min price <small>(per night)</small>
                    </label>
                    <input
                      type="number"
                      value={min}
                      onChange={(e) => setMin(e.target.value)}
                    />
                  </div>
                  <div className="listItem">
                    <label>
                      Max price <small>(per night)</small>
                    </label>
                    <input
                      type="number"
                      value={max}
                      onChange={(e) => setMax(e.target.value)}
                    />
                  </div>

                  <button style={{ width: "100%" }} onClick={handleClick}>
                    Search
                  </button>
                </div>
                <div className="listResult">
                  <SearchItem
                    hotelList={hotelList}
                    pictures={pictures}
                    hideCheckInDate={hideCheckInDate}
                    hideCheckOutDate={hideCheckOutDate}
                    destination={destination}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default List;
