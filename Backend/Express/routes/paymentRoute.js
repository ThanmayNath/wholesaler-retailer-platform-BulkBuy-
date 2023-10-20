import { Router } from "express";
const router = Router();
import db from "../db/config.js";
import verifyJWT from "../Token/jwt.js";
import "dotenv/config";
import Razorpay from "razorpay";
import axios from "axios";
import payment from "../controllers/payment.js";

router.post("/proced/:id", verifyJWT, payment.proceedToPay);

const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

router.post("/order", async (req, res) => {
  try {
    const { order_id, amount } = req.body;
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: order_id,
      payment_capture: 0,
    };
    const order = await instance.orders.create(options);
    if (!order)
      return res.status(500).json({
        error: "rozor error",
      });
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "An error occurred while updating and deleteing items",
    });
  }
});

router.post("/capture/:paymentId", (req, res) => {
  try {
    const { amount } = req.body;
    const { paymentId } = req.params;
    const retailer_id = req.body.retailer_id;
    const order_id = req.body.order_id;
    console.log(amount, paymentId);
    axios
      .post(
        `https://${process.env.KEY_ID}:${process.env.KEY_SECRET}@api.razorpay.com/v1/payments/${paymentId}/capture`,
        {
          amount: amount * 100,
          currency: "INR",
        }
      )
      .then((response) => {
        console.log("Status:", response.status);
        console.log("Data:", response.data);
        updatePaymentStatus(retailer_id, order_id);
        return res.status(200).json(response.data);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: "Something Went Wrong",
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
});

const updatePaymentStatus = async (retailer_id, order_id) => {
  try {
    // console.log("run", retailer_id, order_id);
    const status = "Completed";
    const paymentQuery = `UPDATE public.orders
              SET payment_status=$1
              WHERE order_id = $2`;
    await db.query(paymentQuery, [status, order_id]);
    const deleteCartItramsQuery = `DELETE FROM public.cart
            WHERE retailer_id = $1`;
    await db.query(deleteCartItramsQuery, [retailer_id]);
  } catch (error) {
    console.log(error);
  }
};

export default router;
