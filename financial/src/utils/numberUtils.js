// src/utils/numberUtils.js
export const ensureNumber = (value) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    // Hapus karakter non-digit kecuali titik desimal
    const cleaned = value.replace(/[^\d.]/g, '');
    return parseFloat(cleaned) || 0;
  }
  return 0;
};
