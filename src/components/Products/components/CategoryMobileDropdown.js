import React from "react";
import "../product.css";

const CategoryMobileDropdown = ({
  handleDropdownChange,
  categories,
  selectedCategory,
}) => {
  return (
    <select
      value={selectedCategory}
      onChange={handleDropdownChange}
      className="category-dropdown"
    >
      <option value={`All`}>All</option>
      {categories &&
        categories.length > 0 &&
        categories
          .sort((a, b) => (a.order > b.order ? 1 : -1))
          .map(
            (category, key) =>
              category.order != "-1" && (
                <option key={key} value={category.id}>
                  {category.name}
                </option>
              )
          )}
    </select>
  );
};
export default CategoryMobileDropdown;
