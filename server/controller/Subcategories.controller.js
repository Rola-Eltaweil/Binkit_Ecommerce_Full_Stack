import uploadImageCloudinary from "../config/cloudinary.js";
import Subcategory from "../model/subcategory.mode.js";

export const uploadImageSubcategory = async (req, res) => {
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
    const updated = await Subcategory.findByIdAndUpdate(userId, {
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

export const AddSubcategory = async (req, res) => {
  try {
    const { name, image, category } = req.body;
    if (!name || !image || !category) {
      return res.status(400).json({ message: "All feilds required" });
    }
    const createone = new Subcategory({
      name: name,
      image: image,
      category: category,
    });

    const savedsubcategory = await createone.save();
    if (!savedsubcategory) {
      return res.status(404).json({ message: "sth error" });
    }
    return res.status(200).json({
      message: "created subcategory success",
      error: false,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error || error.message, success: false, error: true });
  }
};

export const GetallSubcategory = async (req, res) => {
  try {
    const getall = await Subcategory.find()
      .sort({ createdAt: -1 })
      .populate("category");
    if (!getall) {
      return res.status(404).json({ message: "sth error" });
    }

    return res.status(200).json({
      message: "getall subcategory success",
      error: false,
      success: true,
      data: getall,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error || error.message, success: false, error: true });
  }
};

export const updateSubcategory = async (req, res) => {
  try {
    const { name, image, category, _id } = req.body;
    const payload = {};
    if (name) payload.name = name;
    if (category) payload.category = category;
    if (image) payload.image = image;

    const updated = await Subcategory.findByIdAndUpdate({ _id: _id }, payload, {
      new: true,
    });
    if (updated) {
      return res.status(200).json({
        message: "Subcategory updated succsessfully",
        error: false,
        success: true,
        data: updated,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, success: false, error: true });
  }
};

export const DeleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Subcategory.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).json({
        message: "Subcategory deleted succsessfully",
        error: false,
        success: true,
        data: deleted,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, success: false, error: true });
  }
};
