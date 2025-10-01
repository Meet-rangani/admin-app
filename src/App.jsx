import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Header from "./Components/Header";
import Sidebar from "./Components/sidebar";
import { context } from "./context";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import Cart from "./pages/Cart";
import Admin from "./Admin/Admin";
import AllUsers from "./Admin/All users";
import Product from "./Admin/Product";
import Category from "./Admin/Category";

const App = () => {
  const { islogin, setislogin } = useContext(context);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div>
      {!isAdminRoute && <Header islogin={islogin} setislogin={setislogin} />}

      <div className="d-flex">
        {!isAdminRoute && <Sidebar islogin={islogin} />}
        <div className="flex-grow-2 w-100">
          <Routes>
            <Route>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login setislogin={setislogin} />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
            <Route>
              <Route path="/" element={<Admin />} >
                <Route path="admin/allusers" element={<AllUsers />} />
                <Route path="admin/products" element={<Product />} />
                <Route path="admin/categories" element={<Category />} />
              </Route>
            </Route>
          </Routes>
        </div>  
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
