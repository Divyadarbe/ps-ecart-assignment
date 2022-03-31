import React, { useState } from "react";
import InputFIeld from "../common/InputField";
import "../../styles/styles.css";

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const handleDataChange = (e) => {
    if (e.target.name === "password" || e.target.name == "confirmPassword") {
      setShowError(false);
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      console.log("Passwords don't match");
      setError("Passwords don't match!!");
      setShowError(true);
    } else {
      setShowError(false);
      setData({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
      });
    }
  };
  return (
    <div className="login-container">
      <div className="heading-container">
        <h1 className="heading">Signup</h1>
        <p className="description">
          We do not share your personal details with anyone.
        </p>
      </div>
      <form method="post" onSubmit={handleSubmit} className="login-form">
        <InputFIeld
          name="firstName"
          type={`text`}
          value={data.firstName}
          handleDataChange={handleDataChange}
          label={`First Name`}
        />
        <InputFIeld
          name="lastName"
          type={`text`}
          value={data.lastName}
          handleDataChange={handleDataChange}
          label={`Last Name`}
        />
        <InputFIeld
          name="email"
          type={`email`}
          value={data.email}
          handleDataChange={handleDataChange}
          label={`Email`}
        />
        <InputFIeld
          name="password"
          type={`password`}
          value={data.password}
          handleDataChange={handleDataChange}
          label={`Password`}
          pattern="(?=.*\d)(?=.*[a-zA-Z]).{6,}"
          title="Must contain at least one number and one uppercase or lowercase letter, and at least 6 or more characters"
        />
        <InputFIeld
          name="confirmPassword"
          type={`password`}
          value={data.confirmPassword}
          handleDataChange={handleDataChange}
          label={`Confirm Password`}
          pattern="(?=.*\d)(?=.*[a-zA-Z]).{6,}"
          title="Must contain at least one number and one uppercase or lowercase letter, and at least 6 or more characters"
        />
        {showError && (
          <span style={{ fontSize: "14px", marginBottom: "5px" }}>{error}</span>
        )}
        <input type="submit" value="Signup" className="login-button" />
      </form>
    </div>
  );
};
export default Signup;
