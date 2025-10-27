import mongoose from "mongoose";


const subcategorySchema = new mongoose.Schema({
  name:{
    type:String,
    default:""

},
    image:{
    type:String,
    default:""
},
category:[{
    type:mongoose.Schema.ObjectId,
    ref:"Categorey"
}]

},{timestamps:true})

const subcategoryModel = mongoose.model("Subcategorey",subcategorySchema);
export default subcategoryModel;
