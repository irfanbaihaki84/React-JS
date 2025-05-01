import React, { useState, useEffect } from 'react';
import { useStore } from '../contexts/StoreContext';

const SalesTransaction = () => {
  const { products, addTransaction } = useStore();
  const [formData, setFormData] = useState({
    productId: '',
    quantity: 1,
    price: 0,
    total: 0,
    paymentMethod: 'cash',
    customerName: '',
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Auto-fill price when product is selected
  useEffect(() => {
    if (formData.productId) {
      const product = products.find((p) => p.id === Number(formData.productId));
      if (product) {
        setSelectedProduct(product);
        setFormData((prev) => ({
          ...prev,
          price: product.price,
          total: product.price * prev.quantity,
        }));
      }
    } else {
      setSelectedProduct(null);
      setFormData((prev) => ({ ...prev, price: 0, total: 0 }));
    }
  }, [formData.productId, products]);

  // Auto-calculate total when quantity changes
  useEffect(() => {
    if (formData.productId && formData.quantity > 0) {
      setFormData((prev) => ({
        ...prev,
        total: prev.price * prev.quantity,
      }));
    }
  }, [formData.quantity, formData.price]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? Math.max(1, Number(value)) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.productId) {
      alert('Pilih produk terlebih dahulu!');
      return;
    }

    if (selectedProduct.stock < formData.quantity) {
      alert(`Stok tidak mencukupi! Stok tersedia: ${selectedProduct.stock}`);
      return;
    }

    const newTransaction = {
      type: 'income',
      productId: Number(formData.productId),
      productName: selectedProduct.name,
      quantity: formData.quantity,
      price: formData.price,
      total: formData.total,
      paymentMethod: formData.paymentMethod,
      customerName: formData.customerName,
      date: new Date().toISOString(),
    };

    addTransaction(newTransaction);

    // Reset form
    setFormData({
      productId: '',
      quantity: 1,
      price: 0,
      total: 0,
      paymentMethod: 'cash',
      customerName: '',
    });
    setSelectedProduct(null);

    alert('Transaksi penjualan berhasil dicatat!');
  };

  return (
    <div className="transaction-form-container">
      <h2>Transaksi Penjualan</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Produk</label>
          <select
            name="productId"
            value={formData.productId}
            onChange={handleInputChange}
            required
          >
            <option value="">Pilih Produk</option>
            {products
              .filter((p) => p.stock > 0)
              .map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} (Stok: {product.stock}, Harga: Rp{' '}
                  {product.price.toLocaleString('id-ID')})
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label>Harga Satuan</label>
          <input
            type="text"
            value={formData.price.toLocaleString('id-ID')}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Jumlah</label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleInputChange}
            required
          />
          {selectedProduct && (
            <span className="stock-info">
              Stok tersedia: {selectedProduct.stock}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Total</label>
          <input
            type="text"
            value={`Rp ${formData.total.toLocaleString('id-ID')}`}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Metode Pembayaran</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
          >
            <option value="cash">Tunai</option>
            <option value="debit">Kartu Debit</option>
            <option value="credit">Kartu Kredit</option>
            <option value="transfer">Transfer Bank</option>
            <option value="qris">QRIS</option>
          </select>
        </div>

        <div className="form-group">
          <label>Nama Pelanggan (Opsional)</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Catat Penjualan
        </button>
      </form>
    </div>
  );
};

export default SalesTransaction;
