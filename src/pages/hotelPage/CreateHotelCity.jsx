import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";

const CreateHotelCity = () => {
  const [cityName, setCityName] = useState();
  const axiosWithInterceptors = useAxiosInterceptors();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axiosWithInterceptors.post(
        "/api/v1/hotels/createcity",
        {
          cityName,
        }
      );
      console.log(resp.data.data);
      navigate("/hotels");
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

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="register">
      <form className="registerContainer" onSubmit={handleSubmit}>
        <h3 className="registerTitle">Provide city name</h3>

        <div className="registerDiv">
          <label htmlFor="cityName">City name:</label>
          <input
            id="cityName"
            type="text"
            value={cityName || ""}
            onChange={(e) => setCityName(e.target.value)}
            autoComplete="off"
          />
        </div>

        <button className="signUpButton" disabled={!cityName}>
          Continue
        </button>
        <button className="signUpButton" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateHotelCity;
