import Task from "../models/task.model";
import expressAsyncHandler from "express-async-handler";

//@desc Get all tasks
//?@route GET /api/tasks/all
//@access private
export const getAllTasks = expressAsyncHandler(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ success: true, data: tasks });
});

//@desc Get a single task
//?@route GET /api/tasks/:id
//@access private
export const getSingleTask = expressAsyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  res.status(200).json({ success: true, data: task });
});

//@desc Create a task
//!@route POST /api/tasks/create
//@access private
export const createTask = expressAsyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const task = new Task({
    title,
  });

  const createdTask = await task.save();

  res.status(201).json({ success: true, data: createdTask });
});

//@desc Update a task
//!@route PUT /api/tasks/:id
//@access private
export const updateTask = expressAsyncHandler(async (req, res) => {
  const { isDone } = req.body;

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id },
    { isDone: isDone },
    { new: true }
  );

  res.status(200).json({ success: true, data: task });
});

//@desc Delete a task
//!@route DELETE /api/tasks/:id
//@access private
export const deleteTask = expressAsyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res
    .status(200)
    .json({ success: true, message: "Task deleted successfully!" });
});
