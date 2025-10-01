import React, { useState } from "react";
import "../App.css";
import { context } from "../context";
import { useContext } from "react";


const images = [
  "/slider-1.jpeg",
  "/slider-2.jpeg",
  "/slider-3.jpeg",
  "/slider-4.jpeg",
  "/slider-5.jpeg",
  "/slider-6.jpeg",
  "/slider-7.jpeg",
  "/slider-8.jpeg",
  "/slider-9.jpeg",
  "/slider-10.jpeg",
  "/slider-11.jpeg",
  "/slider-12.jpeg"
];

export default function Home() {

  const { handlecart } = useContext(context)

  const [index, setIndex] = useState(0);
  const visibleImages = 4;

  const nextSlide = () => {
    if (index < images.length - visibleImages) {
      setIndex(index + 1);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div className="home-container container-fluid mt-3">
      <img src="/Slack background.jpg" alt="Background" className="background-img" />

      <div className="slider-wrapper">
        <button className="slider-prev" onClick={prevSlide}>⬅</button>
        
        <div className="slider-track" style={{ width: `${(images.length / visibleImages) * 100}%`, transform: `translateX(-${(100 / images.length) * index}%)`}} >
          {images.map((src, i) => (
            <div key={i} style={{ position: "relative", width: `${100 / images.length}%`, boxSizing: "border-box" }} >

              <div style={{ position: "relative", height: "250px", overflow: "hidden", borderRadius: "8px" }} >
                <img src={src} alt={`Slide ${i}`} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px", display: "block" }} />
                <button className="cart-btn" onClick={handlecart}> Add to Cart </button>
              </div>
            </div>
          ))}
        </div>

        <button className="slider-next" onClick={nextSlide}>➡</button>
      </div>
    </div>
  );
}
