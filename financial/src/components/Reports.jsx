import { useState } from 'react';
import { useFinancial } from '../context/FinancialContext';
import { formatCurrency } from '../utils/formatCurrency';
import { ensureNumber } from '../utils/numberUtils';

const Reports = () => {
  const { transactions, categories, accounts, getCategorySpending } =
    useFinancial();
  const [reportType, setReportType] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Filter transactions based on report type and date
  const filteredTransactions = transactions.filter((transaction) => {
    const date = new Date(transaction.date);

    if (reportType === 'monthly') {
      return (
        date.getMonth() + 1 === selectedMonth &&
        date.getFullYear() === selectedYear
      );
    } else if (reportType === 'yearly') {
      return date.getFullYear() === selectedYear;
    }
    return true;
  });

  // Calculate income and expenses
  const income = filteredTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + ensureNumber(t.amount), 0);

  const expenses = filteredTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + ensureNumber(t.amount), 0);

  const balance = income - expenses;

  // Get spending by category
  const expenseCategories = categories.filter((c) => c.type === 'expense');
  const categorySpending = expenseCategories
    .map((category) => ({
      category: category.name,
      amount: getCategorySpending(category.id, filteredTransactions),
    }))
    .filter((item) => item.amount > 0);

  // Get transactions by account
  const accountTransactions = accounts.map((account) => {
    const accountTrans = filteredTransactions.filter(
      (t) => t.accountId === account.id
    );
    const accountIncome = accountTrans
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + ensureNumber(t.amount), 0);
    const accountExpenses = accountTrans
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + ensureNumber(t.amount), 0);

    return {
      account: account.name,
      income: accountIncome,
      expenses: accountExpenses,
      balance: accountIncome - accountExpenses,
    };
  });

  return (
    <div className="reports">
      <h2>Laporan Keuangan</h2>

      <div className="report-controls">
        <div className="form-group">
          <label>Jenis Laporan</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="monthly">Bulanan</option>
            <option value="yearly">Tahunan</option>
          </select>
        </div>

        {reportType === 'monthly' && (
          <div className="form-group">
            <label>Bulan</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label>Tahun</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={new Date().getFullYear() - i}>
                {new Date().getFullYear() - i}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="summary-section">
        <h3>Ringkasan</h3>
        <div className="summary-cards">
          <div className="card">
            <h4>Pendapatan</h4>
            <p className="income">{formatCurrency(income)}</p>
            {/* <p className="income">+ Rp{income.toLocaleString()}</p> */}
          </div>

          <div className="card">
            <h4>Pengeluaran</h4>
            <p className="income">{formatCurrency(expenses)}</p>
            {/* <p className="expense">- Rp{expenses.toLocaleString()}</p> */}
          </div>

          <div className="card">
            <h4>Saldo</h4>
            <p className={balance >= 0 ? 'income' : 'expense'}>
              {balance >= 0 ? '+' : '-'} {formatCurrency(Math.abs(balance))}
              {/* {balance >= 0 ? '+' : '-'} Rp{Math.abs(balance).toLocaleString()} */}
            </p>
          </div>
        </div>
      </div>

      <div className="category-spending">
        <h3>Pengeluaran per Kategori</h3>
        <table>
          <thead>
            <tr>
              <th>Kategori</th>
              <th>Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {categorySpending.map((item, index) => (
              <tr key={index}>
                <td>{item.category}</td>
                <td className="expense">- {formatCurrency(item.amount)}</td>
                {/* <td className="expense">- Rp{item.amount.toLocaleString()}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="account-transactions">
        <h3>Transaksi per Akun</h3>
        <table>
          <thead>
            <tr>
              <th>Akun</th>
              <th>Pendapatan</th>
              <th>Pengeluaran</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {accountTransactions.map((item, index) => (
              <tr key={index}>
                <td>{item.account}</td>
                <td className="income">+ {formatCurrency(item.income)}</td>
                <td className="expense">- {formatCurrency(item.expenses)}</td>
                <td className={item.balance >= 0 ? 'income' : 'expense'}>
                  {item.balance >= 0 ? '+' : '-'}{' '}
                  {formatCurrency(Math.abs(item.balance))}
                </td>
                {/* <td className="income">+ Rp{item.income.toLocaleString()}</td>
                <td className="expense">
                  - Rp{item.expenses.toLocaleString()}
                </td>
                <td className={item.balance >= 0 ? 'income' : 'expense'}>
                  {item.balance >= 0 ? '+' : '-'} Rp
                  {Math.abs(item.balance).toLocaleString()}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
