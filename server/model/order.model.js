import mongoose, { mongo } from "mongoose";

const orderschema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    orderId: {
      type: String,
      required: [true, "Provide order id"],
    },
    productId: 
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    
    product_details: {
      name: String,
      image: String,
    },
    paymentId: {
      type: String,
      default: "",
    },
    paymentStatus: {
      type: String,
      default: "",
    },
    delivery_address: {
      type: mongoose.Schema.ObjectId,
      ref: "Address",
    },
    sub_Total_amount:{
        type:Number,
        default:0
    },
    Total_amount:{
        type:Number,
        default:0
    },
    invoice_receipt:{
        type:String,
        default:""
    }
  },
  { timestamps: true }
);

const Ordermodel = mongoose.model("Order", orderschema);
export default Ordermodel;