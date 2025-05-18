import { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate, useLocation } from "react-router";
import axios from "axios";
import { useAuthContext } from "../../context/authContext";

const Logout = () => {
  const runOnce = useRef(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth, setProfilePhoto } = useAuthContext();

  useEffect(() => {
    if (runOnce.current === false) {
      const signout = async () => {
        try {
          setLoading(true);
          // clear the access token from memory
          setAuth({});
          // clear the cookie
          await axios.get("/api/v1/auth/logout", {
            withCredentials: true,
          });
          localStorage.clear();
          setProfilePhoto("");
          setLoading(false);
        } catch (err) {
          if (err.response.data.message) {
            navigate("/handleerror", {
              state: {
                message: err.response.data.message,
                path: location.pathname,
              },
            });
          } else {
            navigate("/somethingwentwrong");
          }
        }
      };

      signout();
    }

    return () => {
      runOnce.current = true;
    };
  }, []);

  return (
    <div>
      {loading ? <p>You are logged out</p> : <Navigate to={"/login"} replace />}
    </div>
  );
};

export default Logout;
