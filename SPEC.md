# SPEC.md — PinjamYuk

> **Dokumen spesifikasi kebutuhan produk dan teknis (MVP)**  
> Nama aplikasi: **PinjamYuk**  
> Tagline: **Butuh? Pinjam Yuk!**  
> Status: Spesifikasi kebutuhan produk dan teknis (MVP) yang sedang diselaraskan dengan arsitektur desain baru sebelum implementasi redesign.  
> Platform: Web app berbasis Vite + JavaScript vanilla  

---

## 1. Tujuan

PinjamYuk adalah katalog digital untuk UMKM yang menawarkan **penyewaan barang dan jasa**. Aplikasi membantu calon penyewa menemukan penawaran, melihat informasi penting, menyaring katalog, lalu menghubungi pengelola melalui WhatsApp.

Desain produk sedang ditetapkan ulang dengan arsitektur **Modern Rental Marketplace — Premium, Warm & Clean**, sebagaimana tertuang secara lengkap di `UI-SPEC.md`. Perubahan desain tidak mengubah cakupan fungsional MVP yang sudah disepakati.

Pada MVP, aplikasi berjalan sepenuhnya di sisi browser. Data contoh dan perubahan katalog disimpan di `localStorage`, sehingga dapat digunakan untuk demonstrasi tanpa backend, API, database server, atau sistem akun.

### Tujuan MVP

1. Menampilkan katalog delapan produk/jasa contoh.
2. Memudahkan calon pengguna menemukan penawaran melalui pencarian, filter, dan sorting.
3. Menyediakan jalur pemesanan dengan membuka WhatsApp pengelola.
4. Memungkinkan pengelola toko mendemonstrasikan pengelolaan katalog melalui dashboard CRUD.
5. Menampilkan ringkasan jumlah produk dan total stok.
6. Mempertahankan perubahan data pada browser yang sama melalui `localStorage`.

### Bukan tujuan MVP

MVP bukan sistem transaksi penyewaan penuh. Aplikasi tidak memproses pembayaran, memastikan ketersediaan berdasarkan kalender, mengirim pesan otomatis, atau menyinkronkan data ant perangkat.

---

## 2. Pengguna dan konteks penggunaan

Aplikasi digunakan pada **satu perangkat** oleh dua jenis pengguna. Peran ini merupakan konteks penggunaan, bukan akun atau autentikasi.

### 2.1 Calon pengguna jasa/barang

Kebutuhan:
- Melihat semua barang dan jasa yang ditawarkan.
- Mengetahui nama, kategori, harga, stok, deskripsi, dan foto/placeholder.
- Mencari berdasarkan nama atau deskripsi.
- Memfilter kategori.
- Mengurutkan daftar.
- Menghubungi pengelola melalui WhatsApp untuk menanyakan atau memesan.

### 2.2 Pengelola toko

Kebutuhan:
- Membuka dashboard demo dari navigasi aplikasi.
- Melihat ringkasan jumlah produk dan total stok.
- Menambahkan penawaran baru.
- Mengubah data penawaran.
- Menghapus penawaran dengan konfirmasi.
- Melihat perubahan katalog setelah data disimpan.

### 2.3 Batas peran

- Tidak ada login, registrasi, kata sandi, atau klaim keamanan berbasis peran.
- Dashboard demo dapat diakses dari perangkat/browser yang sama.
- Navigasi ke dashboard hanya pemisah tampilan, bukan kontrol akses.
- Siapa pun yang menggunakan browser tersebut dapat mengubah data demo.

---

## 3. Ruang lingkup dan daftar fitur MVP

### 3.1 Katalog publik

- Menampilkan delapan data contoh pada penggunaan pertama.
- Setiap kartu menampilkan foto atau placeholder lokal, nama, kategori, harga Rupiah, stok, dan penanda unggulan bila aktif.
- Deskripsi lengkap dapat dilihat pada area detail atau tampilan kartu yang diperluas.
- Katalog menampilkan keadaan kosong jika tidak ada data yang cocok.
- Produk dengan stok nol tetap dapat dilihat, tetapi status stok harus jelas dan tombol pesan dinonaktifkan atau diganti dengan keterangan “Stok habis”.

### 3.2 Pencarian

- Satu kolom pencarian untuk mencocokkan `nama` dan `deskripsi`.
- Pencarian tidak membedakan huruf besar dan kecil.
- Spasi di awal/akhir kata kunci diabaikan.
- Hasil diperbarui saat pengguna mengetik atau setelah aksi pencarian, sesuai rancangan UI; perilakunya harus konsisten.
- Jika tidak ada hasil, tampilkan pesan yang menjelaskan bahwa hasil tidak ditemukan dan sediakan cara menghapus pencarian/filter.

### 3.3 Filter

- Filter kategori dengan pilihan “Semua”, “Barang”, dan “Jasa”.
- Filter kategori dapat digunakan bersamaan dengan pencarian dan sorting.
- Pilihan “Semua” menampilkan seluruh kategori.

### 3.4 Sorting

Pilihan pengurutan minimum:
- Nama A–Z.
- Harga terendah ke tertinggi.
- Harga tertinggi ke terendah.
- Stok terbanyak ke tersedikit.

Sorting tidak boleh mengubah data asli yang disimpan. Urutan hanya berlaku pada hasil tampilan.

### 3.5 Pemesanan melalui WhatsApp

- Setiap penawaran memiliki tombol “Pesan via WhatsApp”.
- Tombol membuka tautan WhatsApp pengelola dengan pesan awal yang menyebut data penawaran (nama, kategori, harga, dan stok yang tersedia).
- Nomor WhatsApp pengelola merupakan konfigurasi publik aplikasi, bukan rahasia. Gunakan nomor contoh/nonpribadi selama demo dan ganti dengan nomor bisnis yang telah disetujui sebelum dipublikasikan.
- Format tautan harus menggunakan format internasional tanpa tanda `+`, spasi, atau tanda baca pada nomor.
- Jika nomor belum dikonfigurasi, tampilkan informasi bahwa kontak belum tersedia dan jangan membuka tautan yang tidak valid.
- Tombol WhatsApp adalah pengalihan komunikasi; aplikasi tidak mengklaim bahwa pesanan telah dibuat atau dikonfirmasi.

Contoh isi pesan awal:
> Halo, saya tertarik untuk memesan penaworan berikut:
> Nama: [nama penawaran]
> Kategori: [kategori]
> Harga: Rp[harga]
> Stok tersedia: [stok]
> Apakah penaworan ini masih tersedia? Terima kasih.

### 3.6 Dashboard demo CRUD

Dashboard menyediakan:
- Daftar seluruh data katalog.
- Form tambah produk/jasa.
- Form edit produk/jasa.
- Aksi hapus dengan dialog/konfirmasi.
- Validasi input sebelum penyimpanan.
- Umpan balik berhasil/gagal yang mudah dipahami.

Validasi form:
- `nama`: wajib diisi setelah spasi tepi dihapus.
- `kategori`: wajib memilih `Barang` atau `Jasa`.
- `harga`: angka valid dan minimal 0.
- `stok`: bilangan bulat dan minimal 0.
- `deskripsi`: wajib diisi.
- `imageUrl`: boleh kosong; jika kosong gunakan placeholder lokal. Jika diisi, MVP hanya menerima path aset lokal yang sesuai kebijakan aplikasi.
- `unggulan`: boolean (aktif/nonaktif).

### 3.7 Ringkasan dashboard

Tampilkan sekurang-kurangnya:
- Total produk/jasa: jumlah seluruh entri katalog.
- Total stok: jumlah seluruh nilai `stok`.

Definisi:
- Total produk menghitung jumlah entri, termasuk yang stoknya nol.
- Total stok menjumlahkan stok semua entri, baik kategori Barang maupun Jasa. Untuk jasa, stok merepresentasikan jumlah slot/unit layanan yang dapat ditawarkan pada demo dan harus diberi penjelasan pada UI bila diperlukan.
- Ringkasan diperbarui setelah tambah, edit, atau hapus.

### 3.8 Penyimpanan localStorage

- Data awal dimuat dari delapan data contoh ketika key penyimpanan belum tersedia.
- Perubahan CRUD disimpan ke `localStorage`.
- Saat aplikasi dibuka ulang pada browser/perangkat yang sama, perubahan tetap tampil.
- Sediakan aksi “Reset data demo” dengan konfirmasi untuk mengembalikan delapan data awal.
- Gunakan satu key yang konsisten, misalnya `pinjamYuk.products.v1`.
- Jika data tersimpan tidak dapat dibaca atau formatnya tidak valid, aplikasi harus menangani kesalahan secara aman dan memberi opsi memulihkan data demo; jangan membuat aplikasi crash.
- `localStorage` bersifat lokal pada browser/perangkat tersebut dan bukan sinkronisasi cloud.

---

## 4. Model data

### 4.1 Entitas Product

| Field | Tipe | Wajib | Aturan |
|---|---|---:|---|
| `id` | string | Ya | Unik untuk setiap entri; dibuat aplikasi. |
| `nama` | string | Ya | Tidak boleh kosong setelah trim. |
| `kategori` | string | Ya | Nilai yang diizinkan: `Barang` atau `Jasa`. |
| `harga` | number | Ya | Angka hingga pecahan diperbolehkan bila diperlukan; minimal 0. Ditampilkan dalam Rupiah. |
| `stok` | integer | Ya | Bilangan bulat minimal 0. |
| `deskripsi` | string | Ya | Penjelasan singkat penawaran. |
| `imageUrl` | string | Tidak | Path aset lokal atau string kosong untuk placeholder lokal. |
| `unggulan` | boolean | Ya | Menentukan apakah penawaran diberi label unggulan. |

### 4.2 Contoh bentuk data (ilustrasi)

```json
{
  "id": "item-001",
  "nama": "Kamera Mirrorless",
  "kategori": "Barang",
  "harga": 150000,
  "stok": 3,
  "deskripsi": "Kamera untuk kebutuhan dokumentasi dan acara.",
  "imageUrl": "/images/kamera-mirrorless.jpg",
  "unggulan": true
}
```

### 4.3 Data awal

- Sediakan tepat delapan entri contoh saat inisialisasi pertama.
- Contoh mencakup kombinasi kategori Barang dan Jasa.
- Gunakan nama usaha, deskripsi, harga, dan kontak yang bersifat fiktif/nonpribadi.
- Gambar menggunakan aset lokal yang disediakan project atau placeholder lokal. Jangan mengandalkan URL gambar eksternal untuk data contoh.
- Nilai `harga` disimpan sebagai angka, bukan string berformat mata uang.
- Data contoh dapat diubah atau dihapus oleh pengelola pada demo.

### 4.4 Format tampilan Rupiah

- Format tampilan menggunakan locale Indonesia, misalnya `Rp150.000`.
- Nilai yang disimpan tetap numerik, misalnya `150000`.
- Harga nol harus ditampilkan secara konsisten dan tidak dianggap sebagai nilai kosong.

---

## 5. Kebutuhan nonfungsional

### 5.1 Usability dan aksesibilitas

- Label input terlihat dan menjelaskan tujuan kontrol.
- Tombol memiliki teks atau nama yang jelas.
- Navigasi katalog dan dashboard mudah ditemukan.
- Status stok, validasi, dan hasil pencarian tidak hanya dibedakan dengan warna.
- Form dapat digunakan dengan keyboard dasar.
- Pesan kesalahan ditampilkan dekat dengan input terkait.

### 5.2 Responsivitas

- Layout dapat digunakan pada layar ponsel, tablet, dan desktop.
- Pada layar sempit, navigasi, form, kartu katalog, dan dashboard tidak menyebabkan scroll horizontal yang tidak diperlukan.
- Kontrol pencarian, filter, dan sorting tetap dapat dijangkau pada perangkat mobile.

### 5.3 Kinerja

- Katalog delapan data contoh harus tampil tanpa proses pemuatan server.
- Pencarian, filter, dan sorting dilakukan di browser.
- Hindari dependensi atau aset berukuran besar yang tidak diperlukan untuk MVP.

### 5.4 Keandalan data

- Validasi dilakukan sebelum data disimpan.
- ID setiap entri harus unik.
- Operasi CRUD memperbarui katalog dan ringkasan secara konsisten.
- Kegagalan membaca/menulis `localStorage` ditangani dengan pesan yang sesuai.
- Reset data harus meminta konfirmasi.

### 5.5 Keamanan dan privasi

- Tidak ada API key, token rahasia, kata sandi, atau kredensial yang disimpan di source code maupun `localStorage`.
- Jangan meminta atau menyimpan data pribadi yang tidak dibutuhkan untuk demo.
- Data contoh harus nonpribadi/fiktif.
- Nomor WhatsApp bisnis yang ditampilkan merupakan informasi kontak publik dan hanya boleh digunakan dengan persetujuan pemiliknya.
- Jangan menampilkan dashboard demo seolah-olah terlindungi oleh autentikasi.
- Konten dari input pengguna harus ditampilkan dengan aman sebagai teks, bukan dieksekusi sebagai HTML.

### 5.6 Kompatibilitas

- Aplikasi ditargetkan berjalan pada browser modern yang mendukung JavaScript dan `localStorage`.
- Jika penyimpanan browser tidak tersedia, aplikasi harus memberi tahu pengguna bahwa perubahan mungkin tidak tersimpan.

---

## 6. Risiko dan mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Pengguna mengira pemesanan WhatsApp sudah terkonfirmasi | Ekspektasi transaksi keliru | Jelaskan bahwa tombol hanya membuka WhatsApp dan konfirmasi dilakukan dengan pengelola. |
| `localStorage` dihapus atau dibatasi browser | Perubahan katalog hilang | Beri keterangan penyimpanan lokal dan sediakan reset data demo. |
| Dashboard demo dianggap aman untuk penggunaan publik | Orang lain dapat mengubah katalog | Tegaskan bahwa tidak ada login/otorisasi; jangan gunakan data produksi. |
| Data tersimpan rusak atau tidak sesuai skema | Katalog gagal dimuat | Validasi data saat dibaca dan sediakan pemulihan ke data demo. |
| Gambar lokal tidak ditemukan | Tampilan gambar rusak | Gunakan placeholder lokal sebagai fallback. |
| Harga atau stok menerima input tidak valid | Informasi katalog keliru | Validasi tipe dan batas nilai sebelum penyimpanan. |
| AI menghasilkan kode yang tidak dipahami | Sulit merawat dan menguji aplikasi | Tinjau kode, minta penjelasan, dan uji perilaku secara manual sebelum menerima perubahan. |
| Nomor WhatsApp contoh tertinggal saat publikasi | Kontak tidak dapat dihubungi atau salah tujuan | Gunakan konfigurasi terpusat dan checklist sebelum rilis. |

---

## 7. Di luar ruang lingkup (Out of Scope)

Fitur berikut tidak termasuk MVP:
- Backend, REST API, dan database server.
- Registrasi, login, autentikasi, dan otorisasi.
- Multi-toko dengan akun dan dashboard terpisah.
- Sinkronisasi data lintas perangkat atau pengguna.
- Pembayaran online, invoice, dan pengembalian dana.
- Booking dengan kalender ketersediaan dan pencegahan bentrok jadwal.
- Perhitungan denda, deposit, ongkos kirim, atau biaya tambahan.
- Chat internal atau pengiriman WhatsApp otomatis.
- Verifikasi identitas, rating terverifikasi, dan moderasi.
- Upload gambar ke cloud atau pengelolaan file server.
- Notifikasi email, SMS, atau push notification.
- Analitik bisnis tingkat lanjut.
- Deployment dan operasional produksi dengan data pelanggan nyata.

---

## 8. Acceptance criteria (kriteria penerimaan)

Semua kriteria berikut dapat diperiksa secara manual pada browser.

| ID | Skenario | Kriteria lulus |
|---|---|---|
| AC-01 | Membuka aplikasi untuk pertama kali | Katalog menampilkan tepat delapan data contoh. |
| AC-02 | Memeriksa kartu katalog | Setiap kartu menampilkan nama, kategori, harga Rupiah, stok, dan foto atau placeholder lokal. |
| AC-03 | Membuka detail penawaran | Deskripsi penawaran dapat dibaca. |
| AC-04 | Mencari berdasarkan nama | Hanya entri yang nama atau deskripsinya cocok yang ditampilkan. |
| AC-05 | Mencari dengan kapitalisasi berbeda | Kata kunci yang sama dengan huruf besar/kecil berbeda tetap menghasilkan kecocokan. |
| AC-06 | Memilih filter Barang | Hanya entri kategori Barang yang tampil. |
| AC-07 | Memilih filter Jasa | Hanya entri kategori Jasa yang tampil. |
| AC-08 | Menggabungkan pencarian dan filter | Hasil memenuhi kedua kondisi secara bersamaan. |
| AC-09 | Mengubah sorting | Hasil tersusun sesuai opsi nama, harga, atau stok yang dipilih. |
| AC-10 | Pencarian tanpa hasil | Pesan “tidak ditemukan” atau pesan setara tampil dan pengguna dapat menghapus filter/pencarian. |
| AC-11 | Menekan tombol WhatsApp pada penawaran | Browser membuka tautan WhatsApp dengan nomor terkonfigurasi dan pesan awal yang menyebut nama penawaran. |
| AC-12 | Nomor WhatsApp belum dikonfigurasi | Aplikasi memberi informasi kontak belum tersedia dan tidak membuka tautan rusak. |
| AC-13 | Membuka dashboard demo | Daftar katalog dan ringkasan total produk serta total stok tampil. |
| AC-14 | Menambah entri valid | Entri baru muncul di dashboard dan katalog; total produk/stok diperbarui. |
| AC-15 | Menyimpan form tidak valid | Data tidak tersimpan dan pesan validasi tampil untuk field yang bermasalah. |
| AC-16 | Mengedit entri | Perubahan terlihat pada dashboard/katalog dan ringkasan diperbarui jika harga/stok atau jumlah entri terkait. |
| AC-17 | Menghapus entri dan menyetujui konfirmasi | Entri hilang dari katalog/dashboard dan ringkasan diperbarui. |
| AC-18 | Menghapus entri lalu membatalkan konfirmasi | Entri tetap ada. |
| AC-19 | Memuat ulang halaman setelah CRUD | Perubahan tetap tersimpan pada browser yang sama. |
| AC-20 | Menekan reset data demo dan menyetujui | Data kembali ke delapan entri awal. |
| AC-21 | Memeriksa stok nol | Stok ditampilkan sebagai habis dan aksi pesan tidak tersedia atau diberi keterangan yang jelas. |
| AC-22 | Membuka aplikasi pada layar mobile | Tidak ada layout utama yang terpotong atau memerlukan scroll horizontal yang tidak semestinya. |
| AC-23 | Memeriksa data contoh | Tidak ada data pribadi nyata atau kredensial rahasia. |

### Definisi selesai (Definition of Done)

MVP dinyatakan selesai jika:
- Seluruh acceptance criteria yang relevan telah diuji dan lulus.
- Tidak ada error kritis yang menghalangi katalog, pencarian, atau CRUD demo.
- Data tersimpan dan dapat dimuat ulang melalui `localStorage`.
- Tampilan dasar dapat digunakan pada desktop dan mobile.
- Batasan bahwa aplikasi belum memiliki backend, API, database server, dan autentikasi dijelaskan dengan benar.

---

## 9. Implementation plan per iterasi

### Iterasi 1 — Fondasi proyek dan data contoh

Target:
- Membuat project menggunakan Vite dan JavaScript vanilla.
- Menentukan struktur folder aset, tampilan, dan logika.
- Menyiapkan delapan data contoh nonpribadi.
- Menyiapkan placeholder/foto lokal.
- Menentukan format dan validasi model produk.

Hasil yang diharapkan:
- Aplikasi dapat dijalankan secara lokal.
- Data contoh tersedia dan memiliki struktur konsisten.

### Iterasi 2 — Landing page dan katalog

Target:
- Membuat navigasi, hero section, dan area katalog.
- Membuat kartu penawaran.
- Menampilkan nama, kategori, harga, stok, deskripsi, dan gambar/placeholder.
- Menambahkan penanda unggulan dan status stok.

Hasil yang diharapkan:
- Pengunjung dapat melihat katalog delapan penawaran.

### Iterasi 3 — Pencarian, filter, sorting, dan WhatsApp

Target:
- Menambahkan pencarian nama/deskripsi.
- Menambahkan filter kategori.
- Menambahkan sorting nama, harga, dan stok.
- Menambahkan empty state.
- Menambahkan tombol WhatsApp dengan pesan awal.

Hasil yang diharapkan:
- Pengunjung dapat menemukan penawaran dan menghubungi pengelola.

### Iterasi 4 — Dashboard demo dan CRUD

Target:
- Membuat halaman dashboard demo.
- Menampilkan daftar penawaran.
- Membuat form tambah dan edit.
- Membuat aksi hapus dengan konfirmasi.
- Menambahkan validasi dan umpan balik.

Hasil yang diharapkan:
- Pengelola dapat mendemonstrasikan pengelolaan katalog tanpa akun.

### Iterasi 5 — localStorage dan ringkasan

Target:
- Menginisialisasi data awal jika penyimpanan belum tersedia.
- Menyimpan perubahan CRUD ke `localStorage`.
- Memuat kembali data saat aplikasi dibuka.
- Menampilkan total produk dan total stok.
- Menambahkan reset data demo dan penanganan data rusak.

Hasil yang diharapkan:
- Perubahan data bertahan pada browser/perangkat yang sama.

### Iterasi 6 — Pengujian dan penyempurnaan

Target:
- Menjalankan seluruh skenario acceptance criteria.
- Menguji form kosong, harga negatif, stok pecahan/negatif, dan ID duplikat.
- Menguji kombinasi pencarian, filter, dan sorting.
- Menguji stok nol dan nomor WhatsApp yang belum dikonfigurasi.
- Menguji tampilan desktop dan mobile.
- Memperbaiki bug dan memastikan batasan MVP dinyatakan dengan jelas.

Hasil yang diharapkan:
- MVP Frontend demo siap dipresentasikan dan dapat dievaluasi secara manual.

---

## 10. Asumsi dan keputusan yang perlu dikonfirmasi

1. **Satuan harga:** apakah harga ditampilkan per hari, per jam, per sesi, atau per paket? MVP sebaiknya menambahkan label satuan harga pada tampilan meskipun field model saat ini hanya menyimpan angka.
2. **Stok jasa:** nilai stok untuk jasa berarti jumlah slot/unit layanan yang tersedia, bukan jumlah barang fisik.
3. **Kontak WhatsApp:** nomor pengelola akan diisi setelah ada nomor bisnis yang disetujui; gunakan nilai contoh nonpribadi selama pengembangan.
4. **Satu toko:** dashboard demo mengelola satu katalog toko pada satu browser, bukan banyak toko independen.
5. **Gambar:** aset gambar diletakkan di folder publik project dan dirujuk dengan path lokal.

Keputusan di atas perlu disepakati sebelum atau selama implementasi agar perilaku aplikasi konsisten.

---
 
**Akhir dokumen — SPEC.md**
