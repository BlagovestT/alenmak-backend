import express from "express";
import { validateToken } from "../middleware/validateTokenHandler";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
} from "../controllers/event.controller";

const router = express.Router();

router.get("/all", validateToken, getAllEvents);
router.get("/:id", validateToken, getSingleEvent);
router.post("/create", validateToken, createEvent);
router.put("/:id", validateToken, updateEvent);
router.delete("/:id", validateToken, deleteEvent);

export default router;
