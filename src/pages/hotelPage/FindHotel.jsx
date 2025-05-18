import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";

//;

const FindHotel = () => {
  const [city, setCity] = useState();
  const [type, setType] = useState();
  const [cityData, setCityData] = useState();
  const [hotelTypeData, setHotelTypeData] = useState();
  const [loading, setLoading] = useState(true);
  const axiosWithInterceptors = useAxiosInterceptors();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const runOnce = useRef(false);

  useEffect(() => {
    if (runOnce.current === false) {
      const references = async () => {
        setLoading(true);
        try {
          const resp = await axiosWithInterceptors.get(
            "/api/v1/hotels/allcityrefs"
          );
          // console.log("hotels: ", resp.data.data);
          setCityData([...resp.data.data]);

          const resp2 = await axiosWithInterceptors.get(
            "/api/v1/hotels/allhoteltyperefs"
          );
          // console.log("hotels: ", resp.data.data);
          setHotelTypeData([...resp2.data.data]);

          setLoading(false);
        } catch (err) {
          if (err.response.data.message) {
            navigate("/handleerror", {
              state: {
                message: err.response?.data?.message,
                path: location.pathname,
              },
            });
          } else {
            navigate("/somethingwentwrong");
          }
        }
      };

      references();
    }

    return () => {
      runOnce.current = true;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axiosWithInterceptors.get(
        `/api/v1/hotels?cityref=${city}`
      );
      console.log(resp.data.data);
      const hotelsToDisplay = [...resp.data.data];
      navigate("/searchhotelsresults", {
        state: { pathname, hotelsToDisplay },
      });
    } catch (err) {
      if (err.response.data.message) {
        navigate("/handleerror", {
          state: {
            message: err.response?.data?.message,
            path: location.pathname,
          },
        });
      } else {
        navigate("/somethingwentwrong");
      }
    }
  };

  const handleSelectChange = (e) => {
    setCity(e.target.value);
  };
  // const handleSelectChange2 = (e) => {
  //   setType(e.target.value);
  // };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="register">
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
          <form className="registerContainer" onSubmit={handleSubmit}>
            <h3 className="registerTitle">Provide the city</h3>

            <div className="registerDiv">
              <label htmlFor="city">Select a city:</label>
              <select id="city" onChange={handleSelectChange}>
                <option
                  style={{ textTransform: "capitalize" }}
                  value={""}
                  onClick={() => setCity(null)}
                >
                  --Please select an option--
                </option>
                {cityData?.map((selectedCity) => (
                  <option
                    style={{ textTransform: "capitalize" }}
                    key={selectedCity._id}
                    value={selectedCity._id}
                  >
                    {selectedCity.cityName}
                  </option>
                ))}
              </select>
            </div>

            <button className="signUpButton" disabled={!city}>
              Continue
            </button>
            <button className="signUpButton" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        )}
      </>
    </div>
  );
};

export default FindHotel;
