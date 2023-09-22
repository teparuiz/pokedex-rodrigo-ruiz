import React from "react";
import "../../style/spinner.css";

const Spinner = () => {
  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
