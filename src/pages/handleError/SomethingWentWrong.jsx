import { useNavigate } from "react-router";

const SomethingWentWrong = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <div>
      <h3>Something went wrong</h3>
      <br />
      <h4 onClick={goBack} style={{ cursor: "pointer" }}>
        Go back to Home page
      </h4>
    </div>
  );
};

export default SomethingWentWrong;
