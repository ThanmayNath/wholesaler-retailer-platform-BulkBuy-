import { Router } from "express";
const router = Router();
import db from "../db/config.js";

router.post("/reg", async (req, res) => {
  try {
    const retailer_name = req.body.retailer_name;
    const retailer_email = req.body.retailer_email;
    const retailer_password = req.body.retailer_password;
    const retailer_address = req.body.retailer_address;
    const retailer_city = req.body.retailer_city;
  } catch (error) {}
});
