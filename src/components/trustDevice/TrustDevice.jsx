import "./trustDevice.css";
import { Outlet } from "react-router";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuthContext } from "../../context/authContext";
//;

const TrustDevice = () => {
  const [loading, setLoading] = useState(true);
  const runOnce = useRef(false);
  const { auth, setAuth, trustThisDevice } = useAuthContext();

  useEffect(() => {
    if (runOnce.current === false) {
      const getNewAccessToken = async () => {
        setLoading(true);
        try {
          if (trustThisDevice) {
            const res = await axios.get("/api/v1/auth/renew_access_token", {
              withCredentials: true,
            });
            const accessToken = res.data.accessToken;
            const assignedRoles = res.data.assignedRoles;
            const user_id = res.data.user_id;
            setAuth((prev) => {
              return {
                ...prev,
                accessToken,
                assignedRoles,
                user_id,
              };
            });
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };

      auth.accessToken ? setLoading(false) : getNewAccessToken();
    }

    return () => {
      runOnce.current = true;
    };
  }, []);

  return (
    <>
      {trustThisDevice ? (
        <div className="trustDevice">
          {loading ? (
            // <RotatingLines
            //   visible={true}
            //   height="96"
            //   width="96"
            //   color="grey"
            //   strokeWidth="5"
            //   animationDuration="0.75"
            //   ariaLabel="rotating-lines-loading"
            //   wrapperStyle={{}}
            //   wrapperClass=""
            // />
            <h1>Loading</h1>
          ) : (
            <Outlet />
          )}
        </div>
      ) : (
        <div className="trustDevice">
          <Outlet />
        </div>
      )}
    </>
  );
};

export default TrustDevice;
