const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8000;
const app = express();

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
app.use("/src", express.static(path.resolve(__dirname, "src")));
app.use("/lib", express.static(path.resolve(__dirname, "lib")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("src", "index.html"));
});
