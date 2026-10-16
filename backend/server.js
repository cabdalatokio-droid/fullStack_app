
import express from "express";
import connectDB from "./config/db.js"
import { registerUser } from "./controller/userController.js";
import userRouter from "./routes/userRouter.js";

const app = express();
const PORT = 8000;

app.use(express.json())

app.use("/api/user",userRouter)

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
};

startServer();
