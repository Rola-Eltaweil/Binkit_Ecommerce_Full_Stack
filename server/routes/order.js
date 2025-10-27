import express from "express";
import authUser from "../middleware/auth.js";
import { getorders, PaymentCash, Paymentonline, webhooks } from "../controller/Order.controller.js";
const router = express.Router();
router.post("/PaymentCash", authUser, PaymentCash);
router.post("/Paymentonline", authUser, Paymentonline);
router.get("/getorders", authUser, getorders);

export default router;
