import { Router } from "express";
const router = Router();
import db from "../db/config.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  const query = `SELECT * FROM public.products`;
  try {
    const data = await db.query(query);
    const result = data.rows;
    return res.send(result).status(200);
  } catch (error) {
    console.log(error);
  }
});

router.post("/upload", upload.single("file"), async (req, res) => {
  const values = [
    req.body.wholesaler_id,
    req.body.category_id,
    req.body.product_name,
    req.body.product_description,
    req.body.product_price,
    req.body.product_quantity,
    req.file.path,
  ];
  const query = `INSERT INTO public.products(
        wholesaler_id, category_id, product_name, product_description, product_price, product_quantity, product_image_url)
        VALUES ($1, $2, $3, $4, $5 , $6, $7)`;
  try {
    await db.query(query, values);
    res.status(200).json({ mesage: "Uploaded the product successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while uploading the product." });
  }
});

export default router;
