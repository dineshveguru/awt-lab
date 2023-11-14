const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
mongoose
  .connect("mongodb+srv://dinesh:dinesh@cluster0.8drl6ek.mongodb.net/")
  .then(() => {
    console.log("database connected successfully!");
  })
  .catch((err) => {
    console.err("error occured: ", err);
  });

const Employee = app.post("/login", (req, res) => {});
