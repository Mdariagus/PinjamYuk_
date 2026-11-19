# UI-SPEC.md - PinjamYuk

> Spesifikasi UI/UX untuk MVP PinjamYuk.
> Desain baru: **Modern Rental Marketplace — Premium, Warm & Clean**.
> Dokumen ini melengkapi `SPEC.md` dan menjadi acuan visual sebelum implementasi redesign.
> Ruang lingkup: frontend-only, Vite, JavaScript vanilla, data dummy, dan `localStorage`.
> Status: rancangan desain baru. Belum ada implementasi desain baru pada tahap ini.

## Daftar isi

1. [Ringkasan](#1-ringkasan)
2. [Arah desain](#2-arah-desain)
3. [Fondasi visual](#3-fondasi-visual)
4. [Informasi dan navigasi](#4-informasi-dan-navigasi)
5. [Komponen bersama](#5-komponen-bersama)
6. [Halaman Katalog](#6-halaman-katalog)
7. [Dashboard pengelola](#7-dashboard-pengelola)
8. [Perilaku dan state](#8-perilaku-dan-state)
9. [Aksesibilitas](#9-aksesibilitas)
10. [Konten dan copy](#10-konten-dan-copy)
11. [Data dummy acuan](#11-data-dummy-acuan)
12. [Wireframe](#12-wireframe)
13. [Responsif](#13-responsif)
14. [Catatan implementasi](#14-catatan-implementasi)
15. [Pemetaan acceptance criteria](#15-pemetaan-acceptance-criteria)
16. [Rasional desain dan anti-slop](#16-rasional-desain-dan-anti-slop)
17. [Keputusan terbuka](#17-keputaman-terbuka)
18. [Di luar ruang lingkup](#18-di-luar-ruang-lingkup)

---

## 1. Ringkasan

PinjamYuk adalah katalog digital untuk UMKM yang menyewakan barang dan jasa. Tampilan harus membantu calon penyewa menemukan penawaran, memahami harga dan stok, lalu menghubungi pengelola melalui WhatsApp. Pengelola toko memakai dashboard demo untuk menambah, mengubah, dan menghapus penawaran.

Dokumen ini menetapkan:

- Bahasa visual, palet, tipografi, spacing, radius, bayangan, dan motion untuk arsitektur baru.
- Struktur halaman publik: Beranda dan Halaman Katalog.
- Struktur halaman dashboard pengelola.
- Perilaku pencarian, filter, sorting, WhatsApp, dan CRUD.
- State kosong, kesalahan, dan penyimpanan lokal.
- Aturan aksesibilitas dan responsivitas.
- Wireframe teks untuk Beranda, Katalog, dan Dashboard pada desktop dan mobile.

### 1.1 Prinsip utama

1. **Katalog adalah fokus.** Foto, nama, kategori, harga, stok, dan aksi WhatsApp harus mudah dipindai.
2. **Premium, hangat, bersih.** Latar krem, aksen terracotta, aksi olive, whitespace yang cukup, tanpa dekorasi yang tidak membantu pemahaman.
3. **Jujur tentang batasan.** Tidak ada login, pembayaran, atau klaim bahwa pesanan sudah dikonfirmasi.
4. **Mobile-first.** Layout disusun untuk layar sempit lebih dulu, lalu diperluas.
5. **Aksesibel sejak awal.** Kontras, label, fokus keyboard, dan status tidak boleh ditambahkan sebagai tempelan.

### 1.2 Yang tidak dicakup

- Backend, API, database server, autentikasi, dan pembayaran.
- Upload gambar ke cloud.
- Chat internal, notifikasi, dan sinkronisasi antar perangkat atau antar tab.
- Mode gelap. Alasan ada di bagian [2.3](#23-keputusan-tinggi-tentang-desain).
- Testimoni, logo mitra, statistik pengguna, dan klaim yang tidak punya sumber nyata.

---

## 2. Arah desain

### 2.1 Design read

> Reading this as: modern rental marketplace for local UMKM, warm editorial minimalism with a premium feel, dial ENRERGY 2 / RHYTHM 2 / MOTION 1.

Artinya:

- **ENERGY 2:** tampil jelas dan bersahabat, tetapi tidak berteriak. Tidak ada animasi besar, gradien menyala, atau elemen dekoratif berlebihan.
- **RHYTHM 2:** komposisi bervariasi secukupnya. Hero terbelah dua, katalog berbentuk grid, footer berupa blok.
- **MOTION 1:** gerak hanya untuk umpan balik hover, fokus, dialog, dan toast. Tidak ada scroll reveal, parallax, atau animasi berulang.

### 2.2 Karakter visual

Kesan yang dituju: **premium, hangat, rapi, lokal, dan dapat dipercaya**.

- Terracotta memberi kehangatan dan energi pada aksen.
- Olive memberi ketenangan dan kesan alami pada aksi utama.
- Latar krem membuat produk terasa hangat dan fotogenik.
- Ruang kosong dipakai untuk memisahkan bagian, bukan untuk mengisi layar secara buta.
- Satu aksen khas: titik terracotta pada wordmark dan tanda tanya pada headline hero.

### 2.3 Keputusan tingkat tinggi

| Keputusan | Alasan |
|---|---|
| Tema terang tetap, tanpa toggle | Identitas hangat (krem, terracotta, olive) adalah fondasi desain baru. Mode gelap tidak diminta dan tidak termasuk ruang lingkup MVP. |
| Dua area publik dan satu area dashboard demo | Beranda + Katalog menjadi satu pengalaman publik; dashboard demo tetap terpisah agar alur pengelolaan tidak bercampur. |
| Kartu katalog bermerek 12 px, kontrol 8 px | Radius sedang memberi kesan rapi dan premium tanpa membuat semua elemen terlihat seperti tombol. |
| Bayangan hanya untuk overlay | Katalog tetap terasa datar dan mudah dipindai. Bayangan dipakai untuk dialog, toast, dan dropdown yang berada di atas konten. |
| Tanpa ilustrasi orang atau testimoni | Tidak ada aset dan data nyata. Lebih baik tidak menampilkan apa pun daripada mengarang bukti sosial. |

---

## 3. Fondasi visual

### 3.1 Palet warna

Desain baru memakai enam warna utama ditambah turunan kontras dari desain sebelumnya.

| Token | Hex | Peran |
|---|---|---|
| `--bg` | `#FAF5ED` | Latar halaman (background utama) |
| `--surface` | `#FFFFFF` | Surface utama (kartu, dialog, input) |
| `--soft-beige` | `#E9DFCE` | Soft Beige (latar sekunder: toolbar, panel hero, blok informasi) |
| `--deep-olive` | `#394432` | Deep Olive (teks utama) |
| `--olive` | `#69774D` | Olive (aksi utama) |
| `--terracotta` | `#C47C59` | Terracotta (aksenn brand) |

Turunan yang dipertahankan dari token desain sebelumnya:

| Token | Hex | Peran |
|---|---|---|
| `--terracotta-strong` | `#9E5537` | Teks dan badge terracotta |
| `--olive-strong` | `#4E5A37` | Teks dan hover olive |
| `--muted` | `#5C6652` | Teks sekunder |
| `--danger` | `#8C3B27` | Kesalahan dan hapus |
| `--warning` | `#8A5A00` | Peringatan stok |
| `--success` | `#4E5A37` | Status tersedia |
| `--border-subtle` | `#D8CBB8` | Garis halus |
| `--border-strong` | `#8C7B62` | Border kontrol |
| `--focus` | `#394432` | Cincin fokus |
| `--olive-tint` | `#E7EADF` | Latar status tersedia |
| `--terracotta-tint` | `#F3E2D8` | Latar aksen lembut |
| `--danger-tint` | `#F4E3DD` | Latar status habis/error |
| `--warning-tint` | `#F3E8D3` | Latar status hampir habis |
| `--surface-hover` | `#F4ECDF` | Hover netral hangat |
| `--surface-raised` | `#FFFCF7` | Kartu ringkas dan dialog sekunder |

Catatan token:

- `--surface` baru bernilai `#FFFFFF`; `--soft-beige` (`#E9DFCE`) menjadi latar sekunder. Keduanya wajib dipakai konsisten.
- `--terracotta` tidak dipakai untuk teks normal di atas `--bg`/`--surface` karena kontrasnya di bawah 4.5:1. Untuk teks atau badge, gunakan `--terracotta-strong`.
- Untuk tombol utama, gunakan `--olive` dengan teks putih.

### 3.2 Matriks kontras WCAG AA

- Teks normal: minimal 4.5:1 terhadap latar.
- Teks besar (18 pt / 14 pt bold, atau 3:1): minimal 3:1.
- Status (stok, error, badge) tidak boleh dibedakan hanya dengan warna; wajib disertai label teks dan ikon.

### 3.3 Tipografi

- Font: **Plus Jakarta Sans**, self-host WOFF2, `font-display: swap`.
- Berat: 400, 600, 700, 800.
- Ukuran: body minimum 16 px; teks 12 px hanya untuk badge, caption, helper dengan berat 600.
- Hero: `clamp(2rem, 4vw, 3rem)`, berat 800, line-height 1.1.
- Judul halaman: `clamp(1.75rem, 3vw, 2.5rem)`, berat 700, line-height 1.15.

### 3.4 Spacing, grid, dan container

- Skala spacing dasar 8 px.
- Container: lebar maksimal 1320 px, padding horizontal 20 px, tengah.
- Hero: padding atas 80 px, bawah 64 px (mobile 48 px).
- Katalog: padding atas 64 px, bawah 96 px.
- Grid kartu: gap 16 px; kolom 1 (<640), 2 (640–1023), 3 (1024–1279), 4 (≥1280).
- Toolbar: gap 16 px; kolom 1 (<1024), 2 (640–1023), 3 (≥1024).

### 3.5 Radius, border, dan bayangan

- Radius kontrol: 8 px; radius kartu: 12 px.
- Border: `--border-subtle` untuk kartu, `--border-strong` untuk kontrol.
- Bayangan: hanya untuk overlay (dialog, toast, dropdown).

### 3.6 Gerak

- Hanya umpan balik hover, fokus, dialog, dan toast.
- Transisi: 150–200 ms ease.
- `prefers-reduced-motion`: nonaktifkan animasi.

### 3.7 Ikon

- Ikon inline SVG berstroke, tanpa library.
- Ikon WhatsApp untuk aksi pemesanan.

### 3.8 Gambar dan placeholder

- `imageUrl` hanya path lokal.
- Placeholder lokal dengan ikon kategori (box untuk Barang, lock untuk Jasa) dan teks "Foto belum tersedia".

---

## 4. Informasi dan navigasi

### 4.1 Peta halaman

- **Beranda** (`#beranda`): hero, cara kerja singkat, katalog penawaran, footer.
- **Katalog** (`#katalog`): header katalog, toolbar pencarian/filter/sorting, grid, empty state, footer.
- **Dashboard pengelola** (`#dashboard`): ringkasan, daftar, form, dialog, footer ringkas.

### 4.2 Navigasi utama

- Header sticky dengan wordmark **PinjamYuk** (Deep Olive, titik terracotta) dan navigasi: Beranda, Katalog, Dashboard.
- Navigasi aktif terlihat.

### 4.3 Perilaku navbar

- Sticky di atas, latar `--bg`, border bawah subtle.
- Desktop: baris horizontal.
- Mobile: tetap rapi, tinggi minimal 44 px per kontrol, tidak menyebabkan horizontal scroll.

---

## 5. Komponen bersama

### 5.1 Tombol

- **Primary**: background `--olive`, teks putih, hover `--olive-strong`. Radius 8, min-height 44, min hit area 44×44.
- **WhatsApp**: background hijau WhatsApp (#25D366), hover #128C7E, text putih. Radius 8, min-height 44.
- **Secondary**: background `--surface`, border `--border-strong`, teks `--ink`.
- **Disabled**: latar `--surface`, teks `--muted`, cursor not-allowed, tidak menampilkan aksi WhatsApp.
- Fokus: outline 3 px `--focus`, offset 2 px.
- Tanpa gradient, glow, atau dekorasi berlebih.

### 5.2 Badge dan status

- Badge **Unggulan**: latar `--terracotta-strong`, teks putih, radius 4, padding 4/8, ukuran 0.75 rem, berat 600, posisi absolute atas kiri pada media kartu.
- Status stok: label teks + ikon + nada warna. `Stok habis`, `Sisa n`, `Stok n`.

### 5.3 Kartu dasar

- Surface `#FFFFFF`, border subtle, radius 12, padding 16.
- Media 4/3, border radius 8, overflow hidden.
- Body: flex column, gap 8, padding-top 12; aksi berada di bawah dengan `margin-top: auto`.

### 5.4 Toolbar pencarian, filter, dan sorting

- Satu toolbar yang berisi: kolom pencarian, grup filter kategori, dan kontrol sorting.
- Field mencari: label terlihat, placeholder "Cari nama atau deskripsi penawaran", tombol clear.
- Filter: chip `Semua`, `Barang`, `Jasa`; `aria-pressed` untuk yang aktif.
- Sorting: pilihan `nama` (Nama A–Z), `harga-asc` (Harga terendah), `harga-desc` (Harga tertinggi), dan `stok-desc` (Stok terbanyak). Default: `nama`.

### 5.5 Empty state

- Judul: "Penaworan tidak ditemukan".
- Petunjuk: "Coba kata kunci atau kategori lain."
- Aksi: tombol "Reset filter".

### 5.6 Dialog

- Konfirmasi hapus dan reset data demo. Dukungan Escape, fokus masuk ke elemen aman, fokus kembali ke pemicu.

### 5.7 Toast

- Konfirmasi aksi singkat (opsional untuk MVP, tetapi dilarang klaim pesanan terkonfirmasi).

### 5.8 Link

- Tautan WhatsApp: `https://wa.me/<nomor>?text=<encodeURIComponent(pesan)>`, `target="_blank"`, `rel="noopener noreferrer"`.

---

## 6. Halaman Katalog

### 6.1 Urutan bagian

1. Header katalog: judul "Katalog Penawaran", subtitle.
2. Toolbar: cari, filter kategori, sorting.
3. Jumlah hasil: `Menampilkan n penawaran` (`aria-live="polite"`).
4. Grid kartu penawaran.
5. Empty state.

### 6.2 Kartu penawaran

- Media: placeholder atau gambar lokal; badge unggulan jika `unggulan` true.
- Body: kategori, nama, deskripsi, harga (`formatRupiah`), status stok.
- Aksi: WhatsApp aktif jika `stok > 0`; tombol "Stok Habis" jika `stok === 0`.

### 6.3 Grid

- 1 kolom mobile, 2 tablet, 3 desktop, 4 lebar (≥1280).

---

## 7. Dashboard pengelola

- Banner mode demo: menegaskan tidak ada login dan data dapat diubah siapa pun di browser tersebut.
- Kartu ringkasan: total produk, total stok, stok habis, unggulan.
- Toolbar: aksi tambah, edit, hapus, reset.
- Tabel desktop (≥1024): daftar lengkap. Kartu mobile (<1024): daftar kartu.
- Form tambah/edit dengan validasi sesuai `SPEC.md`.
- Dialog hapus dan reset dengan konfirmasi.

---

## 8. Perilaku dan state

### 8.1 Pencarian, filter, dan sorting

- Pencarian case-insensitive pada `nama` dan `deskripsi`; trim; live update; input kosong → semua hasil sesuai filter lain.
- Filter kategori menggabungkan dengan pencarian dan sorting.
- Sorting tidak mengubah data asli; hasil tampilan yang diurutkan.
- Empty state setelah kombinasi yang tidak menghasilkan data.

### 8.2 WhatsApp

- Pesan awal berisi nama, kategori, harga, stok; di-encode `encodeURIComponent`.
- Nomor melalui konfigurasi `WHATSAPP_OWNER_NUMBER` di `src/config.js`.

### 8.3 State penyimpanan dan stok

- Ikut `SPEC.md` untuk localStorage, validasi, reset, dan penanganan stok.

### 8.4 Dialog dan keyboard

- Escape, fokus aman, focus return, toast untuk feedback.

### 8.5 Matriks state

| State | Kondisi | Tampilan |
|---|---|---|
| Katalog normal | Data tersedia | Grid kartu |
| Pencarian kosong | Input kosong | Semua produk sesuai filter |
| Tidak ada hasil | Kombination tidak cocok | Empty state |
| Stok habis | `stok = 0` | Tombol nonaktif + label |
| Storage error | Gagal baca/tulis | Pesan aman + reset opsi |

---

## 9. Aksesibilitas

- WCAG 2.1 AA.
- Keyboard operasi untuk semua kontrol.
- Fokus terlihat: outline 3 px, offset 2 px.
- Label setiap kontrol; `alt` gambar sesuai.
- Status tidak hanya warna.
- Target sentuh minimum 44×44 px.
- Satu `h1` per halaman, heading berurutan, landmark `header`, `nav`, `main`, `footer`.
- `aria-live="polite"` untuk jumlah hasil.
- `prefers-reduced-motion`.

---

## 10. Konten dan copy

- Bahasa Indonesia, sentence case, spesifik, tenang.
- Dilarang em dash; gunakan koma, titik, titik dua, atau tanda kurung.
- Dilarang klaim pemasaran kosong.
- Tombol WhatsApp: "Pesan via WhatsApp"; tulis ulang pesan awal sesuai `SPEC.md`.

### 10.1 Microcopy utama

- Placeholder pencarian: "Cari nama atau deskripsi penawaran".
- Empty state: "Penaworan tidak ditemukan" + "Coba kata kunci atau kategori lain."
- Reset: "Reset filter".

---

## 11. Data dummy acuan

- Delapan entri awal, field sesuai `SPEC.md`; harga angka, Rupiah `Rp150.000` format.

---

## 12. Wireframe

### 12.1 Beranda desktop (≥1024)

```
+--------------------------------------------------------------+
| [PinjamYuk .]  Beranda | Katalog | Dashboard                  |
+--------------------------------------------------------------+
| CTA: "Butuh? Pinjam Yuk!"   [Lihat Katalog]                   |
| Hero: dua kolom                                     [Kartu]  |
|   Copy: H1, deskripsi, CTA, catatan                        [Kartu]  |
|   Panel: kartu unggulan (2 kartu berdampingan)            |
+--------------------------------------------------------------+
| Katalog: header, toolbar, grid kartu, empty state           |
+--------------------------------------------------------------+
| Footer                                                        |
+--------------------------------------------------------------+
```

### 12.2 Beranda mobile (<768)

```
+--------------------------------------------------------------+
| [PinjamYuk .]  Beranda | Katalog | Dashboard                  |
+--------------------------------------------------------------+
| H1 stacked                                                    |
| Deskripsi                                                     |
| CTA                                                            |
| Catatan                                                        |
| Panel: kartu 1, kartu 2 (stack)                                |
| Katalog: toolbar stack, grid 1-2                              |
| Footer                                                        |
+--------------------------------------------------------------+
```

### 12.3 Katalog desktop (≥1024)

```
+--------------------------------------------------------------+
| Header: "Katalog Penawaran" + subtitle                        |
| Toolbar: [ Cari............... ] [Semua|Barang|Jasa] [Urutkan v] |
| Result: "Menampilkan 8 penawaran"                            |
| Grid: 3-4 kolom kartu                                          |
+--------------------------------------------------------------+
```

### 12.4 Katalog mobile (<768)

```
+--------------------------------------------------------------+
| Header: "Katalog Penawaran"                                   |
| Toolbar: cari full; chips wrap; sort full                    |
| Result: "Menampilkan n penawaran"                            |
| Grid: 1-2 kolom kartu                                         |
+--------------------------------------------------------------+
```

### 12.5 Dashboard desktop (≥1024)

```
+--------------------------------------------------------------+
| Header + banner mode demo                                     |
| Kartu ringkasan: Total Produk | Total Stok | Stok Habis | Unggulan |
| Toolbar aksi                                                   |
| Tabel katalog                                                   |
+--------------------------------------------------------------+
```

### 12.6 Dashboard mobile (<768)

```
+--------------------------------------------------------------+
| Header + banner                                                 |
| Kartu ringkasan: 2 kolom                                       |
| Kartu daftar / toolbar stack                                   |
+--------------------------------------------------------------+
```

---

## 13. Responsif

- Mobile: <640 — hero stack, toolbar stack, grid 1, kartu penuh lebar.
- Tablet: 640–1023 — hero fleksibel, toolbar 2 kolom, grid 2.
- Desktop: ≥1024 — hero dua kolom, toolbar 3 kolom horizontal, grid 3.
- Lebar: ≥1280 — grid 4.
- Aturan anti-overflow, target sentuh, dan breakpoint konsisten dengan implementasi.

---

## 14. Catatan implementasi

- Stack: Vite + JavaScript vanilla + ES modules; tanpa framework; tanpa backend.
- Halaman: publik Beranda/Katalog, dashboard demo terpisah.
- Render aman: `textContent`/`createElement`, validasi `imageUrl` lokal.
- WhatsApp: `buildWhatsAppUrl(nomor, produk)`, konfigurasi `src/config.js`.
- Font: Plus Jakarta Sans self-host.
- Performa: katalog 8 data langsung render.

---

## 15. Pemetaan acceptance criteria

- AC-01…AC-08: katalog, kartu, pencarian, filter, sorting, kombinasi.
- AC-09…AC-12: sorting, empty, WhatsApp.
- AC-13…AC-20: dashboard, CRUD, storage.
- AC-21…AC-23: stok, mobile, data contoh.

---

## 16. Rasional desain dan anti-slop

- Pilih warna hangat dan aksen tajam, bukan template generik.
- Hindari gradient, glow, glassmorphism, pola, ilustrasi generik, panah dekoratif.
- Prioritas informasi pembeli.

---

## 17. Keputusan terbuka

1. Satuan harga: per hari, jam, sesi, paket.
2. Stok jasa: jumlah slot layanan.
3. Kontak WhatsApp: nomor final.
4. Satu toko: dashboard satu katalog.
5. Aset gambar: lokal.

---

## 18. Di luar ruang lingkup

Backend, API, database, auth, payment, booking, chat, notifikasi, upload cloud, analytics, produksi.

---

**Akhir dokumen — UI-SPEC.md**
