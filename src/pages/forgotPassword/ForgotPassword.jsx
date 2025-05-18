// import './forgotPassword.css'
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/v1/auth/forgotpassword",
        {
          email,
          token: captchaToken,
        },
        { withCredentials: true }
      );

      // console.log(response.data)
      setCaptchaToken("");
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

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="register">
      <form className="registerContainer" onSubmit={handleSubmit}>
        <h2 className="registerTitle">Password assistance</h2>
        <p>Enter the email address associated with your account.</p>
        <br />
        <div className="registerDiv">
          <label htmlFor="email">e-mail:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
          />
        </div>

        <ReCAPTCHA
          sitekey="6LdNiQUrAAAAAE331enFQI90PHYdi-SKju5_FwOt" // Replace with your site key
          onChange={(token) => setCaptchaToken(token)}
        />

        <button className="signUpButton">Continue</button>
        <button className="signUpButton" onClick={handleCancel}>
          Cancel
        </button>
        <h4>Has your email changed?</h4>
        <p>
          If you no longer use the email address associated with your account,
          you may contact Customer Service for help restoring access to your
          account.
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
