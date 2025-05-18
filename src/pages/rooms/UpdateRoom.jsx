import "./updateRoom.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";

const UpdateRoom = () => {
  const [hotel, setHotel] = useState();
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [maxPeople, setMaxPeople] = useState();
  const [description, setDescription] = useState();
  const [addRooms, setAddRooms] = useState();
  const [removeRooms, setRemoveRooms] = useState();
  const [openHotelModal, setOpenHotelModal] = useState(false);

  const axiosWithInterceptors = useAxiosInterceptors();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCancel = () => {
    setOpenHotelModal(false);
  };

  const handleContinue = async () => {
    setOpenHotelModal(false);
    try {
      const resp = await axiosWithInterceptors.patch(
        `/api/v1/hotels/room/${location.state}`,
        { title, price, maxPeople, description, addRooms, hotel, removeRooms }
      );
      // console.log(resp.data.data);
      navigate(`/rooms/${location.state}`);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // continue tonight

    if (hotel || removeRooms) {
      setOpenHotelModal(true);
      console.log("Modal is open");
      return;
    } else {
      try {
        const resp = await axiosWithInterceptors.patch(
          `/api/v1/hotels/room/${location.state}`,
          { title, price, maxPeople, description, addRooms }
        );
        console.log(resp.data.data);
        navigate(`/rooms/${location.state}`);
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
    }
  };

  return (
    <div className="register">
      <form className="registerContainer" onSubmit={handleSubmit}>
        <h3 className="registerTitle">Provide the room details to update</h3>

        {!removeRooms && (
          <div className="registerDiv">
            <label htmlFor="hotelName">Hotel reference:</label>
            <input
              id="hotelName"
              type="text"
              value={hotel}
              onChange={(e) => setHotel(e.target.value)}
              autoComplete="off"
            />
          </div>
        )}

        <div className="registerDiv">
          <label htmlFor="roomTitle">Room title:</label>
          <input
            id="roomTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="registerDiv">
          <label htmlFor="hotelPrice">Room price:</label>
          <input
            id="hotelPrice"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="registerDiv">
          <label htmlFor="maxPeople">Maximum number of occupants:</label>
          <input
            id="maxPeople"
            type="number"
            value={maxPeople}
            onChange={(e) => setMaxPeople(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="registerDiv">
          <label htmlFor="hotelDesc">Room description:</label>
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
          <label htmlFor="addRoom">Add one or more rooms:</label>
          <input
            id="addRoom"
            type="text"
            value={addRooms}
            onChange={(e) => setAddRooms(e.target.value)}
            autoComplete="off"
          />
        </div>

        {!hotel && (
          <div className="registerDiv">
            <label htmlFor="removeRoom">Remove one or more rooms:</label>
            <input
              id="removeRoom"
              type="text"
              value={removeRooms}
              onChange={(e) => setRemoveRooms(e.target.value)}
              autoComplete="off"
            />
          </div>
        )}

        <button
          className="signUpButton"
          disabled={
            !title &&
            !price &&
            !maxPeople &&
            !description &&
            !addRooms &&
            !removeRooms &&
            !hotel
          }
        >
          Continue
        </button>
      </form>
      {openHotelModal && (
        <>
          <div className="hotelChangeModal">
            <div className="hotelChangeModalContainer">
              <p>
                Changing the hotel reference will cancel all the bookings
                associated with all the rooms listed under this room title.
                Removing a room number will also cancel all the bookings
                associated with that room number. This operation is not
                reversible. Do you wish to continue?
              </p>
              <div>
                <button onClick={() => handleContinue()}>Continue</button>
                <button onClick={() => handleCancel()}>Cancel</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateRoom;
