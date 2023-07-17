"use client";
import React, { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./header.css";

const Header = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("hey");
  const [showModal, setShowModal] = useState(false);
  const [userType, setUserType] = useState(localStorage.getItem("user"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
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

  const featchOrderDetails = async () => {
    console.log("api helloooo");
    try {
      const id = localStorage.getItem("userId");
      const res = await axios.get(`http://localhost:8800/orders/${id}`);
      console.log(res.data);
      setOrderDetails(res.data);
    } catch (error) {
      console.log(error);
    }
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
    } else if (selectedValue === "orders") {
      featchOrderDetails();
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
                  {/* order card for retailer  */}
                  {selectedOption === "orders" && (
                    <div className="order_modal">
                      <div className="close_order_btn">
                        <button onClick={closeModal}>Close</button>
                      </div>
                      <div className="order_card">
                        <div className="Inner_div">
                          <h2 className="order_heading">My Orders</h2>
                          <div className="order_card_div">
                            {/* <div className="orders">
                              <div className="order_id">
                                <label>Order Id</label>
                                <h3>#39048jfdg</h3>
                              </div>
                              <div className="p_date">
                                <label>Order Date</label>
                                <p>14/07/2023</p>
                              </div>
                              <div className="p_total">
                                <label>Total Amount (paid)</label>
                                <p> Rs 13400</p>
                              </div>
                              <div className="p_staus">
                                <label>Order Status</label>
                                <p>Pending</p>
                              </div>
                              <div className="p_name">
                                <p></p>
                              </div>
                            </div> */}
                            {orderDetails.map((order, index) => (
                              <div className="orders" key={index}>
                                <div className="order_id">
                                  <label>Order Id</label>
                                  <h3>{order.order_id}</h3>{" "}
                                  {/* Assuming the order object has an "id" property */}
                                </div>
                                <div className="p_date">
                                  <label>Order Date</label>
                                  <p>{order.order_date}</p>{" "}
                                  {/* Assuming the order object has a "date" property */}
                                </div>
                                <div className="p_total">
                                  <label>Total Amount (paid)</label>
                                  <p>Rs {order.total_amount}</p>{" "}
                                  {/* Assuming the order object has a "totalAmount" property */}
                                </div>
                                <div className="p_staus">
                                  <label>Order Status</label>
                                  <p>{order.order_status}</p>{" "}
                                  {/* Assuming the order object has a "status" property */}
                                </div>
                                <div className="p_name">
                                  <p>{order.name}</p>{" "}
                                  {/* Assuming the order object has a "name" property */}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
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
