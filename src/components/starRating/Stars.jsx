import "./star.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar} from "@fortawesome/free-solid-svg-icons";

const Stars = ({rating, setRating, hover, setHover}) => {
  return (
    <div className="starRatingDiv">
      {[...Array(5)].map((star, i) => {
        const ratedValue = i + 1;
        return (
          <label className="ratingsLabel" key={i}>
            <input
              type="radio"
              name="rating"
              value={ratedValue}
              onClick={() => setRating(ratedValue)}
            />
            <FontAwesomeIcon
              icon={faStar}
              size="sm"
              className={
                ratedValue <= (hover || rating) ? "fStar" : "fStarHover"
              }
              onMouseEnter={() => setHover(ratedValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Stars;
