import React, { useState, useEffect } from 'react';
import { useStore } from '../contexts/StoreContext';

const PurchaseTransaction = () => {
  const { products, addTransaction, addProduct, updateProduct } = useStore();
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    quantity: 1,
    netPrice: 0,
    price: 0,
    total: 0,
    supplier: '',
    isNewProduct: false,
  });
  const [newProductMode, setNewProductMode] = useState(false);

  // Auto-calculate total when quantity or netPrice changes
  useEffect(() => {
    if (formData.quantity > 0 && formData.netPrice > 0) {
      setFormData((prev) => ({
        ...prev,
        total: prev.netPrice * prev.quantity,
      }));
    }
  }, [formData.quantity, formData.netPrice]);

  // Auto-fill product details when existing product is selected
  useEffect(() => {
    if (!newProductMode && formData.productId) {
      const product = products.find((p) => p.id === Number(formData.productId));
      if (product) {
        setFormData((prev) => ({
          ...prev,
          productName: product.name,
          netPrice: product.netPrice,
          price: product.price,
        }));
      }
    }
  }, [formData.productId, products, newProductMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'quantity' || name === 'netPrice' || name === 'price'
          ? Math.max(0, Number(value))
          : value,
    }));
  };

  const toggleNewProductMode = () => {
    setNewProductMode(!newProductMode);
    setFormData({
      productId: '',
      productName: '',
      quantity: 1,
      netPrice: 0,
      price: 0,
      total: 0,
      supplier: '',
      isNewProduct: !newProductMode,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newProductMode && !formData.productName) {
      alert('Nama produk harus diisi untuk produk baru!');
      return;
    }

    if (formData.quantity <= 0) {
      alert('Jumlah harus lebih dari 0!');
      return;
    }

    if (formData.netPrice <= 0) {
      alert('Harga beli harus lebih dari 0!');
      return;
    }

    if (newProductMode) {
      // Add new product
      const newProduct = {
        name: formData.productName,
        netPrice: formData.netPrice,
        price: formData.price,
        stock: formData.quantity,
        category: '',
      };
      addProduct(newProduct);
    } else if (formData.productId) {
      // Update existing product stock
      const product = products.find((p) => p.id === Number(formData.productId));
      if (product) {
        updateProduct(product.id, {
          stock: product.stock + formData.quantity,
          netPrice: formData.netPrice,
          price: formData.price,
        });
      }
    } else {
      alert('Pilih produk terlebih dahulu!');
      return;
    }

    // Record purchase transaction
    const newTransaction = {
      type: 'expense',
      productId: newProductMode ? null : Number(formData.productId),
      productName: formData.productName,
      quantity: formData.quantity,
      price: formData.netPrice, // netPrice is the purchase price
      total: formData.total,
      supplier: formData.supplier,
      date: new Date().toISOString(),
    };

    addTransaction(newTransaction);

    // Reset form
    setFormData({
      productId: '',
      productName: '',
      quantity: 1,
      netPrice: 0,
      price: 0,
      total: 0,
      supplier: '',
      isNewProduct: false,
    });
    setNewProductMode(false);

    alert('Transaksi pembelian berhasil dicatat!');
  };

  return (
    <div className="transaction-form-container">
      <h2>Transaksi Pembelian</h2>

      <div className="mode-toggle">
        <button
          type="button"
          onClick={toggleNewProductMode}
          className={newProductMode ? 'active' : ''}
        >
          {newProductMode ? 'Produk Baru' : 'Produk Existing'}
        </button>
        <span>
          Mode:{' '}
          {newProductMode
            ? 'Tambah Produk Baru'
            : 'Tambah Stok Produk Existing'}
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        {!newProductMode ? (
          <div className="form-group">
            <label>Pilih Produk</label>
            <select
              name="productId"
              value={formData.productId}
              onChange={handleInputChange}
              required={!newProductMode}
            >
              <option value="">Pilih Produk</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} (Stok: {product.stock})
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="form-group">
            <label>Nama Produk Baru</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              required={newProductMode}
            />
          </div>
        )}
        <div className="form-group">
          <label>Harga Beli (Net Price)</label>
          <input
            type="number"
            name="netPrice"
            min="0"
            value={formData.netPrice}
            onChange={handleInputChange}
            required
          />
        </div>
        {newProductMode && (
          <div className="form-group">
            <label>Harga Jual</label>
            <input
              type="number"
              name="price"
              min="0"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
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
        </div>
        <div className="form-group">
          <label>Total Pembelian</label>
          <input
            type="text"
            value={`Rp ${formData.total.toLocaleString('id-ID')}`}
            readOnly
          />
        </div>
        {/* {newProductMode && (
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            />
          </div>
        )} */}

        {/* <div className="form-group">
          <label>Supplier</label>
          <select
            name="supplierId"
            value={formData.supplierId || ''}
            onChange={handleInputChange}
          >
            <option value="">Supplier Umum</option>
            {contacts
              .filter((c) => c.type === 'supplier')
              .map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
          </select>
        </div> */}

        <div className="form-group">
          <label>Supplier</label>
          <input
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="submit-btn">
          Catat Pembelian
        </button>
      </form>
    </div>
  );
};

export default PurchaseTransaction;
