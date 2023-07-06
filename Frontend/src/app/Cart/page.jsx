"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Login from "../Login/page";
import "./Cart.css";
import { isAuthenticated } from "@src/utils/auth";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const id = localStorage.getItem("userId");
        const res = await axios.get(`http://localhost:8800/cart/${id}`);
        console.log(res.data);
        setCartItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllProducts();

    const isAuthenticatedUser = isAuthenticated();
    setAuthenticated(isAuthenticatedUser);

    if (!isAuthenticatedUser) {
      window.location.replace("/Login"); // Replace with the actual login page URL
    }
  }, []);

  if (!authenticated) {
    return <Login />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const id = localStorage.getItem("userId");
      const res = await axios.post(`http://localhost:8800/cart/proced/${id}`);
      toast.success(res.data.message, {
        icon: "💸",
        position: "top-center",
        autoClose: 4000,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    } catch (error) {
      toast.error(error.res.data.message, {
        position: "top-center",
        autoClose: 4000,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  };
  const handleIncrement = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  const getTotalPrice = (quantity, price) => {
    return quantity * price;
  };

  // const grand_total = cartItems.reduce(
  //   (total, item) => total + getTotalPrice(item.quantity, item.price),
  //   0
  // );

  const grand_total = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += getTotalPrice(item.quantity, item.product_price);
    });
    return total;
  };

  return (
    <>
      <div className="main_cart">
        <div className="cart_body">
          <h2 className="cart_heading">CART</h2>
          <p className="cart_info">Items in Cart</p>
          <div className="inner_cart">
            <div className="cart_div">
              {cartItems.map((item) => (
                <div className="cart_card" key={item.cart_id}>
                  <div className="cart_image">
                    <Image
                      src={`http://localhost:8800/${item.product_image_url}`}
                      width={200}
                      height={150}
                    />
                  </div>
                  <div className="cart_infodiv">
                    <div className="product_name">
                      <h3>{item.product_name}</h3>
                    </div>
                    <div className="cart_productdes">
                      <p>{item.product_description}</p>
                    </div>
                  </div>
                  <div className="cart_pricing">
                    <div className="cart_add">
                      <button className="add_btn">+</button>
                      {item.quantity}
                      <button className="add_btn">-</button>
                    </div>
                    <div className="total_price">
                      {getTotalPrice(item.quantity, item.product_price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="total_div">
              <div className="payment_main">
                <div className="grand_total">
                  <div className="total">Total Amount</div>
                  {/* <div className="total_price">Rs {grand_total}/-</div> */}
                  <div className="total_price">Rs {grand_total()}/-</div>
                </div>
                <div className="payment_div">
                  <button onClick={handleSubmit}>Proceed To Pay</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
