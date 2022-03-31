import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "./components/Carousel";
import { CarouselItem } from "./components/Carousel";
import url from "../../config.json";
import "../../styles/styles.css";
import "./home.css";

const Home = () => {
  let navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    await fetch(`http://localhost:5000/categories`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((err) => {
        console.log("error message", err);
        setError("Something went wrong");
      });
  };
  const fetchBanners = async () => {
    await fetch(`http://localhost:5000/banners`)
      .then((response) => response.json())
      .then((data) => setBanners(data))
      .catch((err) => {
        console.log("error message", err);
        setError("Something went wrong");
      });
  };

  useEffect(() => {
    fetchBanners();
    fetchCategories();
  }, []);

  const handleButtonClick = (e) => {
    e.preventDefault();
    navigate("/products");
  };

  return (
    <section className="home-container container-padding">
      <div className="carousel-container">
        {banners && banners.length > 0 && (
          <Carousel>
            {banners.map((banner) => (
              <CarouselItem key={banner.id}>
                <img
                  className="carousel-image"
                  src={process.env.PUBLIC_URL + banner.bannerImageUrl}
                  alt="Banner"
                />
              </CarouselItem>
            ))}
          </Carousel>
        )}
      </div>
      {/* categories.sort((a, b) => a.order > b.order ? 1 : -1)  */}
      {categories &&
        categories.length > 0 &&
        categories
          .sort((a, b) => (a.order > b.order ? 1 : -1))
          .map(
            (category) =>
              category.order != "-1" && (
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
              )
          )}
    </section>
  );
};
export default Home;
