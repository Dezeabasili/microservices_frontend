import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";

//;

const GetAllUsers = () => {
  const runOnce = useRef(false);
  const [usersList, setUsersList] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosWithInterceptors = useAxiosInterceptors();

  useEffect(() => {
    if (runOnce.current === false) {
      const users = async () => {
        setLoading(true);
        try {
          if (location.state) {
            setUsersList(location.state);
            console.log("location.state: ", location.state);
          } else {
            const resp = await axiosWithInterceptors.get(
              "/api/v1/auth/allusers"
            );
            console.log("users: ", resp.data.data);
            setUsersList([...resp.data.data]);
          }

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

      users();
    }

    return () => {
      runOnce.current = true;
    };
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          {usersList.length > 0 ? (
            <>
              {usersList?.map((user) => (
                <div key={user._id}>
                  <p>
                    User name:{" "}
                    <span style={{ textTransform: "capitalize" }}>
                      {user.name}
                    </span>
                  </p>
                  <p>User email: {user.email}</p>
                  <p>User Ref: {user._id}</p>
                  <br />
                </div>
              ))}
            </>
          ) : (
            <p>No user in the database !!!</p>
          )}
        </>
      )}
    </div>
  );
};

export default GetAllUsers;
