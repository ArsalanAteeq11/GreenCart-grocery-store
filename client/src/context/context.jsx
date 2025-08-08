import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [user, setIsUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [sellerEmail, setSellerEmail] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

  // fetch admin status

  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/seller/is-auth");
      if (data.success) {
        setIsSeller(true);
        setSellerEmail(data.sellerEmail);
      } else {
        setIsSeller(false);
        setSellerEmail(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // fetch user status

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/user/is-auth", {
        withCredentials: true,
      });

      if (data.success) {
        setIsUser(data.user);
        setCartItems(data.user.cartItems);
      } else {
        console.log("error to fetch user", data);
      }
    } catch (error) {
      console.log("error to fetch user", error);
      setIsUser(null);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to Cart");
  };

  const updateCartItems = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart updated");
  };

  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
    toast.success("Remove from Cart");
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      console.log("first", itemInfo);
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };
  useEffect(() => {
    fetchUser();
    fetchProducts();
    fetchSeller();
  }, []);
  useEffect(() => {
    const updateCart = async () => {
      try {
        const { data } = await axios.post("/cart/update", { cartItems });
        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (user) {
      updateCart();
    }
  }, [user, cartItems]);
  const value = {
    navigate,
    user,
    setIsUser,
    isSeller,
    setIsSeller,
    sellerEmail,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    cartItems,
    setCartItems,
    addToCart,
    updateCartItems,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    getCartAmount,
    getCartCount,
    axios,
    fetchProducts,
    fetchSeller,
  };
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export default MyContext;
