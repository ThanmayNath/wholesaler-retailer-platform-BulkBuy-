"use client";
import "./wholesellerproducts.css";
import Image from "next/image";
import ListedProduct from "@src/utils/ListedProduct";
import { useState } from "react";

const Page = () => {
  // modal to edit product price and stock
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedPrice, setUpdatedPrice] = useState(0);
  const [updatedStock, setUpdatedStock] = useState(0);

  // opening modal for product edit
  const openModal = (product) => {
    setSelectedProduct(product);
    setUpdatedPrice(product.price); // Set initial value for updated price
    setUpdatedStock(product.stock); // Set initial value for updated stock
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePriceChange = (e) => {
    setUpdatedPrice(e.target.value);
  };

  const handleStockChange = (e) => {
    setUpdatedStock(e.target.value);
  };

  return (
    <>
      <div className="wholeseller_products">
        <h1>Products Listed</h1>

        <div className="products_list">
          {ListedProduct.map((product) => (
            <div className="Products_card" key={product.id}>
              <div className="edit_button">
                <button onClick={() => openModal(product)}>Edit</button>
              </div>
              <div className="Product_image">
                <Image
                  src={product.image}
                  width={140}
                  height={120}
                  alt={product.name}
                />
              </div>
              <div className="Product_head">
                <p>{product.name}</p>
              </div>
              <div className="available_stock">
                <p>Available Stocks: {product.stock}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Product</h2>
            {selectedProduct && (
              <>
                <form action="">
                  <p>{selectedProduct.name}</p>
                  <label htmlFor="">Update Price</label>
                  <input
                    type="number"
                    id="update-price"
                    value={updatedPrice}
                    onChange={handlePriceChange}
                    min={0}
                    step={0.01}
                  />
                  <label htmlFor="">Update Stocks</label>
                  <input
                    type="number"
                    id="update-stock"
                    value={updatedStock}
                    onChange={handleStockChange}
                    min={0}
                  />
                  <button className="update_data" onClick="submit">Update</button>
                </form>
              </>
            )}
            <button  className="close_btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
