import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import "../../../styles/styles.css";

const InputFIeld = ({
  value,
  title,
  pattern,
  handleDataChange,
  label,
  type,
  name,
}) => {
  return (
    <div className="text_field">
      <input
        type={type}
        name={name}
        required
        value={value}
        onChange={handleDataChange}
        title={title}
        pattern={pattern}
      />
      <span></span>
      <label>{label}</label>
    </div>
  );
};
export default InputFIeld;
