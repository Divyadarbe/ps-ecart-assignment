import React, { useState } from "react";
import "../../styles/styles.css"

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setData({
      email: "",
      password: "",
    });
  };
  return (
    <div className="login-container">
      <div className="heading-container" >
        <h1 className="heading">Login</h1>
        <p className="description">Get access to your Orders, Wishlist and Recommendations</p>
      </div>
      <form method="post" onSubmit={handleSubmit} className="login-form">
        <div className="text_field">
          <input
            type="email"
            name="email"
            required
            value={data.email}
            onChange={handleDataChange}
          />
          <span></span>
          <label>Email</label>
        </div>
        <div className="text_field">
          <input
            type="password"
            name="password"
            required
            pattern="(?=.*\d)(?=.*[a-zA-Z]).{6,}"
            title="Must contain at least one number and one uppercase or lowercase letter, and at least 6 or more characters"
            value={data.password}
            onChange={handleDataChange}
          />
          <span></span>
          <label>Password</label>
        </div>
        <input type="submit" value="Login" className="login-button" />
      </form>
    </div>
  );
};
export default Login;
