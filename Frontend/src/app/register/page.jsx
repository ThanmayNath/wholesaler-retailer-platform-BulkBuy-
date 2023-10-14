"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./register.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const indianphone = /^[6-9]\d{9}$/;

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validatePassword = (password) => {
    // Regular expressions for password validation
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(
      password
    );
    const isLengthValid = password.length >= 8;

    return hasLetter && hasNumber && hasSpecialSymbol && isLengthValid;
  };

  const handleSignup = async (e, endpoint) => {
    e.preventDefault();

    if (!/^[A-Za-z]+$/.test(name)) {
      toast.error("Name should only contain alphabetic characters", {
        position: "top-center",
        autoClose: 4000,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      return;
    }
    const isValidPassword = validatePassword(password);

    if (!isValidPassword) {
      toast.error(
        "Password must have at least 8 characters with letters, numbers, and special symbols",
        {
          position: "top-center",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        }
      );
      return;
    }
    if (!indianphone.test(phone)) {
      toast.error("Please enter a valid Indian phone number", {
        position: "top-center",
        autoClose: 4000,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
      toast.error("Please enter a valid email address", {
        position: "top-center",
        autoClose: 4000,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      return;
    }
    const data = {
      name: name,
      email: email,
      password: password,
      number: phone,
    };
    try {
      const res = await axios.post(endpoint, data);
      if (res.status === 200) {
        console.log(res.data.message);
        toast.success(res.data.message, {
          icon: "🚀",
          position: "top-center",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      }
      console.log(res.error);
      console.log(res.status); // Handle the response as needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="signup_div">
        <div className="signup_form_div">
          <div className="register_image">
            <Image src="/register.png" width={700} height={400} />
          </div>
          <div className="signup_form">
            <h2 className="register_header">Sign Up</h2>
            <form action="">
              <div className="user_details">
                <div className="input_form">
                  <label htmlFor="text">Name</label>
                  <input
                    type="text"
                    id="text"
                    name="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="input_form">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input_form">
                  <label htmlFor="password">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {showPassword ? (
                    <FaEye className="eye" onClick={togglePasswordVisibility} />
                  ) : (
                    <FaEyeSlash
                      className="eye_slash"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
                <div className="input_form">
                  <label htmlFor="number">Phone no</label>
                  <input
                    type="number"
                    id="number"
                    name="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="login_button"
                onClick={(e) =>
                  handleSignup(e, "http://localhost:8800/retailer/reg")
                }
              >
                Retailer Signup
              </button>
              <button
                type="submit"
                className="login_button"
                onClick={(e) =>
                  handleSignup(e, "http://localhost:8800/wholesaler/reg")
                }
              >
                Wholesaler Signup
              </button>
            </form>

            <div className="already_acc">
              <p>Already have an account?</p>
              <Link href="./login">Login here</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
