import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { format } from "date-fns";
import "./getAllBookings.css";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";

//;

const GetMyBookings = () => {
  const runOnce = useRef(false);
  const [bookingsList, setBookingsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosWithInterceptors = useAxiosInterceptors();
  const pathname = location.pathname;

  // console.log('location: ', location)

  useEffect(() => {
    // if (runOnce.current === false) {
    const bookings = async () => {
      setLoading(true);
      setRefresh(false);
      try {
        const resp = await axiosWithInterceptors.get(
          "/api/v1/bookings/mybookings"
        );
        // console.log("my bookings: ", resp.data.data);
        setBookingsList([...resp.data.data]);

        setLoading(false);
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

    bookings();
    // }

    // return () => {
    //   runOnce.current = true;
    // };
  }, [refresh, setRefresh]);

  const showSelectedBooking = (booking_id) => {
    const bookingToDisplay = bookingsList.find(
      (booking) => booking_id === booking._id
    );
    navigate(`/bookings/${booking_id}`, {
      state: { pathname, bookingToDisplay },
    });
  };

  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
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
                      "MMM/dd/yyyy,  hh-mm-ss bbb"
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
            <p>This customer has no booking in the database !!!</p>
          )}
        </>
      )}
    </div>
  );
};

export default GetMyBookings;
