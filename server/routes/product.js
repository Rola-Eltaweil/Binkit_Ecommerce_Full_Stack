import express from "express";
import authUser from "../middleware/auth.js";
import Upload from "../middleware/multer.js";
import {
  createproduct,
  Deleteproduct,
  getallproduct,
  getallproductsbycategory,
  getproductbycategoryandsubcategory,
  getproductDetails,
  getproductsearch,
  updateproduct,
  UploadImageproduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.post("/createproduct", authUser, createproduct);
router.put(
  "/uploadImageproduct",
  authUser,
  Upload.single("image"),
  UploadImageproduct
);
router.post("/getallproduct", getallproduct);
router.post("/getallproductsbycategory", getallproductsbycategory);
router.post(
  "/getproductbycategoryandsubcategory",
  authUser,
  getproductbycategoryandsubcategory
);
router.post("/getproductDetails", getproductDetails);
router.put("/updateproduct", authUser, updateproduct);
router.delete("/Deleteproduct/:_id", authUser, Deleteproduct);
router.post("/getproductsearch", authUser, getproductsearch);
export default router;
