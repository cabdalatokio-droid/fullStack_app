import mongoose from "mongoose";
import validator from "validator";

const {Schema}=mongoose();

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
authoer:{
  type:Schema.Types.ObjectId,
  ref:"User",
  required:true
}
});


const Post=mongoose.model("Post",userSchema);

export default Post;