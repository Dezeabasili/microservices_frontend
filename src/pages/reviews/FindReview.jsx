import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";

const FindReview = () => {
  const [review_id, setReview_id] = useState();

  const axiosWithInterceptors = useAxiosInterceptors();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axiosWithInterceptors.get(
        `/api/v1/reviews?review_id=${review_id}`
      );
      console.log(resp.data.data);
      const reviewsToDisplay = [...resp.data.data];
      navigate("/searchreviewsresults", { state: { reviewsToDisplay } });
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

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="register">
      <form className="registerContainer" onSubmit={handleSubmit}>
        <h3 className="registerTitle">Provide the review id</h3>

        <div className="registerDiv">
          <label htmlFor="review_id">Review Id:</label>
          <input
            id="review_id"
            type="text"
            value={review_id}
            onChange={(e) => setReview_id(e.target.value)}
            autoComplete="off"
          />
        </div>

        <button className="signUpButton" disabled={!review_id}>
          Continue
        </button>
        <button className="signUpButton" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default FindReview;
