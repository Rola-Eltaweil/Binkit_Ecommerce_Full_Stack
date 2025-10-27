import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import { DataBase } from "./config/DataBase.js";
import User from "./routes/user.js";
import Category from "./routes/category.js";
import product from "./routes/product.js";
import cart from "./routes/Cart.js";
import Address from "./routes/address.js";
import subCategory from "./routes/subcategory.js";
import Order from "./routes/order.js";
import cookieParser from "cookie-parser";
import path from "path";
import { webhooks } from "./controller/Order.controller.js";

dotenv.config();

const app = express();

// ✅ أول شيء: سجل webhook قبل أي body parser
app.post(
  "/api/order/webhooks",
  express.raw({ type: "application/json" }),
  webhooks
);

// ✅ بعدين باقي الميدل وير
app.use(morgan("dev"));
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: [process.env.FRONTED_URL_ONE, process.env.FRONTED_URL_TWO],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ بعد الويبهوك، فعّل JSON parsers
app.use(express.json());
app.use(bodyParser.json());

// ✅ بعدين باقي الراوترات
app.use("/api/user", User);
app.use("/api/category", Category);
app.use("/api/subcategory", subCategory);
app.use("/api/product", product);
app.use("/api/cart", cart);
app.use("/api/address", Address);
app.use("/api/order", Order);

// ✅ React build
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../client/dist")));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

const PORT = process.env.PORT;

DataBase().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
});
