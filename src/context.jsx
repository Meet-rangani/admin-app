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

    const admin = { username : "admin@123.com", password : "admin" }

    async function handlelogin() {
        try {
            if ( login.username === admin.username && login.password === admin.password ){
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

    //click outside then close popup
    const dropdownRef = useRef(null);
    const popupref = useRef(null);
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setdisplay(false);
            }
            if (!popupref.current.contains(e.target)) {
                setshowPopup(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    //profile page
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        axios .get(`http://localhost:5000/api/auth/user/${parsedUser.id}`) .then((res) => {
                setUser(res.data.user);
            })
            .catch((err) => {
                console.error("Error fetching user:", err);
            });
        }
    }, []);

    //edituser in profile page
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
    function handlecart(product){
        toast.success("Added to cart!");
        navigate("/cart", { state: { product } });
    }

    //delete user  
    function handledelete(id){
        axios.delete(`http://localhost:5000/api/auth/user/${id}`)
        .then(res =>{
            setUser(res.data.user);
            console.log(res.data.user);
            toast.success("User Delete successfully 🎉");
        })
        .catch(err =>{
            console.log(err)
        })
    }

    //get products admin side
    const[products, setproducts] = useState([])
    const getproducts = async() =>{
        try{
            const response = await axios.get("http://localhost:5000/api/products/all")
            setproducts(response.data)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=> {
        getproducts()
    },[])

    //product popup
    const[showPopup, setshowPopup] = useState(false)
    function handlepopup(){
        setshowPopup(!showPopup)
    }

    function cancelpopup(){
        setshowPopup(false)
    }

    //search product
    async function handlesearch(){
        console.log("hello");
        try{
            await axios.get("http://localhost:5000/api/products/id")
            setproducts(response.data);
        }
        catch(err){
            console.log(err);
        }
    }

    //add product 
    const[productdata, setproductdata] = useState({
        name: "",
        description: "",
        price: "",
        photo: ""
    })
    function handleproduct(e){
        setproductdata({...productdata, [e.target.name]: e.target.value})
    }

    async function addproduct(e){
        e.preventDefault()
        try{
            const response = await axios.post("http://localhost:5000/api/products/add",productdata)
            setproductdata({
                name: "",
                description: "",
                price: "",
                photo: ""
            })
            toast.success("Product Addedd successfully 🎉")
            cancelpopup();
            getproducts();
        }
        catch(err){
            console.log(err)
        }
    }

    //edit product
    async function editproduct(id){
        setshowPopup(!showPopup)
        try{
            await axios.put(`http://localhost:5000/api/products/update/${id}`);
            toast.success("Product Edited successfully 🎉")
            getproducts();
        }catch(err){
            console.log(err);   
        }
    }

    //delete product
    async function deleteproduct(id) {
        // window.confirm("Are you sure you want to delete this Product?")
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            toast.success("Product Deleted successfully 🎉");
            getproducts();
        } catch (err) {
            console.error(err);
        }
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
                    popupref,
                    user,
                    handlecart,
                    handledelete,
                    products,
                    handlepopup,
                    showPopup,
                    cancelpopup,
                    addproduct,
                    handlesearch,
                    handleproduct,
                    deleteproduct,
                    productdata,
                    editproduct
                }} >
            {children}
        </context.Provider>
    );
}
