# TASKS.md - PinjamYuk

> Rencana kerja implementasi MVP PinjamYuk.
> Dokumen ini belum membuat atau mengubah kode aplikasi.
> Sumber utama: `SPEC.md` dan `UI-SPEC.md`. `CATATAN.md` hanya menjadi konteks latihan.
> Status: rencana. Beberapa keputusan terbuka perlu dikonfirmasi sebelum eksekusi.

## 1. Cara memakai dokumen ini

- Satu tugas adalah satu unit kerja yang bisa diterima atau ditolak sendiri.
- Setiap tugas punya tujuan, ketergantungan, kriteria penerimaan, berkas yang mungkin berubah, dan cara verifikasi.
- Centang kriteria penerimaan hanya setelah ada bukti. Bukti dapat berupa hasil perintah, catatan pengujian manual, atau tangkapan layar.
- Path berkas adalah usulan struktur. Jika implementasi memilih nama lain, perbarui dokumen ini agar tetap menjadi acuan yang benar.
- Jangan menambah fitur di luar `SPEC.md` dan `UI-SPEC.md`.
- Jangan menganggap tugas selesai hanya karena tampilan terlihat benar. Perilaku, keyboard, state kosong, state error, dan penyimpanan harus diperiksa.
- Jangan memakai script patch untuk mengubah CSS atau sumber. Semua perubahan ditulis langsung di berkas sumber.

## 2. Ringkasan milestone

| ID | Milestone | Hasil utama | Tugas | Bergantung pada |
|---|---|---|---|---|
| M0 | Scaffold | Proyek Vite multipage, fondasi visual, data awal, penyimpanan dasar | S-01 sampai S-05 | Tidak ada |
| M1 | Katalog | Landing page dan katalog delapan penawaran | K-01 sampai K-04 | M0 |
| M2 | Interaksi pencarian/filter | Pencarian, filter kategori, sorting, reset, empty state | F-01 sampai F-03 | M1 |
| M3 | WhatsApp | Tautan WhatsApp dengan pesan awal dan state kontak | W-01 sampai W-03 | M1 |
| M4 | CRUD dashboard | Ringkasan, daftar, form tambah/edit, hapus, reset | C-01 sampai C-05 | M0, M1, M2 |
| M5 | localStorage | Pembacaan aman, pemulihan data, kegagalan tulis, persistensi | L-01 sampai L-03 | M4 |
| M6 | Testing | Unit test, matriks AC, aksesibilitas, responsif | T-01 sampai T-04 | M0 sampai M5 |
| M7 | Security | Render aman, validasi input, privasi, header | SEC-01 sampai SEC-03 | M4, M5 |
| M8 | Build | Build produksi multipage dan verifikasi aset | B-01 sampai B-02 | M6, M7 |
| M9 | Deployment | Konfigurasi host, checklist rilis, deploy dan rollback | D-01 sampai D-03 | M8 |

Catatan urutan:

- `S-05` menyediakan antarmuka penyimpanan dasar agar CRUD di M4 dapat berjalan. M5 memperkuat pembacaan, kegagalan tulis, pemulihan, dan reset.
- M1 dan M2 dapat dikerjakan sebagian secara paralel setelah `S-04`, tetapi empty state pencarian baru bisa diuji setelah keduanya selesai.
- M3 bergantung pada struktur kartu dan dialog dari M1.
- M6 tidak menunggu seluruh fitur sempurna. Unit test inti sudah dimulai sejak `S-04`, lalu dilengkapi di M6.

## 3. Aturan global

Aturan berikut berlaku untuk semua tugas.

### 3.1 Stack dan ruang lingkup

- Vite dengan JavaScript vanilla dan ES modules.
- Dua halaman: `index.html` dan `dashboard.html`.
- Tanpa framework UI, router, state library, CSS framework, atau pustaka ikon.
- Tanpa backend, API, database server, autentikasi, atau sinkronisasi cloud.
- Data awal tepat delapan entri. Key penyimpanan `pinjamYuk.products.v1`.
- Harga dan stok disimpan sebagai angka, bukan string berformat.
- Tidak ada mode gelap dan tidak ada toggle tema.

### 3.2 Visual

- Palet inti: `#FAF5ED`, `#E9DFCE`, `#C47C59`, `#69764D`, `#394432`.
- Token turunan kontras dari `UI-SPEC.md` wajib dipertahankan, terutama `--terracotta-strong`, `--olive-strong`, `--muted`, `--danger`, `--warning`, dan `--surface-raised`.
- Font Plus Jakarta Sans, self-host WOFF2, `font-display: swap`.
- Body minimum 16 px. Teks 12 px hanya untuk badge, caption, dan helper dengan berat 600.
- Radius, spasi, bayangan, dan motion mengikuti `UI-SPEC.md`.
- Tanpa gradien dekoratif, glow, glassmorphism, pola grid, ilustrasi generik, atau panah dekoratif di semua tombol.
- Semua teks normal minimal 4.5:1. Teks besar minimal 3:1.

### 3.3 Copy

- Bahasa Indonesia, sentence case, spesifik, dan tenang.
- Dilarang memakai em dash. Gunakan koma, titik, titik dua, atau tanda kurung.
- Dilarang memakai istilah pemasaran kosong atau klaim teknologi tanpa bukti. Sebut manfaat konkret, bukan kata sifat umum.
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
- Jangan menampilkan dashboard seolah-olah terlindungi autentikasi.

### 3.6 Verifikasi umum

Setiap tugas minimal menjalankan:

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

Struktur ini menjaga halaman, logika, dan komponen tetap terpisah. Nama berkas boleh berubah jika ada alasan yang dicatat.

```text
/
├─ package.json
├─ vite.config.js
├─ .gitignore
├─ index.html
├─ dashboard.html
├─ public/
│  ├─ fonts/
│  │  └─ PlusJakartaSans-Variable.woff2
│  ├─ images/
│  │  ├─ placeholder-barang.svg
│  │  ├─ placeholder-jasa.svg
│  │  └─ [foto lokal lain]
│  └─ _headers
├─ src/
│  ├─ main.js
│  ├─ dashboard.js
│  ├─ styles/
│  │  ├─ tokens.css
│  │  ├─ base.css
│  │  ├─ components.css
│  │  ├─ landing.css
│  │  └─ dashboard.css
│  ├─ lib/
│  │  ├─ config.js
│  │  ├─ seed.js
│  │  ├─ schema.js
│  │  ├─ format.js
│  │  ├─ catalog.js
│  │  ├─ storage.js
│  │  ├─ whatsapp.js
│  │  └─ dom.js
│  └─ ui/
│     ├─ navbar.js
│     ├─ footer.js
│     ├─ catalog-card.js
│     ├─ detail-dialog.js
│     ├─ toolbar.js
│     ├─ empty-state.js
│     ├─ toast.js
│     ├─ summary.js
│     ├─ product-table.js
│     ├─ product-list.js
│     ├─ product-form.js
│     └─ confirm-dialog.js
├─ tests/
│  ├─ format.test.js
│  ├─ schema.test.js
│  ├─ catalog.test.js
│  ├─ whatsapp.test.js
│  └─ storage.test.js
├─ TESTING.md
└─ README.md
```

Berkas `dist/` dihasilkan oleh build dan tidak di-commit. `netlify.toml` atau `vercel.json` ditambahkan hanya setelah host deployment dipilih.

## 5. Definisi selesai per tugas

Sebuah tugas dianggap selesai jika:

- Semua kriteria penerimaan tugas tercentang dan ada bukti.
- `npm test` lulus.
- `npm run build` lulus.
- Tidak ada error konsol yang berasal dari aplikasi.
- Perubahan dapat digunakan dengan keyboard.
- Tidak ada scroll horizontal pada lebar 320 px untuk area yang disentuh tugas.
- Tidak ada data pribadi, kredensial, atau tautan mati yang ditambahkan.
- Dokumentasi terkait diperbarui jika perilaku atau keputusan berubah.

## 6. Tugas per milestone

### M0 - Scaffold

#### S-01 - Inisialisasi proyek Vite dan skrip dasar

**Tujuan:** Menyediakan proyek Vite multipage yang dapat dijalankan, diuji, dan dibangun.

**Bergantung pada:** Tidak ada.

**Kriteria penerimaan:**

- [ ] `npm install` selesai tanpa error.
- [ ] `npm run dev` menyajikan `/` dan `/dashboard.html`.
- [ ] `npm run build` menghasilkan `dist/index.html` dan `dist/dashboard.html`.
- [ ] `npm test` menjalankan Vitest dan minimal satu smoke test lulus.
- [ ] Tidak ada dependensi framework UI, router, state library, atau CSS framework.
- [ ] `.gitignore` mengecualikan `node_modules`, `dist`, dan berkas lingkungan lokal.

**Berkas yang mungkin berubah:**

- Create: `package.json`, `package-lock.json`, `vite.config.js`, `.gitignore`
- Create: `index.html`, `dashboard.html`, `src/main.js`, `src/dashboard.js`
- Create: `tests/smoke.test.js`

**Verifikasi:** Jalankan `npm install`, `npm run dev`, `npm test`, dan `npm run build`. Periksa kedua halaman di browser.

#### S-02 - Shell HTML, navigasi, dan landmark

**Tujuan:** Membuat kerangka halaman yang semantik dan navigasi yang benar-benar berfungsi.

**Bergantung pada:** S-01.

**Kriteria penerimaan:**

- [ ] Kedua halaman memakai `lang="id"`, judul unik, dan meta viewport tanpa `user-scalable=no` atau `maximum-scale=1`.
- [ ] Setiap halaman memiliki `header`, `nav`, `main`, dan `footer`, serta tepat satu `h1`.
- [ ] Navigasi landing menuju `#beranda`, `#katalog`, `#tentang`, dan `/dashboard.html`.
- [ ] Navigasi dashboard menuju `/index.html`, `/index.html#katalog`, `/index.html#tentang`, dan `/dashboard.html` dengan `aria-current="page"`.
- [ ] Menu mobile memakai `aria-expanded` dan `aria-controls`, dapat ditutup dengan Escape, mengembalikan fokus ke tombol menu, dan menutup saat klik di luar panel.
- [ ] Skip link landing berbunyi "Langsung ke katalog" dan skip link dashboard berbunyi "Langsung ke daftar penawaran".
- [ ] Tidak ada item navigasi yang menuju halaman atau section yang tidak ada.

**Berkas yang mungkin berubah:**

- Modify: `index.html`, `dashboard.html`
- Create: `src/ui/navbar.js`
- Create: `src/styles/components.css`

**Verifikasi:** Gunakan Tab, Enter, Space, dan Escape. Periksa `aria-current`, urutan fokus, dan tujuan setiap tautan.

#### S-03 - Fondasi visual, token, font, dan CSS dasar

**Tujuan:** Menetapkan sistem visual yang konsisten sebelum komponen dibuat.

**Bergantung pada:** S-01.

**Kriteria penerimaan:**

- [ ] Token warna memuat lima warna inti dan token turunan kontras dari `UI-SPEC.md`.
- [ ] Plus Jakarta Sans dimuat dari `public/fonts/` dengan `font-display: swap` dan preload satu berkas utama.
- [ ] Body memakai ukuran minimum 16 px dan line height yang ditetapkan.
- [ ] Gaya fokus global terlihat, memakai outline 3 px dan offset 2 px.
- [ ] `prefers-reduced-motion` mematikan transisi non-esensial.
- [ ] Elemen interaktif aktif memakai `cursor: pointer`, kontrol nonaktif memakai `cursor: not-allowed`.
- [ ] Tidak ada permintaan font atau stylesheet dari pihak ketiga.
- [ ] Tidak ada gradien, glow, glassmorphism, atau pola dekoratif.

**Berkas yang mungkin berubah:**

- Create: `src/styles/tokens.css`, `src/styles/base.css`
- Create: `public/fonts/PlusJakartaSans-Variable.woff2`
- Modify: `index.html`, `dashboard.html`, `README.md`

**Verifikasi:** Periksa nilainya di DevTools, cek tab Network, dan uji fokus keyboard di halaman kosong.

#### S-04 - Data awal, skema, ID, dan format Rupiah

**Tujuan:** Menyediakan satu sumber data contoh dan aturan validasi yang dipakai katalog serta dashboard.

**Bergantung pada:** S-01.

**Kriteria penerimaan:**

- [ ] Data awal berisi tepat 8 entri sesuai tabel di `UI-SPEC.md` bagian 11.
- [ ] Total stok 28, jumlah stok 0 ada 1, dan penawaran unggulan ada 2.
- [ ] Setiap entri memiliki `id`, `nama`, `kategori`, `harga`, `stok`, `deskripsi`, `imageUrl`, dan `unggulan` dengan tipe yang benar.
- [ ] Data contoh bersifat fiktif dan tidak memuat nomor pribadi, kredensial, atau klaim nyata.
- [ ] Validator menolak nama kosong setelah trim, kategori selain Barang/Jasa, harga negatif, stok negatif, stok pecahan, dan `imageUrl` yang tidak diizinkan.
- [ ] ID yang dibuat unik dan tidak bertabrakan dengan data awal.
- [ ] Format Rupiah menghasilkan `Rp150.000`, `Rp0`, dan maksimal 2 desimal hanya saat nilai memang pecahan.

**Berkas yang mungkin berubah:**

- Create: `src/lib/seed.js`, `src/lib/schema.js`, `src/lib/format.js`
- Create: `tests/schema.test.js`, `tests/format.test.js`

**Verifikasi:** Jalankan `npm test`. Periksa jumlah entri, total stok, dan hasil format secara manual.

#### S-05 - Antarmuka penyimpanan dasar dan bootstrap data

**Tujuan:** Menyediakan lapisan baca/tulis yang aman agar halaman dapat memuat data awal dan CRUD dasar dapat dibangun.

**Bergantung pada:** S-04.

**Kriteria penerimaan:**

- [ ] Key penyimpanan persis `pinjamYuk.products.v1`.
- [ ] Saat key belum ada, aplikasi menulis 8 data awal dan menampilkannya.
- [ ] Saat halaman dibuka ulang, data yang tersimpan dimuat kembali.
- [ ] JSON rusak atau bentuk data yang salah tidak membuat halaman crash dan menghasilkan error yang bisa ditangani UI.
- [ ] Jika `localStorage` tidak tersedia, aplikasi tetap berjalan dengan data di memori dan menandai mode tersebut.
- [ ] Kegagalan baca/tulis tidak dilempar mentah ke event handler tampilan.
- [ ] Tidak ada listener sinkronisasi antar tab. Batas ini sesuai MVP.

**Berkas yang mungkin berubah:**

- Create: `src/lib/config.js`, `src/lib/storage.js`
- Modify: `src/main.js`, `src/dashboard.js`
- Create: `tests/storage.test.js`

**Verifikasi:** Jalankan unit test dengan mock `localStorage`. Uji juga di browser dengan data dihapus dan dengan JSON rusak.

### M1 - Katalog

#### K-01 - Kartu penawaran dan grid katalog

**Tujuan:** Menampilkan delapan penawaran dengan informasi yang bisa dipindai dan status stok yang jelas.

**Bergantung pada:** M0.

**Kriteria penerimaan:**

- [ ] Katalog merender 8 kartu saat data awal dimuat.
- [ ] Setiap kartu menampilkan gambar 4:3 atau placeholder, kategori, nama, deskripsi singkat, harga Rupiah, dan status stok.
- [ ] Badge Unggulan hanya muncul saat `unggulan` bernilai true.
- [ ] Status stok mengikuti aturan: "Stok n", "Sisa n", atau "Stok habis", dengan ikon dan teks.
- [ ] Kartu stok 0 tetap tampil dan tidak merender tombol WhatsApp.
- [ ] Gambar yang gagal dimuat diganti placeholder kategori.
- [ ] Grid memakai 1 kolom di bawah 640 px, 2 kolom di 640-1023 px, 3 kolom di 1024-1279 px, dan 4 kolom di 1280 px ke atas.
- [ ] Semua kartu dalam satu baris memiliki tinggi sama dan area aksi terdorong ke bawah.
- [ ] Fokus tombol di dalam kartu terlihat penuh dan tidak terpotong.
- [ ] Tidak ada scroll horizontal pada 320 px.

**Berkas yang mungkin berubah:**

- Create: `src/ui/catalog-card.js`
- Modify: `src/main.js`
- Create: `src/styles/landing.css`
- Modify: `src/styles/components.css`
- Create: `public/images/placeholder-barang.svg`, `public/images/placeholder-jasa.svg`

**Verifikasi:** Periksa jumlah kartu, semua field, stok 0, gambar rusak, dan breakpoint 320/768/1024/1280 px.

#### K-02 - Hero, Tentang Kami, dan footer landing

**Tujuan:** Melengkapi landing page sesuai urutan bagian dan copy di `UI-SPEC.md`.

**Bergantung pada:** S-02, S-03, K-01.

**Kriteria penerimaan:**

- [ ] Hero memakai H1 "Butuh? Pinjam Yuk!" dan deskripsi yang ditetapkan.
- [ ] CTA "Lihat Katalog" menuju `#katalog` dan "Kenali PinjamYuk" menuju `#tentang`.
- [ ] Dua kartu pratinjau di hero bersifat statis, `aria-hidden="true"`, tanpa tombol, dan tidak menyerupai browser chrome palsu.
- [ ] Bagian Tentang Kami memakai `<dl>`, `<dt>`, dan `<dd>` untuk tiga istilah yang ditetapkan.
- [ ] Footer memuat brand, navigasi, catatan penyimpanan lokal, dan tautan "Kembali ke atas".
- [ ] Footer tidak memuat tautan Privasi, Syarat, atau Kebijakan yang tidak punya halaman.
- [ ] Tidak ada testimoni, logo mitra, statistik pengguna, FAQ, atau banner promo.
- [ ] Semua teks memenuhi kontras dan layout bertumpuk rapi di mobile.

**Berkas yang mungkin berubah:**

- Modify: `index.html`
- Create: `src/ui/footer.js`
- Modify: `src/styles/landing.css`, `src/styles/components.css`

**Verifikasi:** Periksa copy, tautan anchor, keyboard, kontras, dan tampilan 320/768/1280 px.

#### K-03 - Dialog detail penawaran

**Tujuan:** Menyediakan detail lengkap tanpa membuat halaman baru dan tanpa mengorbankan aksesibilitas.

**Bergantung pada:** K-01.

**Kriteria penerimaan:**

- [ ] Dialog memakai elemen `<dialog>` asli dan `showModal()`.
- [ ] Dialog menampilkan gambar, kategori, nama, harga, status stok, deskripsi lengkap, badge Unggulan bila ada, dan area CTA WhatsApp.
- [ ] Fokus awal masuk ke judul dialog yang diberi `tabindex="-1"`.
- [ ] Escape menutup dialog dan fokus kembali ke tombol "Lihat detail" pada kartu asal.
- [ ] Klik backdrop menutup dialog non-destruktif. Scroll halaman terkunci saat dialog terbuka.
- [ ] Di mobile, dialog tampil sebagai panel hampir penuh dengan CTA aman di bawah.
- [ ] Stok 0 menampilkan status "Stok habis" dan tombol "Lihat penawaran lain" yang menutup dialog.
- [ ] Tidak ada tautan WhatsApp kosong saat nomor belum dikonfigurasi.

**Berkas yang mungkin berubah:**

- Create: `src/ui/detail-dialog.js`
- Modify: `src/ui/catalog-card.js`, `src/styles/components.css`

**Verifikasi:** Buka dan tutup dengan mouse dan keyboard. Periksa fokus, Escape, backdrop, scroll, dan stok 0.

#### K-04 - State katalog: kosong, error, gambar gagal, dan hasil awal

**Tujuan:** Memastikan katalog tetap bisa dipahami saat data tidak ideal.

**Bergantung pada:** K-01, S-05.

**Kriteria penerimaan:**

- [ ] Katalog kosong menampilkan "Belum ada penawaran di katalog" dan tautan "Buka Dashboard Demo".
- [ ] Data tersimpan rusak menampilkan banner error di atas katalog dengan tombol "Pulihkan Data Demo", tanpa crash.
- [ ] Gambar gagal dimuat menampilkan placeholder kategori, bukan ikon rusak.
- [ ] Teks "Memuat katalog..." hanya muncul jika inisialisasi benar-benar membutuhkan waktu. Tidak ada spinner palsu.
- [ ] Baris hasil awal menampilkan "Menampilkan 8 penawaran".
- [ ] State kosong berada di area konten, bukan toast.
- [ ] State error tidak menimpa data rusak tanpa persetujuan pengguna.

**Berkas yang mungkin berubah:**

- Create: `src/ui/empty-state.js`
- Modify: `src/main.js`, `src/ui/catalog-card.js`, `src/styles/landing.css`

**Verifikasi:** Kosongkan data, rusak JSON secara manual, dan ganti `imageUrl` dengan path tidak valid. Periksa setiap state.

### M2 - Interaksi pencarian/filter

#### F-01 - Toolbar pencarian, filter, dan sorting

**Tujuan:** Menyediakan kontrol yang dapat digunakan di landing dan dashboard.

**Bergantung pada:** K-01.

**Kriteria penerimaan:**

- [ ] Toolbar memiliki label terlihat untuk pencarian, kategori, dan sorting.
- [ ] Pencarian memiliki tombol hapus kata kunci.
- [ ] Kategori memakai radio segmented "Semua", "Barang", dan "Jasa" dalam `<fieldset>` dan `<legend>`.
- [ ] Sorting menyediakan "Nama A-Z", "Harga terendah", "Harga tertinggi", dan "Stok terbanyak".
- [ ] Semua kontrol memiliki tinggi minimum 44 px dan dapat dioperasikan dengan keyboard, termasuk panah untuk radio.
- [ ] Di mobile, kontrol bertumpuk vertikal dan tidak menyebabkan scroll horizontal pada 320 px.
- [ ] Toolbar tidak mengubah data tersimpan.
- [ ] State toolbar disimpan di satu objek yang bisa dipakai ulang oleh halaman landing dan dashboard.

**Berkas yang mungkin berubah:**

- Create: `src/ui/toolbar.js`
- Modify: `src/main.js`, `src/styles/components.css`, `src/styles/landing.css`

**Verifikasi:** Uji Tab, panah, Enter, dan Space. Periksa tampilan 320/768/1280 px.

#### F-02 - Logika pencarian, filter, dan sorting

**Tujuan:** Menghasilkan daftar tampilan yang benar tanpa mengubah data asli.

**Bergantung pada:** F-01, S-04.

**Kriteria penerimaan:**

- [ ] Pencarian mencocokkan `nama` dan `deskripsi`.
- [ ] Pencarian tidak membedakan huruf besar dan kecil serta mengabaikan spasi di awal dan akhir.
- [ ] Filter Barang hanya menampilkan kategori Barang, filter Jasa hanya Jasa, dan Semua menampilkan keduanya.
- [ ] Pencarian, filter, dan sorting dapat digabung dan semua kondisi terpenuhi bersamaan.
- [ ] Sorting nama, harga terendah, harga tertinggi, dan stok terbanyak bekerja sesuai arah yang diminta.
- [ ] Jika nilai sorting sama, nama A-Z menjadi tie-breaker.
- [ ] Array data asli tidak berubah setelah sorting atau filter.
- [ ] Pencarian diperbarui saat mengetik dengan debounce 200 ms dan tanpa tombol submit.
- [ ] Hanya area hasil yang dirender ulang agar fokus input tidak hilang.

**Berkas yang mungkin berubah:**

- Create: `src/lib/catalog.js`
- Modify: `src/main.js`, `src/ui/toolbar.js`
- Create: `tests/catalog.test.js`

**Verifikasi:** Jalankan unit test untuk kapitalisasi, spasi tepi, kombinasi filter, tie-breaker, dan imutabilitas.

#### F-03 - Baris hasil, reset filter, dan empty state pencarian

**Tujuan:** Memberi umpan balik yang jelas dan jalan keluar saat hasil kosong.

**Bergantung pada:** F-02.

**Kriteria penerimaan:**

- [ ] Baris hasil menampilkan jumlah penawaran yang sedang tampil.
- [ ] Baris hasil memakai `aria-live="polite"` dengan penundaan 500 ms.
- [ ] Tombol "Reset filter" hanya muncul jika pencarian, kategori, atau sorting bukan default.
- [ ] Reset mengosongkan pencarian, mengembalikan kategori ke Semua, dan sorting ke Nama A-Z.
- [ ] Setelah reset, fokus kembali ke input pencarian.
- [ ] Pencarian tanpa hasil menampilkan "Tidak ada penawaran yang cocok" dan tombol "Hapus pencarian dan filter".
- [ ] Tidak ada pesan error teknis yang ditampilkan ke pengguna.
- [ ] Empty state pencarian berbeda dari katalog yang memang kosong.

**Berkas yang mungkin berubah:**

- Modify: `src/ui/toolbar.js`, `src/main.js`, `src/ui/empty-state.js`
- Modify: `src/styles/components.css`

**Verifikasi:** Cari kata yang tidak ada, gabungkan filter, reset, dan periksa fokus serta teks `aria-live`.

### M3 - WhatsApp

#### W-01 - Konfigurasi kontak dan pembangun tautan WhatsApp

**Tujuan:** Menempatkan nomor di satu sumber dan menghasilkan tautan yang aman serta konsisten.

**Bergantung pada:** S-04.

**Kriteria penerimaan:**

- [ ] Nomor WhatsApp disimpan di satu konstanta konfigurasi, bukan di banyak komponen.
- [ ] Nomor memakai digit internasional tanpa `+`, spasi, atau tanda baca.
- [ ] Tautan memakai `https://wa.me/<nomor>?text=<pesan>`.
- [ ] Pesan awal menyebut nama penawaran dan di-encode dengan `encodeURIComponent`.
- [ ] Jika nomor kosong atau tidak valid, fungsi mengembalikan `null` dan tidak membuat `href` kosong.
- [ ] Tidak ada nomor pribadi atau kredensial di source code.
- [ ] Unit test mencakup nomor valid, nomor kosong, nomor dengan tanda baca, dan nama dengan karakter khusus.

**Berkas yang mungkin berubah:**

- Modify: `src/lib/config.js`
- Create: `src/lib/whatsapp.js`
- Create: `tests/whatsapp.test.js`

**Verifikasi:** Jalankan unit test dan periksa URL yang dihasilkan secara manual.

#### W-02 - Tombol WhatsApp di kartu dan dialog detail

**Tujuan:** Menghubungkan calon penyewa ke pengelola tanpa mengklaim pesanan sudah dibuat.

**Bergantung pada:** W-01, K-01, K-03.

**Kriteria penerimaan:**

- [ ] Tombol "Pesan via WhatsApp" tampil sebagai `<a>` hanya jika nomor valid dan stok lebih dari 0.
- [ ] Tautan memakai `target="_blank"` dan `rel="noopener noreferrer"`.
- [ ] Tombol selebar kartu, tinggi minimum 44 px, dan memakai varian primer.
- [ ] Tautan membuka nomor yang dikonfigurasi dengan pesan awal yang menyebut nama penawaran.
- [ ] Tidak ada tombol nonaktif yang terlihat seperti tombol aktif.
- [ ] Aplikasi tidak menampilkan teks bahwa pesanan sudah dibuat atau dikonfirmasi.
- [ ] Tombol tetap dapat dioperasikan dengan keyboard.

**Berkas yang mungkin berubah:**

- Modify: `src/ui/catalog-card.js`, `src/ui/detail-dialog.js`
- Modify: `src/lib/whatsapp.js`, `src/styles/components.css`

**Verifikasi:** Periksa `href`, buka tautan di tab baru, dan uji dengan nomor kosong serta stok 0.

#### W-03 - State kontak belum tersedia, stok habis, dan copy batas demo

**Tujuan:** Menangani semua kondisi kontak dan stok tanpa tautan rusak atau pesan ganda.

**Bergantung pada:** W-02.

**Kriteria penerimaan:**

- [ ] Jika nomor belum dikonfigurasi, kartu dan dialog menampilkan "Kontak WhatsApp belum tersedia" tanpa tautan.
- [ ] Footer landing menampilkan teks kontak belum tersedia, bukan tautan kosong.
- [ ] Kartu stok 0 menampilkan "Stok habis" di baris stok dan tidak mengulang teks yang sama di area CTA.
- [ ] Dialog detail stok 0 menyediakan "Lihat penawaran lain" yang menutup dialog.
- [ ] Dialog detail dan Tentang Kami menjelaskan bahwa tombol WhatsApp membuka percakapan, bukan membuat pesanan.
- [ ] Tidak ada tautan ke nomor contoh yang tidak dapat dihubungi.

**Berkas yang mungkin berubah:**

- Modify: `src/ui/catalog-card.js`, `src/ui/detail-dialog.js`, `index.html`
- Modify: `src/lib/config.js`, `src/styles/components.css`

**Verifikasi:** Kosongkan nomor, uji stok 0, dan periksa copy di kartu, dialog, footer, dan Tentang Kami.

### M4 - CRUD dashboard

#### C-01 - Shell dashboard, ringkasan, dan daftar penawaran

**Tujuan:** Menampilkan data katalog dan ringkasan yang selalu sesuai dengan data tersimpan.

**Bergantung pada:** M0, M1.

**Kriteria penerimaan:**

- [ ] Dashboard memiliki H1 "Dashboard Demo", subjudul, tautan "Lihat katalog publik", dan pemberitahuan mode demo yang selalu terlihat.
- [ ] Empat kartu ringkasan menampilkan Total Penawaran, Total Stok, Stok Habis, dan Unggulan.
- [ ] Saat data awal dimuat, nilai adalah 8, 28, 1, dan 2.
- [ ] Tabel desktop memiliki kolom Penawaran, Kategori, Harga, Stok, Unggulan, dan Aksi.
- [ ] Di bawah 1024 px, tabel diganti daftar kartu dengan label dan nilai yang jelas.
- [ ] Hanya satu representasi data yang ada di accessibility tree.
- [ ] H2 "Ringkasan" dan "Daftar Penawaran" tersedia, boleh visually hidden.
- [ ] Stok 0 menampilkan "Habis" atau "Stok habis" dengan teks, bukan warna saja.
- [ ] Tidak ada scroll horizontal pada 320 px.

**Berkas yang mungkin berubah:**

- Modify: `dashboard.html`
- Modify: `src/dashboard.js`
- Create: `src/ui/summary.js`, `src/ui/product-table.js`, `src/ui/product-list.js`
- Create: `src/styles/dashboard.css`

**Verifikasi:** Periksa nilai ringkasan, kolom tabel, daftar mobile, dan breakpoint 320/768/1024/1280 px.

#### C-02 - Form tambah dan edit, validasi, dan pratinjau gambar

**Tujuan:** Menyediakan form yang dapat digunakan dengan keyboard dan memberi error yang jelas.

**Bergantung pada:** C-01, S-04.

**Kriteria penerimaan:**

- [ ] Desktop 768 px ke atas memakai drawer kanan selebar 480 px. Mobile memakai layar penuh.
- [ ] Field yang tersedia: nama, kategori, harga, stok, deskripsi, path gambar, dan unggulan.
- [ ] Semua field wajib memiliki label terlihat, helper yang ditetapkan, dan `inputmode` yang sesuai.
- [ ] Kategori memakai radio Barang/Jasa, bukan select bebas.
- [ ] Pratinjau gambar 4:3 menampilkan placeholder saat kosong atau gagal dimuat.
- [ ] Validasi berjalan saat blur dan saat submit. Error tampil di bawah field terkait.
- [ ] Input error memakai `aria-invalid="true"` dan `aria-describedby`.
- [ ] Fokus berpindah ke field error pertama saat submit gagal.
- [ ] Tidak ada `alert()` browser untuk validasi.
- [ ] Jika form kotor dan ditutup dengan X atau Escape, muncul konfirmasi "Perubahan belum disimpan. Tutup formulir?".
- [ ] Footer form sticky dan memakai `env(safe-area-inset-bottom)` di mobile.

**Berkas yang mungkin berubah:**

- Create: `src/ui/product-form.js`
- Modify: `src/dashboard.js`, `src/lib/schema.js`
- Modify: `src/styles/components.css`, `src/styles/dashboard.css`

**Verifikasi:** Uji field kosong, harga negatif, stok pecahan, path gambar eksternal, preview gagal, dan keyboard.

#### C-03 - Operasi tambah dan edit

**Tujuan:** Menyimpan perubahan valid dan memperbarui tampilan tanpa memuat ulang halaman.

**Bergantung pada:** C-02, S-05.

**Kriteria penerimaan:**

- [ ] Tambah menghasilkan ID unik, melakukan trim, menyimpan data, menutup form, dan menampilkan toast sukses.
- [ ] Entri baru muncul di dashboard dan ringkasan langsung diperbarui.
- [ ] Edit memperbarui entri yang benar, menutup form, dan menampilkan toast sukses.
- [ ] Data katalog publik membaca perubahan setelah pengguna berpindah ke landing atau memuat ulang halaman.
- [ ] Tombol simpan mencegah klik ganda selama proses simpan.
- [ ] Jika penyimpanan gagal, form tetap terbuka, isian tidak hilang, dan error ditampilkan.
- [ ] Fokus kembali ke tombol pemicu atau tombol tambah setelah form ditutup.
- [ ] Tidak ada klaim "tersimpan" jika penulisan gagal.

**Berkas yang mungkin berubah:**

- Modify: `src/dashboard.js`, `src/ui/product-form.js`, `src/lib/storage.js`
- Create: `src/ui/toast.js`

**Verifikasi:** Tambah entri, edit entri, periksa ringkasan, muat ulang, dan simulasi penulisan gagal.

#### C-04 - Hapus dan reset data demo dengan konfirmasi

**Tujuan:** Mencegah penghapusan tidak sengaja dan menyediakan pemulihan data awal.

**Bergantung pada:** C-01, S-05.

**Kriteria penerimaan:**

- [ ] Dialog hapus berjudul "Hapus penawaran?", menyebut nama penawaran, dan memiliki tombol "Batal" serta "Hapus Penawaran".
- [ ] Fokus awal dialog hapus berada di "Batal". Escape membatalkan. Klik backdrop tidak menutup dialog.
- [ ] Konfirmasi hapus menghapus entri, memperbarui ringkasan, dan menampilkan toast.
- [ ] Batal mempertahankan entri tanpa perubahan.
- [ ] Dialog reset berjudul "Reset data demo?" dan menjelaskan bahwa perubahan lokal akan diganti 8 data awal.
- [ ] Reset menulis tepat 8 data awal, memperbarui tabel dan ringkasan, lalu menampilkan toast.
- [ ] Jika penyimpanan gagal, data tidak berubah di tampilan dan error ditampilkan.
- [ ] Fokus kembali ke tombol hapus berikutnya atau judul daftar jika tidak ada baris lain.

**Berkas yang mungkin berubah:**

- Create: `src/ui/confirm-dialog.js`
- Modify: `src/dashboard.js`, `src/lib/storage.js`, `src/lib/seed.js`

**Verifikasi:** Uji hapus, batal, Escape, backdrop, reset, dan simulasi kegagalan tulis.

#### C-05 - State dashboard, fokus, dan responsif

**Tujuan:** Menutup semua kondisi dashboard agar tidak ada layar buntu atau kontrol hilang.

**Bergantung pada:** C-03, C-04.

**Kriteria penerimaan:**

- [ ] Dashboard kosong menampilkan ringkasan 0 dan empty state "Belum ada penawaran" dengan tombol "Tambah Penawaran".
- [ ] Filter tanpa hasil menampilkan empty state dan tombol reset.
- [ ] Penyimpanan tidak tersedia menampilkan banner peringatan dan CRUD tetap berjalan di memori dengan label jelas.
- [ ] Data rusak menampilkan banner error dan tombol "Pulihkan Data Demo".
- [ ] Toast sukses dan error tampil sesuai peran `status` atau `alert`.
- [ ] Pemberitahuan mode demo dan catatan penyimpanan lokal selalu terlihat.
- [ ] Ringkasan memakai grid 2 x 2 di mobile dan empat kolom di 1024 px ke atas.
- [ ] Tabel dan daftar kartu tidak tampil bersamaan di accessibility tree.
- [ ] Semua kontrol dapat dijangkau dengan keyboard pada 320 px dan 1024 px.

**Berkas yang mungkin berubah:**

- Modify: `src/dashboard.js`
- Modify: `src/styles/dashboard.css`, `src/styles/components.css`

**Verifikasi:** Uji empty state, filter kosong, storage mati, data rusak, toast, dan keyboard di dua breakpoint.

### M5 - localStorage

#### L-01 - Validasi data saat dibaca dan pemulihan data rusak

**Tujuan:** Memastikan data yang tidak sesuai skema tidak merusak katalog atau dashboard.

**Bergantung pada:** M4.

**Kriteria penerimaan:**

- [ ] JSON yang tidak valid ditangani tanpa crash dan menghasilkan error yang bisa ditampilkan.
- [ ] Setiap entri divalidasi terhadap skema sebelum dipakai.
- [ ] ID duplikat, field hilang, tipe salah, dan nilai di luar batas ditolak atau dinormalisasi sesuai aturan.
- [ ] Data rusak tidak ditimpa otomatis tanpa persetujuan pengguna.
- [ ] Banner error menyediakan tombol "Pulihkan Data Demo".
- [ ] Pemulihan menulis 8 data awal dan memperbarui tampilan.
- [ ] Unit test mencakup JSON rusak, array kosong, field hilang, tipe salah, dan ID duplikat.

**Berkas yang mungkin berubah:**

- Modify: `src/lib/storage.js`, `src/lib/schema.js`
- Modify: `src/main.js`, `src/dashboard.js`
- Modify: `tests/storage.test.js`

**Verifikasi:** Jalankan unit test dan uji manual dengan data rusak di DevTools.

#### L-02 - Kegagalan tulis, kuota, dan penyimpanan tidak tersedia

**Tujuan:** Menjaga perilaku CRUD saat browser menolak atau membatasi penyimpanan.

**Bergantung pada:** L-01.

**Kriteria penerimaan:**

- [ ] `setItem` yang melempar error ditangani dan dikembalikan sebagai hasil yang bisa dibaca UI.
- [ ] Jika penyimpanan tidak tersedia sejak awal, aplikasi berjalan dengan data di memori dan menampilkan banner.
- [ ] Tambah atau edit yang gagal tidak menutup form dan tidak menghilangkan isian.
- [ ] Hapus atau reset yang gagal tidak mengubah tampilan.
- [ ] Toast error ditampilkan dan tidak ada klaim bahwa data tersimpan.
- [ ] Banner menyediakan tombol "Coba lagi".
- [ ] Data di memori tetap konsisten selama halaman terbuka.

**Berkas yang mungkin berubah:**

- Modify: `src/lib/storage.js`, `src/dashboard.js`, `src/ui/product-form.js`
- Modify: `tests/storage.test.js`

**Verifikasi:** Mock `setItem` yang melempar `QuotaExceededError` dan uji alur tambah, edit, hapus, serta reset.

#### L-03 - Persistensi, reset, dan konsistensi lintas halaman

**Tujuan:** Memastikan perubahan bertahan pada browser yang sama dan batas MVP dijelaskan dengan benar.

**Bergantung pada:** L-02.

**Kriteria penerimaan:**

- [ ] Setelah tambah, edit, atau hapus, memuat ulang halaman menampilkan data terbaru.
- [ ] Landing membaca data terbaru setelah pengguna berpindah dari dashboard.
- [ ] Reset mengembalikan tepat 8 data awal dan ringkasan 8/28/1/2.
- [ ] Data pemulihan tidak memuat data pribadi atau kredensial.
- [ ] Tidak ada sinkronisasi otomatis antar tab. Perilaku ini tidak diklaim sebagai fitur.
- [ ] Footer dan dashboard menyatakan bahwa data tersimpan di browser ini dan tidak tersinkronisasi antar perangkat.
- [ ] Dokumentasi menjelaskan cara menghapus data dan memulihkan data demo.

**Berkas yang mungkin berubah:**

- Modify: `src/lib/storage.js`, `src/lib/seed.js`
- Modify: `src/dashboard.js`, `src/main.js`
- Modify: `README.md`, `TESTING.md`

**Verifikasi:** Lakukan CRUD, muat ulang, buka landing, reset, dan periksa isi `localStorage`.

### M6 - Testing

#### T-01 - Unit test untuk logika inti

**Tujuan:** Mengunci perilaku format, validasi, pencarian, sorting, ringkasan, WhatsApp, dan pembacaan penyimpanan.

**Bergantung pada:** M0 sampai M5.

**Kriteria penerimaan:**

- [ ] Test format Rupiah mencakup nol, ribuan, pecahan, dan pembulatan maksimal 2 desimal.
- [ ] Test skema mencakup nama kosong, kategori salah, harga negatif, stok negatif, stok pecahan, dan imageUrl terlarang.
- [ ] Test pencarian mencakup nama, deskripsi, kapitalisasi, spasi tepi, dan kata kunci kosong.
- [ ] Test filter dan sorting mencakup semua opsi, kombinasi, dan tie-breaker nama.
- [ ] Test ringkasan mencakup total entri, total stok, stok habis, dan unggulan.
- [ ] Test WhatsApp mencakup nomor valid, nomor kosong, nomor tidak valid, dan encoding pesan.
- [ ] Test penyimpanan mencakup key benar, data awal, JSON rusak, dan kegagalan tulis.
- [ ] `npm test` lulus tanpa ketergantungan jaringan.

**Berkas yang mungkin berubah:**

- Modify: `tests/format.test.js`, `tests/schema.test.js`, `tests/catalog.test.js`
- Modify: `tests/whatsapp.test.js`, `tests/storage.test.js`
- Modify: `package.json` jika perlu script test tambahan

**Verifikasi:** Jalankan `npm test` dan pastikan semua test lulus.

#### T-02 - Matriks acceptance criteria dan uji integrasi manual

**Tujuan:** Membuktikan bahwa seluruh AC di `SPEC.md` dapat diperiksa dan lulus.

**Bergantung pada:** T-01.

**Kriteria penerimaan:**

- [ ] `TESTING.md` memuat tabel AC-01 sampai AC-23 dengan status, langkah, dan bukti.
- [ ] Setiap AC yang lulus memiliki catatan hasil yang dapat diulang.
- [ ] AC yang belum lulus memiliki penjelasan hambatan dan pemilik tindak lanjut.
- [ ] Tidak ada bug kritis pada katalog, pencarian, WhatsApp, CRUD, atau persistensi.
- [ ] Tidak ada error konsol saat alur utama dijalankan.
- [ ] Pengujian dilakukan pada build development dan preview produksi.

**Berkas yang mungkin berubah:**

- Create: `TESTING.md`
- Modify: `tests/*.test.js` jika ada celah integrasi

**Verifikasi:** Jalankan seluruh skenario AC di browser dan catat bukti.

#### T-03 - Audit aksesibilitas dan keyboard

**Tujuan:** Memastikan halaman dapat digunakan tanpa mouse dan memenuhi target WCAG AA.

**Bergantung pada:** M1 sampai M5.

**Kriteria penerimaan:**

- [ ] Seluruh alur katalog, detail, filter, form, hapus, dan reset dapat diselesaikan dengan keyboard.
- [ ] Skip link berfungsi dan terlihat saat fokus.
- [ ] Menu mobile, dialog, dan drawer dapat ditutup dengan Escape.
- [ ] Fokus terlihat di semua latar dan tidak terpotong.
- [ ] Radio segmented dapat dioperasikan dengan panah.
- [ ] Setiap field punya label dan error yang terhubung.
- [ ] Setiap gambar punya `alt` yang sesuai. Gambar dekoratif memakai `alt=""`.
- [ ] Tidak ada `outline: none` tanpa pengganti.
- [ ] Status stok, error, dan badge tidak hanya dibedakan dengan warna.
- [ ] Target sentuh minimum 44 px.
- [ ] `prefers-reduced-motion` dihormati.
- [ ] Tidak ada heading level yang melompat.

**Berkas yang mungkin berubah:**

- Modify: `TESTING.md`
- Modify: `src/styles/*.css`, `src/ui/*.js`, `index.html`, `dashboard.html`

**Verifikasi:** Uji keyboard-only, zoom 200 persen, dan pemeriksaan kontras. Catat alat atau metode yang dipakai.

#### T-04 - Uji responsif, lintas browser, dan regresi

**Tujuan:** Memastikan layout dan interaksi bertahan di ukuran layar serta browser modern.

**Bergantung pada:** T-03.

**Kriteria penerimaan:**

- [ ] Halaman diuji pada 320, 360, 390, 768, 1024, dan 1280 px.
- [ ] Tidak ada scroll horizontal pada body di semua ukuran.
- [ ] Navbar, toolbar, kartu, tabel, daftar mobile, form, dialog, dan footer tidak terpotong.
- [ ] Tombol dan field tetap dapat disentuh pada layar sempit.
- [ ] Form mobile tidak tertutup keyboard virtual saat field fokus.
- [ ] Diuji pada versi terbaru Chrome, Firefox, dan Safari atau WebKit.
- [ ] Regresi alur utama setelah perbaikan responsif tetap lulus.
- [ ] Bukti pengujian dicatat di `TESTING.md`.

**Berkas yang mungkin berubah:**

- Modify: `TESTING.md`
- Modify: `src/styles/*.css`, `src/ui/*.js` jika ada perbaikan

**Verifikasi:** Gunakan DevTools responsive mode dan browser nyata jika tersedia. Catat hasil per breakpoint.

### M7 - Security

#### SEC-01 - Audit render aman dan validasi URL

**Tujuan:** Menutup jalur XSS dan tautan berbahaya dari data pengguna.

**Bergantung pada:** M4, M5.

**Kriteria penerimaan:**

- [ ] Nama, deskripsi, dan pesan pengguna dirender dengan `textContent` atau `createElement`, bukan `innerHTML`.
- [ ] Payload seperti `<img src=x onerror=alert(1)>` tampil sebagai teks, bukan dieksekusi.
- [ ] `imageUrl` hanya menerima path `/images/` dengan ekstensi yang diizinkan.
- [ ] URL eksternal, `javascript:`, `data:`, dan path traversal ditolak.
- [ ] Pesan WhatsApp di-encode dan tautan memakai `rel="noopener noreferrer"`.
- [ ] Tidak ada `href` kosong atau tautan yang dibuat dari nomor tidak valid.
- [ ] Tidak ada penggunaan `eval`, `new Function`, atau penyisipan HTML dari input pengguna.

**Berkas yang mungkin berubah:**

- Modify: `src/ui/*.js`, `src/lib/schema.js`, `src/lib/whatsapp.js`, `src/lib/dom.js`

**Verifikasi:** Uji payload XSS di nama dan deskripsi, path gambar berbahaya, dan periksa `href` WhatsApp.

#### SEC-02 - Privasi, konfigurasi, dan dependensi

**Tujuan:** Memastikan demo tidak menyimpan rahasia atau data pribadi.

**Bergantung pada:** M5.

**Kriteria penerimaan:**

- [ ] Tidak ada API key, token, kata sandi, atau kredensial di source code dan `localStorage`.
- [ ] Data contoh tidak memuat nama orang nyata, nomor pribadi, atau alamat sensitif.
- [ ] Tidak ada analytics atau script pihak ketiga.
- [ ] Nomor WhatsApp tetap placeholder sampai nomor bisnis disetujui.
- [ ] `npm audit` dijalankan dan hasilnya dicatat. Jangan mengklaim aman tanpa bukti.
- [ ] Tidak ada klaim keamanan, kepatuhan, atau performa yang tidak dapat dibuktikan.
- [ ] Copy privasi dan batas demo sesuai perilaku aplikasi.

**Berkas yang mungkin berubah:**

- Modify: `src/lib/config.js`, `src/lib/seed.js`
- Modify: `README.md`, `TESTING.md`

**Verifikasi:** Cari pola rahasia di repo, periksa isi `localStorage`, dan jalankan `npm audit`.

#### SEC-03 - Header keamanan dan CSP

**Tujuan:** Mengurangi risiko eksekusi konten yang tidak diinginkan pada build statis.

**Bergantung pada:** SEC-01, SEC-02.

**Kriteria penerimaan:**

- [ ] Konfigurasi host memuat `Content-Security-Policy` yang tidak memblokir aset sendiri.
- [ ] `X-Content-Type-Options: nosniff`, `Referrer-Policy`, dan `frame-ancestors 'none'` diterapkan.
- [ ] Tidak ada inline script yang diperlukan untuk menjalankan aplikasi.
- [ ] Font, gambar, CSS, dan modul JavaScript dimuat dari origin sendiri.
- [ ] Tautan WhatsApp tetap berfungsi setelah header diterapkan.
- [ ] Tidak ada pelanggaran CSP di konsol pada halaman landing dan dashboard.
- [ ] Konfigurasi diuji di preview, bukan hanya di dev server.

**Berkas yang mungkin berubah:**

- Create: `public/_headers` atau `netlify.toml`
- Create: `vercel.json` jika host yang dipilih adalah Vercel
- Modify: `README.md`

**Verifikasi:** Jalankan `npm run preview`, periksa header di DevTools, dan buka kedua halaman.

### M8 - Build

#### B-01 - Konfigurasi build produksi multipage

**Tujuan:** Menghasilkan build statis yang memuat kedua halaman dan seluruh aset lokal.

**Bergantung pada:** M6, M7.

**Kriteria penerimaan:**

- [ ] `vite.config.js` mendaftarkan `index.html` dan `dashboard.html` sebagai input.
- [ ] `base` sesuai host yang dipilih. Gunakan `/` untuk host root dan path repo untuk GitHub Pages.
- [ ] `npm run build` selesai tanpa error.
- [ ] `dist/` memuat kedua HTML, CSS, JavaScript, font, dan gambar placeholder.
- [ ] Nama aset memakai hash untuk cache busting.
- [ ] Tidak ada permintaan ke CDN, font pihak ketiga, atau gambar eksternal.
- [ ] Tidak ada source map publik yang tidak disengaja.

**Berkas yang mungkin berubah:**

- Modify: `vite.config.js`, `package.json`, `README.md`

**Verifikasi:** Jalankan `npm run build` dan periksa isi `dist/`.

#### B-02 - Verifikasi build dan aset

**Tujuan:** Memastikan build produksi berjalan sama seperti development.

**Bergantung pada:** B-01.

**Kriteria penerimaan:**

- [ ] `npm run preview` menyajikan landing dan dashboard.
- [ ] Tidak ada 404 untuk font, gambar, CSS, atau modul JavaScript.
- [ ] Tidak ada error konsol di kedua halaman.
- [ ] Navigasi anchor dan `/dashboard.html` bekerja pada build produksi.
- [ ] Gambar memiliki dimensi atau `aspect-ratio` dan tidak menyebabkan layout shift besar.
- [ ] Gambar hero tidak memakai `loading="lazy"` dan memakai `fetchpriority="high"` jika ada.
- [ ] Tidak ada klaim skor Lighthouse atau Core Web Vitals tanpa pengukuran nyata.
- [ ] Ukuran bundle dicatat sebagai informasi, bukan klaim performa.

**Berkas yang mungkin berubah:**

- Modify: `vite.config.js`, `README.md`, `TESTING.md`

**Verifikasi:** Jalankan `npm run preview`, buka DevTools Network, dan klik alur utama.

### M9 - Deployment

#### D-01 - Konfigurasi host deployment

**Tujuan:** Menyiapkan satu host statis yang mendukung Vite multipage dan header keamanan.

**Bergantung pada:** B-02.

**Kriteria penerimaan:**

- [ ] Host dipilih dan dicatat: Netlify, Vercel, atau GitHub Pages.
- [ ] Build command dan output directory sesuai: `npm run build` dan `dist`.
- [ ] Direct link `/dashboard.html` dapat dibuka tanpa 404.
- [ ] Header keamanan dari SEC-03 diterapkan di host.
- [ ] Jika GitHub Pages dipakai, `base` dan `.nojekyll` dikonfigurasi.
- [ ] Deploy preview berhasil sebelum produksi.
- [ ] Konfigurasi host di-commit ke repo.

**Berkas yang mungkin berubah:**

- Create: `netlify.toml` atau `vercel.json`
- Create: `public/_headers` atau `.nojekyll`
- Modify: `vite.config.js`, `README.md`

**Verifikasi:** Buka URL preview, periksa kedua halaman, header, dan tautan langsung.

#### D-02 - Checklist sebelum rilis

**Tujuan:** Mencegah placeholder, data pribadi, atau klaim palsu ikut terpublikasi.

**Bergantung pada:** D-01.

**Kriteria penerimaan:**

- [ ] Nomor WhatsApp bisnis sudah dikonfirmasi dan tidak memakai placeholder.
- [ ] Logo wordmark dan foto/placeholder sudah disetujui untuk demo.
- [ ] Tidak ada data pribadi, kredensial, atau nomor rahasia di repo dan build.
- [ ] Data contoh tetap 8 entri dengan total stok 28.
- [ ] Copy tidak memuat klaim pesanan otomatis, keamanan, atau performa tanpa bukti.
- [ ] Seluruh AC yang relevan lulus dan tercatat di `TESTING.md`.
- [ ] `npm test`, `npm run build`, dan `npm run preview` lulus.
- [ ] Uji mobile 320 px dan desktop 1280 px lulus.
- [ ] Tidak ada tautan navigasi yang mati.

**Berkas yang mungkin berubah:**

- Modify: `src/lib/config.js`, `README.md`, `TESTING.md`

**Verifikasi:** Jalankan checklist satu per satu dan catat penanggung jawab keputusan.

#### D-03 - Deploy produksi, smoke test, dan rollback

**Tujuan:** Merilis demo yang dapat digunakan dan mendokumentasikan cara mengembalikannya.

**Bergantung pada:** D-02.

**Kriteria penerimaan:**

- [ ] Situs produksi dapat dibuka melalui HTTPS.
- [ ] Pada browser bersih, landing menampilkan 8 penawaran dan dashboard menampilkan ringkasan 8/28/1/2.
- [ ] Pencarian, filter, sorting, dan reset bekerja di produksi.
- [ ] Tombol WhatsApp membuka nomor yang benar dengan pesan awal.
- [ ] Tambah, edit, hapus, dan reset bekerja serta bertahan setelah muat ulang pada browser yang sama.
- [ ] Tidak ada error konsol dan tidak ada 404 aset.
- [ ] Header keamanan terlihat di respons produksi.
- [ ] Tidak ada scroll horizontal pada 320 px.
- [ ] Langkah rollback dan pemilik deployment dicatat.

**Berkas yang mungkin berubah:**

- Create: `DEPLOYMENT.md` atau bagian deployment di `README.md`
- Modify: `TESTING.md`

**Verifikasi:** Lakukan smoke test pada URL produksi dan catat hasil per alur.

## 7. Matriks keterlacakan acceptance criteria

| AC | Tugas utama | Bukti yang diharapkan |
|---|---|---|
| AC-01 | S-04, S-05, K-01 | 8 kartu tampil saat pertama dibuka. |
| AC-02 | K-01 | Setiap kartu memuat nama, kategori, harga, stok, gambar atau placeholder. |
| AC-03 | K-03 | Deskripsi lengkap terbaca di dialog detail. |
| AC-04 | F-02 | Pencarian nama dan deskripsi menyaring hasil. |
| AC-05 | F-02 | Kapitalisasi berbeda tetap cocok. |
| AC-06 | F-02 | Filter Barang hanya menampilkan Barang. |
| AC-07 | F-02 | Filter Jasa hanya menampilkan Jasa. |
| AC-08 | F-02 | Pencarian dan filter berlaku bersamaan. |
| AC-09 | F-02 | Sorting nama, harga, dan stok sesuai pilihan. |
| AC-10 | F-03 | Empty state dan tombol hapus pencarian/filter tampil. |
| AC-11 | W-01, W-02 | Tautan WhatsApp berisi nomor dan nama penawaran. |
| AC-12 | W-03 | Nomor kosong menampilkan info tanpa tautan rusak. |
| AC-13 | C-01 | Dashboard menampilkan daftar, total penawaran, dan total stok. |
| AC-14 | C-03 | Entri baru muncul dan ringkasan diperbarui. |
| AC-15 | C-02 | Form tidak valid tidak tersimpan dan error tampil. |
| AC-16 | C-03 | Edit memperbarui data dan ringkasan. |
| AC-17 | C-04 | Hapus dengan konfirmasi menghilangkan entri. |
| AC-18 | C-04 | Batal pada konfirmasi mempertahankan entri. |
| AC-19 | L-03 | Data bertahan setelah muat ulang pada browser yang sama. |
| AC-20 | C-04, L-03 | Reset mengembalikan 8 data awal. |
| AC-21 | K-01, W-03 | Stok 0 jelas dan tidak menampilkan tombol WhatsApp. |
| AC-22 | K-01, C-05, T-04 | Tidak ada scroll horizontal pada mobile. |
| AC-23 | S-04, SEC-02 | Tidak ada data pribadi atau kredensial. |

## 8. Keputusan terbuka sebelum eksekusi

| No | Keputusan | Rekomendasi | Dampak jika belum diputuskan |
|---:|---|---|---|
| 1 | Satuan harga | Tampilkan harga tanpa satuan sampai ada keputusan. | Copy harga di kartu, detail, dan tabel bisa berubah. |
| 2 | Nomor WhatsApp | Gunakan nomor bisnis nonpribadi yang disetujui. | Tombol WhatsApp memakai state "belum tersedia" dan tidak bisa diuji penuh. |
| 3 | Logo dan foto | Gunakan wordmark dan placeholder lokal. | Aset final tidak boleh dibuat tanpa persetujuan. |
| 4 | Host deployment | Netlify atau Vercel untuk build statis. | Konfigurasi `base`, header, dan rollback bergantung pada host. |
| 5 | Kerangka test | Vitest untuk unit test logika. | Perintah dan struktur test perlu disesuaikan jika memakai alat lain. |
| 6 | Ekstensi gambar | Izinkan `.jpg`, `.jpeg`, `.png`, `.webp`, dan `.avif` untuk foto. Placeholder SVG hanya untuk aset internal. | Validasi `imageUrl` dan keamanan render gambar berubah. |
| 7 | Browser target | Versi terbaru Chrome, Firefox, dan Safari atau WebKit. | Matriks uji dan dukungan CSS perlu disesuaikan. |
| 8 | Dokumentasi rilis | Buat `TESTING.md`, `README.md`, dan `DEPLOYMENT.md`. | Bukti pengujian dan rollback sulit dilacak. |

## 9. Risiko dan mitigasi

| Risiko | Dampak | Mitigasi | Tugas terkait |
|---|---|---|---|
| `localStorage` rusak atau dihapus | Katalog gagal dimuat | Validasi saat baca, banner error, tombol pulihkan | L-01 |
| Kuota penyimpanan penuh | CRUD gagal tanpa pesan | Tangani error tulis, pertahankan form, tampilkan toast | L-02 |
| Nomor WhatsApp placeholder terpublikasi | Kontak salah atau tidak bisa dihubungi | Konfigurasi terpusat dan checklist rilis | W-01, D-02 |
| Data pengguna disisipkan sebagai HTML | XSS | `textContent`, validasi `imageUrl`, encode pesan | SEC-01 |
| Tabel dashboard memaksa lebar | Scroll horizontal di mobile | Ganti tabel dengan daftar kartu di bawah 1024 px | C-01, C-05 |
| Dialog tidak mengembalikan fokus | Keyboard user kehilangan konteks | Simpan pemicu dan kembalikan fokus | K-03, C-02, C-04 |
| CSP memblokir aset | Halaman rusak di produksi | Uji header di preview dan produksi | SEC-03, D-01 |
| Base path salah saat deploy | Aset 404 | Sesuaikan `base` dengan host | B-01, D-01 |
| Scope melebar ke backend atau auth | MVP tidak selesai | Tolak fitur di luar `SPEC.md` | Semua tugas |

## 10. Di luar ruang lingkup

- Backend, REST API, dan database server.
- Login, registrasi, autentikasi, dan otorisasi.
- Multi-toko dengan akun terpisah.
- Sinkronisasi data lintas perangkat atau tab.
- Pembayaran, invoice, deposit, denda, dan pengembalian dana.
- Booking kalender dan pencegahan bentrok jadwal.
- Chat internal dan pengiriman WhatsApp otomatis.
- Upload gambar ke cloud.
- Notifikasi email, SMS, atau push.
- Rating, ulasan, moderasi, dan verifikasi identitas.
- Analitik bisnis tingkat lanjut.
- Deployment produksi dengan data pelanggan nyata.
- Mode gelap dan toggle tema.

---

**Akhir dokumen - TASKS.md**
