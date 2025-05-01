import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useLocalStorage('store-products', []);
  const [transactions, setTransactions] = useLocalStorage(
    'store-transactions',
    []
  );
  const [categories, setCategories] = useLocalStorage('store-categories', []);
  const [businessInfo, setBusinessInfo] = useLocalStorage(
    'store-business-info',
    []
  );

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const addTransaction = (transaction) => {
    setTransactions([
      ...transactions,
      { ...transaction, id: Date.now(), date: new Date().toISOString() },
    ]);
  };

  const getFinancialSummary = () => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      income,
      expense,
      balance: income - expense,
    };
  };

  const getProductsNetModal = () => {
    const productsNetModal = products.reduce(
      (sum, n) => sum + n.netPrice * n.stock,
      0
    );
    // console.log(products.reduce((sum, n) => sum + n.netPrice * n.stock, 0));
    return { productsNetModal };
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        transactions,
        addTransaction,
        categories,
        setCategories,
        businessInfo,
        setBusinessInfo,
        getFinancialSummary,
        getProductsNetModal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
