import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Products from "./components/Products";
import SignUp from "./components/Signup";
import "./styles/styles.css";

export const CartContext = createContext();

function App() {
  const [cartData, setCartData] = useState([]);
  return (
    <BrowserRouter>
      <CartContext.Provider value={{ cartData, setCartData }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<SignUp />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
