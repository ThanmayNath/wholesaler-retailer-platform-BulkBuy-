import { Router } from "express";
const router = Router();
import db from "../db/config.js";
import verifyJWT from "../Token/jwt.js";

router.post("/proced/:id", verifyJWT, async (req, res) => {
  try {
    const retailer_id = req.params.id;
    const delivery_status = 0;
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let order_id = "#";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      order_id += characters[randomIndex];
    }
    const date = new Date();
    const order_date = date.toISOString().split("T")[0];
    const status = "pending";
    const values = [order_id, retailer_id, order_date, status];
    const query = `SELECT cart.product_id, cart.quantity, products.product_price
    FROM public.cart 
    INNER JOIN public.products ON cart.product_id = products.product_id
    WHERE cart.retailer_id = $1`;
    const cartDetails = await db.query(query, [retailer_id]);
    const cartItems = cartDetails.rows;
    console.log(cartItems);
    const orders = `
  INSERT INTO orders (order_id, retailer_id, order_date, order_status)
  VALUES ($1, $2, $3,$4)`;
    await db.query(orders, values);
    let total_amount = 0;
    for (const cartItem of cartItems) {
      const { product_id, quantity } = cartItem;
      const unit_price = cartItem.product_price;
      const total_price = unit_price * quantity;
      total_amount = total_amount + total_price;
      console.log(product_id, quantity, unit_price, total_price);
      const orderItems = `INSERT INTO public.order_items(
        order_id, product_id, quantity, unit_price, total_price, delivery_status)
        VALUES ($1, $2, $3, $4, $5, $6)`;
      await db.query(orderItems, [
        order_id,
        product_id,
        quantity,
        unit_price,
        total_price,
        delivery_status,
      ]);
    }
    const updateTotalamount = `UPDATE public.orders
    SET total_amount = $1, payment_status=$2
    WHERE order_id = $3`;
    await db.query(updateTotalamount, [total_amount, status, order_id]);
    const GST = (5 / 100) * total_amount;
    total_amount = GST + total_amount;
    res.status(200).json({
      mesage: "Transaction to order itemns is successfully completed.",
      orderId: order_id,
      gst: GST,
      grandTotal: total_amount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while Buying products" });
  }
});

export default router;
