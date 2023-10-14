"use client";
import "./wholeseller.css";
import Link from "next/link";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

const WholesellerHeader = () => {
  const Wholealer_name = localStorage.getItem("userName");
  const [selectedOption, setSelectedOption] = useState("hey");
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState(localStorage.getItem("address"));
  const [city, setCity] = useState(localStorage.getItem("city"));

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);

    if (selectedValue === "edit") {
      setShowModal(true);
      disableScroll();
    } else if (selectedValue === "logout") {
      window.location.href = "/"; // Redirect to the home page
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      localStorage.removeItem("user");
      localStorage.removeItem("address");
      localStorage.removeItem("city");
    }
  };
  const closeModal = () => {
    setSelectedOption("hey");
    setShowModal(false);
    enableScroll();
  };

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableScroll = () => {
    document.body.style.overflow = "auto";
  };

  const updateProfile = async () => {
    try {
      localStorage.setItem("address", address);
      localStorage.setItem("city", city);
      const wholesaler_id = localStorage.getItem("userId");
      const res = await axios.put(
        `http://localhost:8800/wholesaler/updateprofile`,
        {
          wholesaler_id: wholesaler_id,
          address: address,
          city: city,
        },
        {
          headers: { "x-access-token": Cookies.get("token") },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="wholeseller_header">
        <div className="w_header">
          <div className="logo_section">
            <Link href="/DashBoard/Wholeseller/WholesellerUpload">BulkBuy</Link>
          </div>
          <div className="menu_section">
            <nav class="stroke">
              <ul>
                <Link href="/DashBoard/Wholeseller/WholesellerUpload">
                  UPLOAD PRODUCTS
                </Link>
                <Link href="/DashBoard/Wholeseller/WholesellerProducts">
                  LISTED PRODUCTS
                </Link>
                <Link href="/DashBoard/Wholeseller/OrderActivity">
                  ORDER ACTIVITY
                </Link>
              </ul>
            </nav>
          </div>
          <div className="logout_section">
            <select
              name=""
              id=""
              value={selectedOption}
              onChange={handleChange}
            >
              <option value="hey" disabled hidden>
                Hey, {Wholealer_name}
              </option>
              <option value="edit">Edit Profile</option>
              <option value="logout">Logout</option>
            </select>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="edit_profile_modal">
          <div className="Rprofile_card ">
            <button className="close_btn" onClick={closeModal}>
              <FaTimes />
            </button>
            <form action="#">
              <div className="Bikes_details">
                <div className="input_pox">
                  <span className="datails">Address</span>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="input_pox">
                  <span className="datails">City</span>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="update_btn">
                  <button type="submit" onClick={() => updateProfile()}>
                    Update Profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WholesellerHeader;
