import User from "../models/User.js"

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