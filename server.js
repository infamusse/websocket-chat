const express = require("express");
const app = express();
const path = require("path");

app.use("/static", express.static(path.join(__dirname, "client")));

let messages = [];

app.get("/client", (req, res) =>
  res.sendfile(__dirname + "/client/index.html")
);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
