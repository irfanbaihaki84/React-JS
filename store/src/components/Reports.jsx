import React from 'react';
import { useStore } from '../contexts/StoreContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Reports = () => {
  const { products, transactions, getFinancialSummary } = useStore();
  const { income, expense, balance } = getFinancialSummary();

  // Data untuk chart pendapatan vs pengeluaran
  const financialData = [
    { name: 'Pendapatan', value: income },
    { name: 'Pengeluaran', value: expense },
    { name: 'Saldo', value: balance },
  ];

  // Data untuk produk terlaris
  const getTopProducts = () => {
    const productSales = {};

    transactions
      .filter((t) => t.type === 'income')
      .forEach((t) => {
        if (!productSales[t.productId]) {
          productSales[t.productId] = 0;
        }
        productSales[t.productId] += t.quantity;
      });

    return Object.entries(productSales)
      .map(([productId, total]) => {
        const product = products.find((p) => p.id === Number(productId));
        return {
          name: product ? product.name : `Produk ${productId}`,
          total,
        };
      })
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  };

  // Data untuk transaksi bulanan
  const getMonthlyTransactions = () => {
    const monthlyData = {};

    transactions.forEach((t) => {
      const date = new Date(t.date);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { income: 0, expense: 0 };
      }

      if (t.type === 'income') {
        monthlyData[monthYear].income += t.total;
        // monthlyData[monthYear].income += t.amount;
      } else {
        monthlyData[monthYear].expense += t.total;
        // monthlyData[monthYear].expense += t.amount;
      }
    });

    return Object.entries(monthlyData)
      .map(([month, data]) => ({
        name: month,
        income: data.income,
        expense: data.expense,
      }))
      .sort((a, b) => {
        const [aMonth, aYear] = a.name.split('/');
        const [bMonth, bYear] = b.name.split('/');
        return new Date(aYear, aMonth) - new Date(bYear, bMonth);
      });
  };

  return (
    <div className="reports-container">
      <h2>Laporan dan Analisis</h2>

      <div className="financial-summary">
        <h3>Ringkasan Keuangan</h3>
        <div className="summary-cards">
          <div className="card income">
            <span>Pendapatan</span>
            <p>{income.toLocaleString('id-ID')}</p>
          </div>
          <div className="card expense">
            <span>Pengeluaran</span>
            <p>{expense.toLocaleString('id-ID')}</p>
          </div>
          <div className="card balance">
            <span>Saldo</span>
            <p>{balance.toLocaleString('id-ID')}</p>
          </div>
        </div>
      </div>

      <div className="chart-section">
        <h3>Pendapatan vs Pengeluaran</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-section">
        <h3>Transaksi Bulanan</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getMonthlyTransactions()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#82ca9d" />
              <Bar dataKey="expense" fill="#ff6b6b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="top-products">
        <h3>5 Produk Terlaris</h3>
        <table>
          <thead>
            <tr>
              <th>Produk</th>
              <th>Jumlah Terjual</th>
            </tr>
          </thead>
          <tbody>
            {getTopProducts().map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="export-section">
        <h3>Ekspor Data</h3>
        <button onClick={() => alert('Fitur ekspor akan diimplementasikan')}>
          Ekspor ke Excel
        </button>
        <button onClick={() => alert('Fitur ekspor akan diimplementasikan')}>
          Ekspor ke PDF
        </button>
      </div>
    </div>
  );
};

export default Reports;
