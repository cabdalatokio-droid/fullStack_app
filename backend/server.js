
import express from "express";

const app = express();
const PORT = 8000;

app.get("/api", (req, res) => {
  res.send("yes");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
