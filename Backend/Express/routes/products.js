import { Router, query } from "express";
const router = Router();
import db from "../db/config.js";
import multer from "multer";
import verifyJWT from "../Token/jwt.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).array("files", 3); // Allow uploading up to 3 files

router.post("/upload", verifyJWT, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "An error occurred while uploading the images." });
    }

    const files = req.files; // Array of uploaded files
    const filePaths = files.map((file) => file.path);

    const values = [
      req.body.wholesaler_id,
      req.body.category_id,
      req.body.product_name,
      req.body.product_description,
      req.body.product_price,
      req.body.product_quantity,
      filePaths[0], // First image URL
      filePaths[1], // Second image URL
      filePaths[2], // Third image URL
    ];

    console.log(values);

    const query = `INSERT INTO public.products(
      wholesaler_id, category_id, product_name, product_description, product_price, product_quantity, 
      product_image_url, product_image_url2, product_image_url3)
      VALUES ($1, $2, $3, $4, $5 , $6, $7, $8, $9)`;

    try {
      await db.query(query, values);
      res.status(200).json({ message: "Uploaded the product successfully." });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while uploading the product." });
    }
  });
});

export default router;