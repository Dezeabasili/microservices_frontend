import { Outlet, Navigate, useLocation } from "react-router";
import { useAuthContext } from "../../context/authContext";

const CheckUserRoles = ({ authorizedRoles }) => {
  const location = useLocation();
  const { auth } = useAuthContext();
  const userRoles = auth?.assignedRoles;

  const desiredDestination = location.pathname;

  // check if user is authorized to view resource
  const result = authorizedRoles.includes(userRoles);

  return (
    <>
      {result ? (
        // user is directed to the desired page if user's role is authorized to view the page
        <Outlet />
      ) : auth?.assignedRoles ? (
        //user is directed to 'unauthorized page' if user is signed in but not authorized to view the desired page
        <Navigate to={"/unauthorized"} state={desiredDestination} replace />
      ) : (
        //user is directed to 'log in' page if user is neither authorized to view the desired page nor signed in
        <Navigate to={"/login"} state={desiredDestination} replace />
      )}
    </>
  );
};

export default CheckUserRoles;
