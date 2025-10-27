import User from "../model/User.model.js";
import Address from "../model/Address.model.js";

export const AddnewAddress = async (req, res) => {
  try {
    const { address_line, city, state, pincode, country, mobile, UserId } =
      req.body;
    const userId = req.userId;
    if (!userId) {
      return res
        .status(404)
        .json({ message: "Please login", error: true, success: false });
    }
    const findeuser = await User.findOne({ _id: userId });
    if (!findeuser) {
      return res.status(404).json({
        message: "not authorized",
        error: true,
        success: false,
      });
    }
    const addAddress = new Address({
      address_line,
      city,
      state,
      pincode,
      country,
      mobile,
      UserId: userId,
    });

    const saved = await addAddress.save();
    if (saved) {
      const updateduserDetails = await User.findByIdAndUpdate(userId, {
        $push: {
          address_details: saved,
        },
      });
    }

    return res.status(200).json({
      message: "Add to cart successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error || error.message, success: false, error: true });
  }
};

export const getAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const findAddress = await Address.find({ UserId: userId }).sort({createdAt:-1});
    if (!findAddress) {
      return res.status(404).json({
        message: "No user find and addredd",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      data: findAddress,
      error: false,
      success: true,
      message: "data from address",
    });
  } catch (error) {
    return res.status(500).json({
      message: error || error.message,
      success: false,
      error: true,
    });
  }
};

export const editAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { address_line, city, state, pincode, country, mobile, _id } =
      req.body;
    const payload = {};
    if (address_line) {
      payload.address_line = address_line;
    }
    if (city) {
      payload.city = city;
    }
    if (pincode) {
      payload.pincode = pincode;
    }
    if (state) {
      payload.state = state;
    }
    if (country) {
      payload.country = country;
    }
    if (mobile) {
      payload.mobile = mobile;
    }

    const updated = await Address.updateOne(
      { _id: _id, UserId: userId },
      payload,
      { new: true }
    );
    if (!updated) {
      return res.status(400).json({
        message: "Not Updated Address Successfully",
        error: true,
        success: false,
      });
    }
    return res
      .status(200)
      .json({
        message: "Updated Address Successfully",
        error: false,
        success: true,
      });
  } catch (error) {
    return res.status(500).json({
      message: error || error.message,
      success: false,
      error: true,
    });
  }
};


export const deletedAddress = async(req,res)=>{
    try {
        const userId =req.userId
        const{_id}=req.body
        if(!_id){
           return res.status(400).json({message:'Provide userId or _id' ,error:true ,success:false})
        }
        const findeaddress = await Address.findOne({_id:_id})
        const deletd = await Address.deleteOne({ UserId: userId, _id: _id });
        const deledtefromuser = await User.updateOne(
          { UserId: userId },
          {
            $pull: {
              address_details:_id,
            },
          }
        );
        return res.status(200).json({message:'deleted succsessfully' ,error:false , success:false})
    } catch (error) {
         return res.status(500).json({
           message: error || error.message,
           success: false,
           error: true,
         });
    }
}
