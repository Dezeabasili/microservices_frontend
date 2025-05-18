import "./subscription.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const Subscription = () => {
  // const [email, setEmail] = useState("");
  // const [captchaToken, setCaptchaToken] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   if (email == "Thank you for subscribing") {
  //     setEmail("");
  //     return;
  //   }
  //   e.preventDefault();
  //   try {
  //     await axios.post(
  //       "/api/v1/auth/subscriptions",
  //       {
  //         email,
  //         token: captchaToken,
  //       },
  //       { withCredentials: true }
  //     );
  //     setEmail("Thank you for subscribing");
  //   } catch (err) {
  //     navigate("/register");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/subscriptionpage");
  };

  return (
    <div className="subsContainer">
      <h3 className="subsTitle">Save time, save money</h3>
      <p className="subsDecs">
        Sign up and subscribe and we will send the best deals to you
      </p>

      <button className="subsButton" onClick={handleSubmit}>
        Subscribe
      </button>
    </div>
  );
};

export default Subscription;
