import mongoose from "mongoose";

const CateggorySchema = new mongoose.Schema({
   name:{
    type:String,
    default:""
   },
   image:{
    type:String,
    default:""
   }
},{timestamps:true})

const category = mongoose.model("Categorey",CateggorySchema);
export default category;