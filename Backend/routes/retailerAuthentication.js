import { Router } from "express";
const router = Router();
import bcrypt from "bcryptjs";
import db from "../db/config.js";

router.post("/reg", async (req, res) => {
  try {
    /*const retailer_name = req.body.retailer_name;
    const retailer_email = req.body.retailer_email;
    const retailer_password = req.body.retailer_password;
    const retailer_address = req.body.retailer_address;
    const retailer_city = req.body.retailer_city;*/
    const retailer_password = req.body.retailer_password;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(retailer_password, salt);
    const values = [
      req.body.retailer_name,
      req.body.retailer_email,
      hashedPassword,
      req.body.retailer_address,
      req.body.retailer_city,
    ];
    const query = `
    INSERT INTO public.retailers (retailer_name, retailer_email, retailer_password, retailer_address, retailer_city)
    VALUES ($1, $2, $3, $4, $5)
    `;
    await db.query(query, values);
    res.status(200).json({ message: "retailer registered successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the retailer." });
  }
});

router.post("/login", async (req, res) => {
  const retailer_email = req.body.retailer_email;
  const retailer_password = req.body.retailer_password;

  try {
    const query = `
      SELECT retailer_password, retailer_id
      FROM public.retailers
      WHERE retailer_email = $1
    `;

    const result = await db.query(query, [retailer_email]);

    if (result.rows.length === 0) {
      // No user found with the provided email
      return res.status(401).json({ error: "Invalid retailer credentials" });
    }

    const storedPassword = result.rows[0].retailer_password;
    const isMatch = await bcrypt.compare(retailer_password, storedPassword);

    if (isMatch) {
      const ID = result.rows[0].retailer_id;
      // Passwords match, authentication successful
      res
        .status(200)
        .json({ message: "Retailer authentication successful", id: ID });
    } else {
      // Passwords don't match, authentication failed
      res.status(401).json({ error: "Invalid retailer credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during login" });
  }
});

export default router;
