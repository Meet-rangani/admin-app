import { useContext } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { context } from "../context";

function Login() {

  const { handlelogin, login, handlelogindata} = useContext(context)
  
  return (
    <div className="d-flex justify-content-center bg-light align-items-center"> 
      <div className="card shadow-lg p-4" style={{ width: 400, borderRadius: 20, margin: "40px"}}>
        <h2 className="text-center mb-4 fw-bold">Welcome Back 👋</h2>

        {/* Username */}
        <div className="mb-3 input-group">
          <span className="input-group-text bg-white border-end-0">
            <FaUser />
          </span>
          <input type="text" className="form-control border-start-0" value={login.username} name="username" placeholder="Enter username" onChange={handlelogindata} />
        </div>

        {/* Password */}
        <div className="mb-3 input-group">
          <span className="input-group-text bg-white border-end-0">
            <FaLock />
          </span>
          <input type="password" className="form-control border-start-0" value={login.password} name="password" placeholder="Enter password" onChange={handlelogindata} />
        </div>

        {/* Login Button */}
        <button className="btn btn-primary w-100 fw-bold rounded-pill" onClick={handlelogin}>Login</button>
      </div>

    </div>
  );
}

export default Login;
