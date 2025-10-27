
import express from 'express'
import authUser from "../middleware/auth.js";
import Upload from '../middleware/multer.js'
import { Addcategory, Deletecategory, Getcategories, updatecategory, uploadImagecategory } from '../controller/category.controller.js';
const router = express.Router();

router.put('/uploadImage' , authUser ,Upload.single('image') , uploadImagecategory)
router.post("/addcategory", authUser, Addcategory);
router.get("/Getcategories", Getcategories);
router.put("/updatecategory", authUser, updatecategory);
router.delete("/Deletecategory/:id", authUser, Deletecategory);

export default router;
