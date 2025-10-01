import { useContext } from "react";
import { context } from "../context";
import { ToastContainer } from "react-toastify";

const Registration = () => {

  const { formdata, handleregisterdata, handleregistersubmit } = useContext(context)

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 ">
          <div className="card shadow-lg p-4 rounded h-100vh">
            <h3 className="text-center mb-4">Registration Form</h3>
            <form onSubmit={handleregistersubmit}>

              <div className="mb-3 d-flex gap-3">
                {/* First Name */}
                <div className="d-flex flex-column flex-grow-1">
                  <label className="form-label">First Name</label>
                  <input type="text" className="form-control" name="fname" value={formdata.fname} onChange={handleregisterdata} required />
                </div>
                {/* Last Name */}
                <div className="d-flex flex-column flex-grow-1">
                  <label className="form-label">Last Name</label>
                  <input type="text" className="form-control" name="lname" value={formdata.lname} onChange={handleregisterdata} required />
                </div>
              </div>
              
              <div className="mb-3 d-flex gap-3">
                {/* Email */}
                <div className="d-flex flex-column flex-grow-1">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control" name="email" value={formdata.email} onChange={handleregisterdata} required />
                </div>
                {/* MMobile No. */}
                <div className="d-flex flex-column flex-grow-1">
                  <label className="form-label">Mobile No.</label>
                  <input type="number" className="form-control" name="phone" value={formdata.phone} onChange={handleregisterdata} required />
                </div>
              </div>
              
              <div className="mb-3 d-flex gap-3">
                {/* Password */}
                <div className="d-flex flex-column flex-grow-1">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" name="password" value={formdata.password} onChange={handleregisterdata} required />
                </div>
                {/* Confirm Password */}
                <div className="d-flex flex-column flex-grow-1">
                  <label className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" name="confirmpassword" value={formdata.confirmpassword} onChange={handleregisterdata} required/>
                </div>
              </div>
              
              {/* Gender */}
              <div className="mb-3">
                <label className="form-label d-block">Gender</label>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="gender" value="Male" checked={formdata.gender === "Male"} onChange={handleregisterdata} required />
                  <label className="form-check-label">Male</label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="gender" value="Female" checked={formdata.gender === "Female"} onChange={handleregisterdata}/>
                  <label className="form-check-label">Female</label>
                </div>
              </div>

              {/* Country */}
              <div className="mb-3">
                <label className="form-label">Country</label>
                <select className="form-select" name="country" onChange={handleregisterdata} required>
                  <option value="" disabled>Select Country</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>

              {/* Terms & Conditions */}
              <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" name="terms" checked={formdata.terms} onChange={handleregisterdata}/>
                <label className="form-check-label">I agree to the Terms & Conditions</label>
              </div>

              {/* Submit */}
              <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registration;
