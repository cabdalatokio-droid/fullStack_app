import Post from "../models/post.js";

export const createPost=async(req,res)=>{
 try {
  
 } catch (error) {
  console.log("error creating post", error);
  res.status(400).send({
    message:"creating post failed",
    succes:false
  })
 }
}