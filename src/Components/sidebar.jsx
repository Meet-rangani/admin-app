import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHome, FaInfoCircle, FaEnvelope, FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { useContext } from "react";
import { context } from "../context";

const Sidebar = () => {

  const { user, open, setOpen } = useContext(context)

  return (
    <div className="bg-dark text-white d-flex flex-column" style={{ width: open ? "220px" : "60px", height: "100vh", transition: "width 0.3s", position: "sticky", top: "56px"}} >
      
      <div className="d-flex justify-content-between align-items-center p-2">
        {open && <h5 className="mb-0">Menu</h5>}
        <button className="btn btn-sm btn-outline-light" onClick={() => setOpen(!open)} style={{ borderRadius: "5px", border: "none" }} > ☰ </button>
      </div>

      <ul className="nav flex-column mt-3 flex-grow-1">
        <li className="nav-item mb-2">
          <Link to="/" className="nav-link text-white d-flex align-items-center">
            <FaHome className="me-2" />
            {open && "Home"}
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/about" className="nav-link text-white d-flex align-items-center">
            <FaInfoCircle className="me-2" />
            {open && "About"}
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/contact" className="nav-link text-white d-flex align-items-center">
            <FaEnvelope className="me-2" />
            {open && "Contact"}
          </Link>
        </li>

        {!user && (
          <>
            <li className="nav-item mb-2">
              <Link to="/login" className="nav-link text-white d-flex align-items-center">
                <FaSignInAlt className="me-2" />
                {open && "Login"}
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/registration" className="nav-link text-white d-flex align-items-center">
                <FaUserPlus className="me-2" />
                {open && "Registration"}
              </Link>
            </li>
          </>
        )}

      </ul>
    </div>
  );
};

export default Sidebar;