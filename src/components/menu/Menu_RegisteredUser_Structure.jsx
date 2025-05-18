import { NavLink } from "react-router";
import SubMenu from "./SubMenu";

const Menu_RegisteredUser_Structure = () => {
  return (
    <div className="navbarMainMenuList">
      <SubMenu />
      <ul>
        <li>
          <p>
            <strong>Bookings</strong>
          </p>
        </li>
        <li>
          <NavLink end to={"/mybookings"}>
            Get all my bookings
          </NavLink>
        </li>

        <br />

        <li>
          <p>
            <strong>Hotels</strong>
          </p>
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
        <br />

        <li>
          <p>
            <strong>Reviews</strong>
          </p>
        </li>
        <li>
          <NavLink to={"/createreview"}>Write a review</NavLink>
        </li>
        <li>
          <NavLink to={"/myreviews"}>Get all my reviews</NavLink>
        </li>
        <li>
          <NavLink end to={"/reviews"}>
            Get all reviews
          </NavLink>
        </li>

        <br />

        <li>
          <p>
            <strong>Rooms</strong>
          </p>
        </li>

        <li>
          <NavLink end to={"/rooms"}>
            Get all rooms
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Menu_RegisteredUser_Structure;
