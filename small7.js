const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to task manager!");
});
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/error.html");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
