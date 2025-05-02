import React from 'react';
import { useStore } from '../contexts/StoreContext';

const StockHistory = () => {
  const { products, transactions } = useStore();

  // Fungsi untuk mendapatkan riwayat stok
  const getStockHistory = () => {
    const stockChanges = [];

    // Proses transaksi untuk melacak perubahan stok
    transactions.forEach((transaction) => {
      const product = products.find((p) => p.id === transaction.productId);
      if (!product) return;

      if (transaction.type === 'income') {
        // Penjualan mengurangi stok
        stockChanges.push({
          date: transaction.date,
          productId: product.id,
          productName: product.name,
          change: -transaction.quantity,
          currentStock: product.stock,
          type: 'Penjualan',
          reference: `Transaksi #${transaction.id}`,
        });
      } else if (transaction.type === 'expense') {
        // Pembelian menambah stok
        stockChanges.push({
          date: transaction.date,
          productId: product.id,
          productName: product.name,
          change: +transaction.quantity,
          currentStock: product.stock,
          type: 'Pembelian',
          reference: `Transaksi #${transaction.id}`,
        });
      }
    });

    // Urutkan berdasarkan tanggal terbaru
    return stockChanges.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const stockHistory = getStockHistory();

  return (
    <div className="report-section">
      <h3>Riwayat Perubahan Stok</h3>

      <div className="filters">
        <select>
          <option value="">Semua Produk</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        <input type="date" placeholder="Dari tanggal" />
        <input type="date" placeholder="Sampai tanggal" />

        <button>Filter</button>
        <button>Ekspor ke Excel</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Produk</th>
              <th>Perubahan</th>
              <th>Stok Saat Ini</th>
              <th>Tipe</th>
              <th>Referensi</th>
            </tr>
          </thead>
          <tbody>
            {stockHistory.map((item, index) => (
              <tr key={index}>
                <td>{new Date(item.date).toLocaleDateString('id-ID')}</td>
                <td>{item.productName}</td>
                <td className={item.change > 0 ? 'positive' : 'negative'}>
                  {item.change > 0 ? `+${item.change}` : item.change}
                </td>
                <td>{item.currentStock}</td>
                <td>{item.type}</td>
                <td>{item.reference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockHistory;
