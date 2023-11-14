const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb+srv://dinesh:dinesh@cluster0.8drl6ek.mongodb.net/")
  .then(() => {
    console.log("database connected successfully!");
  })
  .catch((err) => {
    console.err("error occured: ", err);
  });
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to task manager!");
});

const Task = mongoose.model("Task", {
  taskName: String,
  isCompleted: Boolean,
});

//CREATE
app.post("/create", (req, res) => {
  const { taskName, isCompleted } = req.body;
  const task = new Task({ taskName, isCompleted });
  task
    .save()
    .then(() => {
      res.send("task created successfully!");
      console.log(task);
    })
    .catch((err) => {
      console.log("error occured: ", err);
    });
});

//READ

app.get("/tasks", (req, res) => {
  Task.find()
    .then((tasks) => {
      res.send(tasks);
      console.log(tasks);
    })
    .catch((err) => {
      console.log("error occured: ", err);
    });
});

//UPDATE

app.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { taskName, isCompleted } = req.body;
  Task.findById(id)
    .then((task) => {
      if (taskName) {
        task.taskName = taskName;
      }
      if (toString(isCompleted)) {
        task.isCompleted = isCompleted;
      }
      task.save();
      res.send("task updated successfully!");
    })
    .catch((err) => {
      res.send("task not found!");
      console.log("error occured: ", err);
    });
});

//DELETE

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  Task.findByIdAndDelete(id)
    .then(() => {
      res.send("task deleted successfully!");
    })
    .catch((err) => {
      console.log("error occured: ", err);
    });
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
