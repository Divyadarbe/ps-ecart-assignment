import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../App.js";
import "../../styles/styles.css";
import "../../styles/mediaQueries.css";

const Products = () => {
  const { cartData, setCartData } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(false);
  const [selectedCategory] = useState("");

  const fetchProducts = async () => {
    await fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          data[i].quantity = 1;
        }
        setProducts(data);
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

  const filterProducts = (id) => {
    setSelected(!selected);
    if (selected) {
      const result = products.filter((p) => p.category === id);
      setProducts(result);
    } else {
      fetchProducts();
    }
  };
  const handleDropdownChange = (e) => {};

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
                console.log("&&&&&&&&&&", cartData[i].quantity);
                cartData[i].quantity = cartData[i].quantity + 1;
                console.log(cartData);
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
        <select value={selectedCategory} onChange={handleDropdownChange} className="category-dropdown">
          {categories &&
            categories.map((category, key) => (
              <option key={key} value={category.id}>{category.name}</option>
            ))}
        </select>
        <nav className="products-sidebar">
          <ul className="pcategories-container">
            {categories &&
              categories.length > 0 &&
              categories.map((category, key) => (
                <li key={key}>
                  <button
                    key={category.id}
                    className="category-btn"
                    onClick={() => {
                      filterProducts(category.id);
                    }}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
          </ul>
        </nav>
      </aside>
      <section className="products-box">
        {products &&
          products.length > 0 &&
          products.map((product, key) => (
            <div className="product" key={key}>
              <div className="product-name-container">
                <span className="product-name">{product.name}</span>
              </div>
              <div className="image-container">
                <img
                  src={process.env.PUBLIC_URL + product.imageURL}
                  // width="200"
                  // height="200"
                  className="product-image"
                />

                <span className="product-description">
                  {product.description}
                </span>
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
          ))}
      </section>
    </main>
  );
};

export default Products;
