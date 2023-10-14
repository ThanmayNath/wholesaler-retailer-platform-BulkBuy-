"use client";
import "./wholesellerproducts.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Page = () => {
  // modal to edit product price and stock
  const [Products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedPrice, setUpdatedPrice] = useState(0);
  const [updatedStock, setUpdatedStock] = useState(0);

  useEffect(() => {
    const featchAllNotes = async () => {
      const id = localStorage.getItem("userId");
      try {
        const res = await axios.get(`http://localhost:8000/products/${id}`, {
          headers: { "x-access-token": Cookies.get("token") },
        });
        console.log(res.data);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    featchAllNotes();
  }, []);

  // opening modal for product edit
  const openModal = (product) => {
    setSelectedProduct(product);
    setUpdatedPrice(product.product_price); // Set initial value for updated price
    setUpdatedStock(product.product_quantity); // Set initial value for updated stock
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent in the request body
    const data = {
      product_id: selectedProduct.product_id,
      product_quantity: updatedStock,
      product_price: updatedPrice,
    };

    try {
      // Send the PUT request to update the product
      const res = await axios.put(
        "http://localhost:8000/products/update",
        data,
        {
          headers: { "x-access-token": Cookies.get("token") },
        }
      );
      if (res.status === 200) {
        console.log(res.data.message);
        toast.success(res.data.message, {
          icon: "✅",
          position: "top-center",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });

        // Delay the page reload by 2000 milliseconds (2 seconds)
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }

      // Close the modal and update the product list
      //closeModal();
      // You may want to fetch the updated product list again using your existing API call or update the specific product in the list manually
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="wholeseller_products">
        <h1>Products Listed</h1>

        <div className="products_list">
          {Products.map((product) => (
            <div className="Products_card" key={product.id}>
              <div className="edit_button">
                <button onClick={() => openModal(product)}>Edit</button>
              </div>
              <div className="Product_image">
                <Image
                  src={`http://localhost:8800/${product.product_image_url}`}
                  width={140}
                  height={120}
                  alt={product.product_name}
                />
              </div>
              <div className="Product_head">
                <p>{product.product_name}</p>
              </div>
              <div className="available_stock">
                <p>Available Stocks: {product.product_quantity}</p>
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
                  <button className="update_data" onClick={handleSubmit}>
                    Update
                  </button>
                </form>
              </>
            )}
            <button className="close_btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
