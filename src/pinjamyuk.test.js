import { describe, it, expect } from 'vitest';

import { filterProducts } from './products.js';
import { validateProduct, parseStoredProducts } from './store.js';
import { buildWhatsAppUrl } from './ui.js';

const sampleProducts = [
  { id: 'p1', nama: 'Kamera', kategori: 'Barang', harga: 150000, stok: 3, deskripsi: 'Kamera mirrorless', unggulan: true },
  { id: 'p2', nama: 'Drone', kategori: 'Barang', harga: 450000, stok: 0, deskripsi: 'Drone aerial', unggulan: false },
  { id: 'p3', nama: 'Jasa Foto', kategori: 'Jasa', harga: 200000, stok: 4, deskripsi: 'Fotografi acara', unggulan: false },
];

describe('filterProducts', () => {
  it('returns all products when no filter or search', () => {
    const result = filterProducts(sampleProducts, { search: '', category: 'Semua', sort: 'nama' });
    expect(result).toHaveLength(3);
  });

  it('filters by category Barang', () => {
    const result = filterProducts(sampleProducts, { category: 'Barang' });
    expect(result).toHaveLength(2);
    expect(result.every((item) => item.kategori === 'Barang')).toBe(true);
  });

  it('searches case-insensitively in nama and deskripsi', () => {
    const result = filterProducts(sampleProducts, { search: 'DRONE' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('p2');
  });

  it('sorts by harga ascending', () => {
    const result = filterProducts(sampleProducts, { sort: 'harga-asc' });
    expect(result.map((item) => item.harga)).toEqual([150000, 200000, 450000]);
  });

  it('sorts by stok descending', () => {
    const result = filterProducts(sampleProducts, { sort: 'stok-desc' });
    expect(result.map((item) => item.stok)).toEqual([4, 3, 0]);
  });

  it('does not mutate original list', () => {
    const original = [...sampleProducts];
    filterProducts(sampleProducts, { sort: 'harga-desc' });
    expect(sampleProducts).toEqual(original);
  });
});

describe('validateProduct', () => {
  it('accepts a valid product', () => {
    expect(validateProduct(sampleProducts[0])).toBe(true);
  });

  it('rejects invalid category', () => {
    const invalid = { ...sampleProducts[0], kategori: 'Lainnya' };
    expect(validateProduct(invalid)).toBe(false);
  });

  it('rejects negative harga or non-integer stok', () => {
    const invalidPrice = { ...sampleProducts[0], harga: -1 };
    const invalidStock = { ...sampleProducts[0], stok: 1.5 };
    expect(validateProduct(invalidPrice)).toBe(false);
    expect(validateProduct(invalidStock)).toBe(false);
  });

  it('rejects missing nama or deskripsi', () => {
    const noName = { ...sampleProducts[0], nama: '   ' };
    const noDesc = { ...sampleProducts[0], deskripsi: '' };
    expect(validateProduct(noName)).toBe(false);
    expect(validateProduct(noDesc)).toBe(false);
  });
});

describe('buildWhatsAppUrl', () => {
  it('builds url with encoded message for valid number', () => {
    const url = buildWhatsAppUrl('6281234567890', sampleProducts[0]);
    expect(url).toContain('https://wa.me/6281234567890?text=');
    expect(decodeURIComponent(url.split('text=')[1])).toContain('Kamera');
  });

  it('throws for invalid phone number', () => {
    expect(() => buildWhatsAppUrl('081234567890', sampleProducts[0])).toThrow();
    expect(() => buildWhatsAppUrl('', sampleProducts[0])).toThrow();
  });
});

describe('parseStoredProducts', () => {
  it('returns null for malformed or invalid payload', () => {
    expect(parseStoredProducts('not-json')).toBeNull();
    expect(parseStoredProducts(JSON.stringify([{ id: 'x' }]))).toBeNull();
  });

  it('returns parsed list for valid payload', () => {
    const raw = JSON.stringify(sampleProducts);
    const result = parseStoredProducts(raw);
    expect(result).toHaveLength(3);
  });
});
