import React from "react";
import "./Banner.css";
const Banner = () => {
  return (
    <div className="w-full">
      <div className="banner">
        <div className="overlay"></div>
        <img
          src="https://preview.colorlib.com/theme/ogani/img/hero/banner.jpg.webp"
          alt="banner"
        />
        <div className="content">
          <span>FRUIT FRESH</span>
          <h1>
            Vegetable <br /> 100% Organic
          </h1>
          <p>Free Pickup and Delivery Avaiable</p>
          <button>SHOP NOW</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
