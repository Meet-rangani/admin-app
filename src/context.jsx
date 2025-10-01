import { useContext, useRef } from "react";
import { useEffect } from "react";
import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const context = createContext();

export function Authcontext({ children }) {
    const [open, setOpen] = useState(true);
    const [display, setdisplay] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [user, setUser] = useState(null);
    const [login, setlogin] = useState({ username: "", password: "" });
    const [admin, setadmin] = useState({
        username : "admin@123.com",
        password : "admin"
    })

    const navigate = useNavigate();

    //Registartion page
    const [formdata, setformdata] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        password: "",
        confirmpassword: "",
        gender: "",
        country: "",
        terms: false,
    });

    function handleregisterdata(e) { setformdata({ ...formdata,
        [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
    }

    const handleregistersubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await axios.post(
            "http://localhost:5000/api/auth/register",
            formdata,
            {
            headers: { "content-Type": "application/json" },
            }
        );
        toast.success("Registration Successfully 🎉");
        navigate("./Login");
        setformdata({
            fname: "",
            lname: "",
            email: "",
            phone: "",
            password: "",
            confirmpassword: "",
            gender: "",
            country: "",
            terms: false,
        });
        } catch (err) {
        toast.error("Invalid Email or Password!");
        }
    };

    //login page
    function handlelogindata(e) {
        setlogin({ ...login, [e.target.name]: e.target.value });
    }

    async function handlelogin() {
        try {
            if (
            login.username === admin.username &&
            login.password === admin.password
            ){
                navigate("./admin/allusers");
                toast.success("Admin Login Successfully 🎉");
                return;
            }
            const payload = {
                email: login.username,
                phone: login.username,
                password: login.password,
            };
            const response = await axios.post( "http://localhost:5000/api/auth/login", payload,
                {
                    headers: { "content-Type": "application/json" },
                }
            );
            setUser(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            toast.success("Login Successfully 🎉");
            setlogin({ username: "", password: "" });
            navigate("/");
        } catch (error) {
            toast.error("Invalid Username or Password");
            setlogin({ username: "", password: "" });
        }
    }

    //logout function
    function handlelogout() {
        navigate("/login");
        setdisplay(false);
        setUser(null);
        localStorage.removeItem("user");
    }

    //header page
    function handleprofile() {
        navigate("/Profile");
        setdisplay(false);
    }

    const dropdownRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setdisplay(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setdisplay]);

    //profile page
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        axios
            .get(`http://localhost:5000/api/auth/user/${parsedUser.id}`)
            .then((res) => {
            setUser(res.data.user);
            })
            .catch((err) => {
            console.error("Error fetching user:", err);
            });
        }
    }, []);

    function handleedit(updatedData) {

        axios.put(`http://localhost:5000/api/auth/updateuser/${user._id}`, updatedData)
        .then(res => {
            toast.success("Profile updated successfully 🎉");
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
        })
        .catch(err => {
            console.error("Error updating user:", err);
            toast.error("Failed to update profile");
        });
    }

    // user still show data after refresh
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    //cart page
    function handlecart(){
        toast.success("Added to cart!");
        navigate("/Cart")
    }

    return (
        <context.Provider
            value={{
                    showToast,
                    setShowToast,
                    handlelogin,
                    login,
                    setlogin,
                    handlelogindata,
                    navigate,
                    handlelogout,
                    display,
                    setdisplay,
                    open,
                    setOpen,
                    formdata,
                    handleregisterdata,
                    handleregistersubmit,
                    handleprofile,
                    handleedit,
                    dropdownRef,
                    user,
                    handlecart
                }} >
            {children}
        </context.Provider>
    );
}
