import { CATEGORIES, filterProducts } from './products.js';
import { getProducts } from './store.js';
import { WHATSAPP_OWNER_NUMBER } from './config.js';

const WHATSAPP_ICON_PATH =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z';

let activeCategory = 'Semua';
let activeSearch = '';
let activeSort = 'nama';

function createIcon(name, size = 20) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.75');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');

  if (name === 'whatsapp') {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', WHATSAPP_ICON_PATH);
    svg.appendChild(path);
  } else if (name === 'check') {
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('points', '4 12.5 9 17.5 20 6.5');
    svg.appendChild(polyline);
  } else if (name === 'alert') {
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', '12 3 20 20 4 20');
    svg.appendChild(polygon);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '12');
    line.setAttribute('y1', '9');
    line.setAttribute('x2', '12');
    line.setAttribute('y2', '14');
    svg.appendChild(line);
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '12');
    circle.setAttribute('cy', '17.5');
    circle.setAttribute('r', '1');
    svg.appendChild(circle);
  } else if (name === 'close') {
    const first = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    first.setAttribute('x1', '6');
    first.setAttribute('y1', '6');
    first.setAttribute('x2', '18');
    first.setAttribute('y2', '18');
    const second = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    second.setAttribute('x1', '18');
    second.setAttribute('y1', '6');
    second.setAttribute('x2', '6');
    second.setAttribute('y2', '18');
    svg.appendChild(first);
    svg.appendChild(second);
  } else if (name === 'info') {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '12');
    circle.setAttribute('cy', '12');
    circle.setAttribute('r', '9');
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '12');
    line.setAttribute('y1', '8');
    line.setAttribute('x2', '12');
    line.setAttribute('y2', '13');
    svg.appendChild(circle);
    svg.appendChild(line);
  } else if (name === 'box') {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', '4');
    rect.setAttribute('y', '3');
    rect.setAttribute('width', '16');
    rect.setAttribute('height', '18');
    rect.setAttribute('rx', '2');
    const first = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    first.setAttribute('x1', '8');
    first.setAttribute('y1', '8');
    first.setAttribute('x2', '16');
    first.setAttribute('y2', '8');
    const second = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    second.setAttribute('x1', '8');
    second.setAttribute('y1', '12');
    second.setAttribute('x2', '16');
    second.setAttribute('y2', '12');
    const third = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    third.setAttribute('x1', '8');
    third.setAttribute('y1', '16');
    third.setAttribute('x2', '13');
    third.setAttribute('y2', '16');
    svg.appendChild(rect);
    svg.appendChild(first);
    svg.appendChild(second);
    svg.appendChild(third);
  } else if (name === 'cup') {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M7 5h10v7.5a2.5 2.5 0 0 1-5 0V5z');
    svg.appendChild(path);
  } else if (name === 'lock') {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', '5');
    rect.setAttribute('y', '11');
    rect.setAttribute('width', '14');
    rect.setAttribute('height', '9');
    rect.setAttribute('rx', '2');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M8 11V7a4 4 0 0 1 8 0v4');
    svg.appendChild(rect);
    svg.appendChild(path);
  } else {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '12');
    circle.setAttribute('cy', '12');
    circle.setAttribute('r', '9');
    svg.appendChild(circle);
  }
  return svg;
}

export function formatRupiah(value) {
  const number = Number(value);
  const safe = Number.isFinite(number) ? number : 0;
  return `Rp${safe.toLocaleString('id-ID')}`;
}

export function getStockLabel(stok) {
  const stock = Number(stok);
  if (!Number.isInteger(stock) || stock <= 0) {
    return 'Stok habis';
  }
  if (stock <= 2) {
    return `Sisa ${stock}`;
  }
  return `Stok ${stock}`;
}

export function getStockTone(stok) {
  const stock = Number(stok);
  if (!Number.isInteger(stock) || stock <= 0) {
    return 'danger';
  }
  if (stock <= 2) {
    return 'warning';
  }
  return 'success';
}

function getStockIcon(tone) {
  if (tone === 'danger') {
    return 'close';
  }
  if (tone === 'warning') {
    return 'alert';
  }
  return 'check';
}

export function buildWhatsAppUrl(nomor, produk) {
  const normalized = String(nomor ?? '').replace(/[\s+\-()]/g, '');
  if (!/^\d+$/.test(normalized) || normalized.length < 8 || normalized.length > 15 || normalized.startsWith('0')) {
    throw new Error('Nomor WhatsApp tidak valid. Gunakan format internasional tanpa tanda +, misalnya 6281234567890.');
  }
  const nama = String(produk?.nama ?? '');
  const kategori = String(produk?.kategori ?? '');
  const harga = Number(produk?.harga ?? 0);
  const stok = Number(produk?.stok ?? 0);
  const message = [
    'Halo, saya tertarik untuk menyewa produk melalui PinjamYuk!',
    '',
    'Detail penawaran:',
    `- Nama: ${nama}`,
    `- Kategori: ${kategori}`,
    `- Harga: Rp${harga.toLocaleString('id-ID')}`,
    '',
    'Mohon informasi lebih lanjut mengenai ketersediaan dan proses penyewaannya.',
    '',
    'Terima kasih!',
  ].join('\n');
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

function createPlaceholder(kategori) {
  const placeholder = document.createElement('div');
  placeholder.className = 'placeholder';

  const icon = document.createElement('span');
  icon.className = 'placeholder-icon';
  icon.appendChild(createIcon(kategori === 'Jasa' ? 'lock' : 'box', 22));
  const text = document.createElement('span');
  text.className = 'placeholder-text';
  text.textContent = 'Foto belum tersedia';

  placeholder.appendChild(icon);
  placeholder.appendChild(text);
  return placeholder;
}

function createStockStatus(product) {
  const tone = getStockTone(product.stok);
  const status = document.createElement('p');
  status.className = 'card-stock';
  status.dataset.tone = tone;
  status.textContent = getStockLabel(product.stok);
  status.appendChild(createIcon(getStockIcon(tone), 14));
  return status;
}

function createCardActions(product) {
  const actions = document.createElement('div');
  actions.className = 'card-actions';

  let whatsappUrl = null;
  if (product.stok > 0) {
    try {
      whatsappUrl = buildWhatsAppUrl(WHATSAPP_OWNER_NUMBER, product);
    } catch (error) {
      whatsappUrl = null;
    }
  }

  if (product.stok > 0 && whatsappUrl) {
    const link = document.createElement('a');
    link.className = 'button button-primary button-block button-whatsapp';
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    const label = document.createElement('span');
    label.className = 'button-label';
    label.textContent = 'Sewa Sekarang';

    link.appendChild(createIcon('whatsapp', 18));
    link.appendChild(label);
    actions.appendChild(link);
  } else if (product.stok > 0) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'button button-primary button-block';
    button.disabled = true;
    button.title = 'Nomor WhatsApp pemilik belum dikonfigurasi.';

    const label = document.createElement('span');
    label.className = 'button-label';
    label.textContent = 'Sewa Sekarang';

    button.appendChild(label);
    actions.appendChild(button);
  } else {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'button button-primary button-block';
    button.disabled = true;

    const label = document.createElement('span');
    label.className = 'button-label';
    label.textContent = 'Stok Habis';

    button.appendChild(label);
    actions.appendChild(button);
  }

  const detailButton = document.createElement('button');
  detailButton.type = 'button';
  detailButton.className = 'button button-secondary button-block';
  detailButton.textContent = 'Lihat Detail';
  detailButton.addEventListener('click', () => {
    window.location.hash = `detail/${encodeURIComponent(product.id)}`;
  });
  actions.appendChild(detailButton);

  return actions;
}

export function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'card';
  card.dataset.productId = product.id;

  const media = document.createElement('div');
  media.className = 'card-media';
  if (product.imageUrl) {
    const image = document.createElement('img');
    image.className = 'card-image';
    image.src = product.imageUrl;
    image.alt = product.nama;
    image.loading = 'lazy';
    image.addEventListener('error', () => {
      image.replaceWith(createPlaceholder(product.kategori));
    });
    media.appendChild(image);
  } else {
    media.appendChild(createPlaceholder(product.kategori));
  }

  if (product.unggulan) {
    const badge = document.createElement('span');
    badge.className = 'badge badge-unggulan';
    badge.textContent = 'Unggulan';
    media.appendChild(badge);
  }

  const categoryBadge = document.createElement('span');
  categoryBadge.className = 'badge badge-kategori';
  categoryBadge.textContent = product.kategori;
  media.appendChild(categoryBadge);

  const body = document.createElement('div');
  body.className = 'card-body';

  const categoryLabel = document.createElement('span');
  categoryLabel.className = 'card-category';
  categoryLabel.textContent = product.kategori;

  const name = document.createElement('h3');
  name.className = 'card-name';
  name.textContent = product.nama;

  const description = document.createElement('p');
  description.className = 'card-description';
  description.textContent = product.deskripsi;

  const price = document.createElement('p');
  price.className = 'card-price';
  price.textContent = formatRupiah(product.harga);

  body.appendChild(categoryLabel);
  body.appendChild(name);
  body.appendChild(description);
  body.appendChild(price);
  body.appendChild(createStockStatus(product));

  card.appendChild(media);
  card.appendChild(body);

  const actions = createCardActions(product);
  if (actions.children.length > 0) {
    card.appendChild(actions);
  }

  card.style.cursor = 'pointer';
  card.addEventListener('click', (event) => {
    if (event.target.closest('a, button')) return;
    window.location.hash = `detail/${encodeURIComponent(product.id)}`;
  });

  return card;
}

export function setSearch(value) {
  activeSearch = value;
  renderCatalog(getProducts());
}

export function setSort(value) {
  activeSort = value;
  renderCatalog(getProducts());
}

export function initCatalogControls() {
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');
  if (searchInput && searchClear) {
    const toggleClearVisibility = () => {
      searchClear.classList.toggle('is-hidden', searchInput.value.trim() === '');
    };
    searchInput.addEventListener('input', () => {
      toggleClearVisibility();
      setSearch(searchInput.value);
    });
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      setSearch('');
    });
    toggleClearVisibility();
  }
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (event) => {
      setSort(event.target.value);
    });
  }

  const resetFilter = document.getElementById('reset-filter');
  if (resetFilter) {
    resetFilter.addEventListener('click', () => {
      setActiveCategory('Semua');
      setSearch('');
      setSort('nama');
      const searchInput = document.getElementById('search-input');
      if (searchInput) searchInput.value = '';
    });
  }
}

export function initCategoryTiles() {
  const tiles = document.querySelectorAll('.kategori-tile[data-category]');
  tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      setActiveCategory(tile.dataset.category);
      const katalog = document.getElementById('katalog');
      if (katalog) {
        katalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

export function initNavigation() {
  const links = document.querySelectorAll('.nav a');
  links.forEach((link) => {
    link.addEventListener('click', () => {
      links.forEach((item) => item.classList.remove('is-active'));
      link.classList.add('is-active');
      const nav = document.getElementById('main-navigation');
      if (nav) nav.classList.remove('is-open');
      const toggle = document.getElementById('mobile-menu-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

export function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const nav = document.getElementById('main-navigation');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Tutup navigasi' : 'Buka navigasi');
  });
}

export function renderCategoryFilter() {
  const container = document.getElementById('category-filter');
  if (!container) {
    return;
  }

  container.replaceChildren();

  const fragment = document.createDocumentFragment();
  const categories = ['Semua', ...CATEGORIES];
  for (const category of categories) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'category-chip';
    button.dataset.category = category;
    button.setAttribute('aria-pressed', String(activeCategory === category));
    button.textContent = category;
    button.addEventListener('click', () => setActiveCategory(category));
    fragment.appendChild(button);
  }
  container.appendChild(fragment);
}

export function setActiveCategory(category) {
  activeCategory = category;
  renderCategoryFilter();
  renderCatalog(getProducts());
}

export function renderCatalog(list) {
  const grid = document.getElementById('product-grid');
  if (!grid) {
    return;
  }

  const visible = filterProducts(list, {
    search: activeSearch,
    category: activeCategory,
    sort: activeSort,
  });

  grid.replaceChildren();

  if (visible.length > 0) {
    const fragment = document.createDocumentFragment();
    for (const product of visible) {
      fragment.appendChild(createProductCard(product));
    }
    grid.appendChild(fragment);
  } else {
    grid.appendChild(createEmptyState(list, visible.length));
  }

  const count = document.getElementById('result-count');
  if (count) {
    count.textContent = `Menampilkan ${visible.length} penawaran`;
  }
}

export function renderFeatured(list) {
  const grid = document.getElementById('featured-grid');
  if (!grid) {
    return;
  }

  grid.replaceChildren();

  if (!Array.isArray(list)) {
    return;
  }

  const featured = list.filter((product) => product.unggulan).slice(0, 3);
  if (featured.length === 0) {
    return;
  }

  const fragment = document.createDocumentFragment();
  for (const product of featured) {
    fragment.appendChild(createProductCard(product));
  }
  grid.appendChild(fragment);
}

function createEmptyState(list, visibleCount) {
  const state = document.createElement('div');
  state.className = 'empty-state';

  const title = document.createElement('h3');
  title.className = 'empty-state-title';
  const text = document.createElement('p');
  text.className = 'empty-state-text';

  if (Array.isArray(list) && list.length > 0 && visibleCount === 0) {
    title.textContent = 'Produk tidak ditemukan';
    text.textContent = 'Coba ubah kata kunci atau filter yang digunakan.';
    const action = document.createElement('button');
    action.type = 'button';
    action.className = 'button button-secondary';
    action.textContent = 'Reset filter';
    action.addEventListener('click', () => {
      setActiveCategory('Semua');
      setSearch('');
      setSort('nama');
    });
    state.appendChild(title);
    state.appendChild(text);
    state.appendChild(action);
  } else {
    title.textContent = 'Belum ada penawaran di katalog';
    text.textContent = 'Belum ada penawaran yang cocok. Hubungi pemilik toko melalui dashboard demo untuk menambah penawaran.';
  }

  state.appendChild(title);
  state.appendChild(text);
  return state;
}

export function renderProductDetail(id) {
  const root = document.getElementById('detail-root');
  if (!root) return;

  const products = getProducts();
  const product = products.find((item) => item.id === id);

  root.replaceChildren();

  if (!product) {
    const wrap = document.createElement('div');
    wrap.className = 'detail-not-found';

    const title = document.createElement('h2');
    title.textContent = 'Produk tidak ditemukan';

    const text = document.createElement('p');
    text.textContent = 'Produk yang kamu cari tidak tersedia atau sudah dihapus.';

    const link = document.createElement('a');
    link.className = 'button button-primary';
    link.href = '#katalog';
    link.textContent = 'Kembali ke Katalog';

    wrap.appendChild(title);
    wrap.appendChild(text);
    wrap.appendChild(link);
    root.appendChild(wrap);
    return;
  }

  const breadcrumb = document.createElement('nav');
  breadcrumb.className = 'detail-breadcrumb';
  breadcrumb.setAttribute('aria-label', 'Breadcrumb');

  const linkHome = document.createElement('a');
  linkHome.href = '#beranda';
  linkHome.textContent = 'Beranda';
  const sep1 = document.createElement('span');
  sep1.textContent = ' / ';
  const linkCatalog = document.createElement('a');
  linkCatalog.href = '#katalog';
  linkCatalog.textContent = 'Katalog';
  const sep2 = document.createElement('span');
  sep2.textContent = ' / ';
  const current = document.createElement('span');
  current.textContent = product.nama;

  breadcrumb.appendChild(linkHome);
  breadcrumb.appendChild(sep1);
  breadcrumb.appendChild(linkCatalog);
  breadcrumb.appendChild(sep2);
  breadcrumb.appendChild(current);

  const backLink = document.createElement('a');
  backLink.className = 'detail-back';
  backLink.href = '#katalog';
  backLink.textContent = '← Kembali ke katalog';

  const layout = document.createElement('div');
  layout.className = 'detail-layout';

  const media = document.createElement('div');
  media.className = 'detail-media';
  if (product.imageUrl) {
    const image = document.createElement('img');
    image.src = product.imageUrl;
    image.alt = product.nama;
    image.loading = 'lazy';
    image.addEventListener('error', () => {
      image.replaceWith(createPlaceholder(product.kategori));
    });
    media.appendChild(image);
  } else {
    media.appendChild(createPlaceholder(product.kategori));
  }
  if (product.unggulan) {
    const badge = document.createElement('span');
    badge.className = 'badge badge-unggulan detail-badge-unggulan';
    badge.textContent = 'Unggulan';
    media.appendChild(badge);
  }
  const categoryBadge = document.createElement('span');
  categoryBadge.className = 'badge badge-kategori detail-badge-kategori';
  categoryBadge.textContent = product.kategori;
  media.appendChild(categoryBadge);

  const info = document.createElement('div');
  info.className = 'detail-info';

  const title = document.createElement('h1');
  title.className = 'detail-title';
  title.textContent = product.nama;

  const price = document.createElement('p');
  price.className = 'detail-price';
  price.textContent = formatRupiah(product.harga);

  const stock = createStockStatus(product);
  stock.className = 'card-stock detail-stock';

  const descriptionTitle = document.createElement('h2');
  descriptionTitle.className = 'detail-section-title';
  descriptionTitle.textContent = 'Deskripsi';

  const description = document.createElement('p');
  description.className = 'detail-description';
  description.textContent = product.deskripsi;

  const rentalTitle = document.createElement('h2');
  rentalTitle.className = 'detail-section-title';
  rentalTitle.textContent = 'Informasi Penyewaan';

  const availability = document.createElement('p');
  availability.className = 'detail-availability';
  availability.textContent =
    product.stok > 0 ? `Tersedia ${product.stok} unit.` : 'Stok habis.';

  const actions = document.createElement('div');
  actions.className = 'detail-actions';

  if (product.stok > 0) {
    let url = null;
    try {
      url = buildWhatsAppUrl(WHATSAPP_OWNER_NUMBER, product);
    } catch (error) {
      url = null;
    }

    if (url) {
      const link = document.createElement('a');
      link.className = 'button button-primary button-lg button-block';
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Sewa Sekarang';
      actions.appendChild(link);
    } else {
      const notice = document.createElement('p');
      notice.className = 'detail-notice';
      notice.textContent =
        'Nomor WhatsApp pemilik belum dikonfigurasi. Hubungi penyedia melalui kanal lain.';
      actions.appendChild(notice);

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'button button-primary button-lg button-block';
      button.disabled = true;
      button.textContent = 'Sewa Sekarang';
      actions.appendChild(button);
    }
  } else {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'button button-primary button-lg button-block';
    button.disabled = true;
    button.textContent = 'Stok Habis';
    actions.appendChild(button);
  }

  info.appendChild(title);
  info.appendChild(price);
  info.appendChild(stock);
  info.appendChild(descriptionTitle);
  info.appendChild(description);
  info.appendChild(rentalTitle);
  info.appendChild(availability);
  info.appendChild(actions);

  layout.appendChild(media);
  layout.appendChild(info);

  const recommendationTitle = document.createElement('h2');
  recommendationTitle.className = 'detail-section-title';
  recommendationTitle.textContent = 'Produk Lainnya';

  const recommendationGrid = document.createElement('div');
  recommendationGrid.className = 'product-grid detail-rec-grid';

  const recommendations = products
    .filter((item) => item.kategori === product.kategori && item.id !== product.id)
    .slice(0, 4);

  if (recommendations.length > 0) {
    const fragment = document.createDocumentFragment();
    for (const item of recommendations) {
      fragment.appendChild(createProductCard(item));
    }
    recommendationGrid.appendChild(fragment);
  } else {
    const empty = document.createElement('p');
    empty.className = 'detail-empty-rec';
    empty.textContent = 'Belum ada rekomendasi lain.';
    recommendationGrid.appendChild(empty);
  }

  root.appendChild(breadcrumb);
  root.appendChild(backLink);
  root.appendChild(layout);
  root.appendChild(recommendationTitle);
  root.appendChild(recommendationGrid);
}

export function initDetailRouting() {
  const handleRoute = () => {
    const hash = window.location.hash || '';
    const match = hash.match(/^#detail\/(.+)$/);
    if (match) {
      renderProductDetail(decodeURIComponent(match[1]));
      document.body.classList.add('detail-mode');
    } else {
      document.body.classList.remove('detail-mode');
      const root = document.getElementById('detail-root');
      if (root) root.replaceChildren();
    }
  };

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}
