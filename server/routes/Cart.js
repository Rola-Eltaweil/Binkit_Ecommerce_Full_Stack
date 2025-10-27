import express from "express";
import authUser from "../middleware/auth.js";
import { AddToCart, deletedproductfromcart, getItemfromcart, updatecartquantity } from "../controller/ShoppingCart.controller.js";

const router = express.Router();
router.post("/create", authUser, AddToCart);
router.get("/getallfromcart", authUser, getItemfromcart);
router.put("/updatecartquantity", authUser, updatecartquantity);
router.delete("/deletedproductfromcart", authUser, deletedproductfromcart);

export default router;
