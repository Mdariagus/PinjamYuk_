# TASKS.md - PinjamYuk

> Rencana kerja implementasi desain baru dan penjagaan fitur yang sudah berjalan.
> Dokumen ini menyiapkan kerja untuk arsitektur desain baru: **Modern Rental Marketplace — Premium, Warm & Clean**.
> Sumber utama: `SPEC.md` dan `UI-SPEC.md`. `CATATAN.md` hanya menjadi konteks latihan.
> Status: rencana desain baru. Implementasi dimulai setelah desain disetujui dan instruksi berikutnya diberikan.

## 1. Cara memakai dokumen ini

- Satu tugas adalah satu unit kerja yang bisa diterima atau ditolak sendiri.
- Setiap tugas punya tujuan, ketergantungan, kriteria penerimaan, berkas yang mungkin berubah, dan cara verifikasi.
- Kriteria penerimaan hanya boleh ditandai setelah ada bukti. Bukti dapat berupa hasil perintah, catatan pengujian manual, atau tangkapan layar.
- Path berkas adalah usulan struktur. Jika implementasi memilih nama lain, perbarui dokumen ini agar tetap menjadi acuan yang benar.
- Jangan menambah fitur di luar `SPEC.md` dan `UI-SPEC.md`.
- Jangan menganggap tugas selesai hanya karena tampak benar. Perilaku, keyboard, state kosong, state error, dan penyimpanan harus diperiksa.

## 2. Ringkasan milestone

| ID | Milestone | Hasil utama | Tugas | Bergantung pada |
|---|---|---|---|---|
| M1 | Audit dan persiapan proyek | Dokumen konsisten, fondasi sebelum desain baru | T-01 | Tidak ada |
| M2 | Design system dan fondasi UI | Token desain baru terpasang | T-02, T-03 | M1 |
| M3 | Navbar dan navigasi | Header dan navigasi sesuai UI-SPEC | T-04 | M2 |
| M4 | Redesign Beranda | Hero dua kolom, bagian publik sesuai UI-SPEC | T-05 | M3 |
| M5 | Redesign Katalog | Header, toolbar, grid, empty state sesuai UI-SPEC | T-06 | M4 |
| M6 | Product card dan visual assets | Kartu, badge, status stok, aksi WhatsApp sesuai UI-SPEC | T-07 | M5 |
| M7 | Integrasi pencarian, filter, sorting, dan WhatsApp | `filterProducts`, `buildWhatsAppUrl`, konfigurasi nomor, sorting stok | T-08 | M5, M6 |
| M8 | Redesign dashboard | Dashboard demo sesuai UI-SPEC | T-09 | M6 |
| M9 | Responsive refinement | Layout desktop/tablet/mobile sesuai UI-SPEC | T-10 | M4 s.d. M8 |
| M10 | Testing, accessibility, dan build | Build sukses, skenario lulus, a11y terjaga | T-11 | M1 s.d. M9 |

Catatan urutan:

- M1 menyediakan titik awal audit; semua tugas berikutnya mengikuti dari sumber kebijakan yang disepakati.
- M2 harus benar-benar terpasang di `src/style.css` sebelum M3 karena navbar memakai token dasar.
- M5 dan M6 dapat dikembangkan berurutan; M7 membutuhkan hasil M5 dan M6.
- M9 merapikan responsive setelah semua area utama desain baru selesai.
- M10 berjalan terakhir dan wajib memakai `npm test` / `npm run build`.

## 3. Aturan global

### 3.1 Stack dan ruang lingkup

- Vite dengan JavaScript vanilla dan ES modules.
- Area publik: Beranda dan Katalog pada satu aplikasi; dashboard demo sebagai area terpisah.
- Tanpa framework UI, router, state library, CSS framework, atau pustaka ikon.
- Tanpa backend, API, database server, autentikasi, atau sinkronisasi cloud.
- Data awal tepat delapan entri. Key penyimpanan `pinjamYuk.products.v1`.
- Harga dan stok disimpan sebagai angka, bukan string berformat.
- Tidak ada mode gelap dan tidak ada toggle tema.

### 3.2 Visual

- Palet inti: `#FAF5ED` (Background), `#FFFFFF` (Surface), `#E9DFCE` (Soft Beige), `#C47C59` (Terracotta), `#69774D` (Olive), `#394432` (Deep Olive).
- Token turunan wajib dipertahankan, terutama `--terracotta-strong`, `--olive-strong`, `--muted`, `--danger`, `--warning`, dan `--surface-raised`.
- Font Plus Jakarta Sans, self-host WOFF2, `font-display: swap`.
- Body minimum 16 px. Teks 12 px hanya untuk badge, caption, dan helper dengan berat 600.
- Radius, spasi, bayangan, dan motion mengikuti `UI-SPEC.md`.
- Tanpa gradien dekoratif, glow, glassmorphism, pola grid, ilustrasi generik, atau panah dekoratif di semua tombol.
- Semua teks normal minimal 4.5:1. Teks besar minimal 3:1.

### 3.3 Copy

- Bahasa Indonesia, sentence case, spesifik, dan tenang.
- Dilarang memakai em dash. Gunakan koma, titik, titik dua, atau tanda kurung.
- Dilarang memakai istilah pemasaran kosong atau klaim teknologi tanpa bukti.
- Dilarang membuat testimoni, statistik pengguna, klaim keamanan, atau klaim performa tanpa sumber nyata.
- Tombol WhatsApp hanya membuka percakapan. Jangan menyatakan pesanan sudah dibuat atau dikonfirmasi.
- Dashboard demo harus selalu menyatakan bahwa tidak ada login dan data dapat diubah siapa pun di browser tersebut.

### 3.4 Aksesibilitas

- Target WCAG 2.1 level AA.
- Semua kontrol dapat dijangkau dan dioperasikan dengan keyboard.
- Fokus terlihat, minimal outline 3 px dengan offset 2 px.
- Dialog dapat ditutup dengan Escape, fokus masuk ke elemen aman, dan fokus kembali ke pemicu.
- Target sentuh minimum 44 x 44 px.
- Setiap field punya label terlihat. Setiap gambar punya `alt` yang sesuai.
- Status stok, error, dan badge tidak boleh dibedakan hanya dengan warna.
- Hormati `prefers-reduced-motion`.
- Satu `h1` per halaman, heading berurutan, landmark `header`, `nav`, `main`, dan `footer`.

### 3.5 Keamanan data

- Render nama, deskripsi, dan pesan pengguna dengan `textContent` atau `createElement`. Jangan memakai `innerHTML` untuk data pengguna.
- `imageUrl` hanya menerima path lokal `/images/` dengan ekstensi gambar yang diizinkan.
- Tolak URL eksternal, `javascript:`, `data:`, dan path yang keluar dari folder gambar.
- Encode pesan WhatsApp dengan `encodeURIComponent`.
- Tautan WhatsApp memakai `target="_blank"` dan `rel="noopener noreferrer"`.
- Jangan menyimpan kata sandi, token, API key, atau data pribadi di source code maupun `localStorage`.

### 3.6 Verifikasi umum

```bash
npm test
npm run build
```

Untuk tugas yang menyentuh tampilan, tambahkan:

```bash
npm run dev
```

Periksa konsol browser, keyboard, dan lebar 320 px sebelum menandai tugas selesai.

## 4. Struktur berkas yang diusulkan

```text
/
├─ package.json
├─ vite.config.js
├─ .gitignore
├─ index.html
├─ src/
│  ├─ main.js
│  ├─ products.js
│  ├─ store.js
│  ├─ ui.js
│  ├─ style.css
│  └─ config.js
```

Struktur flat saat ini; hindari penambahan subfolder tanpa keputusan desain.

## 5. Definisi selesai per tugas

- Seluruh acceptance criteria relevan lulus.
- Tidak ada error kritis.
- Desain sesuai `UI-SPEC.md`.
- Aksesibilitas dan responsif terjaga.
- Batasan frontend-only jelas.

## 6. Tugas per milestone

### M1 - Audit dan persiapan proyek

**T-01** — Audit dan sinkronisasi dokumen
- Checklist:
  - Membandingkan `SPEC.md`, `UI-SPEC.md`, dan `TASKS.md`.
  - Mencatat inkonsistensi (format pesan WhatsApp, opsi sorting, status desain).
- File yang mungkin diubah: `SPEC.md`, `UI-SPEC.md`, `TASKS.md`.
- Kriteria penerimaan: ketiga dokumen konsisten.
- Ketergantungan: tidak ada.

### M2 - Design system dan fondasi UI

**T-02** — Susun token desain baru
- Checklist:
  - Background `#FAF5ED`, Surface `#FFFFFF`, Soft Beige `#E9DFCE`, Deep Olive `#394432`, Olive `#69774D`, Terracotta `#C47C59`.
  - Turunan, font, spacing, radius, shadow, motion.
- File yang mungkin diubah: `src/style.css`.
- Kriteria penerimaan: token terpasang dan konsisten.
- Ketergantungan: T-01.

**T-03** — Perbarui fondasi visual
- Checklist:
  - Body, typography, spacing, radius, border, shadow, motion.
- File yang mungkin diubah: `src/style.css`.
- Kriteria penerimaan: sesuai `UI-SPEC.md` bagian 3.
- Ketergantungan: T-02.

### M3 - Navbar dan navigasi

**T-04** — Perbarui navbar dan navigasi
- Checklist:
  - Wordmark, daftar navigasi, sticky header, perilaku mobile.
- File yang mungkin diubah: `index.html`, `src/style.css`, `src/ui.js`.
- Kriteria penerimaan: sesuai `UI-SPEC.md` bagian 4, lolos keyboard.
- Ketergantungan: T-03.

### M4 - Redesign Beranda

**T-05** — Redesign hero dan bagian publik
- Checklist:
  - Hero dua kolom desktop, stack mobile.
  - CTA, catatan, panel kartu, bagian cara kerja, katalog preview, footer.
- File yang mungkin diubah: `index.html`, `src/style.css`.
- Kriteria penerimaan: sesuai `UI-SPEC.md` bagian 6.
- Ketergantungan: T-04.

### M5 - Redesign Katalog

**T-06** — Redesign header, toolbar, dan grid katalog
- Checklist:
  - Header katalog, toolbar cari/filter/sort, jumlah hasil, grid, empty state.
- File yang mungkin diubah: `index.html`, `src/style.css`, `src/ui.js`, `src/products.js`.
- Kriteria penerimaan: sesuai `UI-SPEC.md` bagian 6.
- Ketergantungan: T-04, T-05.

### M6 - Product card dan visual assets

**T-07** — Perbarui kartu penawaran dan status
- Checklist:
  - Media, badge unggulan, body, status stok, aksi WhatsApp / stok habis, placeholder.
- File yang mungkin diubah: `src/ui.js`, `src/style.css`.
- Kriteria penerimaan: sesuai `UI-SPEC.md` bagian 5.
- Ketergantungan: T-05, T-06.

### M7 - Integrasi pencarian, filter, sorting, dan WhatsApp

**T-08** — Periksa dan pertahankan integrasi inti
- Checklist:
  - `filterProducts` murni, non-mutating, case-insensitive, trim.
  - Sorting: nama A–Z, harga asc, harga desc, stok terbanyak.
  - `buildWhatsAppUrl(nomor, produk)` validasi, normalisasi, encode, pesan.
  - Konfigurasi `src/config.js` dengan komentar penggantian.
- File yang mungkin diubah: `src/products.js`, `src/ui.js`, `src/config.js`.
- Kriteria penerimaan: data asli tidak berubah; stok sorting berfungsi.
- Ketergantungan: T-05, T-06, T-07.

> Tugas ini sudah berjalan pada implementasi sebelumnya dan harus dipertahankan selama M5–M8.

### M8 - Redesign dashboard

**T-09** — Redesign dashboard pengelola
- Checklist:
  - Banner mode demo, kartu ringkasan, daftar, form, dialog hapus/reset.
- File yang mungkin diubah: `src/ui.js`, `src/style.css`, halaman dashboard.
- Kriteria penerimaan: sesuai `UI-SPEC.md` bagian 7.
- Ketergantungan: T-06, T-07.

### M9 - Responsive refinement

**T-10** — Refine responsive
- Checklist:
  - Breakpoint mobile/tablet/desktop/wide, anti-overflow, toolbar, grid, kartu.
- File yang mungkin diubah: `src/style.css`.
- Kriteria penerimaan: sesuai `UI-SPEC.md` bagian 13.
- Ketergantungan: M4 s.d. M8.

### M10 - Testing, accessibility, dan build

**T-11** — Testing, accessibility, dan build
- Checklist:
  - `npm test`, `npm run build`.
  - Skenario manual: pencarian, filter, sorting, kombinasi, empty, WhatsApp, CRUD, stok.
  - Pemeriksaan keyboard, kontras, responsive.
- File yang mungkin diubah: kode aplikasi, dokumen.
- Kriteria penerimaan: build sukses; acceptance criteria relevan lulus.
- Ketergantungan: M1 s.d. M9.

## 7. Matriks keterlacakan acceptance criteria

| AC | Topik | Milestone terkait |
|---|---|---|
| AC-01…AC-05 | Katalog dan pencarian | M5, M7 |
| AC-06…AC-09 | Filter, sorting, kombinasi, empty | M5, M7 |
| AC-10…AC-12 | Empty state, WhatsApp | M6, M7 |
| AC-13…AC-20 | Dashboard dan CRUD | M8 |
| AC-21…AC-23 | Stok, mobile, data contoh | M6, M9 |

## 8. Keputusan terbuka

1. Satuan harga: per hari, jam, sesi, atau paket.
2. Stok jasa: jumlah slot/unit layanan.
3. Kontak WhatsApp: nomor final.
4. Satu toko: dashboard satu katalog.
5. Aset gambar: lokal.

## 9. Risiko dan mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Desain baru tidak konsisten dengan token lama | Kontras/kecapataan menurun | Sinkronkan melalui M2 sebelum implementasi desain |
| Fitur lama tidak teruji setelah redesign | Regresi perilaku | T-08 sebagai penjaga; M10 sebagai verifikasi |

## 10. Di luar ruang lingkup

Backend, API, database, auth, payment, booking, chat, notifikasi, upload cloud, analytics, deployment produksi.

---

**Akhir dokumen - TASKS.md**
