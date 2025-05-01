// Fungsi untuk ekspor data ke file JSON
export const exportData = (data, filename = 'data.json') => {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Fungsi untuk impor data dari file JSON
export const importData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        resolve(data);
      } catch (error) {
        reject(new Error('File tidak valid'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Gagal membaca file'));
    };

    reader.readAsText(file);
  });
};

// Fungsi untuk backup semua data dari localStorage
export const backupAllData = () => {
  const data = {
    products: JSON.parse(localStorage.getItem('store-products') || '[]'),
    transactions: JSON.parse(
      localStorage.getItem('store-transactions') || '[]'
    ),
    categories: JSON.parse(localStorage.getItem('store-categories') || '[]'),
    businessInfo: JSON.parse(
      localStorage.getItem('store-business-info') || '[]'
    ),
  };

  exportData(
    data,
    `store-backup-${new Date().toISOString().slice(0, 10)}.json`
  );
};

// Fungsi untuk restore data ke localStorage
export const restoreAllData = (data) => {
  if (!data) return false;

  try {
    if (data.products)
      localStorage.setItem('store-products', JSON.stringify(data.products));
    if (data.transactions)
      localStorage.setItem(
        'store-transactions',
        JSON.stringify(data.transactions)
      );
    if (data.categories)
      localStorage.setItem('store-categories', JSON.stringify(data.categories));
    if (data.businessInfo)
      localStorage.setItem(
        'store-business-info',
        JSON.stringify(data.businessInfo)
      );
    return true;
  } catch (error) {
    console.error('Restore error:', error);
    return false;
  }
};

// Fungsi untuk reset semua data
export const resetAllData = () => {
  localStorage.removeItem('store-products');
  localStorage.removeItem('store-transactions');
  localStorage.removeItem('store-categories');
  localStorage.removeItem('store-business-info');
};
