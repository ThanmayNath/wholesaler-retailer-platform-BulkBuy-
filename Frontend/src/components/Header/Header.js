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
              <select className="product_select" defaultValue="1">
                <option value="1">All Products</option>
                <option value="2">Electronics</option>
                <option value="3">Stationary</option>
                <option value="4">Cosmetics</option>
                <option value="5">Kitchenware</option>
                <option value="6">Automotive</option>
                <option value="6">Beverages</option>
                <option value="6">Food and Grocery</option>
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
              <Link href="/Products">Products</Link>
            </div>
            <div className="cart_div">
              <FaShoppingCart />
              <p>Cart</p>
            </div>
            <div className="login">
              <Link href="./Login">Login</Link>
            </div>
            <div className="register">
              <Link href="./Register">Signup</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
