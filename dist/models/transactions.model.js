"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transactionsSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true,
    },
    category: {
        type: String,
        enum: ["electricity", "water", "internet", "other"],
        required: true,
    },
    month: {
        type: String,
        enum: [
            "january",
            "february",
            "march",
            "april",
            "may",
            "june",
            "july",
            "august",
            "september",
            "october",
            "november",
            "december",
        ],
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const Transactions = mongoose_1.models.Transactions ||
    (0, mongoose_1.model)("Transactions", transactionsSchema);
exports.default = Transactions;
//# sourceMappingURL=transactions.model.js.map