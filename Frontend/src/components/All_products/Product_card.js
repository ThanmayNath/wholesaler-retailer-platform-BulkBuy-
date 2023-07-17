"use client";
import "./AllProduct.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import Product_data from "@src/utils/Product_data";
import { toast } from "react-toastify";

const Product_card = () => {
  const [Products, setProducts] = useState([]);
  const [showProductDetails, setProductDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [productQuantities, setProductQuantities] = useState(
    Product_data.map(() => ({ quantity: 5 }))
  );
  const [selectedQuantities, setSelectedQuantities] = useState({});

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/products");
        console.log(res.data);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const toggleProductDetails = (product, index) => {
    setSelectedProduct(product);
    setSelectedProductIndex(index);
    setProductDetails(!showProductDetails);
  };

  const addCart = (productId, index) => {
    setProductQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[index] = {
        ...updatedQuantities[index],
        quantity: updatedQuantities[index].quantity + 1,
      };
      return updatedQuantities;
    });

    setSelectedQuantities((prevSelectedQuantities) => {
      const updatedQuantities = { ...prevSelectedQuantities };
      if (updatedQuantities[productId]) {
        updatedQuantities[productId] += 1;
      } else {
        updatedQuantities[productId] = 1;
      }
      return updatedQuantities;
    });
  };

  const minusCart = (productId, index) => {
    setProductQuantities((prevQuantities) => {
      if (prevQuantities[index].quantity > 5) {
        const updatedQuantities = [...prevQuantities];
        updatedQuantities[index] = {
          ...updatedQuantities[index],
          quantity: updatedQuantities[index].quantity - 1,
        };
        return updatedQuantities;
      }
      return prevQuantities;
    });

    setSelectedQuantities((prevSelectedQuantities) => {
      const updatedQuantities = { ...prevSelectedQuantities };
      if (updatedQuantities[productId]) {
        updatedQuantities[productId] -= 1;
        if (updatedQuantities[productId] === 0) {
          delete updatedQuantities[productId];
        }
      }
      return updatedQuantities;
    });
  };

  const productadded = async (quantity, product_id) => {
    console.log("Selected Product Quantity:", quantity);
    console.log("Selected Product ID:", product_id);
    const retailer_id = localStorage.getItem("userId");

    try {
      const res = await axios.post("http://localhost:8800/cart/add", {
        retailer_id,
        quantity,
        product_id,
      });
      if (res.status === 200) {
        console.log(res.data.message);
        toast.success(res.data.message, {
          icon: "🛒",
          position: "top-center",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      }
      console.log("Cart Add Response:", response.data);
      // Handle the response as needed
    } catch (error) {
      console.error("Cart Add Error:", error);
      // Handle the error as needed
    }
  };

  return (
    <>
      <div className="Products">
        <div className="discount_div">
          <div className="discount_main">
            <div className="heading">
              <h2>Popular Product</h2>
            </div>
            <div className="view_more">View All Products</div>
          </div>
        </div>
        <div className="load_more">
          <Link href={"/Products"}>Load More</Link>
        </div>
        <div className="product_carddiv">
          {/* Render the fetched products */}
          {Products.map((product, index) => (
            <div className="p_card" key={product.product_id}>
              <div className="product_img">
                <img
                  src={`http://localhost:8800/${product.product_image_url}`}
                  alt={product.product_name}
                  width={340}
                  height={200}
                  className="p_img"
                />
                <div className="overlay">
                  <button
                    onClick={() => toggleProductDetails(product, index)}
                    className="view_details_btn"
                  >
                    View Details
                  </button>
                </div>
              </div>
              <h2>{product.product_name}</h2>
              <div className="cart_pricediv">
                <div className="p_price">₹{product.product_price}</div>
                <div className="cart_add">
                  <button
                    className="add_btn"
                    onClick={() => addCart(product.product_id, index)}
                  >
                    +
                  </button>
                  {productQuantities[index].quantity}
                  <button
                    className="add_btn"
                    onClick={() => minusCart(product.product_id, index)}
                  >
                    -
                  </button>
                </div>
              </div>
              <div className="p_addtocart">
                <button
                  className="p_btn"
                  onClick={() =>
                    productadded(
                      productQuantities[index].quantity,
                      product.product_id
                    )
                  }
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* modal for product page */}
        {showProductDetails && selectedProduct && (
          <div className="productdetails_modal">
            <AiOutlineClose
              className="close_btn"
              onClick={toggleProductDetails}
            />
            <div className="product_maindiv">
              <div className="product_maindiv">
                <div className="product_imagediv">
                  <div className="product_innerdiv">
                    <img
                      className="main_img"
                      src={`http://localhost:8800/${selectedProduct.product_image_url}`}
                      width={441}
                      height={251}
                    ></img>
                  </div>
                  <div className="product_thumbnail_grid">
                    <div className="product_thumbnail">
                      <img
                        className="extra_img"
                        src={`http://localhost:8800/${selectedProduct.product_image_url}`}
                        width={100}
                        height={100}
                      ></img>
                    </div>
                    <div className="product_thumbnail">
                      <img
                        className="extra_img"
                        src={`http://localhost:8800/${selectedProduct.product_image_url}`}
                        width={100}
                        height={100}
                      ></img>
                    </div>
                    <div className="product_thumbnail">
                      <img
                        className="extra_img"
                        src={`http://localhost:8800/${selectedProduct.product_image_url}`}
                        width={100}
                        height={100}
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product_infodiv">
                <div className="p_title">
                  <h2>{selectedProduct.product_name}</h2>
                </div>
                <div className="p_price">₹{selectedProduct.product_price}</div>
                <div className="p_cartdiv">
                  <div className="p_cart">
                    <button
                      className="add_btn"
                      onClick={() =>
                        addCart(
                          selectedProduct.product_id,
                          selectedProductIndex
                        )
                      }
                    >
                      +
                    </button>
                    <div className="p_main">
                      {productQuantities[selectedProductIndex].quantity}
                    </div>
                    <button
                      className="add_btn"
                      onClick={() =>
                        minusCart(
                          selectedProduct.product_id,
                          selectedProductIndex
                        )
                      }
                    >
                      -
                    </button>
                  </div>
                  <div className="p_addtocart">
                    <button
                      className="p_btn"
                      onClick={() =>
                        productadded(
                          productQuantities[selectedProductIndex].quantity,
                          selectedProduct.product_id
                        )
                      }
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="p_availablestock">
                  Available Stock:
                  {selectedProduct.product_quantity -
                    productQuantities[selectedProductIndex].quantity}
                </div>
                <div className="p_details">
                  <p>Product Details</p>
                  <div className="p_des">
                    {selectedProduct.product_description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Product_card;
