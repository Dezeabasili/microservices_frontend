import { useNavigate, useLocation } from "react-router";
import { format } from "date-fns";
import "./getAllBookings.css";

const SearchBookingsResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingsList = [...location.state?.bookingsToDisplay];

  const pathname = location.pathname;

  const showSelectedBooking = (booking_id) => {
    const bookingToDisplay = bookingsList.find(
      (booking) => booking_id === booking._id
    );
    navigate(`/bookings/${booking_id}`, {
      state: { pathname, bookingToDisplay },
      replace: true,
    });
  };

  return (
    <div>
      {bookingsList.length > 0 ? (
        <>
          {bookingsList?.map((booking) => (
            <div key={booking._id}>
              <p>Booking reference: {booking._id}</p>
              <p>
                Customer name:{" "}
                <span style={{ textTransform: "capitalize" }}>
                  {booking.user_name}
                </span>
              </p>
              <p>
                Hotel name:{" "}
                <span style={{ textTransform: "capitalize" }}>
                  <strong>{booking.hotel_name}</strong>
                </span>
              </p>
              <p>
                Booking date:{" "}
                {format(
                  new Date(booking.createdAt),
                  "MMM/dd/yyyy,  hh:mm:ss bbb"
                )}
              </p>
              <button
                onClick={() => showSelectedBooking(booking._id)}
                style={{ marginTop: "5px" }}
              >
                Show booking details
              </button>
              <br />
              <br />
            </div>
          ))}
        </>
      ) : (
        <p>No booking in the database !!!</p>
      )}
    </div>
  );
};

export default SearchBookingsResults;
