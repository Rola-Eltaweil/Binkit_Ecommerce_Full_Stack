import express from "express";
import authUser from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import {
  AddSubcategory,
  DeleteSubcategory,
  GetallSubcategory,
  updateSubcategory,
  uploadImageSubcategory,
} from "../controller/Subcategories.controller.js";

const router = express.Router();
router.put(
  "/uploadimage",
  authUser,
  upload.single("image"),
  uploadImageSubcategory
);
router.post("/AddSubcategory", authUser, AddSubcategory);
router.get("/GetallSubcategory", GetallSubcategory);
router.put("/updateSubcategory", authUser, updateSubcategory);
router.delete("/DeleteSubcategory/:id", authUser, DeleteSubcategory);

export default router;
