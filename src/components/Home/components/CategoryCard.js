import React from "react";
import "../home.css";

const CategoryCard = ({ category, handleButtonClick }) => {
  return (
    <div className="categories-container" key={category.id}>
      <img
        src={process.env.PUBLIC_URL + category.imageUrl}
        className="category-product-image"
      />
      <div className="category-description">
        <h3>{category.name}</h3>
        <span>{category.description}</span>
        <button
          className="category-button"
          onClick={handleButtonClick}
        >{`Explore ${category.key}`}</button>
      </div>
    </div>
  );
};
export default CategoryCard;
