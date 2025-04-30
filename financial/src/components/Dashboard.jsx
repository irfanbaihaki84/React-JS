import { useFinancial } from '../context/FinancialContext';
import { formatCurrency } from '../utils/formatCurrency';

const Dashboard = () => {
  const { getCurrentMonthSummary, transactions } = useFinancial();
  const { income, expenses, balance } = getCurrentMonthSummary();

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="summary-cards">
        <div className="card">
          <h3>Pendapatan Bulan Ini</h3>
          <p className="income">{formatCurrency(income)}</p>
        </div>

        <div className="card">
          <h3>Pengeluaran Bulan Ini</h3>
          <p className="expense">{formatCurrency(expenses)}</p>
        </div>

        <div className="card">
          <h3>Saldo Bulan Ini</h3>
          <p className={balance >= 0 ? 'income' : 'expense'}>
            {balance >= 0 ? '+' : '-'} {formatCurrency(Math.abs(balance))}
          </p>
        </div>
        {/* <div className="card">
          <h3>Pendapatan Bulan Ini</h3>
          <p className="income">+ Rp{income.toLocaleString()}</p>
        </div>

        <div className="card">
          <h3>Pengeluaran Bulan Ini</h3>
          <p className="expense">- Rp{expenses.toLocaleString()}</p>
        </div>

        <div className="card">
          <h3>Saldo Bulan Ini</h3>
          <p className={balance >= 0 ? 'income' : 'expense'}>
            {balance >= 0 ? '+' : '-'} Rp{Math.abs(balance).toLocaleString()}
          </p>
        </div> */}
      </div>

      <div className="recent-transactions">
        <h3>Transaksi Terakhir</h3>
        <table>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Keterangan</th>
              <th>Kategori</th>
              <th>Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>{transaction.description}</td>
                <td>{transaction.categoryId}</td>
                <td
                  className={
                    transaction.type === 'income' ? 'income' : 'expense'
                  }
                >
                  {transaction.type === 'income' ? '+' : '-'} Rp
                  {transaction.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
