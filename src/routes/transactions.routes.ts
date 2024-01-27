import express from "express";
import { validateToken } from "../middleware/validateTokenHandler";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTotalExpensesForMonth,
  getTotalExpensesForYear,
  getTotalIncomeForMonth,
  getTotalIncomeForYear,
  getTransactionById,
  updateTransaction,
} from "../controllers/transactions.controller";

const router = express.Router();

router.get("/all", validateToken, getAllTransactions);
router.get("/:id", validateToken, getTransactionById);
router.post("/create", validateToken, createTransaction);
router.put("/:id", validateToken, updateTransaction);
router.delete("/:id", validateToken, deleteTransaction);

router.get("/income/month/:month/:year", validateToken, getTotalIncomeForMonth);
router.get(
  "/expenses/month/:month/:year",
  validateToken,
  getTotalExpensesForMonth
);
router.get("/income/year/:year", validateToken, getTotalIncomeForYear);
router.get("/expenses/year/:year", validateToken, getTotalExpensesForYear);

export default router;