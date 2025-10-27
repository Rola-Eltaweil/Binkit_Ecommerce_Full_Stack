import cartmodel from "../model/Cart.model.js";
import Cart from "../model/Cart.model.js";
import User from "../model/User.model.js";

export const AddToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.userId;
    if (!userId) {
      return res
        .status(404)
        .json({
          message: "Please Login to add this product to your cart",
          success: false,
          error: true,
        });
    }
    if (!productId) {
      return res
        .status(404)
        .json({ message: "Provide productId", success: false, error: true });
    }
    const added = new Cart({
      productId: productId,
      userId: userId,
      quantity: 1,
    });

    const findeone = await Cart.findOne({
      productId: productId,
      userId: userId,
    });
    if (findeone) {
      return res.status(400).json({ message: "Item is already in cart" });
    }

    const saved = await added.save();

    const updated = await User.updateOne(
      {
        _id: userId,
      },
      {
        $push: {
          shopping_cart: productId,
        },
      }
    );

    return res
      .status(200)
      .json({
        message: "added to cart successfully",
        error: false,
        success: true,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error || error.message, success: false, error: true });
  }
};

export const getItemfromcart =async(req,res)=>{
  try {
    const userId =req.userId
    const getall = await Cart.find({userId:userId}).populate("productId");
    if(getall){
      return res.status(200).json({message:'getall success' ,error:false,success:true ,data:getall})
    }
    console.log(userId,'userid')
    console.log(userId.name)
  } catch (error) {
     return res
       .status(500)
       .json({ message: error || error.message, success: false, error: true });
  }
}

export const updatecartquantity = async(req,res)=>{
  try {
    const { quantity, _id } = req.body;
    if(!quantity || !_id){
      return res.status(400).json({message:'Provide id , qty'})
    }
    const findone = await Cart.updateOne({_id:_id},{
        quantity:quantity
    })
    return res.status(200).json({message:'item added' , success:true ,error:false ,data:findone})
  } catch (error) {
     return res
       .status(500)
       .json({ message: error || error.message, success: false, error: true });
  }
}


export const deletedproductfromcart = async(req,res)=>{
  try {
    const {_id }=req.body
    if(!_id){
      return res.status(400).json({message:'provide id', error:true,success:false})
    }
    const itemcart = await Cart.findById(_id)
    if(!itemcart){
      return res.status(400).json({message:'item cart not provided' ,success:false ,error:true})
    }


    const deleteitem = await Cart.deleteOne({_id:_id})
    const updatedshoppingcart = await User.updateOne({_id:itemcart.userId},{
      $pull:{
        shopping_cart :itemcart.productId
      }
    })
    return res.status(200).json({message:'deleted successfully' ,success:true , error:false})
  } catch (error) {
    return res.status(500).json({message:error || error.message , success:false , error:true})
  }
}


