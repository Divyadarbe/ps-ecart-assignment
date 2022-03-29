import React, { useState } from "react";
import "../../styles/styles.css";

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      console.log("Passwords don't match");
      //   data.confirmPassword.setCustomValidity("Passwords don't match");
    } else {
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
        <div className="text_field">
          <input
            type="text"
            required
            name="firstName"
            value={data.firstName}
            onChange={handleDataChange}
          />
          <span></span>
          <label>First Name</label>
        </div>
        <div className="text_field">
          <input
            type="text"
            required
            name="lastName"
            value={data.lastName}
            onChange={handleDataChange}
          />
          <span></span>
          <label>Last Name</label>
        </div>
        <div className="text_field">
          <input
            type="email"
            required
            name="email"
            value={data.email}
            onChange={handleDataChange}
          />
          <span></span>
          <label>Email</label>
        </div>
        <div className="text_field">
          <input
            type="password"
            required
            name="password"
            value={data.password}
            onChange={handleDataChange}
            pattern="(?=.*\d)(?=.*[a-zA-Z]).{6,}"
            title="Must contain at least one number and one uppercase or lowercase letter, and at least 6 or more characters"
          />
          <span></span>
          <label>Password</label>
        </div>
        <div className="text_field">
          <input
            type="password"
            pattern="(?=.*\d)(?=.*[a-zA-Z]).{6,}"
            title="Must contain at least one number and one uppercase or lowercase letter, and at least 6 or more characters"
            required
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleDataChange}
          />
          <span></span>
          <label>Confirm Password</label>
        </div>
        <input type="submit" value="Signup" className="login-button" />
      </form>
    </div>
  );
};
export default Signup;
