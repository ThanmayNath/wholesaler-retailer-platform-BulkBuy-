import { Router } from "express";
const router = Router();
import db from "../db/config.js";

router.get("/:id", async (req, res) => {
  try {
    const values = [req.params.id,"Completed"];
    const query=`SELECT order_id, order_date, order_status, total_amount
	FROM public.orders WHERE retailer_id=$1 AND payment_status=$2`;
    const data = await db.query(query, values);
    const result = data.rows;
    return res.send(result).status(200);
  } catch (error) {
    console.log(error);
  }
});

export default router;
