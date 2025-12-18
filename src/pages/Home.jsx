import { useState, useEffect, useContext } from "react";
import "../App.css";
import { context } from "../context";
import axios from "axios";

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
  "/slider-12.jpeg",
];

export default function Home() {
  const { handlecart } = useContext(context);

  const [index, setIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [prodIndex, setProdIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(4);

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth <= 600) setVisibleImages(1);
      else if (window.innerWidth <= 992) setVisibleImages(2);
      else setVisibleImages(4);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products") 
      .then((res) => {
        setProducts(res.data.products || res.data); 
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // const nextSlide = () => {
  //   if (index < images.length - visibleImages) setIndex(index + 1);
  // };
  // const prevSlide = () => {
  //   if (index > 0) setIndex(index - 1);
  // };

  const nextProdSlide = () => {
    if (prodIndex < products.length - visibleImages) setProdIndex(prodIndex + 1);
  };
  const prevProdSlide = () => {
    if (prodIndex > 0) setProdIndex(prodIndex - 1);
  };

  return (
    <div className="home-container container-fluid mt-3">
      <img src="/Slack background.jpg" alt="Background" className="background-img" />

      {/* <div className="slider-wrapper">
        <button className="slider-prev" onClick={prevSlide}>⬅</button>
        <div className="slider-track" style={{ width: `${(images.length / visibleImages) * 100}%`, transform: `translateX(-${(100 / images.length) * index}%)`, }} >
          {images.map((src, i) => (
            <div key={i} style={{ position: "relative", width: `${100 / images.length}%`, boxSizing: "border-box", }} >
              <div style={{ position: "relative", height: "250px", overflow: "hidden", borderRadius: "8px", }} >
                <img src={src} alt={`Slide ${i}`} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px", display: "block", }} />
                <button className="cart-btn" onClick={handlecart}>  Add to Cart </button>
              </div>
            </div>
          ))}
        </div>
        <button className="slider-next" onClick={nextSlide}>➡</button>
      </div>
       */}

      <div className="slider-wrapper mb-5">
        <button className="slider-prev" onClick={prevProdSlide}>⬅</button>

        <div className="slider-track" style={{transform: `translateX(-${(100 / visibleImages) * prodIndex}%)`, }} >
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} style={{ flex: `0 0 calc(${100 / visibleImages}%)`, boxSizing: "border-box" }} >
                <div style={{ position: "relative", height: "auto", overflow: "hidden", borderRadius: "8px", }} >
                  <img src={product.photo || "/car.jpeg"} alt={product.name} style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "8px", }} />
                  <div className="p-3"> 
                    <p>Name: {product.name}</p>
                    <p>Description: {product.description}</p>
                    <p>Price: {product.price}</p>
                  </div>
                  <button className="cart-btn" onClick={() => handlecart(product)} > Add to Cart </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", width: "100%" }}>Loading products...</p>
          )}
        </div>

        <button className="slider-next" onClick={nextProdSlide}>➡</button>
      </div>
    </div>
  );
}
