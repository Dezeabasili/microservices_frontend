import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";

const FindBooking = () => {
  // const [email, setEmail] = useState();
  const [bookingRef, setBookingRef] = useState();
  const axiosWithInterceptors = useAxiosInterceptors();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axiosWithInterceptors.post(
        "/api/v1/bookings/findbooking",
        { booking_id: bookingRef }
      );
      console.log(resp.data.data);
      const bookingsToDisplay = [...resp.data.data];
      navigate(`/searchbookingsresults`, {
        state: { pathname, bookingsToDisplay },
      });
    } catch (err) {
      if (err.response?.data?.message) {
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

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="register">
      <form className="registerContainer" onSubmit={handleSubmit}>
        <h3 className="registerTitle">
          Provide your booking reference or email address
        </h3>

        <div className="registerDiv">
          <label htmlFor="bookingRef">Booking reference:</label>
          <input
            id="bookingRef"
            type="text"
            value={bookingRef}
            onChange={(e) => setBookingRef(e.target.value)}
            autoComplete="off"
          />
        </div>
        {/* <div className="registerDiv">
          <label htmlFor="emailAddress">
            Customer's registered email address:
          </label>
          <input
            id="emailAddress"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </div> */}

        <button className="signUpButton" disabled={!bookingRef}>
          Continue
        </button>
        <button className="signUpButton" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default FindBooking;
