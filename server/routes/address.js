import express from "express";
import authUser from "../middleware/auth.js";
import { AddnewAddress, deletedAddress, editAddress, getAddress } from "../controller/Addrees.controller.js";
const router = express.Router();

router.post("/add", authUser, AddnewAddress);
router.get("/get", authUser, getAddress);
router.put("/update", authUser, editAddress);
router.delete("/delete", authUser, deletedAddress);

export default router;
