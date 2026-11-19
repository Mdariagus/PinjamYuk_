const WHATSAPP_NUMBER = '6281234567890';

const WHATSAPP_ICON_PATH =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z';

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

export function buildWhatsAppUrl(product) {
  const text = `Halo, saya tertarik dengan ${product.nama} di PinjamYuk. Apakah masih tersedia? Saya ingin bertanya mengenai penyewaannya.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
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

  if (product.stok > 0) {
    if (WHATSAPP_NUMBER) {
      const link = document.createElement('a');
      link.className = 'button button-primary button-block';
      link.href = buildWhatsAppUrl(product);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';

      const label = document.createElement('span');
      label.className = 'button-label';
      label.textContent = 'Pesan via WhatsApp';

      link.appendChild(createIcon('whatsapp', 18));
      link.appendChild(label);
      actions.appendChild(link);
    } else {
      const note = document.createElement('p');
      note.className = 'contact-unavailable';
      note.appendChild(createIcon('info', 14));
      note.textContent = 'Kontak WhatsApp belum tersedia';
      actions.appendChild(note);
    }
  }

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
    image.alt = '';
    image.loading = 'lazy';
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

  return card;
}

export function renderCatalog(list) {
  const grid = document.getElementById('product-grid');
  if (!grid) {
    return;
  }

  grid.replaceChildren();

  if (Array.isArray(list) && list.length > 0) {
    const fragment = document.createDocumentFragment();
    for (const product of list) {
      fragment.appendChild(createProductCard(product));
    }
    grid.appendChild(fragment);
  } else {
    grid.appendChild(createEmptyState());
  }

  const count = document.getElementById('result-count');
  if (count) {
    count.textContent = `Menampilkan ${Array.isArray(list) ? list.length : 0} penawaran`;
  }
}

function createEmptyState() {
  const state = document.createElement('div');
  state.className = 'empty-state';

  const title = document.createElement('h3');
  title.className = 'empty-state-title';
  title.textContent = 'Belum ada penawaran di katalog';

  const text = document.createElement('p');
  text.className = 'empty-state-text';
  text.textContent = 'Belum ada penawaran yang cocok. Hubungi pemilik toko melalui dashboard demo untuk menambah penawaran.';

  state.appendChild(title);
  state.appendChild(text);
  return state;
}
