import uploadImageCloudinary from "../config/cloudinary.js";
import category from "../model/category.model.js";
import Category from "../model/category.model.js";
import  Subcategories from '../model/subcategory.mode.js'
import Prodcut from "../model/product.model.js";

export const uploadImagecategory = async (req, res) => {
  try {
    const image = req.file;
    const userId = req.userId;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "unauthorized", success: false, error: true });
    }

    const uploaded = await uploadImageCloudinary(image);
    if (!uploaded) {
      return res.status(400).json({
        message: "sth went wrong",
        success: false,
        error: true,
      });
    }
    const updated = await Category.findByIdAndUpdate(userId, {
      image: uploaded.url,
    });
    return res.status(200).json({
      message: "image uploaded successfully",
      success: true,
      error: false,
      data: { image: uploaded.url },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, success: false, error: true });
  }
};

export const Addcategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !image) {
      return res
        .status(404)
        .json({ message: "All fields required ", success: false, error: true });
    }

    const createcategory = new Category({
      name: name,
      image: image,
    });
    const newCategorey = await createcategory.save();
    if (!newCategorey) {
      return res.status(404).json({
        message: "sth went wrong ",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: "created category succsessfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, success: false, error: true });
  }
};

export const Getcategories = async (req, res) => {
  try {
    const Getall = await Category.find().sort({createdAt:-1});
    if (!Getall) {
      return res.status(500).json({
        message: "No categories exist yet !",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({ data: Getall, success: true, error: false });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const updatecategory = async (req, res) => {
  try {
    const { name, image, _id } = req.body;
    const payload = {};
    if (name) payload.name = name;
    if (image) payload.image = image;
    const updatedoone = await Category.findByIdAndUpdate(
      { _id: _id },
      payload,
      { new: true }
    );
    return res
      .status(200)
      .json({
        message: "Updated category success",
        dataupdated: updatedoone,
        success: true,
        error: false,
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};


// check if there is subcatagory and product related to this category
export const Deletecategory = async (req, res) => {
  try {
    const id  = req.params.id;
    const checkcategories = await Subcategories.find({
      category : {
        $in: [id]
      },
    }).countDocuments();
    const checkproduct = await Prodcut.find({
      Category:{
        $in:[id]
      },
    }).countDocuments();
    if(checkcategories > 0 || checkproduct > 0){
      return res.status(400).json({
        message:"Category is already use , can't delete ",
        error:true,
        success:false
      })
    }

    const deletecategory = await Category.findByIdAndDelete({_id:id})
    return res.status(200).json({message:'Delete Category Successfully' , Datadeleted : deletecategory ,error:false ,success:true })

   
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
