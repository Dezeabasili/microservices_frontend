import "./checkout.css";
import { Link } from "react-router";

const Checkout = () => {
  return (
    <>
      <h4>Thank you for your successful booking </h4>

      <br />

      <Link to={"/"}>Return to the Home page</Link>
    </>
  );
};

export default Checkout;
