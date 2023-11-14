const express = require("express");

const app = express();

app.use(express.json());

app.get("/error", (req, res, next) => {
  const error = new Error("error occured");
  error.status = 401;
  next(error);
});

app.get("/", (req, res) => {
  res.send("Welcome to task manager!");
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 400;
  const statusMessage = err.message || "Internal server error";
  console.error(`${statusCode} - ${statusMessage}`);
  res.status(statusCode).json({
    error: {
      statusCode,
      statusMessage,
    },
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
