import React, { useState, useEffect } from "react";
import Carousel from "./components/Carousel";
import { CarouselItem } from "./components/Carousel";
import "../../styles/styles.css";
import "../../styles/mediaQueries.css";

const Home = ({ history }) => {
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    await fetch("http://localhost:5000/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((err) => setError(err));
  };
  const fetchBanners = async () => {
    await fetch("http://localhost:5000/banners")
      .then((response) => response.json())
      .then((data) => setBanners(data))
      .catch((err) => setError(err));
  };
  
  useEffect(() => {
    fetchBanners();
    fetchCategories();
  }, []);

  const handleButtonClick = (e) => {
    e.preventDefault();
    history.push("/products");
  };
  console.log("Cate", categories);
  return (
    <section className="home-container container-padding">
      <div className="carousel-container">
        {banners && banners.length > 0 && (
          <Carousel>
            {banners.map((banner) => (
              <CarouselItem key={banner.id}>
                <img className="carousel-image"
                  src={process.env.PUBLIC_URL + banner.bannerImageUrl}
                  alt="Banner"
                />
              </CarouselItem>
            ))}
          </Carousel>
        )}
      </div>
      {categories &&
        categories.length > 0 &&
        categories.map((category) => (
          <div className="categories-container" key={category.id}>
            <img
              src={process.env.PUBLIC_URL + category.imageUrl}
              // width="250"
              // height="200"
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
        ))}
    </section>
  );
};
export default Home;
