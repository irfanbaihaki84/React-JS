import React from 'react';
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
import './admin.css';

const Reports = ({ data }) => {
  // Generate sales report data
  const getSalesReport = () => {
    const today = new Date();
    const last7Days = [...Array(7)]
      .map((_, i) => {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      })
      .reverse();

    return last7Days.map((date) => {
      const dayTransactions = data.transactions.filter(
        (t) => t.date.split('T')[0] === date
      );
      const total = dayTransactions.reduce((sum, t) => sum + t.amount, 0);
      return {
        date,
        total,
        transactions: dayTransactions.length,
      };
    });
  };

  // Get top selling items
  const getTopSellingItems = () => {
    const itemCounts = {};
    data.orders.forEach((order) => {
      order.items.forEach((item) => {
        const menuItem = data.menus.find((m) => m.id === item.menuId);
        if (menuItem) {
          if (!itemCounts[menuItem.name]) {
            itemCounts[menuItem.name] = 0;
          }
          itemCounts[menuItem.name] += item.quantity;
        }
      });
    });

    return Object.entries(itemCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const salesData = getSalesReport();
  const topItems = getTopSellingItems();

  return (
    <div className="reports-dashboard">
      <div className="report-section">
        <h3>Sales Last 7 Days</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" name="Total Sales (Rp)" />
              <Bar
                dataKey="transactions"
                fill="#82ca9d"
                name="Number of Transactions"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="report-section">
        <h3>Top Selling Items</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topItems}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#ffc658" name="Quantity Sold" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="report-section">
        <h3>Financial Summary</h3>
        <div className="summary-cards">
          <div className="summary-card">
            <h4>Today's Revenue</h4>
            <p className="revenue">
              Rp{' '}
              {salesData[salesData.length - 1]?.total.toLocaleString() || '0'}
            </p>
          </div>
          <div className="summary-card">
            <h4>Total Transactions</h4>
            <p className="transactions">{data.transactions.length}</p>
          </div>
          <div className="summary-card">
            <h4>Average Order Value</h4>
            <p className="average">
              Rp{' '}
              {(
                data.transactions.reduce((sum, t) => sum + t.amount, 0) /
                Math.max(1, data.transactions.length)
              ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
