import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db/config.js";

const retailerLogin = async (req, res) => {
  const retailer_email = req.body.email;
  const retailer_password = req.body.password;

  try {
    const query = `
        SELECT retailer_password,retailer_id,retailer_name,retailer_address,retailer_city
        FROM public.retailers
        WHERE retailer_email = $1
      `;

    const result = await db.query(query, [retailer_email]);

    if (result.rows.length === 0) {
      // No user found with the provided email
      return res.status(401).json({
        message: "No user found with the provided email",
        error: "Invalid retailer credentials",
      });
    }

    const storedPassword = result.rows[0].retailer_password;
    const isMatch = await bcrypt.compare(retailer_password, storedPassword);

    if (isMatch) {
      // Passwords match, authentication successful
      const uid = result.rows[0].retailer_id;
      const un = result.rows[0].retailer_name;
      const token = jwt.sign({ uid, un }, "jwtSecret", {
        expiresIn: 86400,
      });
      res.status(200).json({
        message: "Retailer authentication successful",
        user: "retailer",
        id: result.rows[0].retailer_id,
        name: result.rows[0].retailer_name,
        address: result.rows[0].retailer_address,
        city: result.rows[0].retailer_city,
        token: token,
      });
    } else {
      // Passwords don't match, authentication failed
      res.status(401).json({
        message: "Passwords don't match",
        error: "Invalid retailer credentials",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during login" });
  }
};

const retailerReg = async (req, res) => {
  try {
    const retailer_email = req.body.email;

    // Check if retailer exists
    const checkQuery = `
        SELECT * FROM public.retailers WHERE retailer_email = $1
      `;
    const checkResult = await db.query(checkQuery, [retailer_email]);

    if (checkResult.rows.length > 0) {
      return res.status(409).json({ error: "Retailer already exists." });
    }
    // Create new retailer account
    const retailer_password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(retailer_password, salt);
    const values = [
      req.body.name,
      retailer_email,
      hashedPassword,
      req.body.number,
    ];
    const insertQuery = `
        INSERT INTO public.retailers (retailer_name, retailer_email, retailer_password, retailer_number)
        VALUES ($1, $2, $3, $4)
      `;
    await db.query(insertQuery, values);
    res.status(200).json({ message: "Retailer registered successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the retailer." });
  }
};

export default { retailerLogin, retailerReg };
