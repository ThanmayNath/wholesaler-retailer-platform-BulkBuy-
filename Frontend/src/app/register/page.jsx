"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./register.css";
import Link from "next/link";
import Image from "next/image";
const login = () => {
  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <div className="signup_div">
        <div className="signup_form_div">

          <div className="register_image">
            <Image src="/register.png" width={700} height={400}></Image>
          </div>
          <div className="signup_form">
            <h2 className="register_header">Sign Up</h2>
            <form action="">
              <div class="user_details">
                <div class="input_form">
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
                <div class="input_form">
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
                <div class="input_form">
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
                    <FaEye
                      className="eye"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <FaEyeSlash
                      className="eye_slash"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
                <div class="input_form">
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
                // onClick={handleUserLogin}
                className="login_button"
              >
                Retailer Signup
              </button>
              <button
                type="submit"
                // onClick={handleOwnerLogin}
                className="login_button"
              >
                Wholeseller SignUp
              </button>
            </form>

            <div className="already_acc">
              <p>Already have an account ?</p>
              <Link href="./login">Login here</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
