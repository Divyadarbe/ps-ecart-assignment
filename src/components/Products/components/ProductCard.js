import React from "react";
import "../product.css";

const ProductCard = ({ product, addToCart, key }) => {
  return (
    <div className="product" key={key}>
      <div className="product-name-container">
        <span className="product-name">{product.name}</span>
      </div>
      <div className="image-container">
        <img
          src={process.env.PUBLIC_URL + product.imageURL}
          className="product-image"
        />
        <span className="product-description">{product.description}</span>
      </div>
      <div className="product-mobile-box">
        <img
          src={process.env.PUBLIC_URL + product.imageURL}
          className="product-mobile-image"
        />
        <div>
          <span className="product-mobile-description">
            {product.description}
          </span>
          <button
            className="buy-mobile-button"
            onClick={(e) => addToCart(e, product)}
          >{`Buy Now @Rs. ${product.price}`}</button>
        </div>
      </div>
      <div className="product-footer">
        <button
          className="buy-tablet-button"
          onClick={(e) => addToCart(e, product)}
        >{`Buy Now @Rs. ${product.price}`}</button>
        <span>MRP Rs.{product.price}</span>
        <button className="buy-button" onClick={(e) => addToCart(e, product)}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
