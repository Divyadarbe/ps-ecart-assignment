import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../App.js";
import Modal from "./components/Modal";
import { FaShoppingCart } from "react-icons/fa";
// import "./style.css";
import "../../../styles/styles.css";
import "./header.css";

const Header = () => {
  const { cartData, setCartData } = useContext(CartContext);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let cart_count = 0;
    for (let i = 0; i < cartData.length; i++) {
      cart_count = cart_count + cartData[i].quantity;
    }
    setCount(cart_count);
  }, [cartData]);

  const showModal = () => {
    setShow(true);
  };
  const hideModal = () => {
    setShow(false);
  };
  return (
    <header className="container-padding">
      <nav className="header-menu">
        <Link to="/">
          <img
            className="logo"
            src={process.env.PUBLIC_URL + `/static/images/logo_2x.png`}
            alt="SabkaBazar"
          />
        </Link>
        <div className="menu-container">
          <div className="menu-left">
            <Link className="nav-item" to="/">
              Home
            </Link>
            <Link className="nav-item" to="/products">
              Products
            </Link>
          </div>
          <div className="menu-right">
            <div className="menu-right-container">
              <Link
                className="nav-item-signin nav-item-signin-right"
                to="/login"
              >
                SignIn
              </Link>
              <Link className=" nav-item-signin" to="/signup">
                Register
              </Link>
            </div>
            <button className="cart-button" onClick={showModal}>
              <FaShoppingCart className="cart-icon" /> {count} items
            </button>
          </div>
        </div>
      </nav>
      <Modal
        show={show}
        handleClose={hideModal}
        cartData={cartData}
        setCartData={setCartData}
      ></Modal>
    </header>
  );
};
export default Header;
