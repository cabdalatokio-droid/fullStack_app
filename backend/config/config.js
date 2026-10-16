import dotenv from "dotenv";

dotenv.config();

export const port=process.env.PORT;
export const dbURL=process.env.MONGO_URL;
export const Secret_key=process.env.JWT_SECRET;