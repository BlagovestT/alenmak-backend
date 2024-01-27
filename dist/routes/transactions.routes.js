"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateTokenHandler_1 = require("../middleware/validateTokenHandler");
const transactions_controller_1 = require("../controllers/transactions.controller");
const router = express_1.default.Router();
router.get("/all", validateTokenHandler_1.validateToken, transactions_controller_1.getAllTransactions);
router.get("/:id", validateTokenHandler_1.validateToken, transactions_controller_1.getTransactionById);
router.post("/create", validateTokenHandler_1.validateToken, transactions_controller_1.createTransaction);
router.put("/:id", validateTokenHandler_1.validateToken, transactions_controller_1.updateTransaction);
router.delete("/:id", validateTokenHandler_1.validateToken, transactions_controller_1.deleteTransaction);
router.get("/income/month/:month/:year", validateTokenHandler_1.validateToken, transactions_controller_1.getTotalIncomeForMonth);
router.get("/expenses/month/:month/:year", validateTokenHandler_1.validateToken, transactions_controller_1.getTotalExpensesForMonth);
router.get("/income/year/:year", validateTokenHandler_1.validateToken, transactions_controller_1.getTotalIncomeForYear);
router.get("/expenses/year/:year", validateTokenHandler_1.validateToken, transactions_controller_1.getTotalExpensesForYear);
exports.default = router;
//# sourceMappingURL=transactions.routes.js.map