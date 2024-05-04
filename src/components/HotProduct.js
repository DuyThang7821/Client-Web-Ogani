import React, { useState, useEffect } from "react";
import "./HotProduct.css";
import icons from "../ultils/icons";

const { MdNavigateNext, GrFormPrevious } = icons;
const HotProduct = () => {
  const productData = [
    {
      imageUrl:
        "https://preview.colorlib.com/theme/ogani/img/latest-product/lp-1.jpg.webp",
      name: "Crab food security",
      price: "$30.00",
    },
    {
      imageUrl:
        "https://preview.colorlib.com/theme/ogani/img/latest-product/lp-2.jpg.webp",
      name: "Crab food security",
      price: "$30.00",
    },
    {
      imageUrl:
        "https://preview.colorlib.com/theme/ogani/img/latest-product/lp-3.jpg.webp",
      name: "Crab food security",
      price: "$30.00",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return productData.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === productData.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };




  return (
    <div className="mb-10 w-full flex flex-auto justify-between">
      <div className="overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="font-bold text-2xl flex items-center">
            Lasted Product
          </div>
          <button className="border">
            <GrFormPrevious size={24} onClick={handlePrev} />
          </button>
          <button className="border">
            <MdNavigateNext size={24} onClick={handleNext} />
          </button>
        </div>
        <div
          style={{
            // animationIterationCount: "infinite",
            // animation: "slide 2s linear infinite",
            display: "flex",
            alignItems: "center",
            transition: "transform 1s ease",
            transform: `translateX(-${currentIndex * 100}%)`,
            whiteSpace: "nowrap",
          }}
        >
          <div className="mt-4">
            <img
              src="https://preview.colorlib.com/theme/ogani/img/latest-product/lp-1.jpg.webp"
              alt="hotprod"
              style={{ marginRight: "15px" }}
            />
          </div>

          <div style={{ marginLeft: "10px" }}>
            <h6>Crab food security</h6>
            <span className="font-bold text-lg">$30.00</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="mt-4">
            <img
              src="https://preview.colorlib.com/theme/ogani/img/latest-product/lp-2.jpg.webp"
              alt="hotprod"
              style={{ marginRight: "15px" }}
            />
          </div>

          <div style={{ marginLeft: "10px" }}>
            <h6>Crab food security</h6>
            <span className="font-bold text-lg">$30.00</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="mt-4">
            <img
              src="https://preview.colorlib.com/theme/ogani/img/latest-product/lp-3.jpg.webp"
              alt="hotprod"
              style={{ marginRight: "15px" }}
            />
          </div>

          <div style={{ marginLeft: "10px" }}>
            <h6>Crab food security</h6>
            <span className="font-bold text-lg">$30.00</span>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div className="font-bold text-2xl flex items-center">
            Lasted Product
          </div>
          <button className="border">
            <GrFormPrevious size={24} />
          </button>
          <button className="border">
            <MdNavigateNext size={24} />
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="mt-4">
            <img
              src="https://preview.colorlib.com/theme/ogani/img/latest-product/lp-1.jpg.webp"
              alt="hotprod"
              style={{ marginRight: "15px" }}
            />
          </div>

          <div style={{ marginLeft: "10px" }}>
            <h6>Crab food security</h6>
            <span className="font-bold text-lg">$30.00</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="mt-4">
            <img
              src="https://preview.colorlib.com/theme/ogani/img/latest-product/lp-2.jpg.webp"
              alt="hotprod"
              style={{ marginRight: "15px" }}
            />
          </div>

          <div style={{ marginLeft: "10px" }}>
            <h6>Crab food security</h6>
            <span className="font-bold text-lg">$30.00</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="mt-4">
            <img
              src="https://preview.colorlib.com/theme/ogani/img/latest-product/lp-3.jpg.webp"
              alt="hotprod"
              style={{ marginRight: "15px" }}
            />
          </div>

          <div style={{ marginLeft: "10px" }}>
            <h6>Crab food security</h6>
            <span className="font-bold text-lg">$30.00</span>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div className="font-bold text-2xl flex items-center">
            Lasted Product
          </div>
          <button className="border">
            <GrFormPrevious size={24} />
          </button>
          <button className="border">
            <MdNavigateNext size={24} />
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="mt-4">
            <img
              src="https://preview.colorlib.com/theme/ogani/img/latest-product/lp-1.jpg.webp"
              alt="hotprod"
              style={{ marginRight: "15px" }}
            />
          </div>

          <div style={{ marginLeft: "10px" }}>
            <h6>Crab food security</h6>
            <span className="font-bold text-lg">$30.00</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="mt-4">
            <img
              src="https://preview.colorlib.com/theme/ogani/img/latest-product/lp-2.jpg.webp"
              alt="hotprod"
              style={{ marginRight: "15px" }}
            />
          </div>

          <div style={{ marginLeft: "10px" }}>
            <h6>Crab food security</h6>
            <span className="font-bold text-lg">$30.00</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="mt-4">
            <img
              src="https://preview.colorlib.com/theme/ogani/img/latest-product/lp-3.jpg.webp"
              alt="hotprod"
              style={{ marginRight: "15px" }}
            />
          </div>

          <div style={{ marginLeft: "10px" }}>
            <h6>Crab food security</h6>
            <span className="font-bold text-lg">$30.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotProduct;
