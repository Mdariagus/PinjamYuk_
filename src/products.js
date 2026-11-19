export const CATEGORIES = ['Barang', 'Jasa'];

export const products = [
  {
    id: 'item-001',
    nama: 'Kamera Mirrorless',
    kategori: 'Barang',
    harga: 150000,
    stok: 3,
    deskripsi: 'Kamera untuk kebutuhan dokumentasi dan acara.',
    imageUrl: '/images/products/kamera-mirrorless.jpg',
    unggulan: true,
  },
  {
    id: 'item-002',
    nama: 'DSLR Kamera',
    kategori: 'Barang',
    harga: 75000,
    stok: 2,
    deskripsi: 'Kamera DSLR untuk pembelajaran dan dokumentasi.',
    imageUrl: '/images/products/dslr-kamera.jpg',
    unggulan: false,
  },
  {
    id: 'item-003',
    nama: 'Drone',
    kategori: 'Barang',
    harga: 450000,
    stok: 0,
    deskripsi: 'Drone untuk pemetaan dan dokumentasi lapangan.',
    imageUrl: '/images/products/drone.jpg',
    unggulan: true,
  },
  {
    id: 'item-004',
    nama: 'Sprayer Herbal',
    kategori: 'Jasa',
    harga: 100000,
    stok: 5,
    deskripsi: 'Jasa penyemprotan pestisida herbal untuk lahan tani.',
    imageUrl: '/images/products/sprayer-herbal.jpg',
    unggulan: false,
  },
  {
    id: 'item-005',
    nama: 'Jasa Fotografi Acara',
    kategori: 'Jasa',
    harga: 200000,
    stok: 4,
    deskripsi: 'Jasa fotografi untuk acara keluarga dan UMKM.',
    imageUrl: '/images/products/jasa-fotografi-acara.jpg',
    unggulan: false,
  },
  {
    id: 'item-006',
    nama: 'Jasa Sound System',
    kategori: 'Jasa',
    harga: 125000,
    stok: 6,
    deskripsi: 'Jasa penyediaan sound system untuk acara.',
    imageUrl: '/images/products/jasa-sound-system.jpg',
    unggulan: false,
  },
  {
    id: 'item-007',
    nama: 'Jasa Desain Kemasan',
    kategori: 'Jasa',
    harga: 90000,
    stok: 2,
    deskripsi: 'Jasa desain kemasan produk UMKM.',
    imageUrl: '/images/products/jasa-desain-kemasan.jpg',
    unggulan: false,
  },
  {
    id: 'item-008',
    nama: 'Layar Proyektor',
    kategori: 'Barang',
    harga: 175000,
    stok: 6,
    deskripsi: 'Proyektor layar untuk hiburan rumah.',
    imageUrl: '/images/products/layar-proyektor.jpg',
    unggulan: false,
  },
  {
    id: 'item-009',
    nama: 'Kamera Mirrorless Sony A6400',
    kategori: 'Barang',
    harga: 150000,
    stok: 3,
    deskripsi: 'Kamera mirrorless untuk dokumentasi dan kebutuhan konten.',
    imageUrl: '/images/products/kamera-mirrorless-sony-a6400.jpg',
    unggulan: false,
  },
  {
    id: 'item-010',
    nama: 'Drone DJI Mini 3',
    kategori: 'Barang',
    harga: 200000,
    stok: 2,
    deskripsi: 'Drone ringkas untuk dokumentasi udara dan pemetaan.',
    imageUrl: '/images/products/drone-dji-mini-3.jpg',
    unggulan: false,
  },
  {
    id: 'item-011',
    nama: 'Proyektor Epson',
    kategori: 'Barang',
    harga: 100000,
    stok: 4,
    deskripsi: 'Proyektor untuk presentasi, kelas, dan hiburan.',
    imageUrl: '/images/products/proyektor-epson.jpg',
    unggulan: false,
  },
  {
    id: 'item-012',
    nama: 'Speaker Aktif 15 Inch',
    kategori: 'Barang',
    harga: 125000,
    stok: 3,
    deskripsi: 'Speaker aktif untuk acara dan kebutuhan audio.',
    imageUrl: '/images/products/speaker-aktif-15-inch.jpg',
    unggulan: false,
  },
  {
    id: 'item-013',
    nama: 'Jasa Fotografi Acara',
    kategori: 'Jasa',
    harga: 500000,
    stok: 2,
    deskripsi: 'Jasa fotografi untuk acara dan dokumentasi profesional.',
    imageUrl: '/images/products/jasa-fotografi-acara-profesional.jpg',
    unggulan: false,
  },
  {
    id: 'item-014',
    nama: 'Jasa Desain Logo UMKM',
    kategori: 'Jasa',
    harga: 150000,
    stok: 5,
    deskripsi: 'Jasa desain logo untuk identitas usaha UMKM.',
    imageUrl: '/images/products/jasa-desain-logo-umkm.jpg',
    unggulan: false,
  },
  {
    id: 'item-015',
    nama: 'Jasa Dokumentasi Video',
    kategori: 'Jasa',
    harga: 350000,
    stok: 2,
    deskripsi: 'Jasa dokumentasi video untuk acara dan promosi.',
    imageUrl: '/images/products/jasa-dokumentasi-video.jpg',
    unggulan: false,
  },
  {
    id: 'item-016',
    nama: 'Jasa Desain Banner Promosi',
    kategori: 'Jasa',
    harga: 75000,
    stok: 5,
    deskripsi: 'Jasa desain banner untuk kebutuhan promosi.',
    imageUrl: '/images/products/jasa-desain-banner-promosi.jpg',
    unggulan: false,
  },
];

export function filterProducts(list, { search = '', category = 'Semua', sort = 'nama' } = {}) {
  const source = Array.isArray(list) ? list : [];
  const query = String(search ?? '').trim().toLowerCase();

  const filtered = source.filter((product) => {
    const matchesCategory = category === 'Semua' || product.kategori === category;
    const nama = String(product.nama ?? '').toLowerCase();
    const deskripsi = String(product.deskripsi ?? '').toLowerCase();
    const matchesQuery = query === '' || nama.includes(query) || deskripsi.includes(query);
    return matchesCategory && matchesQuery;
  });

  const sorted = [...filtered];
  if (sort === 'harga-asc') {
    sorted.sort((a, b) => a.harga - b.harga);
  } else if (sort === 'harga-desc') {
    sorted.sort((a, b) => b.harga - a.harga);
  } else if (sort === 'stok-desc') {
    sorted.sort((a, b) => b.stok - a.stok);
  } else {
    sorted.sort((a, b) => String(a.nama).localeCompare(String(b.nama), 'id'));
  }
  return sorted;
}
