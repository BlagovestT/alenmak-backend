"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    isDone: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const Task = mongoose_1.models.Task || (0, mongoose_1.model)("Task", taskSchema);
exports.default = Task;
//# sourceMappingURL=task.model.js.map