import express from "express";
import cors from "cors";
import multer from "multer";
import wholesalerAuthentication from "./routes/wholesalerAuthentication.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/wholesaler", wholesalerAuthentication);

app.listen(8800, () => {
  console.log("Backend is connect");
});
