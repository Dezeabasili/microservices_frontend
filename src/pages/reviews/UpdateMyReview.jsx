import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";

import Stars from "../../components/starRating/Stars";

const UpdateMyReview = () => {
  const [review, setReview] = useState();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const axiosWithInterceptors = useAxiosInterceptors();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axiosWithInterceptors.patch(
        `/api/v1/reviews/${location.state}`,
        {
          rating,
          review,
        }
      );
      //   console.log(resp.data.data);
      navigate("/myreviews");
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
        <h3 className="registerTitle">Update review</h3>

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

        <button className="signUpButton" disabled={!review && !rating}>
          Continue
        </button>
        <button className="signUpButton" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateMyReview;
