import React from "react";
import "../product.css";

const CategoryList = ({
  categories,
  filterProducts,
  selected,
  selectedCategory,
}) => {
  return (
    <nav className="products-sidebar">
      <ul className="pcategories-container">
        {categories &&
          categories.length > 0 &&
          categories
            .sort((a, b) => (a.order > b.order ? 1 : -1))
            .map(
              (category, key) =>
                category.order != "-1" && (
                  <li key={key}>
                    <button
                      key={category.id}
                      className={
                        selectedCategory == category.id && selected
                          ? `isActiveBtn`
                          : `category-btn`
                      }
                      onClick={(e) => {
                        filterProducts(e, category.id);
                      }}
                    >
                      {category.name}
                    </button>
                  </li>
                )
            )}
      </ul>
    </nav>
  );
};
export default CategoryList;
