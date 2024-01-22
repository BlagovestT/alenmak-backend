"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateTokenHandler_1 = require("../middleware/validateTokenHandler");
const staff_controller_1 = require("../controllers/staff.controller");
const router = express_1.default.Router();
router.get("/members", validateTokenHandler_1.validateToken, staff_controller_1.getAllStaffMembers);
router.get("/member/:id", validateTokenHandler_1.validateToken, staff_controller_1.getSingleStaffMember);
router.post("/member/create", validateTokenHandler_1.validateToken, staff_controller_1.createStaffMember);
router.put("/member/:id", validateTokenHandler_1.validateToken, staff_controller_1.updateStaffMember);
router.delete("/member/:id", validateTokenHandler_1.validateToken, staff_controller_1.deleteStaffMember);
router.put("/member/:id/pay", validateTokenHandler_1.validateToken, staff_controller_1.payStaffMember);
router.put("/member/:id/unpay", validateTokenHandler_1.validateToken, staff_controller_1.unpayStaffMember);
exports.default = router;
//# sourceMappingURL=staff.routes.js.map