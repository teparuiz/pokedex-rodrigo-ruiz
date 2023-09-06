import React from "react";

const Input = (props) => {
  const {
    type = "",
    name = "",
    value,
    onChange,
    placeholder = "",
    pattern = "",
    required = false,
  } = props;

  const _onChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <div className="flex flex-col mb-4">
      <input
        type={type}
        name={name}
        value={value}
        onChange={_onChange}
        placeholder={placeholder}
        pattern={pattern}
        required={required}
      />
    </div>
  );
};

export default Input;
