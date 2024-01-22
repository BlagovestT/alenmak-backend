"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const patientSchema = new mongoose_1.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    paid: {
        type: String,
        enum: ["paid", "unpaid"],
        default: "unpaid",
    },
    status: {
        type: String,
        enum: ["active", "inactive", "released", "deceased"],
        default: "active",
    },
}, { timestamps: true });
const Patient = mongoose_1.models.Patient || (0, mongoose_1.model)("Patient", patientSchema);
exports.default = Patient;
//# sourceMappingURL=patient.model.js.map