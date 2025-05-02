import React, { useState } from 'react';
import { useStore } from '../contexts/StoreContext';

const Products = () => {
  const {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsNetModal,
  } = useStore();
  const { productsNetModal } = getProductsNetModal();
  const [newProduct, setNewProduct] = useState({
    name: '',
    netPrice: 0,
    price: 0,
    stock: 0,
    categoryId: '',
  });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]:
        name === 'netPrice' ||
        name === 'price' ||
        name === 'stock' ||
        name === 'categoryId'
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateProduct(editingId, newProduct);
      setEditingId(null);
    } else {
      addProduct(newProduct);
    }
    setNewProduct({
      name: '',
      netPrice: 0,
      price: 0,
      stock: 0,
      categoryId: '',
    });
  };

  const handleEdit = (product) => {
    setNewProduct(product);
    setEditingId(product.id);
  };

  return (
    <div className="products-container">
      <h2>Manajemen Produk</h2>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Nama Produk"
            required
          />
        </div>
        <div className="form-group">
          <label>Net Price</label>
          <input
            type="number"
            name="netPrice"
            value={newProduct.netPrice}
            onChange={handleInputChange}
            placeholder="Harga Net"
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Harga"
            required
          />
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            placeholder="Stok"
            required
          />
        </div>
        <div className="form-group">
          <label>Kategori</label>
          <select
            name="categoryId"
            value={newProduct.categoryId}
            onChange={handleInputChange}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">
          {editingId ? 'Update Produk' : 'Tambah Produk'}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setNewProduct({ name: '', price: 0, stock: 0, categoryId: '' });
            }}
          >
            Batal
          </button>
        )}
      </form>

      <div className="product-list">
        <h3>Daftar Produk</h3>
        <h4>Total Modal Rp_{productsNetModal.toLocaleString('id-ID')}</h4>
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Harga Net</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Jumlah</th>
              <th>Kategori</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const category = categories.find(
                (a) => a.id === product.categoryId
              );

              return (
                <tr key={product.id}>
                  <td>{product.name.toUpperCase()}</td>
                  <td>{product.netPrice.toLocaleString('id-ID')}</td>
                  <td>{product.price.toLocaleString('id-ID')}</td>
                  <td>{product.stock}</td>
                  <td>
                    {(product.stock * product.netPrice).toLocaleString('id-ID')}
                  </td>
                  <td>{category?.name.toUpperCase() || 'Unknown'}</td>
                  <td>
                    <button onClick={() => handleEdit(product)}>Edit</button>
                    <button onClick={() => deleteProduct(product.id)}>
                      Hapus
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
