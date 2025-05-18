import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const password_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const PasswordReset = () => {
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState();
  const [passwordFocus, setPasswordFocus] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState();
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState();
  const [togglePassword, setTogglePassword] = useState(false);
  const [togglePassword2, setTogglePassword2] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { resettoken, user_id } = useParams();

  useEffect(() => {
    setValidPassword(password_REGEX.test(password));
    setValidConfirmPassword(password === confirmPassword);
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/api/v1/auth/resetpassword/${resettoken}/${user_id}`,
        { password },
        { withCredentials: true }
      );

      // console.log(response.data)
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
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

  const tryTogglePassword = () => {
    setTogglePassword((prev) => !prev);
  };

  const tryTogglePassword2 = () => {
    setTogglePassword2((prev) => !prev);
  };

  return (
    <div className="register">
      <form className="registerContainer" onSubmit={handleSubmit}>
        <h1 className="registerTitle">Reset Password</h1>

        <div className="registerDiv">
          <label htmlFor="password">Password:</label>
          <div className="abraham">
            <input
              id="password"
              type={!togglePassword ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <FontAwesomeIcon
              icon={faEye}
              className="headerSearchIcon headerSearchIcon1"
              onClick={tryTogglePassword}
            />
          </div>
          <p
            className={
              passwordFocus && !validPassword
                ? "showInstructions"
                : "hideInstructions"
            }
          >
            Password must contain 8 - 24 characters. <br />
            It must include the following: <br />a lowercase letter, an
            uppercase letter, a number, one of these special characters % ! @ #
            $
          </p>
        </div>
        <div className="registerDiv">
          <label htmlFor="confirmPwd">Confirm Password:</label>
          <div className="abraham">
            <input
              id="confirmPwd"
              type={!togglePassword2 ? "password" : "text"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              onFocus={() => setConfirmPasswordFocus(true)}
              onBlur={() => setConfirmPasswordFocus(false)}
            />
            <FontAwesomeIcon
              icon={faEye}
              className="headerSearchIcon headerSearchIcon1"
              onClick={tryTogglePassword2}
            />
          </div>
          <p
            className={
              confirmPasswordFocus && !validConfirmPassword
                ? "showInstructions"
                : "hideInstructions"
            }
          >
            Passwords must match.
          </p>
        </div>

        <button
          className="signUpButton"
          disabled={!validPassword || !validConfirmPassword}
        >
          Submit new password
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
