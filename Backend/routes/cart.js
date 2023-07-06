import { Router } from "express";
const router = Router();
import db from "../db/config.js";

router.get("/:id", async (req, res) => {
  const values = [req.params.id];
  const query = `SELECT cart.cart_id, cart.product_id, cart.quantity, products.product_name, products.product_price,products.product_description,products.product_image_url
  FROM public.cart 
  INNER JOIN public.products ON cart.product_id = products.product_id
  WHERE cart.retailer_id = $1`;
  try {
    const data = await db.query(query, values);
    const result = data.rows;
    return res.send(result).status(200);
  } catch (error) {
    console.log(error);
  }
});

router.post("/add", async (req, res) => {
  const values = [req.body.retailer_id, req.body.product_id, req.body.quantity];
  const query = `INSERT INTO public.cart(
        retailer_id, product_id, quantity)
        VALUES ($1, $2, $3)`;
  try {
    await db.query(query, values);
    res.status(200).json({ message: "Added to Cart successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding product to cart" });
  }
});

router.post("/proced/:id", async (req, res) => {
  try {
    const retailer_id = req.params.id;
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
        order_id, product_id, quantity, unit_price, total_price)
        VALUES ($1, $2, $3, $4, $5)`;
      await db.query(orderItems, [
        order_id,
        product_id,
        quantity,
        unit_price,
        total_price,
      ]);
    }
    const updateTotalamount = `UPDATE public.orders
    SET total_amount = $1, payment_status=$2
    WHERE order_id = $3`;
    await db.query(updateTotalamount, [total_amount, status, order_id]);
    res.status(200).json({
      mesage: "Transaction to order itemns is successfully completed.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while Buying products" });
  }
});

router.patch("/:id", async (req, res) => {
  const values = [req.body.quantity, req.params.id];
  const query = `UPDATE public.cart
  SET quantity = $1
  WHERE cart_id = $2`;
  try {
    await db.query(query, values);
    res.status(200).json({ mesage: "Updated quantity successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while Updated quantity" });
  }
});

router.delete("/:id", async (req, res) => {
  const values = [req.params.id];
  const query = `DELETE FROM public.cart
	WHERE cart_id = $1;`;
  try {
    await db.query(query, values);
    res.status(200).json({ mesage: "Deleted from cart successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting product from cart" });
  }
});

export default router;
