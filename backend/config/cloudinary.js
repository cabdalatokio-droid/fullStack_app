import cloudinary from"cloudinary";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUDE_NAME } from "./config";

cloudinary.v2.config({
  cloud_name: CLOUDINARY_CLOUDE_NAME,
  api_key:CLOUDINARY_API_KEY,
  api_secret:CLOUDINARY_API_SECRET
});
export default cloudinary.v2;