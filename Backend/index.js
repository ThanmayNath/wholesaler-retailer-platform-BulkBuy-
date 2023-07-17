import express from "express";
import cors from "cors";
import wholesalerAuthentication from "./routes/wholesalerAuthentication.js";
import retailerAuthentication from "./routes/retailerAuthentication.js";
import products from "./routes/products.js";
import cart from "./routes/cart.js";
import payment from "./routes/payment.js";
import orders from "./routes/orders.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static("uploads"));
app.use("/uploads", express.static("./uploads"));

app.use("/wholesaler", wholesalerAuthentication);
app.use("/retailer", retailerAuthentication);
app.use("/products", products);
app.use("/cart", cart);
app.use("/payment",payment);
app.use("/orders",orders);

app.listen(8800, () => {
  console.log("Backend is connect");
});