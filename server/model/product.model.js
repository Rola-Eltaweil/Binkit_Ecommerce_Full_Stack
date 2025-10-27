import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    image: {
      type: [String],
      default: [],
    },

    Category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Categorey",
      },
    ],

    Subcategorey: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Subcategorey",
      },
    ],
    price: {
      type: Number,
      default: null,
    },
    unit: {
      type: String,
      default: null,
    },
    stock: {
      type: Number,
      default: null,
    },
    discount: {
      type: Number,
      default: null,
    },
    descreption: {
      type: String,
      default: "",
    },

    more_details: {
      type: Object,
      default: {},
    },
    publish: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//create text index
productSchema.index(
  {
    name: "text",
    descreption: "text",
  },
  {
    weights: {
      name: 10,
      descreption: 5,
    },
  }
);

const Cartmodel = mongoose.model("Product", productSchema);
export default Cartmodel;
