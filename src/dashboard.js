import './style.css';

import { getProducts, addProduct, updateProduct, deleteProduct, resetProducts } from './store.js';
import { CATEGORIES } from './products.js';
import { formatRupiah } from './ui.js';

const summaryTotalProducts = document.getElementById('summary-total-products');
const summaryTotalStock = document.getElementById('summary-total-stock');
const summaryTotalCategories = document.getElementById('summary-total-categories');
const summaryOutOfStock = document.getElementById('summary-out-of-stock');

const tableBody = document.getElementById('dashboard-table-body');
const emptyState = document.getElementById('dashboard-empty');
const formSection = document.getElementById('dashboard-form-section');
const formTitle = document.getElementById('dashboard-form-title');
const form = document.getElementById('dashboard-form');
const formId = document.getElementById('dashboard-form-id');
const inputNama = document.getElementById('dashboard-nama');
const inputKategori = document.getElementById('dashboard-kategori');
const inputHarga = document.getElementById('dashboard-harga');
const inputStok = document.getElementById('dashboard-stok');
const inputDeskripsi = document.getElementById('dashboard-deskripsi');
const inputImage = document.getElementById('dashboard-image');
const inputUnggulan = document.getElementById('dashboard-unggulan');

const errorNama = document.getElementById('error-nama');
const errorKategori = document.getElementById('error-kategori');
const errorHarga = document.getElementById('error-harga');
const errorStok = document.getElementById('error-stok');
const errorDeskripsi = document.getElementById('error-deskripsi');
const errorImage = document.getElementById('error-image');
const formMessage = document.getElementById('dashboard-form-message');

const addButton = document.getElementById('dashboard-add');
const cancelButton = document.getElementById('dashboard-cancel');
const resetButton = document.getElementById('dashboard-reset');
const confirmDialog = document.getElementById('dashboard-confirm-dialog');
const confirmMessage = document.getElementById('confirm-dialog-message');

let editingId = null;

function clearErrors() {
  errorNama.textContent = '';
  errorKategori.textContent = '';
  errorHarga.textContent = '';
  errorStok.textContent = '';
  errorDeskripsi.textContent = '';
  errorImage.textContent = '';
  formMessage.textContent = '';
}

function renderSummary() {
  const products = getProducts();
  summaryTotalProducts.textContent = String(products.length);
  summaryTotalStock.textContent = String(
    products.reduce((total, product) => total + Number(product.stok || 0), 0),
  );
  summaryTotalCategories.textContent = String(new Set(products.map((product) => product.kategori)).size);
  summaryOutOfStock.textContent = String(products.filter((product) => product.stok === 0).length);
}

function createActionButton(label, className, onClick) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.textContent = label;
  button.addEventListener('click', onClick);
  return button;
}

function renderTable() {
  const products = getProducts();
  tableBody.replaceChildren();

  if (products.length === 0) {
    emptyState.classList.remove('is-hidden');
    return;
  }

  emptyState.classList.add('is-hidden');

  products.forEach((product, index) => {
    const row = document.createElement('tr');

    const numberCell = document.createElement('td');
    numberCell.textContent = String(index + 1);

    const nameCell = document.createElement('td');
    if (product.imageUrl) {
      const thumb = document.createElement('img');
      thumb.className = 'dashboard-thumb';
      thumb.src = product.imageUrl;
      thumb.alt = product.nama;
      thumb.loading = 'lazy';
      thumb.addEventListener('error', () => {
        thumb.remove();
        const placeholder = document.createElement('span');
        placeholder.className = 'dashboard-thumb-placeholder';
        placeholder.textContent = product.kategori === 'Jasa' ? 'Jasa' : 'Barang';
        nameCell.insertBefore(placeholder, nameText);
      });
      nameCell.appendChild(thumb);
    } else {
      const placeholder = document.createElement('span');
      placeholder.className = 'dashboard-thumb-placeholder';
      placeholder.textContent = product.kategori === 'Jasa' ? 'Jasa' : 'Barang';
      nameCell.appendChild(placeholder);
    }
    const nameText = document.createElement('span');
    nameText.textContent = product.nama;
    nameCell.appendChild(nameText);

    const categoryCell = document.createElement('td');
    categoryCell.textContent = product.kategori;

    const priceCell = document.createElement('td');
    priceCell.textContent = formatRupiah(product.harga);

    const stockCell = document.createElement('td');
    stockCell.textContent = String(product.stok);

    const actionsCell = document.createElement('td');
    actionsCell.className = 'dashboard-actions-cell';

    const editButton = createActionButton('Edit', 'button button-secondary button-sm', () => {
      startEdit(product.id);
    });
    const deleteButton = createActionButton('Hapus', 'button button-danger button-sm', () => {
      handleDelete(product.id, product.nama);
    });

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);

    row.appendChild(numberCell);
    row.appendChild(nameCell);
    row.appendChild(categoryCell);
    row.appendChild(priceCell);
    row.appendChild(stockCell);
    row.appendChild(actionsCell);

    tableBody.appendChild(row);
  });
}

function refreshDashboard() {
  renderSummary();
  renderTable();
}

function showForm() {
  formSection.classList.remove('is-hidden');
  formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function hideForm() {
  formSection.classList.add('is-hidden');
  form.reset();
  formId.value = '';
  editingId = null;
  formTitle.textContent = 'Tambah Produk';
  clearErrors();
}

function startEdit(id) {
  const product = getProducts().find((item) => item.id === id);
  if (!product) return;

  editingId = id;
  formTitle.textContent = 'Edit Produk';
  formId.value = id;
  inputNama.value = product.nama;
  inputKategori.value = product.kategori;
  inputHarga.value = String(product.harga);
  inputStok.value = String(product.stok);
  inputDeskripsi.value = product.deskripsi;
  inputImage.value = product.imageUrl || '';
  inputUnggulan.checked = Boolean(product.unggulan);

  clearErrors();
  showForm();
}

function validateForm() {
  clearErrors();
  let isValid = true;

  const nama = inputNama.value.trim();
  if (!nama) {
    errorNama.textContent = 'Nama produk wajib diisi.';
    isValid = false;
  }

  const kategori = inputKategori.value;
  if (!CATEGORIES.includes(kategori)) {
    errorKategori.textContent = 'Kategori wajib Barang atau Jasa.';
    isValid = false;
  }

  const harga = Number(inputHarga.value);
  if (!Number.isFinite(harga) || harga < 0) {
    errorHarga.textContent = 'Harga harus angka dan minimal 0.';
    isValid = false;
  }

  const stok = Number(inputStok.value);
  if (!Number.isInteger(stok) || stok < 0) {
    errorStok.textContent = 'Stok harus bilangan bulat dan minimal 0.';
    isValid = false;
  }

  const deskripsi = inputDeskripsi.value.trim();
  if (!deskripsi) {
    errorDeskripsi.textContent = 'Deskripsi wajib diisi.';
    isValid = false;
  }

  const imageUrl = inputImage.value.trim();
  if (imageUrl && !imageUrl.startsWith('/')) {
    errorImage.textContent = 'Gunakan path lokal yang diawali /.';
    isValid = false;
  }

  return isValid;
}

function handleDelete(id, nama) {
  confirmMessage.textContent = `Hapus produk "${nama}"? Tindakan ini tidak dapat dibatalkan.`;
  confirmDialog.showModal();

  const handleConfirm = (event) => {
    if (event.target.returnValue !== 'confirm') {
      confirmDialog.removeEventListener('close', handleConfirm);
      return;
    }
    const result = deleteProduct(id);
    if (!result.ok) {
      formMessage.textContent = result.error || 'Gagal menghapus produk.';
    }
    refreshDashboard();
    confirmDialog.removeEventListener('close', handleConfirm);
  };

  confirmDialog.addEventListener('close', handleConfirm, { once: true });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!validateForm()) return;

  const data = {
    nama: inputNama.value.trim(),
    kategori: inputKategori.value,
    harga: Number(inputHarga.value),
    stok: Number(inputStok.value),
    deskripsi: inputDeskripsi.value.trim(),
    imageUrl: inputImage.value.trim(),
    unggulan: inputUnggulan.checked,
  };

  let result;
  if (editingId) {
    result = updateProduct(editingId, data);
  } else {
    result = addProduct(data);
  }

  if (!result.ok) {
    formMessage.textContent = result.error || 'Gagal menyimpan produk.';
    return;
  }

  formMessage.textContent = editingId ? 'Produk berhasil diperbarui.' : 'Produk berhasil ditambahkan.';
  hideForm();
  refreshDashboard();
});

addButton.addEventListener('click', () => {
  editingId = null;
  formTitle.textContent = 'Tambah Produk';
  form.reset();
  clearErrors();
  showForm();
});

cancelButton.addEventListener('click', () => {
  hideForm();
});

resetButton.addEventListener('click', async () => {
  confirmMessage.textContent = 'Reset data demo ke data awal? Perubahan yang belum disimpan akan hilang.';
  confirmDialog.showModal();

  const handleConfirm = (event) => {
    if (event.target.returnValue !== 'confirm') {
      confirmDialog.removeEventListener('close', handleConfirm);
      return;
    }
    const result = resetProducts();
    if (!result.ok) {
      formMessage.textContent = result.error || 'Gagal mereset data.';
    }
    refreshDashboard();
    confirmDialog.removeEventListener('close', handleConfirm);
  };

  confirmDialog.addEventListener('close', handleConfirm, { once: true });
});

refreshDashboard();
