import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const{Schema}=mongoose;

const userSchema=new Schema({
  email:{
    type:String,
    unique:true,
    lowercase:true,
    required:true,
    validate:[validator.isEmail,"please enter a valid email"]

  },
  username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true
  },
  password:{
    type:String,
    required:true,
    select:false,
    validate:[
       {
          validator:value=>validator.isStrongPassword(value,{
            minLength:8,
            minNumbers:1,
            minSymbols:1,
            minLowercase:1,
            minUppercase:1


          }),
          message:"password must contain one or more alphanumeric,charecters and symbols"
        }
    ]
  }
    
},{
  timestamps:true
})

userSchema.pre("save",async function(){
  if (!this.isModified("password")){
    return 
  }
  const salt= await bcrypt.genSalt(10);
  this.password= await bcrypt.hash(this.password,salt)
  
})


userSchema.methods.comparePassword=async function(givenpassword){
  return await bcrypt.compare(givenpassword,this.password);
}


const User=mongoose.model("User",userSchema);

export default User;