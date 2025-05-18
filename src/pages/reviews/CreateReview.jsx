import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";

import Stars from "../../components/starRating/Stars";

const CreateReview = () => {
  const [bookingRef, setBookingRef] = useState();
  const [review, setReview] = useState();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const axiosWithInterceptors = useAxiosInterceptors();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("ratings: ", rating);

      // confirm the booking ref exists
      const resp_01 = await axiosWithInterceptors.post(
        "/api/v1/bookings/findbooking",
        {
          booking_id: bookingRef,
        }
      );

      console.log("1");

      // get the details of the user writing the review
      const resp_02 = await axiosWithInterceptors.get("/api/v1/auth/myaccount");

      console.log("2");

      // check if the customer is the one writing the review
      if (resp_02.data.data._id != resp_01.data.data[0].user) {
        throw new Error("You are not the customer who made the reservation");
      }

      console.log("3");

      const resp = await axiosWithInterceptors.post("/api/v1/reviews", {
        review,
        rating,
        bookingRef,
        hotel: resp_01.data.data[0].hotel,
        hotel_name: resp_01.data.data[0].hotel_name,
        customer: resp_01.data.data[0].user,
        customer_name: resp_01.data.data[0].user_name,
      });
      console.log("4");
      console.log(resp.data.data);
      navigate("/myreviews");
    } catch (err) {
      if (err.response.data.message) {
        navigate("/handleerror", {
          state: {
            message: err.response.data.message,
            path: location.pathname,
          },
        });
      } else if (err.message) {
        navigate("/handleerror", {
          state: {
            message: err.message,
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
        <h3 className="registerTitle">Provide hotel details</h3>

        <div className="registerDiv">
          <label htmlFor="hotelRef">Booking reference:</label>
          <input
            id="hotelRef"
            type="text"
            value={bookingRef}
            onChange={(e) => setBookingRef(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="registerDiv">
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            onChange={(e) => setReview(e.target.value)}
            autoComplete="off"
            rows="5"
            cols="30"
          >
            {review}
          </textarea>
        </div>
        <div className="registerDiv">
          <label htmlFor="rating">Rating:</label>
          <Stars
            rating={rating}
            setRating={setRating}
            hover={hover}
            setHover={setHover}
          />
        </div>

        <button
          className="signUpButton"
          disabled={!review || !rating || !bookingRef}
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

export default CreateReview;
