import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../context/context";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios, fetchSeller } =
    useContext(MyContext);
  const [email, setEmail] = useState(
    import.meta.env.VITE_DEMO_SELLER_EMAIL || ""
  );
  const [password, setPassword] = useState(
    import.meta.env.VITE_DEMO_SELLER_PASSWORD || ""
  );

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/seller/login", { email, password });
      if (data.success) {
        await fetchSeller();
        setIsSeller(true);
        navigate("/seller");
        console.log("data", data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  return (
    !isSeller && (
      <form
        onSubmit={submitHandler}
        className="min-h-screen flex items-center text-sm text-gray-600"
      >
        <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
          <p className="text-2xl font-medium m-auto">
            <span className="text-primary">Seller </span>Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="enter your email.."
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              required
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="enter your password.."
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              required
            />
          </div>
          <button className="bg-primary text-white w-full py-2 rounded-md cursor-pointer">
            Login
          </button>
        </div>
      </form>
    )
  );
};

export default SellerLogin;
