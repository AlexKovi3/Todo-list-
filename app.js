const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Масив для зберігання завдань
let tasks = [
  { id: 1, name: "Welcome to ItBuddies" },
  { id: 2, name: "Like, Share and Subscribe" },
  { id: 3, name: "Enjoy learning" },
];
let nextId = 4; // Ідентифікатор для нових завдань

// Головна сторінка
app.get("/", (req, res) => {
  res.render("list", { newListItem: tasks });
});

// Додавання нового завдання
app.post("/", (req, res) => {
  const taskName = req.body.n;
  if (taskName.trim()) {
    tasks.push({ id: nextId++, name: taskName });
  }
  res.redirect("/");
});

// Видалення завдання
app.post("/delete", (req, res) => {
  const taskId = parseInt(req.body.checkbox);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.redirect("/");
});

// Запуск сервера
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
