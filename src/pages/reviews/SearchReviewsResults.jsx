import { useLocation } from "react-router";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const SearchReviewsResults = () => {
  const location = useLocation();
  const reviewsList = [...location.state?.reviewsToDisplay];

  return (
    <div>
      {reviewsList.length > 0 ? (
        <>
          {reviewsList?.map((review) => {
            const yellowStars = review.rating;
            const whiteStar = 5 - review.rating;

            return (
              <div key={review._id}>
                <p>Review Id: {review._id}</p>
                <p>
                  Hotel name:{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {review.hotel_name}
                  </span>
                </p>
                <p>
                  Customer name:{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {review.customer_name}
                  </span>
                </p>
                <p>
                  Review date:{" "}
                  {format(
                    new Date(review.createdAt),
                    "MMM/dd/yyyy,  hh:mm:ss bbb"
                  )}
                </p>
                <p>Review: {review.review}</p>
                <div>
                  <span>Rating: </span>

                  {[...Array(yellowStars)].map((star, i) => (
                    <FontAwesomeIcon
                      icon={faStar}
                      size="sm"
                      className="fStar"
                      key={i}
                    />
                  ))}

                  {[...Array(whiteStar)].map((star, i) => (
                    <FontAwesomeIcon
                      icon={faStar}
                      size="sm"
                      className="fStarHover"
                      key={i}
                    />
                  ))}
                </div>
                <br />
                <br />
              </div>
            );
          })}
        </>
      ) : (
        <p>No review in the database !!!</p>
      )}
    </div>
  );
};

export default SearchReviewsResults;
