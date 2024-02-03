"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const staffSchema = new mongoose_1.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        require: true,
    },
    gender: { type: String, required: true },
    occupation: {
        type: String,
        enum: [
            "Санитар",
            "Медицинска Сестра",
            "Управител",
            "Готвач",
            "Социален Работник",
            "Рехабилитатор",
            "Болногледач",
        ],
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["paid", "unpaid"],
        default: "unpaid",
    },
    color: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Staff = mongoose_1.models.Staff || (0, mongoose_1.model)("Staff", staffSchema);
exports.default = Staff;
//# sourceMappingURL=staff.model.js.map