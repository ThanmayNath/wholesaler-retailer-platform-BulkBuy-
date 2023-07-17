"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./login.css";
import axios from "axios";
import { toast } from "react-toastify";

const login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggIn, setIsLoggedIn] = useState("");
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async (e, endpoint) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    try {
      const res = await axios.post(endpoint, data);
      const { user, id, name } = res.data;
      localStorage.setItem("user", user);
      localStorage.setItem("userId", id);
      localStorage.setItem("userName", name);

      if (user === "retailer") {
        window.location.reload();
        //router.push("/");
        // setIsLoggedIn(true);
      } else if (user === "wholesaler") {
        router.push("/DashBoard/Wholeseller/WholesellerUpload");
      }

      toast.success(res.data.message, {
        icon: "✅",
        position: "top-center",
        autoClose: 4000,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="login_div">
        <div className="login_form_div">
          <div className="login_image">
            <Image
              className="login_img"
              src="/login.png"
              width={550}
              height={550}
            />
          </div>
          <div className="login_form">
            <p className="tag">Welcome back!</p>
            <h2 className="login_header">Sign In</h2>
            <div className="user_details">
              <form method="post">
                <div className="password_input">
                  <label htmlFor="email" className="text_box">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input_tag"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <label htmlFor="password" className="text_box">
                  Password
                </label>
                <div className="password_input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    className="input_tag"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {showPassword ? (
                    <FaEye
                      className="eye_icon"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <FaEyeSlash
                      className="eye_slash_icon"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
                <button
                  type="submit"
                  className="login_button"
                  onClick={(e) =>
                    handleLogin(e, "http://localhost:8800/retailer/login")
                  }
                >
                  Retailer Login
                </button>
                <button
                  type="submit"
                  className="login_button"
                  onClick={(e) =>
                    handleLogin(e, "http://localhost:8800/wholesaler/login")
                  }
                >
                  Wholeseller Login
                </button>
              </form>
            </div>
            <div className="sign_up_here">
              <p>New to BulkBuy</p>
              <Link href="./register">Signup here </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
