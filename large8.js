const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb+srv://dinesh:dinesh@cluster0.8drl6ek.mongodb.net/")
  .then(() => {
    console.log("database connected successfully!");
  })
  .catch((err) => {
    console.err("error occured: ", err);
  });

const Rates = mongoose.model("Rates", {
  code: String,
  rate: Number,
});

app.use(cors());

app.post("/rate", (req, res) => {
  const { code } = req.body;
  Rates.findOne({ code })
    .then((rate) => {
      res.send(rate);
    })
    .catch((err) => {
      res.status(400).send("error occured");
      console.log("error occured: ", err);
    });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
