"use client";
import React, { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./header.css";

const Header = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("hey");
  const [showModal, setShowModal] = useState(false);
  const [userType, setUserType] = useState(localStorage.getItem("user"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (userType === "retailer") {
      setIsLoggedIn(true);
      router.push("/");
    } else {
      setIsLoggedIn(false);
    }
  }, [userType]);

  const closeModal = () => {
    setSelectedOption("hey");
    setShowModal(false);
  };

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);

    if (selectedValue === "edit") {
      setShowModal(true);
    } else if (selectedValue === "logout") {
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("isBillingEffectExecuted");
      localStorage.removeItem("orderId");
      localStorage.removeItem("gst");
      localStorage.removeItem("grandTotal");
      setUserType(localStorage.getItem("user"));
      window.location.reload();
      setIsLoggedIn(false);
    }
  };

  return (
    <>
      <div className="main">
        <div className="navbar">
          <div className="logo">
            <Link href="/">BULKBUY</Link>
          </div>
          <form action="">
            <div className="searchbar_div">
              <select className="product_select" defaultValue="1">
                <option value="1">All Products</option>
                <option value="2">Electronics</option>
                <option value="3">Stationary</option>
                <option value="4">Cosmetics</option>
                <option value="5">Kitchenware</option>
                <option value="6">Automotive</option>
                <option value="7">Beverages</option>
                <option value="8">Food and Grocery</option>
              </select>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter Product Name"
                className="search_box"
              />
              <FaSearch className="search_icon" />
            </div>
          </form>

          <div className="side_div">
            {!isLoggedIn && (
              <>
                <div className="account_info">
                  <Link href="/Login">Login</Link>
                </div>
                <div className="register">
                  <Link href="/register">Signup</Link>
                </div>
              </>
            )}

            {isLoggedIn && (
              <>
                <div className="account_info">
                  <Link href="/Products">Products</Link>
                </div>
                <div className="cart_div">
                  <FaShoppingCart />
                  <Link href="/Cart">Cart</Link>
                </div>
                <div className="account_logout">
                  <select
                    name=""
                    id=""
                    value={selectedOption}
                    onChange={handleChange}
                    className="Ubutton"
                  >
                    <option value="hey" disabled hidden>
                      Hey, {localStorage.getItem("userName")}
                    </option>
                    <option value="edit">Edit Profile</option>
                    <option value="orders">My Orders</option>
                    <option value="logout">Logout</option>
                  </select>
                  {selectedOption === "edit" && (
                    <div className="edit_profile_modal">
                      <div className="Uprofile_card">
                        <button className="close_btn" onClick={closeModal}>
                          <FaTimes />
                        </button>
                        <form action="#">
                          <div className="Bikes_details">
                            <div className="input_pox">
                              <span className="details">Name</span>
                              <input type="text" required />
                            </div>
                            <div className="input_pox">
                              <span className="details">Gmail</span>
                              <input type="text" required />
                            </div>
                            <div className="input_pox">
                              <span className="details">Address</span>
                              <input type="text" required />
                            </div>
                            <div className="input_pox">
                              <span className="details">City</span>
                              <input type="text" required />
                            </div>
                            <div className="update_btn">
                              <button type="submit">Update Profile</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
