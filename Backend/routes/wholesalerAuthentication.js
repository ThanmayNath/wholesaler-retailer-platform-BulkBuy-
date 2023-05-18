import { Router } from "express";
const router = Router();
import db from "../db/config.js";

router.post("/", async (req, res) => {
  try {
    const wholesaler_name = req.body.wholesaler_name;
    const wholesaler_email = req.body.wholesaler_email;
    const wholesaler_password = req.body.wholesaler_password;
    const wholesaler_address = req.body.wholesaler_address;
    const wholesaler_city = req.body.wholesaler_city;
    console.log(wholesaler_name);

    const query = `
  INSERT INTO public.wholesalers (wholesaler_name, wholesaler_email, wholesaler_password, wholesaler_address, wholesaler_city)
  VALUES ($1, $2, $3, $4, $5)
`;

    const values = [
      wholesaler_name,
      wholesaler_email,
      wholesaler_password,
      wholesaler_address,
      wholesaler_city,
    ];

    await db.query(query, values);

    res.status(200).json({ message: "Wholesaler registered successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the wholesaler." });
  }
});

export default router;
