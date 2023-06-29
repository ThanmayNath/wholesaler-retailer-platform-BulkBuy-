"use client";
import React, { useState } from "react";
import axios from "axios";
import "./RetailerUpload.css";
import categories from "@src/utils/categories";
import { toast } from "react-toastify";

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stocks, setStocks] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleProductImageChange = (event) => {
    setProductImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("wholesaler_id", localStorage.getItem("userId"));
      formData.append("product_name", productName);
      formData.append("product_price", price);
      formData.append("product_quantity", stocks);
      formData.append("files", productImage);
      formData.append("product_description", description);
      formData.append("category_id", selectedCategory);

      const res = await axios.post(
        "http://localhost:8800/products/upload",
        formData
      );
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
      } else {
        toast("Failed to upload", {
          icon: "🚫",
          position: "top-center",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        console.log("Failed to upload");
      }
    } catch (error) {
      toast.error("Failed to upload", {
        icon: "🚫",
        position: "top-center",
        autoClose: 4000,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      console.error(error);
    }
  };

  return (
    <>
      <div className="retailer_upload">
        <h2>Upload Products</h2>
        <div className="retailer_card_main">
          <div className="retailer_card">
            <p>Enter Product Details</p>
            <div className="Upload_div">
              <form>
                <div className="Product_details">
                  <div className="input_pox">
                    <span className="datails">Product Name</span>
                    <input
                      type="text"
                      required
                      placeholder="Enter Product name"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>
                  <div className="input_pox">
                    <span className="datails">Price</span>
                    <input
                      type="number"
                      required
                      placeholder="Enter price of product"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="input_pox">
                    <span className="datails">Stocks</span>
                    <input
                      type="number"
                      required
                      placeholder="Available Stocks"
                      value={stocks}
                      onChange={(e) => setStocks(e.target.value)}
                    />
                  </div>
                  <div className="input_pox">
                    <span className="datails">Product Image</span>
                    <input
                      className="image_upload"
                      type="file"
                      multiple
                      name=""
                      id=""
                      onChange={handleProductImageChange}
                    />
                  </div>
                  <div className="input_pox">
                    <span className="datails">Description</span>
                    <textarea
                      name=""
                      id=""
                      cols="75"
                      rows="10"
                      placeholder="Enter something about the product .."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="input_pox">
                    <span className="datails">Category</span>
                    <select
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="upload_btn">
                    <button type="submit" onClick={handleSubmit}>
                      Upload
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
