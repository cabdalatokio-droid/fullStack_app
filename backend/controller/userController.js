import { Secret_key } from "../config/config.js";
import User from "../models/User.js"
import jwt from "jsonwebtoken";
export const registerUser=async(req,res)=>{

  try {
 
    const{email,username,password}=req.body;

   const userExist= await User.findOne({
    $or:[
      {email:email.toLowerCase()},
      {username:username.toLowerCase()}
    ]
   })
    if(userExist){
      return res.status(400).send("email or username already exist")
    }
    const userInfo=new User(
      {
      username:username,
      email:email,
      password:password
    }
    );

    await userInfo.save()
    userInfo.password=undefined;
    res.status(201).send({
      success:true,
      message:"registered successfully"
    });
  } catch (error) {
    
    console.log("error at registeruser",error.message)
   return res.status(500).json({
  success: false,
  message: "An error occurred during registration"
});
  }
}


export const loginUser=async(req,res)=>{
 try {

  const{email,password}=req.body;


 const isUserExist= await User.findOne({
   email: email.toLowerCase()
 }).select("+password");


 if(!isUserExist){
    return res.status(400).json({
        message: "invalid email please provid valid email"
      });
 }
  const isPasswordCorrect=await isUserExist.comparePassword(password);

  if(!isPasswordCorrect){
         return res.status(401).json({
        message: "incorrect password"
      });
  }

const  expiresIn = 7 * 24 * 60 * 60;

const token = jwt.sign(
  { _id: isUserExist._id },
  Secret_key,
  {
    expiresIn
  }
);

res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  maxAge: expiresIn* 1000
});

isUserExist.password = undefined;

return res.status(200).json({
  ...isUserExist.toJSON(),
    expiresIn,
  message: "Login successful"
});



 } catch (err) {
   console.log("error at loginUser",err);
     return res.status(500).json({
      message: "Internal server error"
    });
 }
}