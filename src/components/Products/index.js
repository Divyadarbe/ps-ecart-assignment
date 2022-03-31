import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../App.js";
import "../../styles/styles.css";
import "./product.css";

const Products = () => {
  const { cartData, setCartData } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProducts = async () => {
    await fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          data[i].quantity = 1;
        }
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => setError(err));
  };

  const fetchCategories = async () => {
    await fetch("http://localhost:5000/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((err) => setError(err));
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const filterProducts = (e, id) => {
    e.preventDefault();
    setSelectedCategory(id);
    setSelected(!selected);
    if (!selected) {
      const result = products.filter((p) => p.category === id);
      setFilteredProducts(result);
    } else {
      setFilteredProducts(products);
    }
  };
  const handleDropdownChange = (e) => {
    setSelectedCategory(e.target.value);
    // filterProducts(e, e.target.value);
    if (e.target.value === "All") {
      setFilteredProducts(products);
    } else {
      const result = products.filter((p) => p.category === e.target.value);
      setFilteredProducts(result);
    }
  };

  const addToCart = async (e, product) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ id: product.id }),
    };
    await fetch("http://localhost:5000/addToCart", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.response == "Success") {
          if (cartData.length > 0) {
            for (let i = 0; i < cartData.length; i++) {
              if (cartData[i].id == product.id) {
                cartData[i].quantity = cartData[i].quantity + 1;
                setCartData([...cartData]);
              } else {
                setCartData([...cartData, product]);
              }
            }
          } else {
            setCartData([...cartData, product]);
          }
        } else {
          console.log("error handling");
        }
      })
      .catch((err) => setError(err));
  };

  return (
    <main className="products-container container-padding">
      <aside>
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
      </aside>
      <section className="products-box">
        {products && products.length > 0 ? (
          filteredProducts.map((product, key) => (
            <div className="product" key={key}>
              <div className="product-name-container">
                <span className="product-name">{product.name}</span>
              </div>
              <div className="image-container">
                <img
                  src={process.env.PUBLIC_URL + product.imageURL}
                  className="product-image"
                />
                <span className="product-description">
                  {product.description}
                </span>
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
                <button
                  className="buy-button"
                  onClick={(e) => addToCart(e, product)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1 style={{ fontSize: "4rem", color: "rgb(138, 136, 136)" }}>
              No Products !!
            </h1>
          </div>
        )}
      </section>
    </main>
  );
};

export default Products;
