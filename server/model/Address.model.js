import mongosse from "mongoose";

const AddresSchema = new mongosse.Schema(
  {
    address_line: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    pincode: {
      type: Number,
      default: null,
    },
    country: {
      type: String,
      default: "",
    },
    mobile: {
      type: Number,
      default: null,
    },
    status: {
      type: Boolean,
      default: true,
    },
    UserId: {
      type: mongosse.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Addressmode = mongosse.model("Address", AddresSchema);
export default Addressmode;
