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
  res.send("welcome to job portal");
});

//TODO: add new job, update job, apply for job, approve job application

const Job = mongoose.model("Job", {
  name: String,
  isAvailable: Boolean,
  applications: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      userName: String,
      isApproved: Boolean,
    },
  ],
});

const User = mongoose.model("User", {
  userName: String,
  jobs: [String],
});

// Add new job

app.post("/addjob", (req, res) => {
  const { name, isAvailable } = req.body;
  const job = new Job({ name, isAvailable });
  job
    .save()
    .then(() => {
      res.send("job added successfully!");
    })
    .catch((err) => {
      console.log("error encountered", err);
    });
});

// Update job

app.patch("/updatejob/:id", (req, res) => {
  const { id } = req.params;
  Job.findById(id)
    .then((job) => {
      if (req.body.name) {
        job.name = req.body.name;
      }

      if (req.body.isAvailable) {
        job.isAvailable = req.body.isAvailable;
      }
      job.save();
    })
    .then(() => {
      res.send("job updated successfully!");
    })
    .catch((err) => {
      console.log("error encountered", err);
    });
});

// Add user

app.post("/adduser", (req, res) => {
  const { userName } = req.body;
  const user = new User({ userName });
  user
    .save()
    .then(() => {
      res.send("user added successfully!");
    })
    .catch((err) => {
      console.log("error encountered");
    });
});

// Apply for job

app.patch("/applyjob/:userId/:jobId", (req, res) => {
  const { userId } = req.params;
  const { jobId } = req.params;
  User.findById(userId).then((user) => {
    Job.findById(jobId)
      .then((job) => {
        if (job.isAvailable) {
          user.jobs.push(job.name);
          job.applications.push({
            userId: user._id,
            userName: user.userName,
            isApproved: false,
          });
          user.save();
          job.save();
          res.send("job applied successfully!");
        }
      })
      .catch((err) => {
        console.log("error encountered");
      });
  });
});

// Approve job application
app.patch("/approvejob/:userId/:jobId", (req, res) => {
  const { userId } = req.params;
  const { jobId } = req.params;
  Job.findById(jobId)
    .then((job) => {
      job.applications.find((applied) => {
        if (applied.userId.equals(new mongoose.Types.ObjectId(userId))) {
          applied.isApproved = true;
          res.send("job application approved successfully!");
        }
      });
      job.save();
    })
    .catch((err) => {
      console.log("error encountered", err);
    });
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
