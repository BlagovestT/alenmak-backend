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
exports.getTotalExpensesForYear = exports.getTotalIncomeForYear = exports.getTotalExpensesForMonth = exports.getTotalIncomeForMonth = exports.deleteTransaction = exports.updateTransaction = exports.createTransaction = exports.getTransactionById = exports.getAllTransactions = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const transactions_modal_1 = __importDefault(require("../models/transactions.modal"));
//@desc Get all transactions
//@route GET /api/transactions/all
//@access private
exports.getAllTransactions = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield transactions_modal_1.default.find({});
    res.status(200).json({ success: true, data: transactions });
}));
//@desc Get transaction by id
//@route GET /api/transactions/:id
//@access private
exports.getTransactionById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transactions_modal_1.default.findById(req.params.id);
    if (!transaction) {
        res.status(404);
        throw new Error("Transaction not found");
    }
    res.status(200).json({ success: true, data: transaction });
}));
//@desc Create transaction
//@route POST /api/transactions/create
//@access private
exports.createTransaction = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, amount, type, category, month, year } = req.body;
    const transaction = yield transactions_modal_1.default.create({
        title,
        amount,
        type,
        category,
        month,
        year,
    });
    res.status(201).json({ success: true, data: transaction });
}));
//@desc Update transaction
//@route PUT /api/transactions/:id
//@access private
exports.updateTransaction = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, amount, type, category, month, year } = req.body;
    const transaction = yield transactions_modal_1.default.findById(req.params.id);
    if (!transaction) {
        res.status(404);
        throw new Error("Transaction not found");
    }
    transaction.title = title;
    transaction.amount = amount;
    transaction.type = type;
    transaction.category = category;
    transaction.month = month;
    transaction.year = year;
    const updatedTransaction = yield transaction.save();
    res.status(200).json({ success: true, data: updatedTransaction });
}));
//@desc Delete transaction
//@route DELETE /api/transactions/:id
//@access private
exports.deleteTransaction = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transactions_modal_1.default.findById(req.params.id);
    if (!transaction) {
        res.status(404);
        throw new Error("Transaction not found");
    }
    yield transaction.remove();
    res
        .status(200)
        .json({ success: true, message: "Transaction deleted successfully" });
}));
//@desc Get total income for a specific month
//@route GET /api/transactions/income/month/:month/:year
//@access private
exports.getTotalIncomeForMonth = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { month, year } = req.params;
    const transactions = yield transactions_modal_1.default.find({
        type: "income",
        month,
        year,
    });
    const totalIncome = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    res.status(200).json({ success: true, data: totalIncome });
}));
//@desc Get total expenses for a specific month
//@route GET /api/transactions/expenses/month/:month/:year
//@access private
exports.getTotalExpensesForMonth = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { month, year } = req.params;
    const transactions = yield transactions_modal_1.default.find({
        type: "expense",
        month,
        year,
    });
    const totalExpenses = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    res.status(200).json({ success: true, data: totalExpenses });
}));
//@desc Get total income for a specific year
//@route GET /api/transactions/income/year/:year
//@access private
exports.getTotalIncomeForYear = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { year } = req.params;
    const transactions = yield transactions_modal_1.default.find({
        type: "income",
        year,
    });
    const totalIncome = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    res.status(200).json({ success: true, data: totalIncome });
}));
//@desc Get total expenses for a specific year
//@route GET /api/transactions/expenses/year/:year
//@access private
exports.getTotalExpensesForYear = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { year } = req.params;
    const transactions = yield transactions_modal_1.default.find({
        type: "expense",
        year,
    });
    const totalExpenses = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    res.status(200).json({ success: true, data: totalExpenses });
}));
//# sourceMappingURL=transactions.controller.js.map