import React from "react";
import "./RetailerUpload.css";
const page = () => {
  return (
    <>
      <div className="retailer_upload">
        <h2>Upload Products</h2>
        <div className="retailer_card_main">
          <div className="retailer_card">
            <p>Enter Product Details</p>
            <div className="Upload_div">
              <form action="#">
                <div className="Product_details">
                  <div className="input_pox">
                    <span className="datails">Product Name</span>
                    <input
                      type="text"
                      required
                      placeholder="Enter Product name"
                    />
                  </div>
                  <div className="input_pox">
                    <span className="datails">Price</span>
                    <input
                      type="number"
                      required
                      placeholder="Enter price of product"
                    />
                  </div>
                  <div className="input_pox">
                    <span className="datails">Stocks</span>
                    <input
                      type="number"
                      required
                      placeholder="Available Stocks"
                    />
                  </div>
                  <div className="input_pox">
                    <span className="datails">Product Image</span>
                    <input
                      className="image_upload"
                      type="file"
                      onchange="updateFileName(this)"
                      multiple
                      name=""
                      id=""
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
                    ></textarea>
                  </div>

                  <div className="upload_btn">
                    <button type="submit">Update Profile</button>
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

export default page;
