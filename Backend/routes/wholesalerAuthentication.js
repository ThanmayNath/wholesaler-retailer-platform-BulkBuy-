import { Router } from "express";
const router = Router();
import bcrypt from "bcryptjs";
import db from "../db/config.js";

router.post("/reg", async (req, res) => {
  try {
    const wholesaler_email = req.body.email;
    // Check if wholesaler exists
    const checkQuery = `SELECT * FROM public.wholesalers WHERE wholesaler_email=$1`;
    const checkResult = await db.query(checkQuery, [wholesaler_email]);
    if (checkResult.rows.length > 0) {
      return res.status(409).json({ error: "wholesaler already exists." });
    }
    // Create new wholesaler account

    const wholesaler_password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(wholesaler_password, salt);

    const query = `
  INSERT INTO public.wholesalers (wholesaler_name, wholesaler_email, wholesaler_password, wholesaler_number)
  VALUES ($1, $2, $3, $4)
`;

    const values = [
      req.body.name,
      wholesaler_email,
      hashedPassword,
      req.body.number,
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

router.post("/login", async (req, res) => {
  const wholesaler_email = req.body.email;
  const wholesaler_password = req.body.password;

  try {
    const query = `
      SELECT wholesaler_password,wholesaler_id
      FROM public.wholesalers
      WHERE wholesaler_email = $1
    `;

    const result = await db.query(query, [wholesaler_email]);

    if (result.rows.length === 0) {
      // No user found with the provided email
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const storedPassword = result.rows[0].wholesaler_password;
    const isMatch = await bcrypt.compare(wholesaler_password, storedPassword);

    if (isMatch) {
      const ID = result.rows[0].wholesaler_id;
      // Passwords match, authentication successful
      res.status(200).json({ message: "Authentication successful", id: ID });
    } else {
      // Passwords don't match, authentication failed
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during login" });
  }
});

export default router;
