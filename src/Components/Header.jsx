import { FaFacebookF, FaYoutube, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"
import { useContext } from "react";
import { context } from "../context";
import Avatar from "react-avatar";
import Logo from "../../public/slack.png"

const Header = () => {

  const{ handlelogout, display, setdisplay, handleprofile, dropdownRef ,user} = useContext(context)

    // let fname = user.firstname.charAt(0).toUpperCase();
    // let lname = user.lastname.charAt(0).toUpperCase(); 
    // name = fname + lname;

  return (
    <header className="bg-light shadow-sm py-2 sticky-top">
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <img src={Logo} alt="Logo" style={{ height: "40px" }} />
        </div>

        <div className="d-flex align-items-center gap-5">
          <div className="d-flex gap-3 align-items-center">
            <a href="#" className="text-dark fs-5"><FaFacebookF /></a>
            <a href="#" className="text-dark fs-5"><FaYoutube /></a>
            <a href="#" className="text-dark fs-5"><FaLinkedinIn /></a>
            <a href="#" className="text-dark fs-5"><FaTwitter /></a>
          </div>

          {user ? (
            <>
              <div ref={dropdownRef}>
                {/* <Avatar name={`${user.fname} ${user.lname}`} className="rounded-circle bg-primary d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px", objectFit: "cover", cursor: "pointer"}} onClick={() => setdisplay(!display)} /> */}
                 <Avatar style={{cursor:"pointer"}} name={`${user.fname} ${user.lname}`} size="40" round={true} onClick={() => setdisplay(!display)} />
                {user && display && (
                  <div className={`dropdown ${display ? "show" : "hide"}`}>
                    <ul>
                      <li onClick={handleprofile}>Profile</li>
                      <li onClick={handlelogout}>Log Out</li>
                    </ul>
                  </div>  
                )}
              </div>
            </>
          ):(
           <div style={{cursor:"pointer"}}> <Avatar name="Guest" size="40" round={true} /> </div>
           
          )}

        </div>
      </div>
    </header>
  );
};

export default Header;    