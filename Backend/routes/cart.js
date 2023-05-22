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
    console.log(result);
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
    res.status(200).json({ mesage: "Added to Cart successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding product to cart" });
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
