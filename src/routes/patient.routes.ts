import express from "express";
import { validateToken } from "../middleware/validateTokenHandler";
import {
  getAllPatients,
  getSinglePatient,
  createPatient,
  updatePatient,
  deletePatient,
  payPatient,
  unpayPatient,
} from "../controllers/patient.controller";

const router = express.Router();

router.get("/all", validateToken, getAllPatients);
router.get("/:id", validateToken, getSinglePatient);
router.post("/create", validateToken, createPatient);
router.put("/:id", validateToken, updatePatient);
router.delete("/:id", validateToken, deletePatient);
router.put("/pay/:id", validateToken, payPatient);
router.put("/unpay/:id", validateToken, unpayPatient);

export default router;
