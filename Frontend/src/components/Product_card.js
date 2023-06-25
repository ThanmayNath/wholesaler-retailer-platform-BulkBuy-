"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./Product.css";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import Product_cards from "@src/app/utils/Product_card";

const Product_card = () => {
  const [Products, setProducts] = useState([]);
  const [showProductDetails, setProductDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);

  useEffect(() => {
    const featchAllNotes = async () => {
      try {
        const res = await axios.get("http://localhost:8800/products");
        console.log(res.data);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    featchAllNotes();
  }, []);

  const toggleProductDetails = (product, index) => {
    setSelectedProduct(product);
    setSelectedProductIndex(index);
    setProductDetails(!showProductDetails);
  };

  const [productQuantities, setProductQuantities] = useState(
    Product_cards.map(() => ({ quantity: 5 }))
  );

  const addCart = (index) => {
    setProductQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[index] = {
        ...updatedQuantities[index],
        quantity: updatedQuantities[index].quantity + 5,
      };
      return updatedQuantities;
    });
  };

  const minusCart = (index) => {
    setProductQuantities((prevQuantities) => {
      if (prevQuantities[index].quantity > 5) {
        const updatedQuantities = [...prevQuantities];
        updatedQuantities[index] = {
          ...updatedQuantities[index],
          quantity: updatedQuantities[index].quantity - 5,
        };
        return updatedQuantities;
      }
      return prevQuantities;
    });
  };

  // product added to cart
  const productadded = () => {
    alert(
      productQuantities[selectedProductIndex].quantity +
        " product added to cart"
    );
  };

  // modal image changing

  return (
    <div className="Products">
      <div className="discount_div">
        <div className="discount_main">
          <div className="heading">
            <h2>View Products</h2>
          </div>
          <div className="view_more">View All Products</div>
        </div>
      </div>
      <div className="load_more">
        <Link href={"/loadmore"}>Load More</Link>
      </div>
      <div className="product_carddiv">
        {/* Render the fetched products */}
        {Products.map((product, index) => (
          <div className="p_card" key={product.product_id}>
            <div className="product_img">
              <img
                src={`http://localhost:8800/${product.product_image_url}`}
                alt={product.product_name}
                width={271}
                height={181}
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
                <button className="add_btn" onClick={() => addCart(index)}>
                  +
                </button>
                {productQuantities[index].quantity}
                <button className="add_btn" onClick={() => minusCart(index)}>
                  -
                </button>
              </div>
            </div>
            <Link className="Cart_btn" href="/cart">
              Add to Cart
            </Link>
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
                    width={341}
                    height={231}
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
                    onClick={() => addCart(selectedProductIndex)}
                  >
                    +
                  </button>
                  <div className="p_main">
                    {productQuantities[selectedProductIndex].quantity}
                  </div>

                  <button
                    className="add_btn"
                    onClick={() => minusCart(selectedProductIndex)}
                  >
                    -
                  </button>
                </div>
                <div className="p_addtocart">
                  <button className="p_btn" onClick={() => productadded()}>
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
  );
};

export default Product_card;
