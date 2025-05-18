import "./listYourProp.css";
import React from "react";
import { useNavigate, useLocation } from "react-router";

const ListYourProp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousPage = location.pathname;

  const uploadFilesHere = () => {
    // Specify the types of files, the size limit in MB, and whether its a single or multiple files
    const fileOptions = {
      types: [".txt", ".jpg"],
      sizeLimit: 5,
      number: "multiple",
      previousPage,
    };
    navigate("/uploadfiles", { state: fileOptions });
  };

  return (
    <div className="LYPContainer">
      <button onClick={uploadFilesHere} className="LYPButton">
        List your property
      </button>
    </div>
  );
};

export default ListYourProp;
