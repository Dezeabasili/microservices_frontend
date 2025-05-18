import { useLocation, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";

//;

const GetUser = () => {
  const runOnce = useRef(false);
  const [loading, setLoading] = useState(true);
  const [userToDisplay, setUserToDisplay] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosWithInterceptors = useAxiosInterceptors();

  useEffect(() => {
    if (runOnce.current === false) {
      const displayUser = async () => {
        setLoading(true);

        if (location.state) {
          setUserToDisplay(location.state);

          setLoading(false);
        }
      };
      displayUser();
    }

    return () => {
      runOnce.current = true;
    };
  }, []);

  const deleteThisUser = async () => {
    try {
      await axiosWithInterceptors.delete(`/api/v1/auth/${userToDisplay._id}`);
      navigate("/users");
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

  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <p>
            User name:{" "}
            <span style={{ textTransform: "capitalize" }}>
              {userToDisplay.name}
            </span>
          </p>
          <p>User email: {userToDisplay.email}</p>
          <br />
          <button
            onClick={() => {
              deleteThisUser();
            }}
          >
            Delete this user
          </button>
        </>
      )}
    </div>
  );
};

export default GetUser;
