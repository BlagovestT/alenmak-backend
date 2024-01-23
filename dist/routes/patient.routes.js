"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateTokenHandler_1 = require("../middleware/validateTokenHandler");
const patient_controller_1 = require("../controllers/patient.controller");
const router = express_1.default.Router();
router.get("/all", validateTokenHandler_1.validateToken, patient_controller_1.getAllPatients);
router.get("/:id", validateTokenHandler_1.validateToken, patient_controller_1.getSinglePatient);
router.post("/create", validateTokenHandler_1.validateToken, patient_controller_1.createPatient);
router.put("/:id", validateTokenHandler_1.validateToken, patient_controller_1.updatePatient);
router.delete("/:id", validateTokenHandler_1.validateToken, patient_controller_1.deletePatient);
router.put("/pay/:id", validateTokenHandler_1.validateToken, patient_controller_1.payPatient);
router.put("/unpay/:id", validateTokenHandler_1.validateToken, patient_controller_1.unpayPatient);
exports.default = router;
//# sourceMappingURL=patient.routes.js.map