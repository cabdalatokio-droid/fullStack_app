import mongoose from "mongoose";
import validator from "validator";

const {Schema}=mongoose;

const PostSchema= new Schema({
title:{
  type:String,
  required:true

},
content:{
 type:String,
 required:true,
 validator:[value=>value.length<500,"content shoud be up to 500 charecters"],
},
image:{
  type:String,
  default:null

},
author:{
  type:Schema.Types.ObjectId,
  ref:"User",
  required:true
}
},
  {
    timestamps: true,
  });


const Post=mongoose.model("Post",PostSchema);

export default Post;