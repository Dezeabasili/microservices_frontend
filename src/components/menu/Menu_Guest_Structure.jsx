import { NavLink } from "react-router";
import SubMenu from "./SubMenu";

const Menu_Guest_Structure = () => {
  return (
    <div className="navbarMainMenuList">
      <SubMenu />
      <ul>
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

        <li>
          <p>
            <strong>Reviews</strong>
          </p>
        </li>

        <li>
          <NavLink end to={"/reviews"}>
            Get all reviews
          </NavLink>
        </li>

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

export default Menu_Guest_Structure;
