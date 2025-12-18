import { useLocation } from "react-router-dom";

export default function Cart() {
  const location = useLocation();
  const { product } = location.state || {};

  if (!product) return <p>No product selected.</p>;

  return (
    <div className="container py-4">
      <h2>🛒 {product.name}</h2>
      <img src={product.photo} alt={product.name} style={{ width: 250, height: 250, objectFit: "cover" }} />
      <p>{product.description}</p>
      <h5 className="text-success">₹{product.price}</h5>
    </div>
  );
}
