const express = require("express");
const axios = require("axios");
const path = require("path");
const PORT = process.env.PORT || 8000;
const app = express();
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
app.use("/src", express.static(path.resolve(__dirname, "src")));
app.get("/", (req, res) => {
  res.sendFile(path.resolve("src", "index.html"));
});
app.get("/products", (req, res) => {
  console.log("[GET] Products list request");
  axios
    .get(
      "https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev/products"
    )
    .then((response) => {
      res.send(response.data);
    });
});

app.get("/*", (req, res) => {
  res.redirect("/");
});
