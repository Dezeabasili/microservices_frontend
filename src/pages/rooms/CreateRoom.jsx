import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";

const CreateRoom = () => {
  const [title, setTitle] = useState();
  const [hotel, setHotel] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [maxPeople, setMaxPeople] = useState();
  const [rooms, setRooms] = useState();

  const axiosWithInterceptors = useAxiosInterceptors();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const givenRoomNumbers = rooms?.split(",");
      let roomNumbers = [];

      givenRoomNumbers?.forEach((givenRoom) => {
        let Obj = {};
        Obj.number = givenRoom.trim() * 1;
        Obj.unavailableDates = [];
        roomNumbers.push(Obj);
      });

      console.log(roomNumbers);

      const resp = await axiosWithInterceptors.post("/api/v1/hotels/room", {
        title,
        hotel,
        description,
        price,
        maxPeople,
        roomNumbers,
      });
      console.log(resp.data.data);
      navigate("/rooms");
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
        <h3 className="registerTitle">Provide room details</h3>

        <div className="registerDiv">
          <label htmlFor="hotelRef">Hotel reference:</label>
          <input
            id="hotelRef"
            type="text"
            value={hotel}
            onChange={(e) => setHotel(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="registerDiv">
          <label htmlFor="hotelTitle">Room title:</label>
          <input
            id="hotelTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="registerDiv">
          <label htmlFor="price">Room price:</label>
          <input
            id="price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="registerDiv">
          <label htmlFor="maxPeople">Maximum number of occupants:</label>
          <input
            id="maxPeople"
            type="text"
            value={maxPeople}
            onChange={(e) => setMaxPeople(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="registerDiv">
          <label htmlFor="roomDesc">Room description:</label>
          <textarea
            id="roomDesc"
            onChange={(e) => setDescription(e.target.value)}
            autoComplete="off"
            rows="5"
            cols="30"
          >
            {description}
          </textarea>
        </div>
        <div className="registerDiv">
          <label htmlFor="rooms">Room numbers:</label>
          <input
            id="rooms"
            type="text"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            autoComplete="off"
          />
        </div>

        <button
          className="signUpButton"
          disabled={!title || !hotel || !description || !price || !rooms}
        >
          Continue
        </button>
        <button className="signUpButton" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateRoom;
