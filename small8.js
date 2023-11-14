const express = require("express");

const app = express();

app.use(express.json());

const user = "admin";
const password = "admin@123";

const middleware = (req, res, next) => {
  if (req.body.user === user && req.body.password === password) {
    next();
  } else {
    res.send("invalid credentials");
  }
};

app.post("/admin", middleware, (req, res) => {
  res.send("Welcome to admin page!");
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
