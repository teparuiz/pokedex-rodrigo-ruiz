import React from "react";

const Button = (props) => {
  const {
    name,
    onClick,
    className = "btn btn-secondary",
    icon,
    disabled = false,
  } = props;
  return (
    <div className="flex mt-4">
      <button
        type="submit"
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        <p className="d-flex justify-content-center align-items-center">
          {name}
          {icon ? <i className="material-icons">{icon}</i> : null}
        </p>
      </button>
    </div>
  );
};

export default Button;
