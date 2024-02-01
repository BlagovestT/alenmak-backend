import express from "express";
import { validateToken } from "../middleware/validateTokenHandler";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getSingleTask,
  updateTask,
} from "../controllers/task.controller";

const router = express.Router();

router.get("/all", validateToken, getAllTasks);
router.get("/:id", validateToken, getSingleTask);
router.post("/create", validateToken, createTask);
router.put("/:id", validateToken, updateTask);
router.delete("/:id", validateToken, deleteTask);

export default router;
