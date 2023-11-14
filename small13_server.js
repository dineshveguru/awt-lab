const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
const secretKey = "secretKey";
app.use(bodyParser.json());
const validateToken = (req, res, next) => {
  const token = req.header("Authorization");
  const tokenWithoutBearer = token.replace("Bearer ", "");
  if (!tokenWithoutBearer) {
    return res.status(401).json({ error: "Access denied" });
  }
  try {
    const decoded = jwt.verify(tokenWithoutBearer, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

app.get("/protected", validateToken, (req, res) => {
  res.json({ message: "This is protected route", user: req.user });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "user" && password === "password") {
    const payload = { username };
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
