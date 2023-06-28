"use client";
import "./Products.css";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import Product_cards from "@src/utils/Product_data";
import Image from "next/image";
import Link from "next/link";

export default function Products() {
  const [activeButton, setActiveButton] = useState("All Products");
  const [showProductDetails, setProductDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);

  const [productQuantities, setProductQuantities] = useState(
    Product_cards.map(() => ({ quantity: 5 }))
  );

  const activateButton = (buttonText) => {
    setActiveButton(buttonText);
  };

  const toggleProductDetails = (product, index) => {
    setSelectedProduct(product);
    setSelectedProductIndex(index);
    setProductDetails(!showProductDetails);
  };

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

  const filteredProducts =
    activeButton === "All Products"
      ? Product_cards
      : Product_cards.filter((product) => product.category === activeButton);

  return (
    <div className="Products_main">
      <h2 className="Product_heading">Products</h2>

      {/* filter tab code */}
      <div className="filter_div">
        <div className="filter_button">
          <button
            onClick={() => activateButton("All Products")}
            className={activeButton === "All Products" ? "active" : ""}
          >
            All Products
          </button>
          {/* Render the other filter buttons dynamically */}
          {[
            "Electronics",
            "Stationary",
            "Cosmetics",
            "KitchenWare",
            "Beverages",
            "Food And Grocery",
          ].map((filter) => (
            <button
              key={filter}
              onClick={() => activateButton(filter)}
              className={activeButton === filter ? "active" : ""}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* product card  */}
      <div className="product_card">
        {filteredProducts.map((product, index) => (
          <div className="p_card" key={product.id}>
            <div className="product_img">
              <Image
                src={product.image}
                alt={product.title}
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
            <h2>{product.title}</h2>
            <div className="cart_pricediv">
              <div className="p_price">${product.price}</div>
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
      {/* MODAL CODE FOR PRODUCT CARD  */}
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
                  <Image
                    className="main_img"
                    src={selectedProduct.image}
                    width={341}
                    height={231}
                  />
                </div>
                <div className="product_thumbnail_grid">
                  {[...Array(3)].map((_, thumbnailIndex) => (
                    <div className="product_thumbnail" key={thumbnailIndex}>
                      <Image
                        className="extra_img"
                        src={selectedProduct.image}
                        width={100}
                        height={100}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="product_infodiv">
              <div className="p_title">
                <h2>{selectedProduct.title}</h2>
              </div>
              <div className="p_price">${selectedProduct.price}</div>
              <div className="p_cat">Category: {selectedProduct.category}</div>
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
                  <button className="p_btn">
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="p_availablestock">
                Available Stock:{" "}
                {500 - productQuantities[selectedProductIndex].quantity}
              </div>
              <div className="p_details">
                <p>Product Details</p>
                <div className="p_des">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Neque, quasi?
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="view_more">
        <button>SHOW MORE</button>
      </div>
    </div>
  
  );
}
