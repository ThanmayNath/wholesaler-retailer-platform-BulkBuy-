"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import "./Cart.css";
import { isAuthenticated } from "@src/utils/auth";
import Link from "next/link";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const isAuthenticatedUser = isAuthenticated();
    if (!isAuthenticatedUser) {
      window.location.replace("/Login"); // Replace with the actual login page URL
    }

    const fetchAllProducts = async () => {
      try {
        const id = localStorage.getItem("userId");
        const res = await axios.get(`http://localhost:8800/cart/${id}`);
        console.log(res.data);
        setCartItems(res.data);
        if (localStorage.getItem("isBillingEffectExecuted") === "true") {
          return;
        } else {
          localStorage.setItem("isBillingEffectExecuted", "false");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllProducts();
  }, []);

  const handleIncrement = async (itemId, Quantity) => {
    try {
      const response = await axios.patch("http://localhost:8800/cart", {
        id: itemId,
        quantity: Quantity + 1,
      });

      // Handle the response here if needed
      console.log(response.data);
      localStorage.setItem("isBillingEffectExecuted", "false");

      // Update the cart items in your state or perform any other actions
      setCartItems((cartItems) =>
        cartItems.map((item) =>
          item.cart_id === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };

  const handleDecrement = async (itemId, Quantity) => {
    if (Quantity > 5) {
      try {
        const response = await axios.patch("http://localhost:8800/cart", {
          id: itemId,
          quantity: Quantity - 1,
        });

        // Handle the response here if needed
        console.log(response.data);
        localStorage.setItem("isBillingEffectExecuted", "false");

        // Update the cart items in your state or perform any other actions
        setCartItems((cartItems) =>
          cartItems.map((item) =>
            item.cart_id === itemId && item.quantity >= 5
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      } catch (error) {
        // Handle the error here
        console.error(error);
      }
    } else {
      return;
    }
  };
  const getTotalPrice = (quantity, price) => {
    return quantity * price;
  };

  const handleRemoveIteam = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/cart/${id}`);
      const newCartItems = cartItems.filter((item) => item.cart_id !== id);
      setCartItems(newCartItems);
      localStorage.setItem("isBillingEffectExecuted", "false");
    } catch (error) {
      console.error(error);
    }
  };

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
                      <button
                        className="add_btn"
                        onClick={() =>
                          handleIncrement(item.cart_id, item.quantity)
                        }
                      >
                        +
                      </button>
                      {item.quantity}
                      <button
                        className="add_btn"
                        onClick={() =>
                          handleDecrement(item.cart_id, item.quantity)
                        }
                      >
                        -
                      </button>
                    </div>
                    <div className="total_price">
                      {getTotalPrice(item.quantity, item.product_price)}
                    </div>
                    <div className="remove_button">
                      <button onClick={() => handleRemoveIteam(item.cart_id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="total_div">
              <div className="payment_main">
                <div className="grand_total">
                  <div className="total">Total Amount</div>
                  <div className="total_price">Rs {grand_total()}/-</div>
                </div>
                <div className="payment_div">
                  {/* <button onClick={handleSubmit}>Proceed To Pay</button> */}
                  <Link href="/Billing">Proceed to Pay </Link>
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
