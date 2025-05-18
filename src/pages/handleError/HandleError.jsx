import { useNavigate, useLocation } from "react-router";

const HandleError = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <p>{location.state.message}</p>
      <br />
      <h4 onClick={goBack} style={{ cursor: "pointer" }}>
        Go back to previous page
      </h4>
    </div>
  );
};

export default HandleError;
