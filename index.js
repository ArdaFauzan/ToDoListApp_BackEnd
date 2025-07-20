const express = require("express");
const app = express();
const path = require("path");

const toDoRoutes = require("./src/routes/todo");

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "./public/images")));
app.use("/todo", toDoRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API Success",
  });
});

app.listen(4000, '0.0.0.0' ,() => {
    console.log(`Server berjalan di port 4000`)
});

module.exports = app;
