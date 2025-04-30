// src/utils/formatCurrency.js
export const formatCurrency = (value) => {
  const amount =
    typeof value === 'string'
      ? parseFloat(value.replace(/[^\d.]/g, '')) || 0
      : value;
  //   if (isNaN(amount)) amount = 0;

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace('Rp', 'Rp');
};
