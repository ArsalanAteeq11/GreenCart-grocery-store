import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import MyContext from "../context/context";
import toast from "react-hot-toast";
import { useEffect } from "react";

const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
  />
);
const AddAddress = () => {
  const { axios, navigate, user } = useContext(MyContext);
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  console.log("address", address);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/address/add", { address });
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
        setAddress({
          firstname: "",
          lastname: "",
          email: "",
          street: "",
          city: "",
          state: "",
          zipcode: "",
          country: "",
          phone: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };
  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping <span className="font-semibold text-primary">Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between gap-10 mt-10">
        <div className="flex-1 w-full md:max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                type="text"
                placeholder="First Name"
                name="firstName"
                handleChange={handleChange}
                address={address}
              />
              <InputField
                type="text"
                placeholder="Last Name"
                name="lastName"
                handleChange={handleChange}
                address={address}
              />
            </div>
            <InputField
              type="email"
              placeholder="Email Address"
              name="email"
              handleChange={handleChange}
              address={address}
            />
            <InputField
              type="text"
              placeholder="Street"
              name="street"
              handleChange={handleChange}
              address={address}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                type="text"
                placeholder="City"
                name="city"
                handleChange={handleChange}
                address={address}
              />
              <InputField
                type="text"
                placeholder="State"
                name="state"
                handleChange={handleChange}
                address={address}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                type="number"
                placeholder="Zip Code"
                name="zipcode"
                handleChange={handleChange}
                address={address}
              />
              <InputField
                type="text"
                placeholder="Country"
                name="country"
                handleChange={handleChange}
                address={address}
              />
            </div>

            <InputField
              type="text"
              placeholder="Phone"
              name="phone"
              handleChange={handleChange}
              address={address}
            />

            <button className="w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase">
              Save Address
            </button>
          </form>
        </div>
        <img
          className="hidden md:block  mb-16 md:mt-0"
          src={assets.add_address_iamge}
          alt="Add Address"
        />
      </div>
    </div>
  );
};

export default AddAddress;
