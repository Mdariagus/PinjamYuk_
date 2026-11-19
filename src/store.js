import { products as seedProducts, CATEGORIES } from './products.js';

export const STORAGE_KEY = 'pinjamYuk.products.v1';

function cloneList(list) {
  return list.map((product) => ({ ...product }));
}

export function validateProduct(value) {
  if (value === null || typeof value !== 'object') {
    return false;
  }
  const { id, nama, kategori, harga, stok, deskripsi, unggulan } = value;
  return (
    typeof id === 'string' &&
    id.trim().length > 0 &&
    typeof nama === 'string' &&
    nama.trim().length > 0 &&
    CATEGORIES.includes(kategori) &&
    typeof harga === 'number' &&
    Number.isFinite(harga) &&
    harga >= 0 &&
    Number.isInteger(stok) &&
    stok >= 0 &&
    typeof deskripsi === 'string' &&
    deskripsi.trim().length > 0 &&
    typeof unggulan === 'boolean'
  );
}

function isValidList(value) {
  if (!Array.isArray(value)) {
    return false;
  }
  if (value.length === 0) {
    return true;
  }
  return value.every((item) => validateProduct(item));
}

export function parseStoredProducts(raw) {
  if (typeof raw !== 'string') {
    return null;
  }
  try {
    const parsed = JSON.parse(raw);
    return isValidList(parsed) ? parsed : null;
  } catch (error) {
    return null;
  }
}

function readStored() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      return null;
    }
    return parseStoredProducts(raw);
  } catch (error) {
    return null;
  }
}

function writeStored(list) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return true;
  } catch (error) {
    return false;
  }
}

function isStorageAvailable() {
  try {
    const testKey = 'pinjamYuk.storage.test';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

function mergeSeedProducts(stored) {
  if (!Array.isArray(stored)) {
    return cloneList(seedProducts);
  }

  const seedById = new Map(seedProducts.map((product) => [product.id, product]));
  let changed = false;

  const merged = stored.map((product) => {
    const seed = seedById.get(product.id);
    if (!seed) {
      return { ...product };
    }

    const next = { ...product };
    const currentImage = String(next.imageUrl ?? '').trim();
    const seedImage = String(seed.imageUrl ?? '').trim();

    // Migrate missing or old svg image paths from seed data.
    if (seedImage && (!currentImage || currentImage.endsWith('.svg'))) {
      next.imageUrl = seedImage;
      changed = true;
    }

    return next;
  });

  const existingIds = new Set(merged.map((product) => product.id));
  const missingSeeds = seedProducts.filter((product) => !existingIds.has(product.id));
  if (missingSeeds.length > 0) {
    merged.push(...cloneList(missingSeeds));
    changed = true;
  }

  if (changed) {
    writeStored(merged);
  }
  return merged;
}

const storedProducts = readStored();
let products = storedProducts === null ? cloneList(seedProducts) : mergeSeedProducts(storedProducts);

export function getProducts() {
  return products;
}

export function getProductById(id) {
  return products.find((product) => product.id === id) ?? null;
}

export function addProduct(data) {
  const product = { id: `item-${Date.now()}`, ...data };
  const next = [...products, product];
  if (!writeStored(next)) {
    return { ok: false, error: 'Penyimpanan lokal gagal. Data tidak diubah.' };
  }
  products = next;
  return { ok: true, product };
}

export function updateProduct(id, data) {
  const next = products.map((product) =>
    product.id === id ? { ...product, ...data, id } : product,
  );
  if (!writeStored(next)) {
    return { ok: false, error: 'Penyimpanan lokal gagal. Perubahan tidak disimpan.' };
  }
  products = next;
  return { ok: true, product: next.find((product) => product.id === id) ?? null };
}

export function deleteProduct(id) {
  const next = products.filter((product) => product.id !== id);
  if (!writeStored(next)) {
    return { ok: false, error: 'Penyimpanan lokal gagal. Data tidak diubah.' };
  }
  products = next;
  return { ok: true };
}

export function resetProducts() {
  products = cloneList(seedProducts);
  if (!writeStored(products)) {
    return { ok: false, error: 'Penyimpanan lokal gagal. Data tidak diubah.' };
  }
  return { ok: true };
}
