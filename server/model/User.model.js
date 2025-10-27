import mongoose from "mongoose";
const userSchems = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a name"],
    },
    email: {
      type: String,
      required: [true, "please provide a email"],
      unique: [true, "email already exists"],
    },
    password: {
      type: String,
      required: [true, "Please Provide Password"],
    },
    avatar: {
      type: String,
      default: "",
    },
    mobile: {
      type: Number,
      default: null,
    },
    refresh_token: {
      type: String,
      default: "",
    },
    verify_email: {
      type: Boolean,
      default: false,
    },
    last_login_date: {
      type: Date,
      default: "",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default:"Active",
    },
    address_details: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Address",
      },
    ],
    shopping_cart: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Cart",
      },
    ],
    orderHistory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Order",
      },
    ],

    forget_Password_OPT: {
      type: Number,
      default: null,
    },
    forget_Password_OTP_expiry: {
      type: Date,
      default: null,
    },
    role: {
      type: [String],
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchems);
export default User;
