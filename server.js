const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(__dirname));

app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
