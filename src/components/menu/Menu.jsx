import "./menu.css";
import { Outlet } from "react-router";
import { useAuthContext } from "../../context/authContext";
import Menu_RegisteredUser from "./Menu_RegisteredUser";
import Menu_Admin from "./Menu_Admin";
import Menu_Guest from "./Menu_Guest";

const Menu = () => {
  const { auth } = useAuthContext();

  const menuSelector = () => {
    if (auth.assignedRoles == 2010) {
      return (
        <div className="container2">
          <Menu_RegisteredUser />
        </div>
      );
    } else if (auth.assignedRoles == 2030) {
      return (
        <div className="container2">
          <Menu_Admin />
        </div>
      );
    } else {
      return (
        <div className="container2">
          <Menu_Guest />
        </div>
      );
    }
  };

  return (
    <>
      {menuSelector()}
      <div className="container3">
        <Outlet />
      </div>
    </>
  );
};

export default Menu;
