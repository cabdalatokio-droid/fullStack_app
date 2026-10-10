
import express from "express";
import connectDB from "./config/db.js"

const app = express();
const PORT = 8000;

app.get("/api", (req, res) => {
  res.send("yes");
});
connectDB();
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
