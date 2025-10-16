import { useContext, useState } from "react";
import { context } from "../context";

export default function Product() {

  const { products, popupref, handlepopup, showPopup, cancelpopup, addproduct, handleproduct, deleteproduct, productdata, editproduct, handlesearch, handlephoto } = useContext(context)

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
        <h2 className="fw-bold text-primary">Products</h2>
        <div className="d-flex gap-3 align-items-center">
          <input type="search" placeholder="Search products..." className="form-control shadow-sm" style={{ width: "250px" }} onChange={handlesearch}/>
          <button className="btn btn-success px-4 shadow-sm" onClick={handlepopup}>+ Add Product</button>
        </div>
      </div>

      <div className="shadow-sm rounded-3 overflow-hidden">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-success text-center">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price (₹)</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products.map((product) =>(
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td><img src={"product.photo"} style={{ width: "80px", height: "80px", objectFit: "cover" }}/></td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => editproduct(product._id)}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => deleteproduct(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`popupBox ${showPopup ? "active" : ""}`} ref={popupref}>
        <div className="card">
          <div className="text-center border rounded mb-2" style={{height: "100px", width: "100px"}}>
            <p className="justify-center" onClick={handlephoto}>Select Photo</p>
          </div>
          <input type="text" placeholder="Product Name" className="form-control mb-2" name="name" onChange={handleproduct} value={productdata.name}/>
          <input type="text" placeholder="Description" className="form-control mb-2" name="description" onChange={handleproduct} value={productdata.description}/>
          <input type="number" placeholder="Price" className="form-control mb-2" name="price" onChange={handleproduct} value={productdata.price}/>
          <input type="file" title="Choose a video please" className="form-control mb-2" name="photo" multiple onChange={handleproduct} value={productdata.photo}/>
          <div className="d-flex justify-content-end gap-2 mt-2">
            <button className="btn btn-secondary" onClick={cancelpopup}> Cancel </button>
            <button className="btn btn-success" onClick={addproduct}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}