import "./login.css";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import axios from "axios";
import { useAuthContext } from "../../context/authContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setAuth, trustThisDevice, setTrustThisDevice, setProfilePhoto } =
    useAuthContext();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/v1/auth/login",
        { username, password },
        { withCredentials: true }
      );

      // console.log(response)
      const accessToken = response.data.accessToken;
      const assignedRoles = response.data.assignedRoles;
      const user_id = response.data.user_id;
      setAuth({ username, password, accessToken, assignedRoles, user_id });
      setProfilePhoto(response.data.profilePhoto);
      setUsername("");
      setPassword("");
      localStorage.setItem("trustThisDevice", JSON.stringify(trustThisDevice));
      localStorage.setItem(
        "profilePhoto",
        JSON.stringify(response.data.profilePhoto)
      );
      navigate(location?.state || "/");
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

  const handleTrustThisDevice = (e) => {
    setTrustThisDevice(e.target.checked);
  };

  return (
    <div className="register">
      <form className="registerContainer" onSubmit={handleSubmit}>
        <h1 className="registerTitle">Sign In</h1>
        <div className="registerDiv">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="off"
          />
        </div>

        <div className="registerDiv">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Link to={"/forgotpassword"}>
          <p>Forgot your password?</p>
        </Link>

        <br />

        <button className="signUpButton">Sign In</button>
        <div>
          <label style={{ marginRight: "10px" }}>Trust this device</label>
          <input
            type="checkbox"
            onChange={handleTrustThisDevice}
            checked={trustThisDevice}
          />
        </div>
        <br />

        <p>Need an Account?</p>
        <Link to={"/register"}>
          <p>
            <strong>Sign Up</strong>
          </p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
