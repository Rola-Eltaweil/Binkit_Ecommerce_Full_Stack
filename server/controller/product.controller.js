import uploadImageCloudinary from "../config/cloudinary.js";
import Prodcut from "../model/product.model.js";

export const UploadImageproduct = async (req, res) => {
  try {
    const image = req.file;
    const userId = req.userId;
    if (!userId) {
      return res
        .status(404)
        .json({ message: "not authorized", error: true, success: true });
    }
    const uploaded = await uploadImageCloudinary(image);
    if (!uploaded) {
      return res.status(404).json({
        message: "error by uploading",
        error: true,
        success: true,
      });
    }

    const updatedproduct = await Prodcut.findByIdAndUpdate(
      userId,
      { $push: { image: uploaded.url } },
      { new: true }
    );

    return res.status(200).json({
      message: "uploaded product image success",
      error: false,
      success: true,
      data: [{ image: uploaded.url }],
    });
  } catch (error) {
    return res.status(500).json({
      message: error || error.message,
      success: false,
      error: true,
    });
  }
};

export const createproduct = async (req, res) => {
  try {
    const {
      name,
      image,
      Category,
      Subcategorey,
      price,
      unit,
      stock,
      discount,
      descreption,
      more_details,
      publish,
    } = req.body;

    if (
      !name ||
      !image[0] ||
      !Category[0] ||
      !Subcategorey[0] ||
      !price ||
      !unit ||
      !descreption
    ) {
      return res.status(404).json({
        message: "Enter required feild ",
        error: true,
        success: false,
      });
    }

    const created = new Prodcut({
      name,
      image,
      Category,
      Subcategorey,
      price,
      unit,
      stock,
      discount,
      descreption,
      more_details,
      publish,
    });

    const productnew = await created.save();
    if (productnew) {
      return res.status(200).json({
        message: "created product successfully",
        error: false,
        success: true,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: error || error.message, success: false, error: true });
  }
};

export const getallproduct = async (req, res) => {
  try {
    let { limit, page, search } = req.body;
    if (!limit) {
      limit = 10;
    }
    if (!page) {
      page = 1;
    }

    const query = search
      ? {
          $text: {
            $search: search,
          },
        }
      : {};

    const skip = (page - 1) * limit;

    const [data, totaldataCount] = await Promise.all([
      Prodcut.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("Category Subcategorey"),
      Prodcut.countDocuments(query),
    ]);
    return res.status(200).json({
      data: data,
      Totalcount: totaldataCount,
      TotalpageNo: Math.ceil(totaldataCount / limit),
      success: true,
      error: false,
      message: "Get all products",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, success: false, error: true });
  }
};

export const getallproductsbycategory = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(404).json({ message: "No category " });
    }

    const getall = await Prodcut.find({
      Category: { $in: id },
    }).limit(15);
    return res.status(200).json({
      message: "get all products",
      data: getall,
      success: true,
      error: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error || error.message, error: true, success: false });
  }
};

export const getproductbycategoryandsubcategory = async (req, res) => {
  try {
    const { cattegoryId, subcategoryId } = req.body;
    let { page, limit } = req.body;
    if (!cattegoryId || !subcategoryId) {
      return res.status(404).json({
        message: "provide categoryID and sub catgeoryId",
        success: false,
        error: true,
      });
    }
    if (!page) {
      page = 1;
    }

    if (!limit) {
      limit = 10;
    }

    const skip = (page - 1) * limit;
    const [data, countdata] = await Promise.all([
      Prodcut.find({
        Category: { $in: cattegoryId },
        Subcategorey: { $in: subcategoryId },
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Prodcut.countDocuments({
        Category: { $in: cattegoryId },
        Subcategorey: { $in: subcategoryId },
      }),
    ]);

    return res.status(200).json({
      message: "get product by category and sub",
      success: true,
      error: false,
      data: data,
      page: page,
      Alldatacount: countdata,
      limit: limit,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error || error.message, success: false, error: true });
  }
};

export const getproductDetails = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res
        .status(404)
        .json({ message: "provide productId", success: false, error: true });
    }
    const findproduct = await Prodcut.findById(productId);
    return res.status(200).json({
      message: "get product details",
      success: true,
      error: false,
      data: findproduct,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error || error.message, success: false, error: true });
  }
};

export const updateproduct = async (req, res) => {
  try {
    const {
      _id,
      name,
      image,
      Category,
      Subcategorey,
      price,
      unit,
      stock,
      discount,
      descreption,
      more_details,
      publish,
    } = req.body;
    if (!_id) {
      return res
        .status(404)
        .json({ message: "provide productId", success: false, error: true });
    }
    let payload = {};
    if (name) payload.name = name;
    if (image) payload.image = image;
    if (Category) payload.Category = Category;
    if (Subcategorey) payload.Subcategorey = Subcategorey;
    if (price) payload.price = price;
    if (unit) payload.unit = unit;
    if (stock) payload.stock = stock;
    if (discount) payload.discount = discount;
    if (descreption) payload.descreption = descreption;
    if (more_details) payload.more_details = more_details;
    if (publish) payload.publish = publish;

    const updated = await Prodcut.findByIdAndUpdate(_id, payload, {
      new: true,
    });
    if (updated) {
      return res
        .status(200)
        .json({
          message: "Upadated product successfully",
          success: true,
          error: false,
          data: updated,
        });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error || error.message, success: false, error: true });
  }
};

export const Deleteproduct = async (req, res) => {
  try {
    const _id = req.params._id;
    if (!_id) {
      return res
        .status(404)
        .json({ message: "provide productId", success: false, error: true });
    }
    const delteproduct = await Prodcut.findByIdAndDelete(_id);
    if (delteproduct) {
      return res
        .status(200)
        .json({
          message: "Delete product Successfully",
          error: false,
          success: true,
        });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: error || error.message, success: false, error: true });
  }
};

export const getproductsearch = async (req, res) => {
  try {
    let { page, limit, search } = req.body;
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }

    const query = search
      ? {
          $text: {
            $search: search,
          },
        }
      : {};

    const skip = (page - 1) * limit;
    const [data, datacount] = await Promise.all([
       Prodcut.find(query).populate("Category Subcategorey")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Prodcut.countDocuments(query),
    ])

    return res
      .status(200)
      .json({
        message: "get success",
        data: data,
        datacount: datacount,
        success: true,
        error: false,
        page: page,
        limit: limit,
        Totalpage:Math.ceil(datacount/limit)
      });
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: error || error.message, success: false, error: true });
  }
};
