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
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
}

// For serverless platforms (like Vercel) we must NOT call `app.listen`.
// Instead export a handler that can be invoked per-request. Connect to
// the database at module initialization so the connection is available
// for requests.

// Start DB connection (don't start a listening server here)
DataBase()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("DB connection error:", err));

// Export a handler for Vercel's serverless runtime. Vercel's `@vercel/node`
// builder will call this exported function for incoming requests. We forward
// the call to the express app instance.
export default function handler(req, res) {
  return app(req, res);
}
