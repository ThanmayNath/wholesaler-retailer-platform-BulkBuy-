"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import "./billing.css";
import BillingLoading from "@src/components/BillingLoading/billing";
import { useRouter } from "next/navigation";

const Billing = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    orderId: "",
    gst: "",
    grandTotal: "",
  });
  const [isBillingLoading, setBillingLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const fetchBillingDetails = async () => {
      try {
        const id = localStorage.getItem("userId");
        const res = await axios.post(`http://localhost:8800/cart/proced/${id}`);
        console.log(res.data);
        setOrderDetails({
          orderId: res.data.orderId,
          gst: res.data.gst,
          grandTotal: res.data.grandTotal,
        });
        localStorage.setItem("orderId", res.data.orderId);
        localStorage.setItem("gst", res.data.gst);
        localStorage.setItem("grandTotal", res.data.grandTotal);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAllProducts = async () => {
      try {
        const id = localStorage.getItem("userId");
        const res = await axios.get(`http://localhost:8800/cart/${id}`);
        console.log(res.data);
        setCartItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllProducts();

    const isEffectExecuted = localStorage.getItem("isBillingEffectExecuted");
    if (isEffectExecuted === "false") {
      fetchBillingDetails();
      localStorage.setItem("isBillingEffectExecuted", "true");
    } else {
      setOrderDetails({
        orderId: localStorage.getItem("orderId"),
        gst: localStorage.getItem("gst"),
        grandTotal: localStorage.getItem("grandTotal"),
      });
    }

    const interval = setInterval(() => {
      const now = new Date();
      const month = now.toLocaleString("default", { month: "long" });
      const year = now.getFullYear();
      const date = now.getDate();
      const formattedDate = `${date} ${month} ${year}`;
      setCurrentDate(formattedDate);
    }, 1000);

    const timer = setTimeout(() => {
      setBillingLoading(false);
    }, 3000);

    // Dynamically add Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      document.body.removeChild(script);
    };
  }, []);

  const paymentHandler = async (e) => {
    e.preventDefault();

    const API_URL = "http://localhost:8800/payment/";
    const orderUrl = `${API_URL}order`;

    try {
      const response = await axios.post(orderUrl, {
        order_id: orderDetails.orderId,
        amount: orderDetails.grandTotal,
      });
      const { data } = response;
      const RAZOR_PAY_KEY_ID = "rzp_test_FxKRhUyEwL8vaC";

      const options = {
        key: RAZOR_PAY_KEY_ID,
        name: "BulkBuy",
        description: "Some Description",
        order_id: data.id,
        handler: async (response) => {
          try {
            const paymentId = response.razorpay_payment_id;
            const captureUrl = `${API_URL}capture/${paymentId}`;
            const captureResponse = await axios.post(captureUrl, {});
            console.log(captureResponse.data);
          } catch (err) {
            console.log(err);
          }
        },
        theme: {
          color: "#686CFD",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      try {
        const res = await axios.put("http://localhost:8800/payment", {
          order_id: orderDetails.orderId,
          retailer_id: localStorage.getItem("userId"),
        });
        console.log(res);
        localStorage.setItem("isBillingEffectExecuted", "false");
        router.push("/");
        localStorage.removeItem("orderId");
        localStorage.removeItem("gst");
        localStorage.removeItem("grandTotal");
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isBillingLoading ? (
        <>
          <div className="billing_loader">
            <BillingLoading />
          </div>
        </>
      ) : (
        <div className="billing_main">
          <div className="billing_side">
            <div className="billing_div">
              <div className="order_heading">
                <h2>
                  Order-Id <span>{orderDetails.orderId}</span>
                </h2>
                <div className="company_name">
                  <p className="company">BulkBuy</p>
                </div>
                <div className="billing_details">
                  <p className="billing_head">Billing Details:</p>
                  <p className="buyer_name">
                    {localStorage.getItem("userName")}
                  </p>
                  <p className="address">
                    Address: subash Palley, lankapara rd , Jalpaiguri, West
                    Bengal, 725204
                  </p>
                  {/* <div className="billing_date">Order Date: {currentDate}</div> */}
                </div>
              </div>
              <div className="order_itemsdiv">
                <p className="order_itemshead">Order Details</p>
                <div className="itemstitle">
                  <div className="items_name">Product Name</div>
                  <div className="itemPrice_qty">
                    <div className="items_price">Price</div>
                    <div className="items_Qty">Qty</div>
                  </div>
                  <div className="items_total">Total Amount</div>
                </div>
                {/* items list that are to be ordered  */}
                <div className="items_innerdiv">
                  {cartItems.map((item, index) => (
                    <div className="items_list" key={index}>
                      <div className="item">{item.product_name}</div>
                      <div className="itemP_qty">
                        <div className="item_p">{item.product_price}</div>
                        <div className="item_q">{item.quantity}</div>
                      </div>
                      <div className="item_t">
                        {item.product_price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grandtotal">
                  <div className="tax_div">
                    <div className="gst">GST</div>
                    <div className="Tax_charge">Rs {orderDetails.gst}</div>
                  </div>
                  <div className="grand_div">
                    <div className="grandtitle">Grand Total</div>
                    <div className="total_amount">
                      Rs {orderDetails.grandTotal}
                    </div>
                  </div>
                  <div className="final_payment">
                    <button className="Payment" onClick={paymentHandler}>
                      Pay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Billing;
