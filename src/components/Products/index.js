import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../App.js";
import "../../styles/styles.css";
import CategoryList from "./components/CategoryList.js";
import CategoryMobileDropdown from "./components/CategoryMobileDropdown.js";
import ProductCard from "./components/ProductCard.js";
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
        let t = [...cartData];
        if (data.response == "Success") {
          const index = cartData
            .map(function (x) {
              return x.id;
            })
            .indexOf(product.id);
          if (index == -1) {
            t.push(product);
          } else {
            t[index].quantity = t[index].quantity + 1;
          }
          setCartData(t);
        }
      })
      .catch((err) => setError(err));
  };

  return (
    <main className="products-container container-padding">
      <aside>
        <CategoryMobileDropdown
          selectedCategory={selectedCategory}
          handleDropdownChange={handleDropdownChange}
          categories={categories}
        />
        <CategoryList
          categories={categories}
          selected={selected}
          selectedCategory={selectedCategory}
          filterProducts={filterProducts}
        />
      </aside>
      <section className="products-box">
        {products && products.length > 0 ? (
          filteredProducts.map((product, key) => (
            <ProductCard product={product} addToCart={addToCart} key={key} />
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
