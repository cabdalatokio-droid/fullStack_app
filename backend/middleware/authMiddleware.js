import jwt from "jsonwebtoken";
import { Secret_key } from "../config/config.js";

export const authenticate = (req, res, next) => {
  const token = req.cookies?.token;

if(!token) return res.status(403).send({
  message:"acces denied",
  success:false
})


  try {
    const decode = jwt.verify(token, Secret_key);
    req.user=decode;
    return next();

  } catch {
    return res.status(401).send({ message: "Invalid or expired token" });
  }
};