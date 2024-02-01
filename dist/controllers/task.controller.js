"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getSingleTask = exports.getAllTasks = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
//@desc Get all tasks
//?@route GET /api/tasks/all
//@access private
exports.getAllTasks = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield task_model_1.default.find({});
    res.status(200).json({ success: true, data: tasks });
}));
//@desc Get a single task
//?@route GET /api/tasks/:id
//@access private
exports.getSingleTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_model_1.default.findById(req.params.id);
    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }
    res.status(200).json({ success: true, data: task });
}));
//@desc Create a task
//!@route POST /api/tasks/create
//@access private
exports.createTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    if (!title) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const task = new task_model_1.default({
        title,
    });
    const createdTask = yield task.save();
    res.status(201).json({ success: true, data: createdTask });
}));
//@desc Update a task
//!@route PUT /api/tasks/:id
//@access private
exports.updateTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { isDone } = req.body;
    const task = yield task_model_1.default.findOneAndUpdate({ _id: req.params.id }, { isDone: isDone }, { new: true });
    res.status(200).json({ success: true, data: task });
}));
//@desc Delete a task
//!@route DELETE /api/tasks/:id
//@access private
exports.deleteTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_model_1.default.findByIdAndDelete(req.params.id);
    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }
    res
        .status(200)
        .json({ success: true, message: "Task deleted successfully!" });
}));
//# sourceMappingURL=task.controller.js.map