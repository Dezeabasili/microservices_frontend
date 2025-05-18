import { NavLink } from "react-router";
import { useAuthContext } from "../../context/authContext";
import useWindowSize from "../../hooks/useWindowSize";

const SubMenu = () => {
  const { auth } = useAuthContext();
  const screenSize = useWindowSize();
  return (
    <>
      {screenSize.width <= 570 && (
        <>
          <ul>
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>

            {!auth.accessToken && (
              <li>
                <NavLink to={"/login"}>Sign in</NavLink>
              </li>
            )}

            {!auth.accessToken && (
              <li>
                <NavLink to={"/register"}>Sign up</NavLink>
              </li>
            )}

            {auth.accessToken && (
              <li>
                <NavLink to={"/logout"}>Log out</NavLink>
              </li>
            )}

            {auth.accessToken && (
              <li>
                <NavLink to={"/users/myaccount"}>My account</NavLink>
              </li>
            )}
          </ul>
          <br />
        </>
      )}
    </>
  );
};

export default SubMenu;
