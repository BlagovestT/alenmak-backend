import expressAsyncHandler from "express-async-handler";
import Transactions from "../models/transactions.model";
import { getMonthName, getMonthNameInBulgarian } from "../helpers/helpers";

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

  await Transactions.findByIdAndDelete(req.params.id);

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

//@desc Get total income and expenses for a specific month and year
//@route GET /api/transactions/total/:month/:year
//@access private
export const getTotalIncomeAndExpensesForMonthAndYear = expressAsyncHandler(
  async (req, res) => {
    const { month, year } = req.params;

    const incomeTransactions = await Transactions.find({
      type: "income",
      month,
      year,
    });

    const totalIncome = incomeTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

    const expenseTransactions = await Transactions.find({
      type: "expense",
      month,
      year,
    });

    const totalExpenses = expenseTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

    const yearIncomeTransactions = await Transactions.find({
      type: "income",
      year,
    });

    const totalYearIncome = yearIncomeTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

    const yearExpenseTransactions = await Transactions.find({
      type: "expense",
      year,
    });

    const totalYearExpenses = yearExpenseTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalExpenses,
        totalYearIncome,
        totalYearExpenses,
      },
    });
  }
);

//@desc Get total income and expenses per month for a year
//@route GET /api/transactions/total/:year
//@access private

export const getTotalIncomeAndExpensesForYear = expressAsyncHandler(
  async (req, res) => {
    const { year } = req.params;

    const transactions = await Transactions.find({ year });

    const monthlyData = [];

    for (let i = 1; i <= 12; i++) {
      const monthName = getMonthName(i);
      const transactionsForMonth = transactions.filter(
        (transaction) =>
          transaction.month === monthName && transaction.type === "income"
      );

      const totalIncomeForMonth = transactionsForMonth.reduce(
        (total, transaction) => total + transaction.amount,
        0
      );

      const transactionsForMonthExpenses = transactions.filter(
        (transaction) =>
          transaction.month === monthName && transaction.type === "expense"
      );

      const totalExpensesForMonth = transactionsForMonthExpenses.reduce(
        (total, transaction) => total + transaction.amount,
        0
      );

      monthlyData.push({
        month: getMonthNameInBulgarian(i),
        totalIncome: totalIncomeForMonth,
        totalExpenses: totalExpensesForMonth,
      });
    }

    res.json(monthlyData);
  }
);
