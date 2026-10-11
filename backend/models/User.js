import mongoose from "mongoose";
import validator, { stripLow } from "validator";

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
  passwords:{
    type:String,
    required:true,
    select:false,
    validate:[
       {
          validator:value=>validator.isStrongPassword(value),
          message:"password must contain one or more alphanumeric,charecters and symbols"
        }
    ]
  }
})