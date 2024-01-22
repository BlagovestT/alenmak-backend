import express from "express";
import { validateToken } from "../middleware/validateTokenHandler";
import {
  getAllStaffMembers,
  getSingleStaffMember,
  createStaffMember,
  updateStaffMember,
  deleteStaffMember,
  payStaffMember,
  unpayStaffMember,
} from "../controllers/staff.controller";

const router = express.Router();

router.get("/members", validateToken, getAllStaffMembers);
router.get("/member/:id", validateToken, getSingleStaffMember);
router.post("/member/create", validateToken, createStaffMember);
router.put("/member/:id", validateToken, updateStaffMember);
router.delete("/member/:id", validateToken, deleteStaffMember);
router.put("/member/:id/pay", validateToken, payStaffMember);
router.put("/member/:id/unpay", validateToken, unpayStaffMember);

export default router;
