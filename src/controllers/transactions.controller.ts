import expressAsyncHandler from "express-async-handler";
import Transactions from "../models/transactions.modal";

//@desc Get all transactions
//@route GET /api/transactions/all
//@access private
export const getAllTransactions = expressAsyncHandler(async (req, res) => {
  const transactions = await Transactions.find({});

  res.status(200).json({ success: true, data: transactions });
});

//@desc Get transaction by id
//@route GET /api/transactions/:id
//@access private
export const getTransactionById = expressAsyncHandler(async (req, res) => {
  const transaction = await Transactions.findById(req.params.id);

  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found");
  }

  res.status(200).json({ success: true, data: transaction });
});

//@desc Create transaction
//@route POST /api/transactions/create
//@access private
export const createTransaction = expressAsyncHandler(async (req, res) => {
  const { title, amount, type, category, month, year } = req.body;

  const transaction = await Transactions.create({
    title,
    amount,
    type,
    category,
    month,
    year,
  });

  res.status(201).json({ success: true, data: transaction });
});

//@desc Update transaction
//@route PUT /api/transactions/:id
//@access private
export const updateTransaction = expressAsyncHandler(async (req, res) => {
  const { title, amount, type, category, month, year } = req.body;

  const transaction = await Transactions.findById(req.params.id);

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

  const updatedTransaction = await transaction.save();

  res.status(200).json({ success: true, data: updatedTransaction });
});

//@desc Delete transaction
//@route DELETE /api/transactions/:id
//@access private
export const deleteTransaction = expressAsyncHandler(async (req, res) => {
  const transaction = await Transactions.findById(req.params.id);

  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found");
  }

  await transaction.remove();

  res
    .status(200)
    .json({ success: true, message: "Transaction deleted successfully" });
});

//@desc Get total income for a specific month
//@route GET /api/transactions/income/month/:month/:year
//@access private
export const getTotalIncomeForMonth = expressAsyncHandler(async (req, res) => {
  const { month, year } = req.params;

  const transactions = await Transactions.find({
    type: "income",
    month,
    year,
  });

  const totalIncome = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  res.status(200).json({ success: true, data: totalIncome });
});

//@desc Get total expenses for a specific month
//@route GET /api/transactions/expenses/month/:month/:year
//@access private
export const getTotalExpensesForMonth = expressAsyncHandler(
  async (req, res) => {
    const { month, year } = req.params;

    const transactions = await Transactions.find({
      type: "expense",
      month,
      year,
    });

    const totalExpenses = transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

    res.status(200).json({ success: true, data: totalExpenses });
  }
);

//@desc Get total income for a specific year
//@route GET /api/transactions/income/year/:year
//@access private
export const getTotalIncomeForYear = expressAsyncHandler(async (req, res) => {
  const { year } = req.params;

  const transactions = await Transactions.find({
    type: "income",
    year,
  });

  const totalIncome = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  res.status(200).json({ success: true, data: totalIncome });
});

//@desc Get total expenses for a specific year
//@route GET /api/transactions/expenses/year/:year
//@access private
export const getTotalExpensesForYear = expressAsyncHandler(async (req, res) => {
  const { year } = req.params;

  const transactions = await Transactions.find({
    type: "expense",
    year,
  });

  const totalExpenses = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  res.status(200).json({ success: true, data: totalExpenses });
});
