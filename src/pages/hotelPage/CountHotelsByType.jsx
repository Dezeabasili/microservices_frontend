import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";

//;

const CountHotelsByTypes = () => {
  const [loading, setLoading] = useState(true);
  const [hotelData, setHotelData] = useState();
  const runOnce = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (runOnce.current === false) {
      const displayData = async () => {
        setLoading(true);
        try {
          const resp = await axios.get("/api/v1/hotels/countbytype", {
            withCredentials: true,
          });
          // console.log(resp.data.data);
          setHotelData([...resp.data.data]);
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

      displayData();
    }

    return () => {
      runOnce.current = true;
    };
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          {hotelData.map((hotelType) => (
            <div key={hotelType.hotelType}>
              <h5>
                {" "}
                <span style={{ textTransform: "capitalize" }}>
                  {hotelType.hotelType}
                </span>
              </h5>
              <p>
                {hotelType.numberOfHotels}{" "}
                {hotelType.numberOfHotels == 1 ? "property" : "properties"}
              </p>
              <br />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CountHotelsByTypes;
