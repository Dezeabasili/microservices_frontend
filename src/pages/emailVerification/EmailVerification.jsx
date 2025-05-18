import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import axios from "axios";
// import ReCAPTCHA from "react-google-recaptcha";

const EmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const { user_id } = useParams();
  //   const [captchaToken, setCaptchaToken] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/v1/auth/verifyemail",
        {
          user_id,
          verificationCode,
          //   token: captchaToken,
        },
        { withCredentials: true }
      );

      // console.log(response.data)
      //   setCaptchaToken("");
      navigate("/login", { replace: true });
    } catch (err) {
      if (err.response.data.message) {
        navigate("/handleerror", {
          state: {
            message: err.response.data.message,
            path: location.pathname,
          },
          replace: true,
        });
      } else {
        navigate("/somethingwentwrong", { replace: true });
      }
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="register">
      {/* <ReCAPTCHA
        sitekey="6LdNiQUrAAAAAE331enFQI90PHYdi-SKju5_FwOt" // Replace with your site key
        onChange={(token) => setCaptchaToken(token)}
      /> */}
      <form className="registerContainer" onSubmit={handleSubmit}>
        <h2 className="registerTitle">Email Verification</h2>
        <p>Enter the email verification code sent to your email</p>
        <br />
        <div className="registerDiv">
          <label htmlFor="verificationCode">e-mail verification code:</label>
          <input
            id="verificationCode"
            type="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
            autoComplete="off"
          />
        </div>

        <button className="signUpButton">Continue</button>
        <button className="signUpButton" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EmailVerification;
