"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateTokenHandler_1 = require("../middleware/validateTokenHandler");
const task_controller_1 = require("../controllers/task.controller");
const router = express_1.default.Router();
router.get("/all", validateTokenHandler_1.validateToken, task_controller_1.getAllTasks);
router.get("/:id", validateTokenHandler_1.validateToken, task_controller_1.getSingleTask);
router.post("/create", validateTokenHandler_1.validateToken, task_controller_1.createTask);
router.put("/:id", validateTokenHandler_1.validateToken, task_controller_1.updateTask);
router.delete("/:id", validateTokenHandler_1.validateToken, task_controller_1.deleteTask);
exports.default = router;
//# sourceMappingURL=task.routes.js.map