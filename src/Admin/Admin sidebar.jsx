import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {FaBoxOpen, FaSignOutAlt, FaTags, FaUsers } from "react-icons/fa";
import { useContext } from "react";
import { context } from "../context";

const AdminSidebar = () => {

  const { open, setOpen, handlelogout } = useContext(context)

  return (
    <div className="bg-dark text-white d-flex flex-column" style={{ width: open ? "220px" : "60px", height: "100vh", transition: "width 0.3s", position: "sticky", top: "56px"}} >
      
      <div className="d-flex justify-content-between align-items-center p-2">
        {open && <h5 className="mb-0">Menu</h5>}
        <button className="btn btn-sm btn-outline-light" onClick={() => setOpen(!open)} style={{ borderRadius: "5px", border: "none" }} > ☰ </button>
      </div>

      <ul className="nav flex-column mt-3 flex-grow-1">
        <li className="nav-item mb-2">
          <Link to="/admin/allusers" className="nav-link text-white d-flex align-items-center">
            <FaUsers className="me-2" />
            {open && "All Users"}
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/products" className="nav-link text-white d-flex align-items-center">
            <FaBoxOpen className="me-2" />
            {open && "Product"}
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/categories" className="nav-link text-white d-flex align-items-center">
            <FaTags className="me-2" />
            {open && "Category"}
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/login" className="nav-link text-white d-flex align-items-center" onClick={handlelogout}>
            <FaSignOutAlt className="me-2" />
            {open && "Logout"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;