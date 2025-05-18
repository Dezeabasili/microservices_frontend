import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";

const UpdateHotel = () => {
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [type, setType] = useState();
  const [address, setAddress] = useState();
  const [description, setDescription] = useState();
  const [manager, setManager] = useState();
  const [addStaff, setAddStaff] = useState();
  const [removeStaff, setRemoveStaff] = useState();
  const [cityData, setCityData] = useState();
  const [hotelTypeData, setHotelTypeData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosWithInterceptors = useAxiosInterceptors();
  const navigate = useNavigate();
  const location = useLocation();
  const runOnce = useRef(false);

  const errorDiv = error ? <div className="error">{error}</div> : "";

  useEffect(() => {
    if (runOnce.current === false) {
      const references = async () => {
        setLoading(true);
        setError(null);
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
          console.log(err.message);
          setError(err.response.data.message);
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
    let ref_Obj = {
      name,
      city,
      type,
      address,
      description,
      removeStaff,
    };
    let hotelStaff = [];

    let managerDetails = { name: null, ref_number: null };
    let staffDetails = { name: null, ref_number: null };
    let hotelStaffDetails = [];

    try {
      if (manager || addStaff) {
        // const staffList = addStaff.split(",");
        // let staffArray = [];
        // for (let i = 0; i < staffList.length; i++) {
        //   staffArray.push(staffList[i].trim());
        // }

        // if (staffArray.length > 0) {
        //   hotelStaff = [...staffArray];
        // }

        console.log("1");

        if (manager) {
          hotelStaff.push(manager);
          console.log("2");
        }

        if (addStaff) {
          hotelStaff.push(addStaff);
          console.log("3");
        }

        // 67b3b002ee2ab0690b3f6b44

        if (hotelStaff.length > 0) {
          console.log("4");
          const res = await axiosWithInterceptors.post(
            "/api/v1/auth/hotelstaff",
            { hotelStaff }
          );

          hotelStaffDetails = [...res.data.data];

          console.log("5");

          if (manager) {
            let satffInfo = hotelStaffDetails.find((arr) => arr._id == manager);
            if (satffInfo) {
              managerDetails.name = satffInfo.name;
              managerDetails.ref_number = satffInfo._id;
            }
            console.log("6");
          }

          if (addStaff) {
            let satffInfo = hotelStaffDetails.find(
              (arr) => arr._id == addStaff
            );
            if (satffInfo) {
              staffDetails.name = satffInfo.name;
              staffDetails.ref_number = satffInfo._id;
            }
            console.log("7");
          }
        }
      }

      if (managerDetails.ref_number) {
        ref_Obj.manager = managerDetails;
      }

      if (staffDetails.ref_number) {
        ref_Obj.addStaff = staffDetails;
      }

      console.log("8");
      console.log("location.state: ", location.state);
      const resp = await axiosWithInterceptors.patch(
        `/api/v1/hotels/${location.state}`,
        ref_Obj
      );

      console.log("9");
      // console.log(resp.data.data);
      navigate(`/hotels/${location.state}`);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message);
    }
  };

  const handleSelectChange = (e) => {
    setCity(e.target.value);
  };
  const handleSelectChange2 = (e) => {
    setType(e.target.value);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="register">
      <>{loading && <h1>Loading</h1>}</>
      <>
        {!loading && (
          <form className="registerContainer" onSubmit={handleSubmit}>
            <h3 className="registerTitle">
              Provide only the hotel information to change
            </h3>

            <div className="registerDiv">
              <label htmlFor="hotelName">Hotel name:</label>
              <input
                id="hotelName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
              />
            </div>

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

            <div className="registerDiv">
              <label htmlFor="hoteltype">Select a hotel type:</label>
              <select id="hoteltype" onChange={handleSelectChange2}>
                <option
                  style={{ textTransform: "capitalize" }}
                  value={""}
                  onClick={() => setType(null)}
                >
                  --Please select an option--
                </option>
                {hotelTypeData?.map((selectedType) => (
                  <option
                    style={{ textTransform: "capitalize" }}
                    key={selectedType._id}
                    value={selectedType._id}
                  >
                    {selectedType.hotelType}
                  </option>
                ))}
              </select>
            </div>

            <div className="registerDiv">
              <label htmlFor="hotelAddress">Hotel address:</label>
              <input
                id="hotelAddress"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="registerDiv">
              <label htmlFor="hotelDesc">Hotel description:</label>
              <textarea
                id="hotelDesc"
                onChange={(e) => setDescription(e.target.value)}
                autoComplete="off"
                rows="5"
                cols="30"
              >
                {description}
              </textarea>
            </div>
            <div className="registerDiv">
              <label htmlFor="hotelManager">Hotel Manager:</label>
              <input
                id="hotelManager"
                type="text"
                value={manager}
                onChange={(e) => setManager(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="registerDiv">
              <label htmlFor="hotelStaff">Add a staff:</label>
              <input
                id="hotelStaff"
                type="text"
                value={addStaff}
                onChange={(e) => setAddStaff(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="registerDiv">
              <label htmlFor="hotelStaff2">Remove a staff:</label>
              <input
                id="hotelStaff2"
                type="text"
                value={removeStaff}
                onChange={(e) => setRemoveStaff(e.target.value)}
                autoComplete="off"
              />
            </div>

            <button
              className="signUpButton"
              disabled={
                !name &&
                !city &&
                !type &&
                !address &&
                !description &&
                !manager &&
                !addStaff &&
                !removeStaff
              }
            >
              Continue
            </button>
            <button className="signUpButton" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        )}
      </>
      <>{error && errorDiv}</>
    </div>
  );
};

export default UpdateHotel;
