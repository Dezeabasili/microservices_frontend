import { Routes, Route } from "react-router";
import Home from "./pages/home/Home.jsx";
import Register from "./pages/register/Register";
import EmailVerification from "./pages/emailVerification/EmailVerification.jsx";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/Logout";
import CheckUserRoles from "./components/checkUserRoles/CheckUserRoles";
import Unauthorized from "./pages/unauthorized/Unauthorized";
import TrustDevice from "./components/trustDevice/TrustDevice";
import UploadMultipleFiles from "./pages/uploadFile/UploadMultipleFiles";
import SubscriptionPage from "./pages/subscription/SubscriptionPage.jsx";
import MyAccount from "./pages/myAccount/MyAccount";
import Checkout from "./pages/checkout/Checkout";
import CancelOrder from "./pages/cancel/Cancel";
import NotFound from "./pages/notFound/NotFound";
import Navbar from "./components/navbar/Navbar";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import PasswordReset from "./pages/passwordReset/PasswordReset";
import ChangePassword from "./pages/changePassword/ChangePassword";
import UpdateMyDetails from "./pages/updateMyDetails/UpdateMyDetails";
import Menu from "./components/menu/Menu";
import GetAllBookings from "./pages/bookings/GetAllBookings";
import GetBooking from "./pages/bookings/GetBooking";
import FindBooking from "./pages/bookings/FindBooking";
import CreateHotel from "./pages/hotelPage/CreateHotel";
import GetAllHotels from "./pages/hotelPage/GetAllHotels";
import GetHotel from "./pages/hotelPage/GetHotel";
import FindHotel from "./pages/hotelPage/FindHotel";
import UpdateHotel from "./pages/hotelPage/UpdateHotel";
import CountHotelsByCities from "./pages/hotelPage/CountHotelsByCities";
import CountHotelsByTypes from "./pages/hotelPage/CountHotelsByType";
import CreateReview from "./pages/reviews/CreateReview";
import GetAllReviews from "./pages/reviews/GetAllReviews";
import FindReview from "./pages/reviews/FindReview";
import GetAllUsers from "./pages/users/GetAllUsers";
import CreateRoom from "./pages/rooms/CreateRoom";
import GetAllRooms from "./pages/rooms/GetAllRooms";
import GetRoom from "./pages/rooms/GetRoom";
import UpdateRoom from "./pages/rooms/UpdateRoom";
import FindUser from "./pages/users/FindUser";
import GetUser from "./pages/users/GetUser";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";
import UpdateUser from "./pages/users/UpdateUser";
import GetMyBookings from "./pages/bookings/GetMyBookings";
import ListYourProp from "./components/listYourProp/ListYourProp";
import MyReviews from "./pages/reviews/MyReviews";
import CreateHotelCity from "./pages/hotelPage/CreateHotelCity";
import CreateHotelType from "./pages/hotelPage/CreateHotelType";
import GetAllHotelCityRefs from "./pages/hotelPage/GetAllHotelCityRefs";
import GetAllHotelTypesRef from "./pages/hotelPage/GetAllHotelTypesRef";
import UpdateCityPhoto from "./pages/hotelPage/UpdateCityPhoto";
import UpdateHotelTypePhoto from "./pages/hotelPage/UpdateHotelTypePhoto";
import HandleError from "./pages/handleError/HandleError";
import SomethingWentWrong from "./pages/handleError/SomethingWentWrong";
import UpdateMyReview from "./pages/reviews/UpdateMyReview";
import GetAllBookingsForAHotel from "./pages/bookings/GetAllBookingsForAHotel";
import SearchBookingsResults from "./pages/bookings/SearchBookingsResults";
import SearchHotelsResults from "./pages/hotelPage/SearchHotelsResults";
import SearchReviewsResults from "./pages/reviews/SearchReviewsResults";
import RealTimeChat from "./pages/realTimeChats/RealTimeChat";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route element={<TrustDevice />}>
          <Route element={<Menu />}>
            <Route path="/" element={<Home />} />
            <Route path="/handleerror" element={<HandleError />} />
            <Route
              path="/somethingwentwrong"
              element={<SomethingWentWrong />}
            />
            <Route path="register" element={<Register />} />
            <Route
              path="emailverification/:user_id"
              element={<EmailVerification />}
            />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="subscriptionpage" element={<SubscriptionPage />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="checkout-success" element={<Checkout />} />
            <Route path="cancel-order" element={<CancelOrder />} />
            <Route path="listproperty" element={<ListYourProp />} />
            <Route path="hotels" element={<GetAllHotels />} />
            <Route path="hotels/:hotel_id" element={<GetHotel />} />
            <Route path="hotels/findhotel" element={<FindHotel />} />
            <Route
              path="searchhotelsresults"
              element={<SearchHotelsResults />}
            />
            <Route
              path="hotels/countbycity"
              element={<CountHotelsByCities />}
            />
            <Route path="hotels/countbytype" element={<CountHotelsByTypes />} />
            <Route path="rooms" element={<GetAllRooms />} />
            <Route path="rooms/:room_id" element={<GetRoom />} />
            <Route path="reviews" element={<GetAllReviews />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route
              path="resetpassword/:resettoken/:user_id"
              element={<PasswordReset />}
            />

            <Route
              element={<CheckUserRoles authorizedRoles={[2010, 2020, 2030]} />}
            >
              <Route path="bookings/:booking_id" element={<GetBooking />} />
              <Route path="reviews/findreview" element={<FindReview />} />
              <Route
                path="searchreviewsresults"
                element={<SearchReviewsResults />}
              />
              <Route path="changepassword" element={<ChangePassword />} />
              <Route path="updatemyaccount" element={<UpdateMyDetails />} />
              <Route path="hotelslist" element={<List />} />
              <Route path="hotels/:hotel_id/all" element={<Hotel />} />
              <Route path="users/myaccount" element={<MyAccount />} />
              <Route path="uploadfiles" element={<UploadMultipleFiles />} />
              <Route path="realtimechat" element={<RealTimeChat />} />
            </Route>

            <Route element={<CheckUserRoles authorizedRoles={[2010]} />}>
              <Route path="mybookings" element={<GetMyBookings />} />
              <Route path="myreviews" element={<MyReviews />} />
              <Route path="createreview" element={<CreateReview />} />
              <Route path="updatemyreview" element={<UpdateMyReview />} />
            </Route>

            <Route element={<CheckUserRoles authorizedRoles={[2030]} />}>
              <Route path="bookings" element={<GetAllBookings />} />
              <Route
                path="bookingsforahotel"
                element={<GetAllBookingsForAHotel />}
              />
              <Route
                path="searchbookingsresults"
                element={<SearchBookingsResults />}
              />
              <Route path="bookings/findbooking" element={<FindBooking />} />
              <Route path="createhotel" element={<CreateHotel />} />
              <Route path="hotels/updatehotel" element={<UpdateHotel />} />
              <Route
                path="hotels/createhoteltype"
                element={<CreateHotelType />}
              />
              <Route path="hotels/createcity" element={<CreateHotelCity />} />
              <Route
                path="hotels/allcityrefs"
                element={<GetAllHotelCityRefs />}
              />
              <Route
                path="hotels/allhoteltyperefs"
                element={<GetAllHotelTypesRef />}
              />
              <Route
                path="hotels/updatecityphoto"
                element={<UpdateCityPhoto />}
              />
              <Route
                path="hotels/updatehoteltypephoto"
                element={<UpdateHotelTypePhoto />}
              />
              <Route path="createroom" element={<CreateRoom />} />
              <Route path="rooms/updateroom" element={<UpdateRoom />} />
              <Route path="users" element={<GetAllUsers />} />
              <Route path="users/finduser" element={<FindUser />} />
              <Route path="users/updateuser" element={<UpdateUser />} />
              <Route path="users/getuser" element={<GetUser />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
