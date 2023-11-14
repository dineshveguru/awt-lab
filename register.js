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

const Employee = mongoose.model("Employee", {
  name: String,
  password: String,
});

app.post("/register", (req, res) => {
  const { name, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    res.status(400).send("passwords do not match!");
  } else {
    const employee = new Employee({ name, password });
    employee
      .save()
      .then(() => {
        res.send("employee registered successfully!");
      })
      .catch((err) => {
        res.status(400).send(`error occured: ${err}`);
        console.log("error occured: ", err);
      });
  }
});

app.post("/login", (req, res) => {
  const { name, password } = req.body;
  Employee.findOne({ name, password }).then((employee) => {
    if (employee) {
      console.log(employee);
      res.send("login successful!");
    } else {
      res.status(400).send("invalid credentials!");
    }
  });
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
