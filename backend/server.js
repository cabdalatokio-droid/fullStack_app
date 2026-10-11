
import express from "express";
import connectDB from "./config/db.js"
import { registerUser } from "./controller/userController.js";

const app = express();
const PORT = 8000;

app.use(express.json())

app.post("/api/register-user",registerUser);
connectDB();

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
