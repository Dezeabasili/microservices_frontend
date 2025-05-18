import { useNavigate, useLocation } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";

const SearchHotelsResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hotelsList = [...location.state?.hotelsToDisplay];

  const showSelectedHotel = (hotel_id) => {
    const hotelToDisplay = hotelsList.find((hotel) => hotel_id === hotel._id);
    navigate(`/hotels/${hotel_id}`, { state: hotelToDisplay, replace: true });
  };

  return (
    <div>
      {hotelsList.length > 0 ? (
        <>
          {hotelsList?.map((hotel) => {
            const yellowStars = Math.trunc(hotel.ratingsAverage);
            const whiteStar = Math.trunc(5 - hotel.ratingsAverage);
            const halfStar = 5 - yellowStars - whiteStar;

            return (
              <div key={hotel._id}>
                <p>Hotel reference: {hotel._id}</p>
                <p>
                  Hotel name:{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    <strong>{hotel.name}</strong>
                  </span>
                </p>
                {/* <p>
                  Hotel address:{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {hotel.hotelLocation.address}
                  </span>
                </p> */}
                <p>
                  Hotel city:{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {hotel.city.cityName}
                  </span>
                </p>
                <p>
                  Hotel type:{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {hotel.type.hotelType}
                  </span>
                </p>
                <p>Hotel description: {hotel.description}</p>
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

                  {[...Array(halfStar)].map((star, i) => (
                    <FontAwesomeIcon
                      icon={faStarHalfStroke}
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

                <p>Number of ratings: {hotel.numberOfRatings}</p>
                <p>Minimum room price: ${hotel.cheapestPrice}</p>
                <button
                  onClick={() => showSelectedHotel(hotel._id)}
                  style={{ marginTop: "5px" }}
                >
                  Show hotel details
                </button>
                <br />
                <br />
              </div>
            );
          })}
        </>
      ) : (
        <p>No hotel in the database !!!</p>
      )}
    </div>
  );
};

export default SearchHotelsResults;
