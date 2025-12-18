import { useRef } from "react";
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
        await axios.post( "http://localhost:5000/api/auth/register", formdata,
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
    const [login, setlogin] = useState({ username: "", password: "" });
    const [user, setUser] = useState(null);
    const admin = { username : "admin@123.com", password : "admin" }

    function handlelogindata(e) {
        setlogin({ ...login, [e.target.name]: e.target.value });
    }

    async function handlelogin() {
        try {
            if ( login.username === admin.username && login.password === admin.password ){
                navigate("./admin/allusers");
                toast.success("Admin Login Successfully 🎉");
                setlogin({ username: "", password: "" });
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
    const editref = useRef(null)
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setdisplay(false);
            }
            if (popupref.current && !popupref.current.contains(e.target)) {
                setshowPopup(false);
            }
            if(editref.current && !editref.current.contains(e.target)){
                setedituser(null)
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
    async function handleedit(updatedData, id) {
        
        await axios.put(`http://localhost:5000/api/auth/updateuser/${id}`, updatedData)
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
            toast.success("User Delete successfully 🎉");
        })
        .catch(err =>{
            console.log(err)
            toast.success("User Does not Deleted ");
        })
    }

    //fetch all user in admin side
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/api/auth/users");
            setUsers(response.data.users)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    //edit user in admin side
    const [edituser, setedituser] = useState(false);

    const handlechageuser = (e) => {
        const { name, value } = e.target;
        setedituser((prev) => ({ ...prev, [name]: value })); 
    };

    function handleedituser(user){
        setedituser(user);
    }

    async function handleeditadmin(updatedUser, id) {
        await axios.put(`http://localhost:5000/api/auth/updateuser/${id}`,updatedUser )
        try{
            toast.success("Profile updated successfully 🎉");
            setedituser(null);
            fetchUsers()
        }
        catch(err){
            console.error("Error updating user:", err);
            toast.error("Failed to update profile");
        }
    }

    //get products admin side
    const[products, setproducts] = useState([])
    const getproducts = async() =>{
        try{
            const response = await axios.get("http://localhost:5000/api/products")
            setproducts(response.data.products)
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
        setproductdata({
            name: "",
            description: "",
            price: "",
            photo: ""
        })
    }

    //search product
    async function handlesearch(searchValue){
        try{
            let url = "http://localhost:5000/api/products";
            if (searchValue.trim() !== "") {
                url += `?name=${searchValue}`;
            }

            let response = await axios.get(url)
            setproducts(response.data.products);
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
            await axios.post("http://localhost:5000/api/products/add",productdata)
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

    const handlephoto = (e) => {
        setproductdata({ ...productdata, photo: e.target.files[0] });
    };

    //edit button product
    const [editId, setEditId] = useState(null);
    const[isedit, setisedit] = useState(false)

    function editproduct(product){
        setproductdata({
            name: product.name,
            description: product.description,
            price: product.price,
            photo: product.photo
        })
        setisedit(true);
        setshowPopup(true);
        setEditId(null);
        setEditId(product._id);
    }

    //edit product in update button
    async function updateproduct(){
        try{
            await axios.put(`http://localhost:5000/api/products/${editId}`,productdata);
            toast.success("Product Edited successfully 🎉")
            getproducts()
            setisedit(false);
            setEditId(null);
            setshowPopup(false);
        }
        catch(err){
            console.log(err)
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
                    editref,
                    user,
                    edituser,
                    setedituser,
                    handleedituser,
                    users,
                    loading,
                    fetchUsers,
                    handleeditadmin,
                    handlechageuser,
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
                    editproduct,
                    handlephoto,
                    isedit,
                    updateproduct
                }} >
            {children}
        </context.Provider>
    );
}
