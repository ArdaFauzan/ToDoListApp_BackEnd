const { nanoid } = require("nanoid");
const toDoModels = require("../models/todo");
const { encrypt, decrypt } = require("../middleware/encrypted");

const createNewToDo = async (req, res) => {
  const id = nanoid(5);
  const { todo, completed, date, time } = req.body;
  const { user_id } = req.params;
  const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");

  const encryptedTodo = encrypt(todo);
  const encryptedDate = encrypt(date);
  const encryptedTime = encrypt(time);

  try {
    await toDoModels.createNewToDo(
      id,
      user_id,
      encryptedTodo.userPassword,
      completed,
      encryptedDate.userPassword,
      encryptedTime.userPassword,
      createdAt
    );
    res.status(201).json({
      message: "Create new todo success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getAllToDo = async (req, res) => {
  const { user_id } = req.params;

  try {
    const allTodo = [];
    const [data] = await toDoModels.getAllToDo(user_id);
    data.forEach((item) => {
      const encryptTodo = item.todo;
      const encryptDate = item.date;
      const encryptTime = item.time;

      const iv = 32;
      const todo = decrypt(
        encryptTodo.slice(0, encryptTodo.length - iv),
        encryptTodo.slice(-iv)
      );
      const date = decrypt(
        encryptDate.slice(0, encryptDate.length - iv),
        encryptDate.slice(-iv)
      );
      const time = decrypt(
        encryptTime.slice(0, encryptTime.length - iv),
        encryptTime.slice(-iv)
      );

      allTodo.push({
        id: item.id,
        user_id: item.user_id,
        todo: todo,
        completed: item.completed,
        createdAt: item.createdAt,
        date: date,
        time: time,
      });
    });

    res.status(200).json({
      message: "Get all todo success",
      data: allTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateToDo = async (req, res) => {
  const { todo_id } = req.params;
  const { todo, completed, date, time } = req.body;

  const encryptedTodo = encrypt(todo);
  const encryptedDate = encrypt(date);
  const encryptedTime = encrypt(time);

  try {
    await toDoModels.updateToDo(
      encryptedTodo.userPassword,
      completed,
      encryptedDate.userPassword,
      encryptedTime.userPassword,
      todo_id
    );
    res.status(200).json({
      message: "Update todo success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const deleteToDo = async (req, res) => {
  const { id } = req.params;

  try {
    await toDoModels.deleteToDo(id);
    res.status(200).json({
      message: "Delete todo success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = {
  createNewToDo,
  getAllToDo,
  updateToDo,
  deleteToDo,
};
