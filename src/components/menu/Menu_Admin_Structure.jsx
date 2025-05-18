import { NavLink } from "react-router";
import SubMenu from "./SubMenu";

const Menu_Admin_Structure = () => {
  return (
    <div className="navbarMainMenuList">
      <SubMenu />
      <ul>
        {/* <li>
          <p>
            <strong>Real time chat</strong>
          </p>
        </li>
        <li>
          <NavLink to={"/realtimechat"}>Open a chat session</NavLink>
        </li>
        <br /> */}
        <li>
          <p>
            <strong>Bookings</strong>
          </p>
        </li>
        <li>
          <NavLink end to={"/bookings"}>
            Get all bookings
          </NavLink>
        </li>

        <li>
          <NavLink end to={"/bookingsforahotel"}>
            Get all bookings for a hotel
          </NavLink>
        </li>

        <li>
          <NavLink to={"/bookings/findbooking"}>
            Find a customer's booking
          </NavLink>
        </li>
        <br />

        <li>
          <p>
            <strong>Hotels</strong>
          </p>
        </li>
        <li>
          <NavLink to={"/createhotel"}>Create a hotel</NavLink>
        </li>
        <li>
          <NavLink end to={"/hotels"}>
            Get all hotels
          </NavLink>
        </li>
        <li>
          <NavLink to={"/hotels/findhotel"}>Find a hotel</NavLink>
        </li>
        <li>
          <NavLink to={"/hotels/countbycity"}>Count hotels by city</NavLink>
        </li>
        <li>
          <NavLink to={"/hotels/countbytype"}>Count hotels by type</NavLink>
        </li>
        <li>
          <NavLink to={"/hotels/createcity"}>Create hotel city</NavLink>
        </li>
        <li>
          <NavLink to={"/hotels/createhoteltype"}>Create hotel type</NavLink>
        </li>
        <li>
          <NavLink to={"/hotels/allcityrefs"}>
            Get all hotel city references
          </NavLink>
        </li>
        <li>
          <NavLink to={"/hotels/allhoteltyperefs"}>
            Get all hotel type references
          </NavLink>
        </li>
        <li>
          <NavLink to={"/hotels/updatecityphoto"}>
            Update hotel city photo
          </NavLink>
        </li>
        <li>
          <NavLink to={"/hotels/updatehoteltypephoto"}>
            Update hotel type photo
          </NavLink>
        </li>
        <br />

        <li>
          <p>
            <strong>Reviews</strong>
          </p>
        </li>
        {/* <li>
          <NavLink to={"/createreview"}>Write a review</NavLink>
        </li> */}
        <li>
          <NavLink end to={"/reviews"}>
            Get all reviews
          </NavLink>
        </li>
        <li>
          <NavLink to={"/reviews/findreview"}>Find a review</NavLink>
        </li>
        <br />

        <li>
          <p>
            <strong>Rooms</strong>
          </p>
        </li>
        <li>
          <NavLink to={"/createroom"}>Create a room</NavLink>
        </li>
        <li>
          <NavLink end to={"/rooms"}>
            Get all rooms
          </NavLink>
        </li>

        <br />

        <li>
          <p>
            <strong>Users</strong>
          </p>
        </li>
        <li>
          <NavLink to={"/register"}>Create a user</NavLink>
        </li>
        <li>
          <NavLink end to={"/users"}>
            Get all users
          </NavLink>
        </li>
        <li>
          <NavLink to={"/users/finduser"}>Find a user</NavLink>
        </li>
        <li>
          <NavLink to={"/users/updateuser"}>Update a user</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Menu_Admin_Structure;
