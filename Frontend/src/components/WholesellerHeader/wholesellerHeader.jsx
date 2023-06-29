"use client";
import "./wholeseller.css";
import Link from "next/link";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const WholesellerHeader = () => {
  const Retailer_name = "Thanmay";

  const [selectedOption, setSelectedOption] = useState("hey");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);

    if (selectedValue === "edit") {
      setShowModal(true);
      disableScroll();
    } else if (selectedValue === "logout") {
      window.location.href = "/"; // Redirect to the home page
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
  return (
    <div>
      <div className="wholeseller_header">
        <div className="w_header">
          <div className="logo_section">
            <Link href="/">BulkBuy</Link>
          </div>
          <div className="menu_section">
            <Link href="/DashBoard/Wholeseller/WholesellerUpload">
              UPLOAD PRODUCTS
            </Link>
            <Link href="/DashBoard/Wholeseller/WholesellerProducts">
              LISTED PRODUCTS
            </Link>
            <Link href="./">EARNING</Link>
          </div>
          <div className="logout_section">
            <select
              name=""
              id=""
              value={selectedOption}
              onChange={handleChange}
            >
              <option value="hey" disabled hidden>
                Hey, {Retailer_name}
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
                  <span className="datails">Name</span>
                  <input type="text" required />
                </div>
                <div className="input_pox">
                  <span className="datails">Gmail</span>
                  <input type="text" required />
                </div>
                <div className="input_pox">
                  <span className="datails">Address</span>
                  <input type="text" required />
                </div>
                <div className="input_pox">
                  <span className="datails">City</span>
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
  );
};

export default WholesellerHeader;
