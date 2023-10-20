import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db/config.js";

const wholesalerLogin = async (req, res) => {
  const wholesaler_email = req.body.email;
  const wholesaler_password = req.body.password;

  try {
    const query = `
        SELECT wholesaler_password,wholesaler_id,wholesaler_name,wholesaler_address,wholesaler_city
        FROM public.wholesalers
        WHERE wholesaler_email = $1
      `;

    const result = await db.query(query, [wholesaler_email]);

    if (result.rows.length === 0) {
      // No user found with the provided email
      return res.status(401).json({
        message: "No user found with the provided email",
        error: "Invalid credentials",
      });
    }

    const storedPassword = result.rows[0].wholesaler_password;
    const isMatch = await bcrypt.compare(wholesaler_password, storedPassword);

    if (isMatch) {
      // Passwords match, authentication successful
      const uid = result.rows[0].wholesaler_id;
      const un = result.rows[0].wholesaler_name;
      const token = jwt.sign({ uid, un }, "jwtSecret", {
        expiresIn: 86400,
      });
      res.status(200).json({
        message: "wholesaler Authentication successful",
        user: "wholesaler",
        id: result.rows[0].wholesaler_id,
        name: result.rows[0].wholesaler_name,
        address: result.rows[0].wholesaler_address,
        city: result.rows[0].wholesaler_city,
        token: token,
      });
    } else {
      // Passwords don't match, authentication failed
      res.status(401).json({
        message: "Passwords don't match",
        error: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during login" });
  }
};

const wholesalerReg = async (req, res) => {
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
};

export default { wholesalerLogin, wholesalerReg };
