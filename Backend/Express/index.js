import express from "express";
import cors from "cors";
import wholesalerRoute from "./routes/wholesalerRoute.js";
import retailerRoute from "./routes/retailerRoute.js";
import products from "./routes/products.js";
import payment from "./routes/payment.js";
import paymentRoute from "./routes/paymentRoute.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static("uploads"));
app.use("/uploads", express.static("./uploads"));

app.use("/wholesaler", wholesalerRoute);
app.use("/retailer", retailerRoute);
app.use("/products", products);
app.use("/cart", paymentRoute);
app.use("/payment", payment);

app.listen(8800, () => {
  console.log("Backend is connect");
});
