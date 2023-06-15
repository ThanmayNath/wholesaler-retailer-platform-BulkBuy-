"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import React from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import "./header.css";

const Header = () => {
  const clicked = () => {
    alert("searched");
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
              <select className="product_select">
                <option value="1" selected>
                  All Products
                </option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter Product Name"
                className="search_box"
              />
              <FaSearch className="search_icon" onClick={clicked} />
            </div>
          </form>
          <div className="side_div">
            <div className="account_info">
              <select className="account">
                <option value="1" selected>
                  Account
                </option>
                <option value="2">Login</option>
                <option value="3">Register</option>
              </select>
            </div>
            <div className="cart_div">
              <FaShoppingCart />
              <p>Cart</p>
            </div>
            <div className="login">
              <Link href="./login">Login</Link>
            </div>
            <div className="register">
              <Link href="./register">Signup</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
