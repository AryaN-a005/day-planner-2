const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let tasks = [];

app.get("/", (req, res) => {
  res.render("index", { tasks });
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  if (task && task.trim() !== "") tasks.push(task.trim());
  res.redirect("/");
});

app.post("/clear", (req, res) => {
  tasks = [];
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`✅ Day Planner running on port ${port}`);
});
