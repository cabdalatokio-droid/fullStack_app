
import express from "express";
import connectDB from "./config/db.js"
import { registerUser } from "./controller/userController.js";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import postRouter from "./routes/postRouter.js";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/user",userRouter)
app.use("/api/post",postRouter)

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
};

startServer();
