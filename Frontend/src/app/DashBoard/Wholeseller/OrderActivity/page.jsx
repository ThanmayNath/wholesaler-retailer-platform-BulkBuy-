"use client";
import React, { useState, useEffect } from "react";
import "./OrderActivity.css";
import { MdVerified } from "react-icons/md";
import axios from "axios";
import Cookies from "js-cookie";

const Page = () => {
  const dummyOrder = [
    {
      product_name: "Coca-Cola",
      Retailer_name: "Ranjit Chhetri",
      product_qty: "500/ Qty",
      product_total: "Rs 25000",
      retailer_address: "15th Main, Green Gardens, Sector-4, New Delhi, 110011",
      retailer_contact_number: "9876543210",
    },
    {
      product_name: "Sprite",
      Retailer_name: "Ranjit Chhetri",
      product_qty: "200/ Qty",
      product_total: "Rs 12000",
      retailer_address: "22, Elm Street, Oakville, Ontario, L6J 7T7, Canada",
      retailer_contact_number: "1234567890",
    },
    {
      product_name: "Fanta",
      Retailer_name: "Ranjit Chhetri",
      product_qty: "150/ Qty",
      product_total: "Rs 18000",
      retailer_address: "17 Baker Street, London, W1U 8ED, United Kingdom",
      retailer_contact_number: "9876543210",
    },
    {
      product_name: "Mountain Dew",
      Retailer_name: "Ranjit Chhetri",
      product_qty: "300/ Qty",
      product_total: "Rs 22000",
      retailer_address: "1234 Main Street, Anytown, USA, 54321",
      retailer_contact_number: "555-123-4567",
    },
  ];
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("Pending");
  const [orderComfirm, setOrderComfirm] = useState(false);
  const [order_items_id, setOrder_items_id] = useState();
  const [confirmationModal, setConfirmationModal] = useState(false); // New state for confirmation modal
  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const wholesaler_id = localStorage.getItem("userId");
        const res = await axios.get(
          `http://localhost:8000/orders/orderDetails/${wholesaler_id}`,
          {
            headers: { "x-access-token": Cookies.get("token") },
          }
        );
        console.log(res.data);
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllOrders();
  }, []);

  //  tab toggle
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const handleToggleChange = (id) => {
    setOrder_items_id(id);
    setConfirmationModal(true);
    disableScroll();
  };

  const handleConfirmation = async (comfirm, id) => {
    setConfirmationModal(false);
    enableScroll();
    if (comfirm === "yes") {
      const id = order_items_id;
      const orderIndex = orders.findIndex(
        (order) => order.order_items_id === id
      );

      if (orderIndex === -1) {
        console.log("Order not found.");
        return;
      }

      // Update the order with delivery_status set to true
      const updatedOrders = [...orders];
      updatedOrders[orderIndex] = {
        ...updatedOrders[orderIndex],
        delivery_status: true,
      };
      try {
        const token = Cookies.get("token");
        console.log(token);
        const res = await axios.patch(
          `http://localhost:8000/orders/delivery/${order_items_id}`,
          {
            headers: { "x-access-token": token },
          }
        );
      } catch (error) {
        console.log(error);
      }
      setOrders(updatedOrders);
      setOrderComfirm(true);
    } else {
      setOrderComfirm(false);
    }
  };

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableScroll = () => {
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className="order_activitymain">
        <div className="activity_tab">
          <div className="activity_button">
            <button
              className={activeTab === "Pending" ? "active" : ""}
              onClick={() => toggleTab("Pending")}
            >
              Pending
            </button>
            <button
              className={activeTab === "Delivered" ? "active" : ""}
              onClick={() => toggleTab("Delivered")}
            >
              Delivered
            </button>
          </div>
        </div>
        {/* // pending card  */}
        <div className="activity_card">
          {activeTab === "Pending" ? (
            <div className="card_div">
              {orders.map((order) =>
                !order.delivery_status ? (
                  <div key={order.order_items_id} className="card">
                    {/* Order details */}
                    <div className="upper_order">
                      <div className="product_name">{order.product_name}</div>
                      <div className="product_qty">{order.quantity}/ Qty</div>
                      <div className="product_total">
                        Rs {order.total_price}
                      </div>
                    </div>
                    <div className="lower_order">
                      <div className="order_details">
                        <p className="deliver_to">Deliver to</p>
                        <div className="retailer_name">
                          {order.retailer_name}
                        </div>
                        <p className="retailer_address">
                          {order.retailer_address}
                        </p>
                        <p className="retailer_contact_number">
                          {order.retailer_number}
                        </p>
                      </div>
                      <div className="order_status">
                        <p className="order_pending">Status</p>
                        <div className="order_complete">
                          <button
                            class="button"
                            onClick={() =>
                              handleToggleChange(order.order_items_id)
                            }
                          >
                            <span class="button-content">Completed</span>
                          </button>
                          {/* <button
                            onClick={() =>
                              handleToggleChange(order.order_items_id)
                            }
                          >
                            completed
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          ) : (
            // delivered orders
            <div className="card_div">
              {orders.map((order) =>
                order.delivery_status ? (
                  <div key={order.order_items_id} className="card">
                    <div className="upper_order">
                      <div className="product_name">{order.product_name}</div>
                      <div className="product_qty">{order.quantity}/ Qty</div>
                      <div className="product_total">
                        Rs {order.total_price}
                      </div>
                    </div>
                    <div className="lower_order">
                      <div className="order_details">
                        <p className="deliver_to">Deliver to</p>
                        <div className="retailer_name">
                          {order.retailer_name}
                        </div>
                        <p className="retailer_address">
                          {order.retailer_address}
                        </p>
                        <p className="retailer_contact_number">
                          {order.retailer_number}
                        </p>
                      </div>
                      <div className="order_status">
                        <p className="order_pending">Status</p>
                        <div className="order_success">
                          {/* <Image
                          src={"/order.jpeg"}
                          width={45}
                          height={45}
                          alt="order_complete"
                        ></Image> */}
                          <h1 className="veri">
                            <MdVerified />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>

        {confirmationModal && (
          <div className="order_comfirm">
            <div className="order_comfirm_card">
              <h2>Are You Sure ? </h2>
              <div className="comfirm_buttons">
                <button
                  className="yes_button"
                  onClick={() => handleConfirmation("yes")}
                >
                  Yes
                </button>
                <button
                  className="no_button"
                  onClick={() => handleConfirmation("no")}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
