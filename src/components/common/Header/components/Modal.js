import React, { useEffect, useState } from "react";
// import "./Modal.css";
import "../../../../styles/styles.css";
import "./modal.css";

const Modal = ({ handleClose, show, cartData, setCartData }) => {
  const [cart_total, setCartTotal] = useState(0);
  const [count, setCount] = useState(0);
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  useEffect(() => {
    let total = 0;
    let cart_count = 0;
    for (let i = 0; i < cartData.length; i++) {
      total = total + cartData[i].quantity * cartData[i].price;
      cart_count = cart_count + cartData[i].quantity;
    }
    setCount(cart_count);
    setCartTotal(total);
  }, [cartData]);

  const handleQtyClick = (e, label, product) => {
    e.preventDefault();
    let d = [...cartData];
    //decr/incr qty, if it is 0 remove it from the cart
    for (let i = 0; i < d.length; i++) {
      if (d[i].id === product.id) {
        if (label == "increase") {
          d[i].quantity = d[i].quantity + 1;
          setCartData(d);
        } else {
          if (d[i].quantity == 1) {
            let res = d.filter((c) => c.id !== product.id);
            setCartData(res);
          } else {
            d[i].quantity = d[i].quantity - 1;
            setCartData(d);
          }
        }
      }
    }
  };
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="cart-header">
          <span className="cart-heading">
            My Cart<span className="count">{`( ${count} items )`}</span>
          </span>
          <button type="button" className="close-icon" onClick={handleClose}>
            X
          </button>
        </div>
        <div className="cart-body">
          {cartData.length > 0 ? (
            cartData.map((c) => (
              <div key={c.id} className="cproduct-container">
                <img
                  src={process.env.PUBLIC_URL + c.imageURL}
                  width="60"
                  height={60}
                  alt={`image`}
                  className="product-image"
                />
                <div className="prouct-details">
                  <span className="cproduct-name">{c.name}</span>
                  <div className="cprice-container">
                    <div>
                      <button
                        className="cbtn"
                        onClick={(e) => handleQtyClick(e, "decrease", c)}
                      >
                        -
                      </button>
                      <span className="cqty">{c.quantity}</span>
                      <button
                        className="cbtn"
                        onClick={(e) => handleQtyClick(e, "increase", c)}
                      >
                        +
                      </button>
                      <span className="cqty"> X Rs.{c.price}</span>
                    </div>
                    <span className="cqty"> {c.price * c.quantity}</span>
                    {/* <span>Rs.{cart_total}</span> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-cart-container">
              {/* <div> */}
              <span className="empty-cart-text1">No items in your cart</span>
              <span className="empty-cart-text2">
                Your favourite items are just a click away
              </span>
              {/* </div> */}
            </div>
          )}
        </div>
        <div className="modal-footer">
          {cartData.length > 0 && (
            <div className="text-center">
              <span>{`Promo code can be applied on payment page `}</span>
            </div>
          )}
          <button className="modal-btn btn-top-margin" onClick={handleClose}>
            {cartData.length > 0 ? (
              <div className="cart-text-box">
                <span>Proceed to checkout</span>
                <span>
                  {cart_total} {`>`}
                </span>
              </div>
            ) : (
              `Start Shopping`
            )}
          </button>
        </div>
      </section>
    </div>
  );
};
export default Modal;
