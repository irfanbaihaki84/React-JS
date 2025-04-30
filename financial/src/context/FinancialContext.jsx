import { createContext, useContext, useEffect, useState } from 'react';
import { ensureNumber } from '../utils/numberUtils';

const FinancialContext = createContext();

export const FinancialProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedTransactions =
      JSON.parse(localStorage.getItem('transactions')) || [];
    const savedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const savedCategories =
      JSON.parse(localStorage.getItem('categories')) || [];
    const savedBudgets = JSON.parse(localStorage.getItem('budgets')) || [];

    setTransactions(savedTransactions);
    setAccounts(savedAccounts);
    setCategories(savedCategories);
    setBudgets(savedBudgets);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  // Transaction functions
  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  const updateTransaction = (id, updatedTransaction) => {
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...updatedTransaction, id } : t))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // Account functions
  const addAccount = (account) => {
    setAccounts([...accounts, { ...account, id: Date.now() }]);
  };

  const updateAccount = (id, updatedAccount) => {
    setAccounts(
      accounts.map((a) => (a.id === id ? { ...updatedAccount, id } : a))
    );
  };

  const deleteAccount = (id) => {
    setAccounts(accounts.filter((a) => a.id !== id));
  };

  // Category functions
  const addCategory = (category) => {
    setCategories([...categories, { ...category, id: Date.now() }]);
  };

  const updateCategory = (id, updatedCategory) => {
    setCategories(
      categories.map((c) => (c.id === id ? { ...updatedCategory, id } : c))
    );
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  // Budget functions
  const addBudget = (budget) => {
    setBudgets([...budgets, { ...budget, id: Date.now() }]);
  };

  const updateBudget = (id, updatedBudget) => {
    setBudgets(
      budgets.map((b) => (b.id === id ? { ...updatedBudget, id } : b))
    );
  };

  const deleteBudget = (id) => {
    setBudgets(budgets.filter((b) => b.id !== id));
  };

  // Calculate balances and summaries
  const getAccountBalance = (accountId) => {
    const accountTransactions = transactions.filter(
      (t) => t.accountId === accountId
    );
    return accountTransactions.reduce((sum, t) => {
      return (
        sum +
        (t.type === 'income' ? ensureNumber(t.amount) : -ensureNumber(t.amount))
      );
    }, 0);
  };
  // const getAccountBalance = (accountId) => {
  //   const accountTransactions = transactions.filter(
  //     (t) => t.accountId === accountId
  //   );
  //   return accountTransactions.reduce(
  //     (sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount),
  //     0
  //   );
  // };

  const getCategorySpending = (categoryId) => {
    const categoryTransactions = transactions.filter(
      (t) => t.categoryId === categoryId && t.type === 'expense'
    );
    return categoryTransactions.reduce(
      (sum, t) => sum + ensureNumber(t.amount),
      0
    );
  };

  const getCurrentMonthSummary = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthTransactions = transactions.filter((t) => {
      const date = new Date(t.date);
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    });

    const income = monthTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + ensureNumber(t.amount), 0);

    const expenses = monthTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + ensureNumber(t.amount), 0);

    console.log(typeof expenses);
    console.log(expenses);
    return { income, expenses, balance: income - expenses };
  };

  return (
    <FinancialContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        accounts,
        addAccount,
        updateAccount,
        deleteAccount,
        getAccountBalance,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        getCategorySpending,
        budgets,
        addBudget,
        updateBudget,
        deleteBudget,
        getCurrentMonthSummary,
      }}
    >
      {children}
    </FinancialContext.Provider>
  );
};

export const useFinancial = () => useContext(FinancialContext);
