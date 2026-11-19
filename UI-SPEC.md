# UI-SPEC.md - PinjamYuk

> Spesifikasi UI/UX untuk MVP PinjamYuk.
> Dokumen ini melengkapi `SPEC.md` dan menjadi acuan visual sebelum implementasi.
> Ruang lingkup: frontend-only, Vite, JavaScript vanilla, data dummy, dan `localStorage`.
> Status: rancangan. Belum ada kode aplikasi pada tahap ini.

## Daftar isi

1. [Ringkasan](#1-ringkasan)
2. [Arah desain](#2-arah-desain)
3. [Fondasi visual](#3-fondasi-visual)
4. [Informasi dan navigasi](#4-informasi-dan-navigasi)
5. [Komponen bersama](#5-komponen-bersama)
6. [Landing page](#6-landing-page)
7. [Dashboard demo](#7-dashboard-demo)
8. [Perilaku dan state](#8-perilaku-dan-state)
9. [Aksesibilitas](#9-aksesibilitas)
10. [Konten dan copy](#10-konten-dan-copy)
11. [Data dummy acuan](#11-data-dummy-acuan)
12. [Wireframe](#12-wireframe)
13. [Perilaku responsif](#13-perilaku-responsif)
14. [Catatan implementasi](#14-catatan-implementasi)
15. [Pemetaan acceptance criteria](#15-pemetaan-acceptance-criteria)
16. [Rasional desain dan anti-slop](#16-rasional-desain-dan-anti-slop)
17. [Keputusan terbuka](#17-keputusan-terbuka)
18. [Di luar ruang lingkup](#18-di-luar-ruang-lingkup)

---

## 1. Ringkasan

PinjamYuk adalah katalog digital untuk UMKM yang menyewakan barang dan jasa. Tampilan harus membantu calon penyewa menemukan penawaran, memahami harga dan stok, lalu menghubungi pengelola melalui WhatsApp. Pengelola toko memakai dashboard demo untuk menambah, mengubah, dan menghapus penawaran.

Dokumen ini menetapkan:

- Bahasa visual, palet, tipografi, spasi, dan komponen.
- Struktur halaman landing dan dashboard demo.
- Perilaku pencarian, filter, sorting, WhatsApp, dan CRUD.
- State kosong, kesalahan, dan penyimpanan lokal.
- Aturan aksesibilitas dan responsivitas.
- Wireframe teks untuk landing dan dashboard pada desktop dan mobile.

### 1.1 Prinsip utama

1. **Katalog adalah fokus.** Foto, nama, kategori, harga, stok, dan aksi WhatsApp harus mudah dipindai.
2. **Ramah, bukan ramai.** Warna hangat dan tipografi tegas, tanpa dekorasi yang tidak membantu pemahaman.
3. **Jujur tentang batasan.** Tidak ada login, pembayaran, atau klaim bahwa pesanan sudah dikonfirmasi.
4. **Mobile-first.** Layout disusun untuk layar sempit lebih dulu, lalu diperluas.
5. **Aksesibel sejak awal.** Kontras, label, fokus keyboard, dan status tidak boleh ditambahkan sebagai tempelan.

### 1.2 Yang tidak dicakup

- Backend, API, database server, autentikasi, dan pembayaran.
- Upload gambar ke cloud.
- Chat internal, notifikasi, dan sinkronisasi antar perangkat atau antar tab.
- Mode gelap. Alasan ada di bagian [2.3](#23-keputusan-tingkat-tinggi).
- Testimoni, logo mitra, statistik pengguna, dan klaim yang tidak punya sumber nyata.

---

## 2. Arah desain

### 2.1 Design read

> Reading this as: katalog penyewaan UMKM untuk calon penyewa lokal dan pengelola toko, dengan warm editorial minimalism, dial ENERGY 2 / RHYTHM 2 / MOTION 1.

Artinya:

- **ENERGY 2:** tampil jelas dan bersahabat, tetapi tidak berteriak. Tidak ada animasi besar, gradien menyala, atau elemen dekoratif berlebihan.
- **RHYTHM 2:** komposisi bervariasi secukupnya. Hero terbelah dua, katalog berbentuk grid, tentang kami terbelah dua, footer berupa blok gelap.
- **MOTION 1:** gerak hanya untuk umpan balik hover, fokus, dialog, dan toast. Tidak ada scroll reveal, parallax, atau animasi berulang.

### 2.2 Karakter visual

Kesan yang dituju: **hangat, rapi, lokal, dan dapat dipercaya**.

- Terracotta memberi kehangatan dan energi.
- Olive memberi ketenangan dan kesan alami.
- Latar krem membuat foto produk lebih menonjol dibandingkan putih dingin.
- Ruang kosong dipakai untuk memisahkan bagian, bukan untuk mengisi layar.
- Satu aksen khas: **titik terracotta** pada wordmark dan tanda tanya pada headline hero.

### 2.3 Keputusan tingkat tinggi

| Keputusan | Alasan |
|---|---|
| Tema terang tetap, tanpa toggle | Palet hangat dan foto katalog adalah identitas utama. Mode gelap tidak diminta dan tidak termasuk ruang lingkup MVP. |
| Dua halaman HTML | Landing dan dashboard dipisahkan agar alur publik dan alur pengelolaan tidak bercampur. Vite mendukung multi-page tanpa router. |
| Kartu katalog bersudut 12 px, bukan pill | Radius sedang memberi kesan rapi dan modern tanpa membuat semua elemen terlihat seperti tombol. |
| Bayangan hanya untuk overlay | Katalog perlu terasa datar dan mudah dipindai. Bayangan dipakai untuk dialog, drawer, dan toast yang memang berada di atas konten. |
| Tanpa ilustrasi orang atau testimoni | Tidak ada aset dan data nyata. Lebih baik tidak menampilkan apa pun daripada mengarang bukti sosial. |

---

## 3. Fondasi visual

### 3.1 Palet warna

Lima warna brand tetap dipertahankan. Beberapa turunan ditambahkan hanya untuk memenuhi kontras teks kecil, border kontrol, dan status.

| Token | Hex | Peran | Catatan |
|---|---|---|---|
| `--bg` | `#FAF5ED` | Latar halaman | Krem hangat, warna dasar seluruh halaman. |
| `--surface` | `#E9DFCE` | Permukaan bagian | Toolbar, panel hero, blok tentang kami, header tabel. |
| `--surface-raised` | `#FFFCF7` | Kartu dan dialog | Turunan netral untuk memisahkan kartu dari latar. |
| `--ink` | `#394432` | Teks utama | Hijau gelap, hampir hitam. |
| `--muted` | `#5C6652` | Teks sekunder | Turunan untuk deskripsi, helper, dan metadata. |
| `--olive` | `#69764D` | Aksi utama | Tombol primer, aksen besar, label kategori. |
| `--olive-strong` | `#4E5A37` | Teks olive aman | Turunan untuk link, label kecil, dan hover tombol. |
| `--terracotta` | `#C47C59` | Aksen brand | Hanya untuk elemen dekoratif, border, atau teks besar. |
| `--terracotta-strong` | `#9E5537` | Teks dan badge terracotta | Turunan yang aman untuk teks normal dan latar badge. |
| `--danger` | `#8C3B27` | Kesalahan dan hapus | Turunan bata untuk teks dan tombol destruktif. |
| `--warning` | `#8A5A00` | Peringatan stok | Turunan amber gelap. |
| `--success` | `#4E5A37` | Status tersedia | Sama dengan olive kuat. |
| `--border-subtle` | `#D8CBB8` | Garis dekoratif | Pemisah dan border kartu. |
| `--border-strong` | `#8C7B62` | Border kontrol | Input, select, dan tombol sekunder. |
| `--focus` | `#394432` | Cincin fokus | Gelap, kontras tinggi di latar terang. |
| `--olive-tint` | `#E7EADF` | Latar status tersedia | Turunan olive muda. |
| `--terracotta-tint` | `#F3E2D8` | Latar aksen lembut | Turunan terracotta muda. |
| `--danger-tint` | `#F4E3DD` | Latar status habis atau error | Turunan bata muda. |
| `--warning-tint` | `#F3E8D3` | Latar status hampir habis | Turunan amber muda. |
| `--surface-hover` | `#F4ECDF` | Hover baris dan kartu | Netral hangat. |

Aturan pemakaian:

- `--terracotta` tidak dipakai untuk teks normal di atas `--bg` atau `--surface` karena kontrasnya di bawah 4.5:1.
- Untuk teks atau badge terracotta, gunakan `--terracotta-strong`.
- Untuk tombol utama, gunakan `--olive` dengan teks putih.
- Jangan menambahkan warna aksen ketiga. Status memakai turunan dari olive, terracotta, dan bata yang sudah ada.
- Jangan memakai warna saja untuk menyampaikan status. Selalu sertakan teks dan ikon.

### 3.2 Matriks kontras WCAG AA

Rasio dihitung dari nilai hex dengan rumus kontras WCAG 2.1. Nilai harus diverifikasi ulang saat implementasi dengan contrast checker, termasuk pada state hover dan fokus.

| Teks atau elemen | Latar | Rasio | Status | Penggunaan |
|---|---|---:|---|---|
| `--ink` | `--bg` | 9.45:1 | AAA | Teks utama dan headline. |
| `--ink` | `--surface` | 7.77:1 | AAA | Teks di panel dan toolbar. |
| `--ink` | `--surface-raised` | 10.02:1 | AAA | Teks kartu, tabel, dan dialog. |
| `--muted` | `--bg` | 5.56:1 | AA | Deskripsi dan helper. |
| `--muted` | `--surface` | 4.58:1 | AA | Metadata di panel. |
| `--muted` | `--surface-raised` | 5.90:1 | AA | Deskripsi kartu. |
| `--olive` | `--bg` | 4.50:1 | AA | Teks besar atau headline aksen. |
| `--olive-strong` | `--bg` | 6.81:1 | AAA | Link dan label kecil. |
| `--olive-strong` | `--surface-raised` | 7.22:1 | AAA | Label kategori. |
| Putih | `--olive` | 4.88:1 | AA | Teks tombol primer. |
| Putih | `--olive-strong` | 7.39:1 | AAA | Teks tombol hover dan segmen aktif. |
| Putih | `--terracotta-strong` | 5.51:1 | AA | Badge Unggulan dan tombol reset. |
| Putih | `--danger` | 7.58:1 | AAA | Tombol hapus. |
| `--danger` | `--danger-tint` | 6.09:1 | AA | Status stok habis dan error. |
| `--warning` | `--warning-tint` | 4.88:1 | AA | Status hampir habis. |
| `--success` | `--olive-tint` | 6.06:1 | AA | Status tersedia. |
| `--border-strong` | `--bg` | 3.78:1 | AA non-teks | Border input dan tombol. |
| `--border-strong` | `--surface` | 3.10:1 | AA non-teks | Border kontrol di panel. |
| `--terracotta` | `--bg` | 3.04:1 | Hanya teks besar | Dekorasi dan teks minimal 24 px. |
| Putih | `--terracotta` | 3.29:1 | Hanya teks besar | Hindari untuk teks normal. |
| `--ink` | `--terracotta` | 3.11:1 | Hanya teks besar | Hindari untuk teks normal. |
| `--bg` | `--ink` | 9.45:1 | AAA | Teks footer di atas latar gelap. |
| `--surface` | `--ink` | 7.77:1 | AAA | Teks sekunder footer. |
| `--border-subtle` | `--bg` | 1.5:1 | Dekoratif | Hanya garis pemisah, bukan satu-satunya penanda kontrol. |

Catatan:

- Rasio `--terracotta` di atas latar terang berada di batas teks besar. Jangan memakainya untuk body text, label 12 px, atau placeholder.
- Titik logo `--terracotta` hanya dipakai di atas `--bg` (3.04:1) atau `--ink` (3.11:1). Jangan memakainya di atas `--surface` karena kontrasnya 2.50:1.
- Cincin fokus `--focus` memiliki kontras 9.45:1 terhadap `--bg` dan 7.77:1 terhadap `--surface`. Gunakan offset agar cincin berada di luar tombol.
- Di footer gelap, gunakan cincin fokus `--bg`, bukan `--focus`.
- Placeholder input memakai `--muted`, bukan abu-abu muda.

### 3.3 Tipografi

Font utama: **Plus Jakarta Sans**, sans-serif. Alasan: typeface ini dirancang untuk konteks Indonesia, memiliki bentuk geometris yang ramah, dan tetap lega dibaca pada ukuran kecil. Karakternya cocok untuk brand lokal yang ingin terlihat modern tanpa dingin.

Font stack:

```text
"Plus Jakarta Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif
```

Aturan teknis:

- Self-host file WOFF2 variabel di `public/fonts/`, bukan memuat dari pihak ketiga.
- Gunakan `font-display: swap`.
- Sediakan fallback sistem di atas agar teks tetap terbaca sebelum font selesai dimuat.
- Berat yang dipakai: 400, 500, 600, 700, 800.
- Ukuran body minimum 16 px. Teks 12 px hanya untuk badge, caption, dan helper dengan berat 600.
- Jangan memakai huruf kapital semua dengan letter-spacing lebar. Gunakan sentence case.
- Angka harga dan ringkasan memakai `font-variant-numeric: tabular-nums`.

Skala tipografi:

| Token | Ukuran | Berat | Line height | Penggunaan |
|---|---|---|---|---|
| Display | `clamp(2.5rem, 6vw, 4.5rem)` | 800 | 1.05 | Headline hero. |
| H1 halaman | `clamp(2rem, 4vw, 3rem)` | 800 | 1.1 | Judul dashboard. |
| H2 bagian | `clamp(1.75rem, 3vw, 2.5rem)` | 700 | 1.15 | Katalog, Tentang Kami. |
| H3 kartu | `1.25rem` | 700 | 1.3 | Nama penawaran dan judul dialog. |
| Body besar | `1.125rem` | 400 | 1.6 | Deskripsi hero. |
| Body | `1rem` | 400 | 1.6 | Teks umum. |
| Body tebal | `1rem` | 600 | 1.5 | Label dan penekanan. |
| Small | `0.875rem` | 400 atau 500 | 1.5 | Helper, metadata, deskripsi kartu. |
| Caption | `0.75rem` | 600 | 1.4 | Badge, header tabel, status. |
| Harga | `1.25rem` | 700 | 1.2 | Harga di kartu dan tabel. |
| Angka ringkasan | `2rem` | 700 | 1.1 | Nilai di kartu ringkasan. |
| Tombol | `0.9375rem` | 600 | 1 | Semua tombol. |

Aturan layout teks:

- Panjang baris body maksimum 65 karakter.
- Headline hero maksimum 12 kata per baris.
- Gunakan `text-wrap: balance` untuk headline dan `text-wrap: pretty` untuk paragraf bila didukung.
- Nama penawaran di kartu dipotong maksimum 2 baris secara visual. Nama lengkap tetap ada di DOM dan di dialog detail.
- Deskripsi di kartu dipotong maksimum 2 baris. Deskripsi lengkap tampil di dialog detail.

### 3.4 Spasi, grid, dan container

Skala spasi:

`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96` px.

| Kebutuhan | Mobile | Tablet | Desktop |
|---|---|---|---|
| Padding container | 20 px | 32 px | 48 px |
| Jarak antar bagian | 64 px | 80 px | 96 px |
| Jarak antar kartu | 16 px | 20 px | 24 px |
| Padding kartu | 16 px | 16 px | 20 px |
| Jarak field form | 20 px | 20 px | 24 px |

- Lebar maksimum konten: 1200 px.
- Hero boleh memakai lebar 1240 px agar komposisi visual lebih lega, tetapi teks tetap dibatasi 560 px.
- Gunakan grid 12 kolom di desktop. Hero memakai 6/6, tentang kami memakai 5/7.
- Jangan memusatkan semua judul bagian. Katalog memakai judul rata kiri, tentang kami memakai komposisi terbelah.

### 3.5 Radius, border, dan bayangan

| Token | Nilai | Penggunaan |
|---|---|---|
| Radius kecil | 2 px | Titik logo. |
| Radius badge | 4 px | Badge Unggulan, status. |
| Radius kontrol | 8 px | Tombol, input, select, thumbnail. |
| Radius kartu | 12 px | Kartu katalog, toolbar, tabel. |
| Radius panel | 16 px | Dialog, drawer, panel hero. |
| Radius besar | 24 px | Blok surface besar. |

- Border dekoratif: 1 px `--border-subtle`.
- Border kontrol: 1 px `--border-strong`.
- Jangan memakai radius 999 px untuk tombol, input, atau kartu. Hanya titik status yang bulat.
- Bayangan hanya untuk elemen yang mengambang: dialog, drawer, dan toast.
- Token bayangan: `0 24px 64px rgba(57, 68, 50, 0.18)`.
- Kartu katalog tidak memakai bayangan. Gunakan border dan perbedaan permukaan.

### 3.6 Gerak

| Interaksi | Durasi | Easing | Gerak |
|---|---:|---|---|
| Hover tombol dan link | 150 ms | ease-out | Perubahan warna dan border. |
| Fokus | 0 ms | Tidak ada | Cincin langsung terlihat. |
| Dialog masuk | 200 ms | ease-out | Opacity 0 ke 1 dan geser 4 px. |
| Drawer masuk | 200 ms | ease-out | Geser dari kanan 16 px dan opacity. |
| Toast masuk | 200 ms | ease-out | Geser 8 px dan opacity. |
| Menu mobile | 150 ms | ease-out | Opacity dan geser 4 px. |

- Tidak ada animasi scroll, parallax, marquee, atau animasi berulang.
- Semua transisi dimatikan saat `prefers-reduced-motion: reduce`.
- Jangan memakai animasi untuk menutupi keterlambatan data. Data lokal dimuat sinkron.

### 3.7 Ikon

- Gunakan inline SVG kustom, bukan pustaka ikon.
- Stroke 1.75 px, ukuran 20 px atau 24 px, warna mengikuti `currentColor`.
- Ikon yang dipakai: cari, tutup, menu, chevron bawah, WhatsApp, plus, pensil, tempat sampah, info, centang, segitiga peringatan, silang, kotak, kunci pas, lapisan, label, panah atas.
- Semua ikon dekoratif diberi `aria-hidden="true"`.
- Tombol ikon tanpa teks wajib punya `aria-label`.
- Jangan memakai ikon bintang, kilat, percikan, atau robot untuk menandai unggulan atau fitur.

### 3.8 Gambar dan placeholder

- Rasio foto produk: 4:3.
- `object-fit: cover`, sudut atas mengikuti radius kartu.
- Semua gambar punya `width` dan `height` atau `aspect-ratio` agar tidak menggeser layout.
- Hanya menerima path lokal di `/images/`. URL eksternal ditolak.
- Jika gambar gagal dimuat, ganti dengan placeholder lokal sesuai kategori.
- Placeholder Barang: latar `--surface`, ikon kotak garis, teks kecil "Foto belum tersedia".
- Placeholder Jasa: latar `--surface`, ikon kunci pas garis, teks kecil "Foto belum tersedia".
- Placeholder harus terlihat seperti placeholder, bukan foto final.
- Di kartu, gambar bersifat dekoratif karena nama produk ada di teks, jadi `alt=""`.
- Di dialog detail, gambar memakai `alt="Foto [nama penawaran]"`.
- Hero memakai dua kartu pratinjau statis dari data dummy, tanpa tombol dan tanpa kontrol interaktif. Tujuannya menunjukkan wujud katalog, bukan membuat screenshot palsu.

---

## 4. Informasi dan navigasi

### 4.1 Peta halaman

```text
/ (index.html)
  #beranda      Hero dan awal halaman
  #katalog      Pencarian, filter, sorting, dan grid katalog
  #tentang      Penjelasan PinjamYuk dan batas demo

/dashboard.html
  Dashboard demo, ringkasan, tabel, dan CRUD
```

### 4.2 Navigasi utama

| Label | Tujuan di landing | Tujuan di dashboard |
|---|---|---|
| Beranda | `#beranda` | `/index.html` |
| Katalog | `#katalog` | `/index.html#katalog` |
| Tentang Kami | `#tentang` | `/index.html#tentang` |
| Dashboard Demo | `/dashboard.html` | `/dashboard.html` dengan `aria-current="page"` |

Aturan:

- Semua item navigasi harus menuju halaman atau bagian yang benar-benar ada.
- Jangan menambahkan tautan ke halaman yang belum dibuat.
- Di landing, item Beranda, Katalog, dan Tentang Kami tidak memakai `aria-current` karena halaman yang sama berisi beberapa bagian.
- Di dashboard, Dashboard Demo memakai `aria-current="page"` dan tampil sebagai tombol olive terisi.
- `scroll-padding-top` diatur 88 px agar anchor tidak tertutup navbar sticky.
- Link "Kembali ke atas" di footer menuju `#beranda` dan hanya muncul di landing.

### 4.3 Perilaku navbar

**Desktop, 1024 px ke atas**

- Tinggi 72 px.
- Latar solid `--bg`, border bawah 1 px `--border-subtle`.
- Logo di kiri, link di kanan, tombol Dashboard Demo paling kanan.
- Link memiliki area klik 44 px dan garis bawah olive saat hover atau fokus.
- Navbar sticky di atas.

**Mobile dan tablet, di bawah 1024 px**

- Tinggi 64 px.
- Logo di kiri, tombol menu 44 x 44 px di kanan.
- Tombol menu memakai `aria-expanded` dan `aria-controls`.
- Menu terbuka sebagai panel di bawah header, latar solid, border bawah.
- Saat dibuka, fokus pindah ke link pertama. Escape menutup menu dan mengembalikan fokus ke tombol menu.
- Klik di luar panel menutup menu.
- Setiap link menu memiliki tinggi minimum 48 px.
- Tombol Dashboard Demo tampil penuh selebar panel.
- Tidak ada backdrop blur.

### 4.4 Logo

- Wordmark teks "PinjamYuk" dengan berat 800.
- Titik terracotta 10 px, radius 2 px, di kiri wordmark.
- Di landing, wordmark memakai `--ink`. Di footer gelap, wordmark memakai `--bg`.
- Titik terracotta tetap `--terracotta` karena berfungsi sebagai elemen non-teks.
- Logo adalah placeholder wordmark sampai ada aset logo final. Jangan membuat aset logo baru tanpa persetujuan.

---

## 5. Komponen bersama

### 5.1 Tombol

| Varian | Latar | Teks | Border | Penggunaan |
|---|---|---|---|---|
| Primer | `--olive` | Putih | Tidak ada | Aksi utama halaman, simpan, WhatsApp. |
| Sekunder | `--surface-raised` | `--ink` | 1 px `--border-strong` | Batal, filter reset, aksi pendukung. |
| Tersier | Transparan | `--olive-strong` | Tidak ada | Lihat detail, kembali, tautan aksi. |
| Danger | `--danger` | Putih | Tidak ada | Hapus penawaran. |
| Ghost ikon | Transparan | `--ink` | Tidak ada | Tutup dialog, buka menu. |

Spesifikasi:

- Tinggi minimum 44 px. CTA halaman 48 px.
- Padding horizontal 16 px sampai 20 px.
- Radius 8 px.
- Font 15 px, berat 600.
- Ikon 18 px, jarak 8 px dari teks.
- Hover primer: `--olive-strong`.
- Hover sekunder: `--surface`.
- Hover danger: `#7A3E2A`.
- Active: turunkan kecerahan satu langkah, tanpa animasi berlebihan.
- Disabled: latar `--surface`, teks `--muted`, kursor `not-allowed`.
- Fokus: outline 3 px `--focus`, offset 2 px.
- Tombol dengan ikon saja wajib punya `aria-label`.
- Jangan memakai panah dekoratif pada semua tombol.

### 5.2 Link

- Link dalam paragraf memakai `--olive-strong`, garis bawah saat hover dan fokus.
- Link navigasi memakai `--ink`, garis bawah olive saat hover dan fokus.
- Link footer memakai `--bg`, garis bawah terracotta saat hover dan fokus.
- Jangan memakai "klik di sini". Tulis tujuan link secara spesifik.

### 5.3 Kontrol form

**Input teks dan angka**

- Tinggi 48 px, radius 8 px, latar `--surface-raised`, border 1 px `--border-strong`.
- Label terlihat di atas input, 14 px, berat 600.
- Placeholder memakai `--muted`, bukan abu-abu muda.
- Fokus: border `--olive-strong`, outline 3 px `--focus`, offset 2 px.
- Error: border `--danger`, teks error 13 px `--danger` dengan ikon peringatan.
- Helper text 12 px `--muted`, terhubung dengan `aria-describedby`.
- Input angka memakai `inputmode` yang sesuai. Harga memakai `inputmode="decimal"`, stok memakai `inputmode="numeric"`.
- Jangan mengandalkan spinner bawaan browser sebagai satu-satunya kontrol.

**Search**

- Input search 48 px dengan ikon cari di kiri.
- Tombol hapus kata kunci 44 x 44 px di kanan, muncul saat input tidak kosong.
- Tombol hapus punya `aria-label="Hapus kata kunci"`.
- Placeholder: "Cari nama atau deskripsi penawaran".
- Label terlihat: "Cari".

**Select**

- Tinggi 48 px, radius 8 px, border 1 px `--border-strong`.
- Chevron custom di kanan, bukan panah dekoratif.
- Gunakan elemen `<select>` asli.
- Label terlihat: "Urutkan".

**Textarea**

- Tinggi minimum 120 px, dapat di-resize vertikal.
- Radius 8 px, border dan fokus sama dengan input teks.
- Label terlihat: "Deskripsi".

**Checkbox**

- Ukuran kotak 20 px, label 16 px.
- Area klik label minimum 44 px.
- Fokus terlihat pada kotak.
- Gunakan checkbox asli, bukan switch custom.

**Radio segmented**

- Dipakai untuk filter kategori (Semua, Barang, Jasa) dan field form kategori (Barang, Jasa).
- Wadah radius 8 px, border 1 px `--border-strong`, latar `--surface-raised`.
- Setiap segmen tinggi 44 px, lebar sama.
- Segmen terpilih: latar `--olive-strong`, teks putih.
- Segmen tidak terpilih: transparan, teks `--ink`.
- Gunakan `<fieldset>` dan `<legend>` untuk label grup.
- Gunakan `<input type="radio">` asli agar panah keyboard bekerja.
- Jangan memakai pill individual.

### 5.4 Badge dan status

| Badge | Latar | Teks | Penggunaan |
|---|---|---|---|
| Unggulan | `--terracotta-strong` | Putih | Hanya jika `unggulan` bernilai true. |
| Tersedia | `--olive-tint` | `--success` | Stok 3 atau lebih. |
| Hampir habis | `--warning-tint` | `--warning` | Stok 1 sampai 2. |
| Stok habis | `--danger-tint` | `--danger` | Stok 0. |
| Kontak belum tersedia | `--warning-tint` | `--warning` | Nomor WhatsApp belum diisi. |

Aturan:

- Radius 4 px, padding 4 px 8 px, font 12 px berat 600.
- Badge selalu berisi teks. Jangan mengandalkan warna saja.
- Ikon status 14 px, ditempatkan sebelum teks.
- Badge Unggulan tidak memakai ikon bintang.
- Jangan menumpuk badge dengan border tipis, glow, titik kecil, dan huruf kapital sekaligus.

### 5.5 Kartu dasar

- Latar `--surface-raised`, border 1 px `--border-subtle`, radius 12 px.
- Padding 16 px sampai 20 px.
- Tanpa bayangan.
- Hover: border berubah menjadi `--border-strong`.
- Fokus di dalam kartu tidak boleh terpotong. Beri ruang untuk outline.
- Kartu katalog dan kartu ringkasan memakai bentuk dasar ini dengan komposisi berbeda.

### 5.6 Dialog

- Gunakan elemen `<dialog>` asli dengan `showModal()`.
- Backdrop: `rgba(57, 68, 50, 0.48)`.
- Latar dialog `--surface-raised`, radius 16 px, border 1 px `--border-subtle`.
- Bayangan dialog sesuai token.
- Lebar maksimum 440 px untuk konfirmasi, 720 px untuk detail penawaran.
- Judul 20 px berat 700, terhubung dengan `aria-labelledby`.
- Deskripsi terhubung dengan `aria-describedby`.
- Fokus masuk ke elemen yang aman. Untuk konfirmasi hapus, fokus ke "Batal".
- Escape menutup dialog.
- Fokus dikembalikan ke tombol pemicu setelah dialog ditutup.
- Klik backdrop boleh menutup dialog non-destruktif, tetapi tidak untuk konfirmasi hapus.
- Kunci scroll halaman saat dialog terbuka.
- Di mobile, dialog konfirmasi tampil sebagai panel bawah dengan lebar penuh dan radius atas 16 px.

### 5.7 Toast

- Posisi desktop: kanan atas, di bawah navbar.
- Posisi mobile: tengah atas, di bawah navbar.
- Latar `--surface-raised`, border 1 px `--border-subtle`, radius 10 px.
- Ikon status di kiri, teks 14 px, tombol tutup 44 x 44 px.
- Sukses memakai `role="status"` dan `aria-live="polite"`.
- Error memakai `role="alert"`.
- Durasi 5 detik. Berhenti saat hover atau fokus.
- Tombol tutup selalu tersedia.
- Gerak masuk 200 ms, dimatikan saat reduced motion.

### 5.8 Toolbar pencarian, filter, dan sorting

Toolbar dipakai di landing dan dashboard.

**Desktop**

- Wadah `--surface`, border 1 px `--border-subtle`, radius 12 px, padding 16 px.
- Grid: pencarian fleksibel, kategori selebar 280 px, sorting selebar 220 px.
- Ketiga kontrol punya label terlihat di atasnya.
- Jarak antar kontrol 12 px.

**Mobile**

- Semua kontrol bertumpuk vertikal.
- Pencarian penuh.
- Kategori memakai segmented control tiga segmen yang muat di 320 px.
- Sorting penuh.
- Tidak ada scroll horizontal.

**Baris hasil**

- Kiri: "Menampilkan 8 penawaran".
- Kanan: tombol teks "Reset filter", hanya muncul saat ada pencarian, filter, atau sorting yang bukan default.
- Di mobile, tombol reset muncul di bawah teks hasil.
- Baris hasil memakai `aria-live="polite"` dengan penundaan 500 ms agar tidak terlalu sering dibacakan.

### 5.9 Empty state

Pola umum:

- Ikon garis 32 px, bukan ilustrasi generik.
- Judul 18 px berat 700.
- Deskripsi 14 px `--muted`.
- Satu aksi utama yang relevan.
- Wadah berada di area konten, bukan toast.

Contoh:

- Katalog tanpa hasil: "Tidak ada penawaran yang cocok" dan tombol "Hapus pencarian dan filter".
- Katalog kosong: "Belum ada penawaran di katalog" dan tautan "Buka Dashboard Demo".
- Dashboard kosong: "Belum ada penawaran" dan tombol "Tambah Penawaran".
- Dashboard tanpa hasil filter: "Tidak ada penawaran yang cocok" dan tombol "Reset filter".

### 5.10 Loading state

- Data katalog berasal dari `localStorage` dan dibaca sinkron, jadi tidak ada loading jaringan.
- Jika inisialisasi memerlukan waktu, tampilkan teks "Memuat katalog..." di area grid, bukan skeleton berkedip.
- Jangan menampilkan spinner palsu.
- Gambar memakai ruang 4:3 dan latar `--surface` sampai selesai dimuat.
- Tombol simpan tidak menampilkan spinner. localStorage sinkron. Cukup cegah klik ganda dengan menonaktifkan tombol selama proses simpan.

### 5.11 Pagination

- Tidak ada pagination pada MVP.
- Delapan data contoh ditampilkan sekaligus.
- Jika data bertambah banyak, halaman memanjang dan tabel tetap tanpa scroll horizontal.
- Jangan menambahkan kontrol halaman yang tidak berfungsi.

---

## 6. Landing page

### 6.1 Urutan bagian

1. Navbar.
2. Hero, `#beranda`.
3. Katalog, `#katalog`.
4. Tentang Kami, `#tentang`.
5. Footer.

Tidak ada bagian testimoni, logo mitra, statistik pengguna, FAQ, atau banner promo. Bagian yang ada hanya yang dibutuhkan katalog dan penjelasan demo.

### 6.2 Hero

**Desktop, 1024 px ke atas**

- Grid 6/6 dalam container.
- Kiri: teks, maksimum 560 px.
- Kanan: panel `--surface` dengan dua kartu pratinjau statis.
- Padding atas 80 px, padding bawah 96 px.

**Mobile, di bawah 1024 px**

- Teks di atas, kartu pratinjau di bawah.
- CTA penuh selebar container.
- Padding atas 48 px, padding bawah 64 px.

**Konten**

- H1: "Butuh? Pinjam Yuk!"
  - "Butuh?" memakai `--ink`.
  - Tanda tanya memakai `--terracotta-strong`.
  - "Pinjam Yuk!" memakai `--olive` dan merupakan teks besar sehingga kontras 4.50:1 memenuhi AA.
- Deskripsi: "Temukan barang dan jasa sewa dari UMKM sekitar. Cek harga dan stok, lalu hubungi pengelola lewat WhatsApp."
- CTA primer: "Lihat Katalog", menuju `#katalog`.
- CTA sekunder: "Kenali PinjamYuk", menuju `#tentang`.
- Catatan cakupan: "Tanpa akun. Data demo tersimpan di browser ini." dengan ikon info.
- Tidak ada baris statistik, logo mitra, atau testimoni.

**Panel pratinjau**

- Dua kartu katalog statis dari data dummy.
- Hanya menampilkan gambar, kategori, nama, harga, dan stok.
- Tidak ada tombol WhatsApp di pratinjau agar tidak menjadi kontrol mati.
- Kartu diberi `aria-hidden="true"` karena hanya dekorasi visual dan isinya sudah dijelaskan oleh teks hero.
- Jangan menampilkan browser chrome palsu, jendela terminal, atau skeleton.

**Focal point**

- H1 adalah elemen paling penting di layar.
- CTA primer adalah satu-satunya tombol terisi di hero.
- Panel pratinjau tidak boleh lebih menonjol daripada H1.

### 6.3 Katalog: header dan toolbar

- Judul H2: "Katalog Penawaran".
- Subjudul: "Penawaran contoh dari UMKM lokal."
- Toolbar sesuai bagian [5.8](#58-toolbar-pencarian-filter-dan-sorting).
- Baris hasil dan tombol reset.
- Grid katalog di bawahnya.

### 6.4 Grid katalog

| Lebar layar | Kolom | Gap |
|---|---:|---:|
| Di bawah 640 px | 1 | 16 px |
| 640 px sampai 1023 px | 2 | 20 px |
| 1024 px sampai 1279 px | 3 | 24 px |
| 1280 px ke atas | 4 | 24 px |

- Gunakan CSS Grid dengan `minmax(0, 1fr)` agar teks panjang tidak menyebabkan overflow.
- Semua kartu dalam satu baris memiliki tinggi yang sama.
- Area CTA di kartu didorong ke bawah dengan `margin-top: auto`.
- Jangan memakai layout masonry atau bento.

### 6.5 Anatomi kartu penawaran

Urutan dari atas ke bawah:

1. Gambar 4:3.
2. Badge Unggulan di sudut kiri atas gambar, hanya jika aktif.
3. Body kartu:
   - Label kategori: "Barang" atau "Jasa".
   - Nama penawaran, maksimum 2 baris.
   - Deskripsi singkat, maksimum 2 baris.
   - Harga Rupiah.
   - Status stok.
   - Tombol "Pesan via WhatsApp".
   - Tombol teks "Lihat detail".

Aturan:

- Kategori memakai `--olive-strong`, 12 px, berat 600, sentence case.
- Nama 18 px, berat 700, `--ink`.
- Deskripsi 14 px, `--muted`.
- Harga 20 px, berat 700, tabular.
- Status stok memakai ikon dan teks:
  - Stok 3 atau lebih: "Stok 3", ikon centang, `--success`.
  - Stok 1 sampai 2: "Sisa 1", ikon peringatan, `--warning`.
  - Stok 0: "Stok habis", ikon silang, `--danger`.
- Tombol WhatsApp selebar kartu, tinggi 44 px, olive.
- Tombol detail adalah tombol teks dengan tinggi area klik 44 px.
- Jika stok 0, tombol WhatsApp tidak dirender. Baris status "Stok habis" sudah menjadi pengganti aksi. Jangan mengulang teks yang sama di area CTA. Tombol "Lihat detail" tetap ada.
- Jika nomor WhatsApp belum dikonfigurasi, tombol diganti dengan teks "Kontak WhatsApp belum tersedia" dan ikon info.
- Jangan membuat tombol nonaktif yang terlihat seperti tombol aktif. Untuk stok habis, lebih baik mengganti aksi dengan status.
- Hover kartu hanya mengubah border. Tidak ada scale atau lift.
- Fokus pada tombol di dalam kartu harus terlihat penuh, tidak terpotong.

### 6.6 Dialog detail penawaran

Dibuka dari tombol "Lihat detail".

**Desktop**

- Dialog 720 px, dua kolom.
- Kiri: gambar 4:3.
- Kanan: kategori, nama, harga, status stok, deskripsi lengkap, badge Unggulan, CTA WhatsApp.
- Tombol tutup 44 x 44 px di kanan atas.

**Mobile**

- Panel penuh layar atau sheet hampir penuh.
- Gambar di atas, konten di bawah.
- CTA WhatsApp sticky di bawah dengan jarak aman `env(safe-area-inset-bottom)`.

**Konten tambahan**

- Catatan: "Tombol WhatsApp membuka percakapan. Ketersediaan dan harga dikonfirmasi oleh pengelola."
- Jika stok 0: tampilkan status "Stok habis" dan tombol "Lihat penawaran lain" yang menutup dialog dan kembali ke katalog.
- Jika nomor belum tersedia: tampilkan "Kontak WhatsApp belum tersedia" tanpa tautan.

**Fokus**

- Saat dibuka, fokus ke judul dialog yang diberi `tabindex="-1"` agar konteks dibacakan.
- Escape menutup.
- Fokus kembali ke tombol "Lihat detail" pada kartu asal.

### 6.7 Tentang Kami

- Latar `--surface`, padding vertikal 64 px mobile dan 96 px desktop.
- Grid 5/7 di desktop, bertumpuk di mobile.
- Kiri: H2 "Tentang PinjamYuk" dan satu paragraf.
- Kanan: daftar definisi dengan tiga istilah:
  - **Untuk penyewa:** cari penawaran, cek stok, lalu hubungi pengelola lewat WhatsApp.
  - **Untuk pengelola:** tambah, ubah, dan hapus penawaran lewat dashboard demo.
  - **Batas demo:** tidak ada login. Data tersimpan di browser ini dan dapat diubah siapa pun yang memakai browser tersebut.
- Gunakan `<dl>`, `<dt>`, dan `<dd>` untuk daftar definisi tersebut.
- Tautan "Buka Dashboard Demo" menuju `/dashboard.html`.
- Tidak ada kartu fitur identik, ikon bulat bernomor, atau langkah "1, 2, 3" bergaya template.

### 6.8 Footer

- Latar `--ink`, teks `--bg`.
- Padding vertikal 48 px mobile, 64 px desktop.
- Desktop: tiga kelompok.
  1. Brand: wordmark, deskripsi singkat, catatan penyimpanan lokal.
  2. Navigasi: Beranda, Katalog, Tentang Kami, Dashboard Demo.
  3. Demo dan kontak: penjelasan singkat demo, tautan WhatsApp jika tersedia, tautan "Kembali ke atas".
- Mobile: semua kelompok bertumpuk.
- Judul kelompok 12 px berat 600, sentence case. Jangan memakai huruf kapital dengan letter-spacing lebar.
- Link 14 px, tinggi area klik 44 px.
- Teks sekunder memakai `--surface` atau `--border-subtle`.
- Jangan memakai `--terracotta` untuk teks kecil di footer karena kontrasnya 3.11:1.
- Baris bawah: "© 2026 PinjamYuk. Proyek demo frontend tanpa backend."
- Jangan menampilkan tautan Privasi, Syarat, atau Kebijakan yang tidak ada halamannya.
- Kontak WhatsApp hanya ditampilkan jika nomor sudah dikonfigurasi. Jika belum, tulis "Kontak WhatsApp belum tersedia".

### 6.9 State landing

| State | Tampilan |
|---|---|
| Normal | Delapan kartu katalog tampil. |
| Pencarian atau filter tanpa hasil | Empty state di area grid, tombol reset. |
| Katalog kosong karena semua data dihapus | Empty state "Belum ada penawaran", tautan ke dashboard demo. |
| Data tersimpan rusak | Banner error di atas katalog, tombol "Pulihkan Data Demo". Jangan crash. |
| Gambar gagal dimuat | Placeholder kategori. |
| Nomor WhatsApp belum diatur | Teks "Kontak WhatsApp belum tersedia" di kartu dan footer. |
| Stok 0 | Kartu tetap tampil, status "Stok habis", tanpa tombol WhatsApp. |
| Penyimpanan tidak tersedia | Catatan kecil di footer bahwa perubahan mungkin tidak tersimpan. Dashboard menampilkan banner yang lebih jelas. |

---

## 7. Dashboard demo

### 7.1 Urutan bagian

1. Navbar.
2. Header dashboard.
3. Pemberitahuan mode demo.
4. Ringkasan.
5. Toolbar.
6. Tabel desktop atau daftar kartu mobile.
7. Footer ringkas.

Form tambah dan edit tampil sebagai drawer di desktop dan layar penuh di mobile. Dialog konfirmasi dipakai untuk hapus dan reset.

### 7.2 Header dashboard

- H1: "Dashboard Demo".
- Subjudul: "Kelola katalog demo di browser ini."
- Tautan teks "Lihat katalog publik" menuju `/index.html#katalog`.
- Aksi desktop di kanan:
  - Primer: "Tambah Penawaran" dengan ikon plus.
  - Sekunder: "Reset Data Demo" dengan teks `--danger` dan border `--border-strong`.
- Aksi mobile bertumpuk penuh:
  - "Tambah Penawaran" di atas.
  - "Reset Data Demo" di bawah, dipisahkan jarak 12 px.
- Jangan menampilkan tombol "Simpan" di header. Simpan hanya ada di form.

### 7.3 Pemberitahuan mode demo dan penyimpanan

**Pemberitahuan mode demo**

- Panel `--surface-raised`, border 1 px `--border-subtle`, radius 12 px, padding 16 px.
- Ikon info 20 px.
- Teks: "Mode demo tanpa login. Siapa pun yang memakai browser ini dapat mengubah data. Jangan gunakan data produksi."
- Selalu terlihat, tidak dapat ditutup. Ini melindungi pengguna dari kesan bahwa dashboard aman.

**Status penyimpanan**

- Jika aktif: baris kecil "Penyimpanan lokal aktif" dengan ikon centang, 12 px `--muted`.
- Jika tidak tersedia: banner `--warning-tint` dengan teks "Penyimpanan lokal tidak tersedia. Perubahan hanya bertahan selama halaman terbuka." dan tombol "Coba lagi".
- Jika data rusak: banner `--danger-tint` dengan teks "Data tersimpan tidak dapat dibaca." dan tombol "Pulihkan Data Demo".
- Jangan menampilkan status "Tersimpan" jika penulisan terakhir gagal.

### 7.4 Kartu ringkasan

Empat kartu di desktop, 2 x 2 di mobile. Dua kartu pertama wajib sesuai SPEC. Dua kartu berikutnya adalah turunan yang membantu pengelola.

| Kartu | Nilai | Catatan |
|---|---|---|
| Total Penawaran | Jumlah seluruh entri | "Termasuk yang stoknya 0" |
| Total Stok | Jumlah seluruh nilai stok | "Termasuk slot layanan jasa" |
| Stok Habis | Jumlah entri dengan stok 0 | "Penawaran dengan stok 0" |
| Unggulan | Jumlah entri dengan `unggulan` true | "Tampil dengan label di katalog" |

Spesifikasi:

- Sertakan H2 "Ringkasan" (boleh visually hidden) sebagai pemisah semantik.
- Latar `--surface-raised`, border 1 px `--border-subtle`, radius 12 px, padding 20 px.
- Label 13 px berat 600 `--muted`.
- Nilai 32 px berat 700 `--ink`, tabular.
- Catatan 12 px `--muted`.
- Ikon 20 px di kanan atas, relevan: kotak, lapisan, peringatan, label.
- Kartu Stok Habis memakai angka `--danger` dan ikon peringatan jika nilainya lebih dari 0. Jika 0, angka tetap `--ink`.
- Kartu Unggulan memakai titik terracotta kecil di samping label, bukan bintang.
- Kartu ringkasan seragam karena fungsinya sebagai KPI yang dibandingkan. Keseragaman ini disengaja.
- Ringkasan diperbarui segera setelah tambah, edit, atau hapus.

### 7.5 Toolbar dashboard

- Memakai toolbar yang sama dengan landing.
- Pencarian mencocokkan nama dan deskripsi.
- Kategori: Semua, Barang, Jasa.
- Sorting: Nama A-Z, Harga terendah, Harga tertinggi, Stok terbanyak.
- Baris hasil: "Menampilkan 8 penawaran".
- Tombol reset muncul jika ada filter aktif.
- Toolbar tidak mengubah data tersimpan.

### 7.6 Tabel desktop, 1024 px ke atas

Kolom:

| Kolom | Isi | Perataan |
|---|---|---|
| Penawaran | Thumbnail 40 x 40, nama, deskripsi satu baris | Kiri |
| Kategori | Barang atau Jasa | Kiri |
| Harga | Rupiah, tabular | Kanan |
| Stok | Angka dan status | Kiri |
| Unggulan | "Ya" atau "Tidak" | Kiri |
| Aksi | Edit, Hapus | Kanan |

Spesifikasi:

- Sertakan H2 "Daftar Penawaran" (boleh visually hidden) sebagai pemisah semantik.
- Wadah `--surface-raised`, border 1 px `--border-subtle`, radius 12 px.
- Header tabel latar `--surface`, teks 12 px berat 600 `--muted`.
- Baris minimum 64 px, border bawah 1 px `--border-subtle`.
- Hover baris: `--surface-hover`.
- Thumbnail radius 8 px.
- Nama 15 px berat 600. Deskripsi 13 px `--muted`, satu baris.
- Harga 15 px berat 700, tabular, rata kanan.
- Stok 0 menampilkan "0" dan label "Habis" dengan `--danger`.
- Aksi berupa tombol teks dengan ikon, tinggi 44 px:
  - "Edit" memakai `--olive-strong`.
  - "Hapus" memakai `--danger`.
- Fokus pada tombol aksi tidak boleh terpotong oleh wadah tabel.
- Caption tabel untuk screen reader: "Daftar penawaran di dashboard demo."
- Gunakan `<th scope="col">`.

### 7.7 Daftar kartu mobile, di bawah 1024 px

Tabel diganti daftar kartu agar tidak ada scroll horizontal.

Setiap kartu berisi:

- Baris atas: thumbnail 48 x 48, nama 16 px berat 600, label kategori.
- Daftar label dan nilai:
  - Harga.
  - Stok, termasuk status.
  - Unggulan: "Ya" atau "Tidak".
- Baris aksi: tombol "Edit" sekunder dan "Hapus" teks danger, masing-masing tinggi 44 px.
- Jika stok 0, tampilkan badge "Stok habis".
- Hanya satu representasi data yang boleh ada di accessibility tree. Sembunyikan tabel atau daftar yang tidak aktif, bukan hanya secara visual.

### 7.8 Form tambah dan edit

**Wadah**

- Desktop 768 px ke atas: drawer dari kanan, lebar 480 px, tinggi penuh.
- Mobile di bawah 768 px: layar penuh, tinggi `100dvh`.
- Latar `--surface-raised`, border kiri 1 px `--border-subtle`, bayangan dialog.
- Backdrop hanya di desktop.
- Header sticky dengan judul dan tombol tutup 44 x 44 px.
- Footer sticky dengan tombol Batal dan Simpan.
- Body dapat di-scroll.
- Di mobile, footer memakai `env(safe-area-inset-bottom)`.

**Judul**

- Tambah: "Tambah Penawaran".
- Edit: "Edit Penawaran".

**Field**

| Field | Kontrol | Wajib | Helper |
|---|---|---:|---|
| Nama penawaran | Input teks | Ya | Tidak ada. |
| Kategori | Radio segmented Barang/Jasa | Ya | Tidak ada. |
| Harga (Rupiah) | Input desimal dengan awalan Rp | Ya | "Contoh: 150000" |
| Stok | Input bilangan bulat | Ya | "Untuk jasa, isi jumlah slot layanan yang tersedia." |
| Deskripsi | Textarea | Ya | "Tampil di kartu dan detail penawaran." |
| Path gambar | Input teks | Tidak | "Kosongkan untuk placeholder. Gunakan file lokal di /images/." |
| Unggulan | Checkbox | Tidak | "Label Unggulan tampil di katalog." |

**Pratinjau gambar**

- Rasio 4:3, radius 8 px, latar `--surface`, border 1 px `--border-subtle`.
- Jika kosong: placeholder kategori.
- Jika path valid: tampilkan gambar.
- Jika gagal dimuat atau path tidak valid: placeholder dan pesan error.
- Label "Pratinjau gambar" terlihat.

**Perilaku**

- Fokus pertama saat dibuka: field Nama.
- Tombol Simpan mencegah klik ganda.
- Jika form kotor dan pengguna menutup dengan tombol X atau Escape, tampilkan konfirmasi "Perubahan belum disimpan. Tutup formulir?" dengan pilihan "Lanjut mengedit" dan "Tutup tanpa menyimpan".
- Jika form bersih, tutup langsung.
- Setelah simpan berhasil, tutup drawer, tampilkan toast, perbarui tabel dan ringkasan.
- Fokus kembali ke tombol pemicu. Jika tombol edit sudah tidak ada karena data berubah, fokus ke judul tabel atau tombol tambah.
- Jangan menutup form jika penyimpanan gagal. Tampilkan error dan pertahankan isian.

**Label tombol simpan**

- Tambah: "Simpan Penawaran".
- Edit: "Simpan Perubahan".

### 7.9 Dialog hapus

- Judul: "Hapus penawaran?"
- Isi: "Penawaran [nama] akan dihapus dari katalog. Tindakan ini tidak dapat dibatalkan."
- Tombol: "Batal" sekunder dan "Hapus Penawaran" danger.
- Fokus awal ke "Batal".
- Escape membatalkan.
- Klik backdrop tidak menutup dialog.
- Setelah konfirmasi, hapus data, perbarui ringkasan, tampilkan toast "Penawaran berhasil dihapus."
- Fokus kembali ke tombol hapus berikutnya, atau ke judul tabel jika tidak ada baris lain.
- Jika penyimpanan gagal, jangan hapus dari tampilan. Tampilkan error.

### 7.10 Dialog reset data demo

- Judul: "Reset data demo?"
- Isi: "Semua perubahan lokal akan diganti dengan 8 data contoh awal."
- Tombol: "Batal" sekunder dan "Reset Data" dengan latar `--terracotta-strong`, teks putih.
- Fokus awal ke "Batal".
- Setelah konfirmasi, tulis data awal, perbarui tabel dan ringkasan, tampilkan toast "Data demo berhasil dipulihkan."
- Jika penyimpanan gagal, jangan ganti data. Tampilkan error.
- Dialog reset juga dipakai saat memulihkan data yang rusak, dengan teks yang menjelaskan bahwa data rusak akan diganti.

### 7.11 Footer ringkas dashboard

- Latar `--bg`, border atas 1 px `--border-subtle`.
- Teks 13 px `--muted`: "Data demo tersimpan di browser ini. Tidak ada sinkronisasi antar perangkat."
- Tautan "Kembali ke katalog" menuju `/index.html#katalog`.
- Tidak memakai footer pemasaran penuh.

### 7.12 State dashboard

| State | Tampilan |
|---|---|
| Normal | Ringkasan dan tabel terisi. |
| Tidak ada data | Ringkasan bernilai 0, empty state "Belum ada penawaran", tombol tambah. |
| Filter tanpa hasil | Empty state "Tidak ada penawaran yang cocok", tombol reset. |
| Penyimpanan tidak tersedia | Banner peringatan, CRUD tetap berjalan di memori dengan label jelas. |
| Data rusak | Banner error dan tombol pulihkan. |
| Simpan berhasil | Toast sukses, form tertutup, data dan ringkasan diperbarui. |
| Simpan gagal | Form tetap terbuka, toast error, isian tidak hilang. |
| Hapus atau reset gagal | Data tidak berubah, toast error. |

---

## 8. Perilaku dan state

### 8.1 Pencarian, filter, dan sorting

**Pencarian**

- Mencocokkan `nama` dan `deskripsi`.
- Tidak membedakan huruf besar dan kecil.
- Spasi di awal dan akhir diabaikan.
- Hasil diperbarui saat mengetik dengan debounce 200 ms.
- Tidak ada tombol submit. Ini adalah live search yang konsisten.
- Tombol hapus kata kunci mengosongkan input dan mengembalikan hasil.
- Hanya area hasil yang di-render ulang. Jangan merender ulang seluruh halaman agar fokus input tidak hilang.

**Filter**

- Pilihan: Semua, Barang, Jasa.
- Default: Semua.
- Dapat digabung dengan pencarian dan sorting.
- Filter tidak mengubah data tersimpan.

**Sorting**

- Pilihan:
  1. Nama A-Z, default.
  2. Harga terendah ke tertinggi.
  3. Harga tertinggi ke terendah.
  4. Stok terbanyak ke tersedikit.
- Jika nilai sama, urutkan berdasarkan nama A-Z sebagai tie-breaker.
- Sorting hanya mengubah urutan tampilan. Jangan mengubah array data yang disimpan.

**Reset filter**

- Mengosongkan pencarian.
- Mengembalikan kategori ke Semua.
- Mengembalikan sorting ke Nama A-Z.
- Muncul hanya jika salah satu nilai bukan default.
- Setelah reset, fokus kembali ke input pencarian.

**Hasil kosong**

- Tampilkan empty state di area grid.
- Jelaskan bahwa tidak ada hasil.
- Sediakan tombol "Hapus pencarian dan filter".
- Jangan menampilkan pesan error teknis.

### 8.2 WhatsApp

- Nomor disimpan di satu modul konfigurasi, bukan di banyak tempat.
- Format nomor: digit internasional tanpa `+`, spasi, atau tanda baca. Contoh placeholder: `[NOMOR_WHATSAPP_BISNIS]`.
- Tautan memakai `https://wa.me/<nomor>?text=<pesan>`.
- Pesan awal:
  > Halo, saya tertarik dengan [nama penawaran] di PinjamYuk. Apakah masih tersedia? Saya ingin bertanya mengenai penyewaannya.
- Nama penawaran di-encode dengan `encodeURIComponent`.
- Tombol memakai `<a>` dengan `target="_blank"` dan `rel="noopener noreferrer"`.
- Jika nomor belum dikonfigurasi:
  - Jangan merender `<a>` dengan href kosong.
  - Tampilkan "Kontak WhatsApp belum tersedia".
  - Jangan membuka tautan yang tidak valid.
- Jika stok 0:
  - Jangan tampilkan tombol WhatsApp.
  - Status "Stok habis" pada baris stok sudah cukup sebagai pengganti aksi.
- Aplikasi tidak boleh mengklaim pesanan sudah dibuat. Catatan konfirmasi ditampilkan di dialog detail dan bagian Tentang Kami.

### 8.3 localStorage dan keamanan data

- Key: `pinjamYuk.products.v1`.
- Saat key belum ada, muat 8 data contoh dan simpan.
- Saat aplikasi dibuka ulang, baca data dari key tersebut.
- Validasi bentuk data saat membaca. Jika tidak valid, jangan crash.
- Jika data rusak:
  - Tampilkan banner error.
  - Sediakan tombol "Pulihkan Data Demo".
  - Jangan menimpa data rusak tanpa persetujuan pengguna.
- Jika penyimpanan tidak tersedia sejak awal:
  - Aplikasi tetap berjalan dengan data di memori.
  - Tampilkan banner bahwa perubahan tidak akan bertahan.
- Jika penulisan gagal saat CRUD:
  - Untuk tambah atau edit, jangan tutup form.
  - Untuk hapus atau reset, jangan terapkan perubahan pada tampilan.
  - Tampilkan toast error dan pesan yang sesuai.
  - Pertahankan isian pengguna.
  - Jangan mengklaim data tersimpan.
- Reset data demo wajib meminta konfirmasi.
- Jangan menyimpan data pribadi, kredensial, atau nomor rahasia.
- Jangan menyinkronkan antar tab. Perubahan dari tab lain tidak otomatis tercermin. Ini batas MVP.
- Render seluruh data pengguna dengan `textContent`, bukan `innerHTML`.
- Validasi `imageUrl` hanya untuk path lokal `/images/` dengan ekstensi gambar yang diizinkan. Tolak URL eksternal dan skema berbahaya.

### 8.4 Validasi form

| Field | Aturan | Pesan error |
|---|---|---|
| Nama | Wajib setelah trim | "Nama penawaran wajib diisi." |
| Kategori | Wajib Barang atau Jasa | "Pilih kategori Barang atau Jasa." |
| Harga | Angka valid, minimal 0, maksimal 2 desimal | "Harga harus berupa angka 0 atau lebih." |
| Stok | Bilangan bulat, minimal 0 | "Stok harus bilangan bulat 0 atau lebih." |
| Deskripsi | Wajib setelah trim | "Deskripsi wajib diisi." |
| Path gambar | Opsional, harus path lokal yang valid | "Gunakan path lokal di /images/ dengan ekstensi gambar yang didukung." |
| Unggulan | Boolean | Tidak ada error. |

Perilaku validasi:

- Validasi saat blur untuk field yang sudah disentuh.
- Validasi semua field saat submit.
- Jika ada error, fokus ke field error pertama.
- Tandai input dengan `aria-invalid="true"` dan hubungkan error dengan `aria-describedby`.
- Pesan error tampil tepat di bawah field terkait.
- Error memakai ikon dan teks, bukan warna saja.
- Hapus error saat field menjadi valid.
- Jangan memakai alert browser untuk validasi.

### 8.5 Aturan stok

- Stok 3 atau lebih: "Stok [n]", ikon centang, `--success`.
- Stok 1 sampai 2: "Sisa [n]", ikon peringatan, `--warning`.
- Stok 0: "Stok habis", ikon silang, `--danger`.
- Stok untuk jasa berarti jumlah slot layanan. Jelaskan di helper form dan catatan kartu ringkasan Total Stok.
- Stok 0 tidak menyembunyikan penawaran. Kartu tetap tampil.
- Stok 0 menonaktifkan jalur WhatsApp dengan mengganti tombol menjadi status, bukan tombol mati.
- Stok ditampilkan sebagai bilangan bulat. Jangan menampilkan pecahan.

### 8.6 Dialog dan keyboard

- Semua dialog dapat ditutup dengan Escape, kecuali proses yang sedang berjalan.
- Fokus terperangkap di dalam dialog saat terbuka.
- Fokus kembali ke pemicu setelah dialog ditutup.
- Konfirmasi hapus dan reset memfokuskan tombol Batal terlebih dahulu.
- Menu mobile dapat ditutup dengan Escape.
- Urutan Tab mengikuti urutan visual.
- Tidak boleh ada `outline: none` tanpa pengganti.
- Tombol dan link dapat diaktifkan dengan Enter atau Space sesuai elemen aslinya.
- Jika drawer ditutup saat form kotor, tampilkan konfirmasi dan kembalikan fokus ke field atau tombol tutup sesuai pilihan.

### 8.7 Matriks state

| Area | Loading | Empty | Error | Sukses |
|---|---|---|---|---|
| Katalog | Teks "Memuat katalog..." hanya jika perlu | Tidak ada hasil atau katalog kosong | Banner data rusak | Kartu tampil |
| Dashboard | Teks "Memuat data..." hanya jika perlu | Belum ada penawaran | Banner penyimpanan atau data rusak | Tabel dan ringkasan tampil |
| Gambar | Latar surface dan ruang 4:3 | Placeholder kategori | Placeholder saat gagal muat | Foto tampil |
| Form | Tidak ada spinner | Field kosong | Error inline dan fokus ke field pertama | Toast sukses |
| WhatsApp | Tidak ada | Nomor belum tersedia | Nomor tidak valid tidak dirender | Tab WhatsApp terbuka |
| Hapus atau reset | Tidak ada | Tidak berlaku | Toast error, data tidak berubah | Toast sukses |

---

## 9. Aksesibilitas

Target: **WCAG 2.1 level AA** untuk halaman landing dan dashboard.

### 9.1 Kontras

- Semua teks normal memenuhi minimal 4.5:1.
- Teks besar 24 px ke atas, atau 18.66 px ke atas dengan berat 700, memenuhi minimal 3:1.
- Border kontrol dan ikon fungsional memenuhi minimal 3:1 terhadap latar sekitarnya.
- Rasio yang sudah dihitung ada di [3.2](#32-matriks-kontras-wcag-aa).
- Jangan memakai `--terracotta` untuk teks normal.
- Jangan memakai warna saja untuk status, error, atau badge.

### 9.2 Keyboard

- Semua kontrol dapat dijangkau dengan Tab.
- Urutan fokus mengikuti urutan visual.
- Tombol dan link dapat diaktifkan dengan Enter atau Space.
- Menu mobile dapat dibuka dan ditutup dengan keyboard.
- Dialog dapat ditutup dengan Escape.
- Radio segmented dapat dioperasikan dengan tombol panah.
- Fokus terlihat jelas di semua latar.
- Skip link tersedia di awal halaman:
  - Landing: "Langsung ke katalog".
  - Dashboard: "Langsung ke daftar penawaran".
- Skip link terlihat saat fokus dan tidak tersembunyi secara permanen.

### 9.3 Semantik dan ARIA

- Satu `<h1>` per halaman.
- Heading berurutan tanpa melompati level.
- Gunakan landmark `header`, `nav`, `main`, `footer`.
- Tombol memakai `<button>`, navigasi memakai `<a href>`.
- Jangan memakai `div` atau `span` yang dapat diklik.
- Ikon dekoratif memakai `aria-hidden="true"`.
- Tombol ikon memakai `aria-label`.
- Gambar memiliki `alt` yang sesuai. Gambar dekoratif memakai `alt=""`.
- Tabel memakai `caption`, `th scope="col"`, dan struktur baris yang benar.
- Dialog memakai `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, dan `aria-describedby`.
- Live region dipakai untuk hasil pencarian dan toast.
- Jangan memakai ARIA yang bertentangan dengan peran native.

### 9.4 Form

- Setiap field punya label terlihat dan terhubung dengan `for` dan `id`.
- Placeholder bukan pengganti label.
- Field wajib memakai `aria-required="true"`.
- Helper dan error terhubung dengan `aria-describedby`.
- Error memakai `aria-invalid="true"`.
- Fokus berpindah ke field error pertama saat submit gagal.
- Pesan error memakai teks yang jelas, bukan kode.
- Jangan menonaktifkan zoom. Meta viewport tidak boleh memakai `user-scalable=no` atau `maximum-scale=1`.

### 9.5 Gambar dan media

- Semua gambar punya dimensi atau rasio agar layout tidak bergeser.
- Gambar hero dimuat eager. Gambar katalog di bawah lipatan boleh `loading="lazy"`.
- Gambar yang gagal dimuat diganti placeholder, bukan ikon rusak.
- Tidak ada video atau audio otomatis.
- Tidak ada animasi yang berjalan lebih dari 5 detik tanpa kontrol.

### 9.6 Gerak dan preferensi

- Semua animasi non-esensial berhenti saat `prefers-reduced-motion: reduce`.
- Tidak ada parallax, autoplay, atau animasi berulang.
- Transisi hanya untuk umpan balik.
- Toast tetap dapat dibaca tanpa animasi.

### 9.7 Ukuran target sentuh

- Semua tombol, link, dan kontrol memiliki area klik minimum 44 x 44 px.
- Jarak antar target minimal 8 px.
- Link dalam paragraf dikecualikan dari aturan 44 px, tetapi tetap harus mudah diklik.
- Tombol tutup, tombol menu, dan tombol hapus kata kunci berukuran 44 x 44 px.

### 9.8 Pengujian aksesibilitas

Wajib diuji sebelum rilis:

1. Navigasi keyboard penuh di landing dan dashboard.
2. Kontras semua pasangan teks dan latar dengan contrast checker.
3. Pembacaan heading, label form, error, dan toast dengan screen reader.
4. Tampilan pada lebar 320 px, 360 px, 768 px, 1024 px, dan 1280 px.
5. Zoom 200% tanpa kehilangan konten.
6. Mode reduced motion.
7. State kosong, error penyimpanan, dan data rusak.
8. Fokus setelah dialog ditutup.
9. WhatsApp dengan nomor tersedia dan tanpa nomor.
10. Stok 0 pada kartu dan detail.

---

## 10. Konten dan copy

### 10.1 Suara

- Bahasa Indonesia yang jelas, hangat, dan langsung.
- Gunakan "kamu" di copy publik.
- Gunakan kalimat imperatif netral di dashboard, misalnya "Pilih kategori" dan "Simpan perubahan".
- Hindari istilah pemasaran kosong: "solusi", "platform revolusioner", "seamless", "next generation".
- Hindari em dash. Gunakan koma, titik, titik dua, atau tanda kurung.
- Jangan mengklaim fitur yang tidak ada.

### 10.2 Glosarium

| Istilah | Arti di UI |
|---|---|
| Penawaran | Satu entri katalog, bisa Barang atau Jasa. |
| Barang | Kategori untuk benda fisik yang disewakan. |
| Jasa | Kategori untuk layanan yang disewakan. |
| Stok | Jumlah unit barang atau slot layanan yang tersedia. |
| Unggulan | Penawaran yang diberi label khusus di katalog. |
| Dashboard demo | Halaman pengelolaan tanpa login dan tanpa keamanan. |

### 10.3 Microcopy utama

| Lokasi | Teks |
|---|---|
| Hero H1 | Butuh? Pinjam Yuk! |
| Hero deskripsi | Temukan barang dan jasa sewa dari UMKM sekitar. Cek harga dan stok, lalu hubungi pengelola lewat WhatsApp. |
| CTA hero | Lihat Katalog |
| CTA hero sekunder | Kenali PinjamYuk |
| Catatan hero | Tanpa akun. Data demo tersimpan di browser ini. |
| Judul katalog | Katalog Penawaran |
| Subjudul katalog | Penawaran contoh dari UMKM lokal. |
| Label pencarian | Cari |
| Placeholder pencarian | Cari nama atau deskripsi penawaran |
| Label kategori | Kategori |
| Opsi kategori | Semua, Barang, Jasa |
| Label sorting | Urutkan |
| Opsi sorting | Nama A-Z, Harga terendah, Harga tertinggi, Stok terbanyak |
| Hasil | Menampilkan [n] penawaran |
| Reset | Reset filter |
| Kartu, detail | Lihat detail |
| Kartu, WhatsApp | Pesan via WhatsApp |
| Kartu, stok 0 | Stok habis |
| Kartu, stok rendah | Sisa [n] |
| Kartu, unggulan | Unggulan |
| Detail, catatan | Tombol WhatsApp membuka percakapan. Ketersediaan dan harga dikonfirmasi oleh pengelola. |
| Tentang Kami | Tentang PinjamYuk |
| Footer | Proyek demo frontend tanpa backend. |
| Dashboard H1 | Dashboard Demo |
| Dashboard subjudul | Kelola katalog demo di browser ini. |
| Demo notice | Mode demo tanpa login. Siapa pun yang memakai browser ini dapat mengubah data. Jangan gunakan data produksi. |
| Tambah | Tambah Penawaran |
| Reset | Reset Data Demo |
| Ringkasan 1 | Total Penawaran |
| Ringkasan 2 | Total Stok |
| Ringkasan 3 | Stok Habis |
| Ringkasan 4 | Unggulan |
| Tabel, aksi | Edit, Hapus |
| Form, simpan tambah | Simpan Penawaran |
| Form, simpan edit | Simpan Perubahan |
| Form, batal | Batal |
| Hapus dialog | Hapus penawaran? |
| Reset dialog | Reset data demo? |
| Toast tambah | Penawaran berhasil ditambahkan. |
| Toast edit | Perubahan berhasil disimpan. |
| Toast hapus | Penawaran berhasil dihapus. |
| Toast reset | Data demo berhasil dipulihkan. |
| Toast gagal simpan | Perubahan tidak dapat disimpan. Coba lagi. |
| Kontak kosong | Kontak WhatsApp belum tersedia. |

### 10.4 Format Rupiah

- Tampilkan sebagai `Rp150.000` tanpa spasi setelah `Rp`.
- Simpan nilai sebagai angka, bukan string berformat.
- Harga 0 tampil sebagai `Rp0`, bukan kosong atau "Gratis".
- Jika ada pecahan, tampilkan maksimal 2 desimal dengan koma, misalnya `Rp150.000,50`.
- Gunakan pemisah ribuan titik sesuai locale Indonesia.
- Jangan menampilkan harga negatif. Validasi mencegahnya.
- Jika satuan harga disepakati, tampilkan sebagai label terpisah di bawah harga, misalnya "per hari". Jangan menggabungkannya ke dalam angka.

### 10.5 Pesan error dan status

| Situasi | Teks |
|---|---|
| Nama kosong | Nama penawaran wajib diisi. |
| Kategori kosong | Pilih kategori Barang atau Jasa. |
| Harga tidak valid | Harga harus berupa angka 0 atau lebih. |
| Stok tidak valid | Stok harus bilangan bulat 0 atau lebih. |
| Deskripsi kosong | Deskripsi wajib diisi. |
| Gambar tidak valid | Gunakan path lokal di /images/ dengan ekstensi gambar yang didukung. |
| Penyimpanan tidak tersedia | Penyimpanan lokal tidak tersedia. Perubahan hanya bertahan selama halaman terbuka. |
| Penyimpanan gagal | Perubahan tidak dapat disimpan. Penyimpanan browser mungkin penuh atau diblokir. |
| Data rusak | Data tersimpan tidak dapat dibaca. Pulihkan data demo untuk melanjutkan. |
| Tidak ada hasil | Tidak ada penawaran yang cocok. Coba kata kunci lain atau hapus filter. |
| Katalog kosong | Belum ada penawaran di katalog. |
| Dashboard kosong | Belum ada penawaran. Tambahkan penawaran pertama untuk memulai. |
| Nomor belum ada | Kontak WhatsApp belum tersedia. |

---

## 11. Data dummy acuan

Delapan entri berikut dipakai untuk mengisi tampilan dan wireframe. Semua nama, deskripsi, dan harga bersifat fiktif. Jangan mengganti dengan data pribadi nyata.

| No | Nama | Kategori | Harga | Stok | Unggulan | Deskripsi singkat |
|---:|---|---|---:|---:|---|---|
| 1 | Kamera Mirrorless | Barang | 150000 | 3 | Ya | Kamera untuk dokumentasi acara dan konten. |
| 2 | Desain Poster Acara | Jasa | 75000 | 5 | Tidak | Desain poster acara dalam format digital. |
| 3 | Tenda Camping 4P | Barang | 90000 | 0 | Tidak | Tenda kapasitas empat orang untuk camping. |
| 4 | Fotografi Produk | Jasa | 250000 | 2 | Ya | Foto produk untuk katalog dan toko online. |
| 5 | Proyektor Mini | Barang | 125000 | 4 | Tidak | Proyektor ringkas untuk presentasi dan nonton. |
| 6 | Servis Sepeda | Jasa | 50000 | 6 | Tidak | Servis ringan dan pengecekan sepeda. |
| 7 | Kursi Lipat Set 10 | Barang | 80000 | 7 | Tidak | Sepuluh kursi lipat untuk acara keluarga. |
| 8 | Dekorasi Acara | Jasa | 300000 | 1 | Tidak | Dekorasi sederhana untuk acara kecil. |

Ringkasan data:

- Total penawaran: 8.
- Total stok: 28.
- Stok habis: 1.
- Unggulan: 2.

Aset gambar:

- Gunakan path lokal seperti `/images/kamera-mirrorless.jpg`.
- Jika file belum tersedia, gunakan placeholder kategori.
- Jangan memakai URL gambar eksternal.
- Jangan memakai foto orang atau wajah tanpa izin.

---

## 12. Wireframe

Wireframe berikut adalah sketsa teks, bukan ukuran final. Label tombol disingkat agar muat. Implementasi memakai label lengkap sesuai bagian [10.3](#103-microcopy-utama). Simbol `[P]` adalah penanda logo pada sketsa; implementasi memakai wordmark "PinjamYuk" dengan titik terracotta.

### 12.1 Landing page desktop

```text
+------------------------------------------------------------------------------------+
| [P] PinjamYuk       Beranda   Katalog   Tentang Kami        [ Dashboard Demo ]     |
+------------------------------------------------------------------------------------+
|                                                                                    |
|  Butuh?                                     +----------------------------------+   |
|  Pinjam Yuk!                                | [  foto 4:3  ]                   |   |
|                                             | Barang                           |   |
|  Temukan barang dan jasa sewa dari UMKM     | Kamera Mirrorless                |   |
|  sekitar. Cek harga dan stok, lalu          | Rp150.000                        |   |
|  hubungi pengelola lewat WhatsApp.          | Stok 3                           |   |
|                                             +----------------------------------+   |
|  [ Lihat Katalog ]  [ Kenali PinjamYuk ]    +----------------------------------+   |
|                                             | [  foto 4:3  ]                   |   |
|  i  Tanpa akun. Data demo tersimpan         | Jasa                             |   |
|     di browser ini.                         | Desain Poster Acara              |   |
|                                             | Rp75.000                         |   |
|                                             | Stok 5                           |   |
|                                             +----------------------------------+   |
|                                                                                    |
+------------------------------------------------------------------------------------+
|  Katalog Penawaran                                                                 |
|  Penawaran contoh dari UMKM lokal.                                                 |
|                                                                                    |
|  +----------------------------------------------------------------------------+    |
|  | Cari                                  Kategori              Urutkan         |   |
|  | [q] Cari nama atau deskripsi...       (Semua)(Barang)(Jasa) [ Nama A-Z v ]  |   |
|  +----------------------------------------------------------------------------+    |
|  Menampilkan 8 penawaran                                    [ Reset filter ]       |
|                                                                                    |
|  +--------------+  +--------------+  +--------------+  +--------------+            |
|  | [ foto 4:3 ] |  | [ foto 4:3 ] |  | [ foto 4:3 ] |  | [ foto 4:3 ] |            |
|  | [Unggulan]   |  |              |  |              |  | [Unggulan]   |            |
|  | Barang       |  | Jasa         |  | Barang       |  | Jasa         |            |
|  | Kamera...    |  | Desain...    |  | Tenda...     |  | Fotografi... |            |
|  | Rp150.000    |  | Rp75.000     |  | Rp90.000     |  | Rp250.000    |            |
|  | Stok 3       |  | Stok 5       |  | Stok habis   |  | Stok 2       |            |
|  | [ Pesan WA ] |  | [ Pesan WA ] |  | (tanpa WA)   |  | [ Pesan WA ] |            |
|  | Lihat detail |  | Lihat detail |  | Lihat detail |  | Lihat detail |            |
|  +--------------+  +--------------+  +--------------+  +--------------+            |
|                                                                                    |
|  ... 4 kartu berikutnya ...                                                        |
|                                                                                    |
+------------------------------------------------------------------------------------+
|  Tentang PinjamYuk                                                                 |
|  +--------------------------------+  +-----------------------------------------+   |
|  | PinjamYuk adalah katalog demo  |  | Untuk penyewa                           |   |
|  | untuk UMKM yang menyewakan     |  | Cari, cek stok, hubungi via WhatsApp.    |  |
|  | barang dan jasa.               |  | Untuk pengelola                         |   |
|  |                                |  | Tambah, edit, hapus lewat dashboard.    |   |
|  | [ Buka Dashboard Demo ]        |  | Batas demo                              |   |
|  |                                |  | Tanpa login. Data di browser ini.        |  |
|  +--------------------------------+  +-----------------------------------------+   |
+------------------------------------------------------------------------------------+
|  FOOTER                                                                            |
|  [P] PinjamYuk        Navigasi: Beranda  Katalog  Tentang Kami  Dashboard Demo     |
|  Katalog sewa barang dan jasa.        Kontak: WhatsApp (jika tersedia)             |
|  Data demo disimpan di browser ini.                                                |
|  (c) 2026 PinjamYuk. Proyek demo frontend tanpa backend.                           |
+------------------------------------------------------------------------------------+
```

Catatan wireframe:

- Panel kanan hero berisi dua kartu pratinjau statis tanpa tombol.
- Grid katalog desktop memakai empat kolom pada 1280 px.
- Tombol "Pesan WA" adalah singkatan dari "Pesan via WhatsApp".
- Kartu dengan stok habis tidak menampilkan tombol WhatsApp. Status "Stok habis" ada di baris stok.
- Footer memiliki blok gelap dan tiga kelompok informasi.

### 12.2 Landing page mobile

```text
+----------------------------------------+
| [P] PinjamYuk                    [=]   |
+----------------------------------------+
| Butuh?                                 |
| Pinjam Yuk!                            |
|                                        |
| Temukan barang dan jasa sewa dari      |
| UMKM sekitar. Cek harga dan stok,      |
| lalu hubungi pengelola lewat WhatsApp. |
|                                        |
| [ Lihat Katalog                    ]   |
| [ Kenali PinjamYuk                 ]   |
|                                        |
| i Tanpa akun. Data demo tersimpan      |
|   di browser ini.                      |
|                                        |
| +------------------------------------+ |
| | [ foto 4:3 ]                       | |
| | Barang                             | |
| | Kamera Mirrorless                  | |
| | Rp150.000                          | |
| | Stok 3                             | |
| +------------------------------------+ |
+----------------------------------------+
| Katalog Penawaran                      |
| Penawaran contoh dari UMKM lokal.      |
|                                        |
| Cari                                   |
| [q] Cari nama atau deskripsi...        |
|                                        |
| Kategori                               |
| [ Semua ][ Barang ][ Jasa ]            |
|                                        |
| Urutkan                                |
| [ Nama A-Z                         v ] |
|                                        |
| Menampilkan 8 penawaran                |
| [ Reset filter ]                       |
|                                        |
| +------------------------------------+ |
| | [ foto 4:3 ]                       | |
| | [Unggulan]                         | |
| | Barang                             | |
| | Kamera Mirrorless                  | |
| | Rp150.000                          | |
| | Stok 3                             | |
| | [ Pesan via WhatsApp ]             | |
| | Lihat detail                       | |
| +------------------------------------+ |
|                                        |
| ... 7 kartu berikutnya ...             |
+----------------------------------------+
| Tentang PinjamYuk                      |
| PinjamYuk adalah katalog demo ...      |
| [ Buka Dashboard Demo ]                |
+----------------------------------------+
| FOOTER                                 |
| [P] PinjamYuk                          |
| Beranda  Katalog  Tentang Kami         |
| Dashboard Demo                         |
| WhatsApp (jika tersedia)               |
| (c) 2026 PinjamYuk                     |
+----------------------------------------+
```

Catatan wireframe:

- Tombol [=] membuka menu mobile.
- Semua CTA hero penuh selebar container.
- Filter dan sorting bertumpuk, tanpa scroll horizontal.
- Kartu katalog satu kolom pada lebar di bawah 640 px.
- Footer bertumpuk.

### 12.3 Dashboard desktop

```text
+------------------------------------------------------------------------------------------+
| [P] PinjamYuk     Beranda   Katalog   Tentang Kami      [ Dashboard Demo ] (aktif)       |
+------------------------------------------------------------------------------------------+
| Dashboard Demo                                             [ + Tambah Penawaran ]        |
| Kelola katalog demo di browser ini.                        [ Reset Data Demo ]           |
| Lihat katalog publik                                                                     |
|                                                                                          |
| i Mode demo tanpa login. Siapa pun yang memakai browser ini dapat mengubah data.         |
|   Jangan gunakan data produksi.                                                          |
|                                                                                          |
| +-------------------+ +-------------------+ +-------------------+ +----------------+     |
| | Total Penawaran   | | Total Stok        | | Stok Habis        | | Unggulan       |     |
| | 8                 | | 28                | | 1                 | | 2              |     |
| | termasuk stok 0   | | termasuk slot jasa| | perlu perhatian   | | label aktif    |     |
| +-------------------+ +-------------------+ +-------------------+ +----------------+     |
|                                                                                          |
| +----------------------------------------------------------------------------------+     |
| | Cari                    Kategori                          Urutkan                |     |
| | [q] Cari...             (Semua)(Barang)(Jasa)             [ Nama A-Z         v ]  |    |
| +----------------------------------------------------------------------------------+     |
| Menampilkan 8 penawaran                                                                  |
|                                                                                          |
| +----------------------------------------------------------------------------------+     |
| | Penawaran                | Kategori | Harga     | Stok | Unggulan | Aksi            |  |
| +--------------------------+----------+-----------+------+----------+-----------------+  |
| | [img] Kamera Mirrorless  | Barang   | Rp150.000 | 3    | Ya       | Edit   Hapus    |  |
| |       Kamera untuk ...   |          |           |      |          |                 |  |
| +--------------------------+----------+-----------+------+----------+-----------------+  |
| | [img] Desain Poster Acara| Jasa     | Rp75.000  | 5    | Tidak    | Edit   Hapus    |  |
| |       Desain poster ...  |          |           |      |          |                 |  |
| +--------------------------+----------+-----------+------+----------+-----------------+  |
| | [img] Tenda Camping 4P   | Barang   | Rp90.000  | 0    | Tidak    | Edit   Hapus    |  |
| |       Tenda untuk ...    |          |           | Habis|          |                 |  |
| +--------------------------+----------+-----------+------+----------+-----------------+  |
| | ... 5 baris berikutnya ...                                                       |     |
| +----------------------------------------------------------------------------------+     |
|                                                                                          |
|                                   +----------------------------------------------+       |
|                                   | Tambah Penawaran                       [x]   |       |
|                                   | Nama penawaran *                             |       |
|                                   | [__________________________________________] |       |
|                                   | Kategori *                                   |       |
|                                   | ( ) Barang   ( ) Jasa                        |       |
|                                   | Harga (Rupiah) *                             |       |
|                                   | Rp [______________________________________]  |       |
|                                   | Stok *                                       |       |
|                                   | [________]  Untuk jasa, isi jumlah slot.     |       |
|                                   | Deskripsi *                                  |       |
|                                   | [__________________________________________] |       |
|                                   | [__________________________________________] |       |
|                                   | Path gambar (opsional)                       |       |
|                                   | [__________________________________________] |       |
|                                   | [x] Tandai sebagai unggulan                  |       |
|                                   |                                              |       |
|                                   | [ Batal ]              [ Simpan Penawaran ]  |       |
|                                   +----------------------------------------------+       |
+------------------------------------------------------------------------------------------+
```

Catatan wireframe:

- Drawer form tampil sebagai overlay di kanan. Tabel tidak bergeser.
- Drawer hanya terbuka saat tambah atau edit.
- Pemberitahuan mode demo selalu terlihat.
- Kartu ringkasan memakai grid empat kolom pada 1024 px ke atas.
- Tabel diganti daftar kartu pada lebar di bawah 1024 px.

### 12.4 Dashboard mobile

```text
+----------------------------------------+
| [P] PinjamYuk                    [=]   |
+----------------------------------------+
| Dashboard Demo                         |
| Kelola katalog demo di browser ini.    |
| Lihat katalog publik                   |
|                                        |
| i Mode demo tanpa login. Siapa pun     |
|   di browser ini dapat mengubah data.  |
|   Jangan gunakan data produksi.        |
|                                        |
| [ + Tambah Penawaran               ]   |
| [ Reset Data Demo                  ]   |
|                                        |
| +----------------+ +----------------+  |
| | Total          | | Total Stok     |  |
| | Penawaran      | |                |  |
| | 8              | | 28             |  |
| | termasuk stok 0| | slot jasa      |  |
| +----------------+ +----------------+  |
| +----------------+ +----------------+  |
| | Stok Habis     | | Unggulan       |  |
| | 1              | | 2              |  |
| +----------------+ +----------------+  |
|                                        |
| Cari                                   |
| [q] Cari nama atau deskripsi...        |
|                                        |
| Kategori                               |
| [ Semua ][ Barang ][ Jasa ]            |
|                                        |
| Urutkan                                |
| [ Nama A-Z                         v ] |
|                                        |
| Menampilkan 8 penawaran                |
|                                        |
| +------------------------------------+ |
| | [img] Kamera Mirrorless            | |
| | Barang                             | |
| | Rp150.000                          | |
| | Stok 3                             | |
| | Unggulan: Ya                       | |
| | [ Edit ]             [ Hapus ]     | |
| +------------------------------------+ |
|                                        |
| +------------------------------------+ |
| | [img] Desain Poster Acara          | |
| | Jasa                               | |
| | Rp75.000                           | |
| | Stok 5                             | |
| | Unggulan: Tidak                    | |
| | [ Edit ]             [ Hapus ]     | |
| +------------------------------------+ |
|                                        |
| ... 6 penawaran berikutnya ...         |
+----------------------------------------+
| FORM TAMBAH/EDIT (layar penuh)         |
| +------------------------------------+ |
| | Tambah Penawaran             [x]   | |
| | Nama penawaran *                   | |
| | [________________________________] | |
| | Kategori *                         | |
| | ( ) Barang   ( ) Jasa              | |
| | Harga (Rupiah) *                   | |
| | Rp [_____________________________] | |
| | Stok *                             | |
| | [_______] Untuk jasa, isi slot.    | |
| | Deskripsi *                        | |
| | [________________________________] | |
| | [________________________________] | |
| | Path gambar (opsional)             | |
| | [________________________________] | |
| | [x] Tandai sebagai unggulan        | |
| |                                    | |
| | [ Batal ]      [ Simpan ]          | |
| +------------------------------------+ |
+----------------------------------------+
```

Catatan wireframe:

- Tabel berubah menjadi daftar kartu. Tidak ada scroll horizontal.
- Ringkasan memakai grid 2 x 2.
- Form tambah dan edit tampil penuh layar.
- Footer form sticky dengan jarak aman bawah.
- Tombol [=] membuka menu mobile.

---

## 13. Perilaku responsif

### 13.1 Breakpoint

| Nama | Lebar | Perubahan utama |
|---|---:|---|
| Mobile kecil | 0-479 px | Satu kolom, padding 20 px, navbar hamburger, form penuh layar. |
| Mobile besar | 480-639 px | Satu kolom, padding 20 px, kontrol bertumpuk. |
| Tablet | 640-1023 px | Dua kolom katalog, padding 32 px, navbar hamburger, tabel menjadi kartu. |
| Desktop | 1024-1279 px | Tiga kolom katalog, navbar penuh, tabel dashboard, ringkasan empat kolom. |
| Desktop besar | 1280 px ke atas | Empat kolom katalog, container 1200 px, padding 48 px. |

### 13.2 Aturan anti-overflow

- Semua container memakai `max-width: 100%` dan `min-width: 0`.
- Teks panjang memakai `overflow-wrap: break-word`.
- Gambar memakai `max-width: 100%` dan rasio tetap.
- Tabel tidak boleh memaksa lebar minimum di luar container. Di bawah 1024 px, tabel diganti daftar kartu.
- Toolbar dan filter bertumpuk di mobile.
- Tidak ada elemen dengan lebar tetap yang melebihi viewport.
- Uji pada 320 px, 360 px, 390 px, 768 px, 1024 px, dan 1280 px.
- Tidak boleh ada scroll horizontal pada body.

### 13.3 Navigasi dan anchor

- Navbar sticky dengan `scroll-padding-top: 88px`.
- Di mobile, menu tidak menutupi seluruh layar. Panel hanya setinggi item menu.
- Anchor `#katalog` dan `#tentang` harus mendarat dengan judul terlihat, bukan tertutup navbar.
- Tombol "Kembali ke atas" memakai `href="#beranda"`.

### 13.4 Form di mobile

- Drawer menjadi layar penuh.
- Header dan footer sticky.
- Field satu kolom.
- Tombol Batal dan Simpan berdampingan, masing-masing 48 px.
- Keyboard virtual tidak boleh menutupi field aktif. Gunakan `scroll-margin-bottom` atau scroll ke field saat fokus.
- Footer memakai `padding-bottom: max(16px, env(safe-area-inset-bottom))`.

### 13.5 Tabel di mobile

- Tabel desktop disembunyikan dari accessibility tree saat daftar kartu aktif.
- Daftar kartu menampilkan label dan nilai, bukan hanya angka.
- Aksi Edit dan Hapus tetap terlihat tanpa perlu membuka menu tambahan.
- Tidak ada kolom yang dipotong.

---

## 14. Catatan implementasi

Bagian ini bukan kode, hanya batas dan keputusan agar implementasi konsisten.

### 14.1 Stack

- Vite.
- JavaScript vanilla dengan ES modules.
- HTML, CSS, dan SVG.
- Tanpa framework UI, tanpa router, tanpa state library.
- Tanpa backend, API, database, atau autentikasi.
- Tanpa pustaka ikon, animasi, atau CSS framework.

### 14.2 Struktur halaman

- `index.html` untuk landing.
- `dashboard.html` untuk dashboard demo.
- CSS bersama untuk token, komponen, dan layout.
- Modul JavaScript bersama untuk data, format Rupiah, pencarian, filter, sorting, dan penyimpanan.
- Aset gambar di `public/images/`.
- Font di `public/fonts/`.
- Placeholder di `public/images/placeholder-barang.svg` dan `public/images/placeholder-jasa.svg`.

### 14.3 Data

- Delapan data awal sesuai bagian [11](#11-data-dummy-acuan).
- Key `localStorage`: `pinjamYuk.products.v1`.
- Nilai harga dan stok disimpan sebagai angka.
- ID dibuat aplikasi dan unik.
- Validasi skema saat membaca data.
- Jangan menyimpan data pribadi atau kredensial.

### 14.4 Render aman

- Gunakan `textContent` untuk nama, deskripsi, dan pesan pengguna.
- Jangan menyisipkan data pengguna ke `innerHTML`.
- Validasi `imageUrl` sebelum dipakai sebagai `src`.
- Tolak URL eksternal dan skema `javascript:`.
- Encode pesan WhatsApp.
- Jangan menampilkan HTML dari input pengguna.

### 14.5 WhatsApp

- Nomor berada di satu konstanta konfigurasi.
- Gunakan placeholder sampai nomor bisnis disetujui.
- Jangan menampilkan nomor pribadi.
- Jika nomor kosong, jangan render tautan.
- Pesan awal menyebut nama penawaran.

### 14.6 Font dan aset

- Self-host Plus Jakarta Sans dalam format WOFF2 variabel.
- Preload satu file font utama.
- Gunakan `font-display: swap`.
- Jangan memuat font dari pihak ketiga.
- Gambar katalog memakai `loading="lazy"` kecuali gambar hero.
- Semua gambar punya dimensi atau `aspect-ratio`.
- Tidak ada script pihak ketiga di `<head>`.

### 14.7 Performa

- Katalog delapan data tampil tanpa permintaan jaringan.
- Pencarian, filter, dan sorting dilakukan di browser.
- Jangan memuat pustaka besar untuk kebutuhan kecil.
- Hindari layout shift dengan reserved space untuk gambar dan tabel.
- Jangan melaporkan skor Lighthouse atau Core Web Vitals tanpa pengukuran nyata.

### 14.8 Batas yang harus terlihat di UI

- "Mode demo tanpa login" tampil di dashboard.
- "Data tersimpan di browser ini" tampil di footer dan dashboard.
- "Tombol WhatsApp membuka percakapan, bukan membuat pesanan" tampil di detail dan Tentang Kami.
- "Tidak ada sinkronisasi antar perangkat" tampil di footer ringkas dashboard.
- Jangan menampilkan dashboard seolah-olah terlindungi autentikasi.

---

## 15. Pemetaan acceptance criteria

| AC | Elemen UI yang mendukung |
|---|---|
| AC-01 | Grid katalog merender 8 data awal saat key penyimpanan belum ada. |
| AC-02 | Kartu menampilkan nama, kategori, harga Rupiah, stok, dan gambar atau placeholder. |
| AC-03 | Dialog detail menampilkan deskripsi lengkap. |
| AC-04 | Input pencarian mencocokkan nama dan deskripsi. |
| AC-05 | Pencarian tidak membedakan huruf besar dan kecil serta mengabaikan spasi tepi. |
| AC-06 | Filter kategori Barang pada segmented control. |
| AC-07 | Filter kategori Jasa pada segmented control. |
| AC-08 | Pencarian, filter, dan sorting dapat digabung. |
| AC-09 | Select sorting menyediakan nama, harga, dan stok. |
| AC-10 | Empty state "tidak ada penawaran yang cocok" dan tombol reset. |
| AC-11 | Tombol WhatsApp membuka tautan dengan nomor dan pesan awal. |
| AC-12 | State "Kontak WhatsApp belum tersedia" tanpa tautan rusak. |
| AC-13 | Dashboard menampilkan daftar, total penawaran, dan total stok. |
| AC-14 | Form tambah dan toast sukses, ringkasan diperbarui. |
| AC-15 | Validasi inline dan fokus ke field error pertama. |
| AC-16 | Form edit, toast sukses, dan data katalog diperbarui. |
| AC-17 | Dialog hapus dengan konfirmasi dan toast sukses. |
| AC-18 | Tombol Batal pada dialog hapus mempertahankan data. |
| AC-19 | Data disimpan ke localStorage dan dimuat ulang saat halaman dibuka. |
| AC-20 | Dialog reset dengan konfirmasi dan pemulihan 8 data awal. |
| AC-21 | Kartu stok 0 menampilkan "Stok habis" dan tanpa tombol WhatsApp. |
| AC-22 | Layout responsif tanpa scroll horizontal pada mobile. |
| AC-23 | Tidak ada data pribadi nyata atau kredensial di data contoh dan UI. |

---

## 16. Rasional desain dan anti-slop

### 16.1 Alasan keputusan visual

| Keputusan | Alasan satu baris |
|---|---|
| Terracotta dan olive | Memberi kesan hangat dan alami yang cocok untuk UMKM lokal, bukan tampilan SaaS biru yang generik. |
| Latar krem `#FAF5ED` | Membuat foto dan kartu terasa hangat serta mengurangi kesan dingin. |
| Plus Jakarta Sans | Dirancang untuk konteks Indonesia, ramah, dan lega dibaca. |
| Radius 4/8/12/16 | Membedakan badge, kontrol, kartu, dan panel tanpa membuat semuanya pill. |
| Tanpa gradien dan glow | Menjaga fokus pada foto dan teks katalog. |
| Border alih-alih bayangan pada kartu | Katalog terasa datar, mudah dipindai, dan tidak melayang. |
| Bayangan hanya untuk overlay | Menandai elevasi yang nyata pada dialog, drawer, dan toast. |
| Empat kolom katalog di desktop | Delapan data tampil dalam dua baris yang mudah dibandingkan. |
| Satu kolom di mobile | Menjaga nama, harga, dan tombol WhatsApp tetap lega dan mudah disentuh. |
| Hero memakai kartu nyata | Menunjukkan wujud produk tanpa membuat screenshot palsu atau skeleton. |
| Footer gelap | Menutup halaman dengan tegas dan memisahkan informasi demo dari katalog. |
| Tema terang tetap | Palet hangat dan foto adalah identitas utama, mode gelap tidak termasuk MVP. |
| Badge hanya untuk status nyata | Menghindari hiasan pill yang tidak membantu pengguna. |
| Ikon kustom seperlunya | Ikon relevan dengan aksi, bukan sekadar dekorasi. |
| Motion 1 | Umpan balik cukup, tanpa animasi yang mengalihkan perhatian dari katalog. |
| Tanpa testimoni dan statistik | Tidak ada data nyata, jadi tidak ada klaim palsu. |

### 16.2 Pemeriksaan anti-slop

Dokumen ini adalah spesifikasi, bukan aplikasi yang dapat dijalankan. Pemeriksaan runtime dilakukan saat implementasi.

| Aturan | Status | Bukti |
|---|---|---|
| R-02 tanpa em dash | PASS | Seluruh teks dokumen memakai koma, titik, titik dua, atau tanda kurung. |
| R-03 mobile | PASS | Breakpoint, grid, dan aturan anti-overflow ditetapkan di bagian 13. |
| R-17 angka nyata | PASS | Angka ringkasan berasal dari data dummy, bukan klaim pemasaran. |
| R-18 testimoni | PASS | Tidak ada bagian testimoni. |
| R-23 aset | PASS | Logo memakai wordmark placeholder, gambar memakai placeholder lokal. Tidak ada aset final yang dibuat tanpa persetujuan. |
| R-24 navigasi | PASS | Semua item navbar menuju section atau halaman yang ada di bagian 4. |
| R-25 kontras | PASS | Matriks kontras di bagian 3.2, semua teks normal minimal 4.5:1. |
| R-26 kontrol | PASS | Setiap tombol dan tautan punya perilaku yang ditetapkan. Stok habis tidak memakai tombol mati. |
| R-27 state | PASS | Empty, loading, error, dan sukses di bagian 8.7. |
| R-28 FAQ | PASS | Tidak ada FAQ, sehingga tidak ada pertanyaan template. |
| R-32 keyboard | PASS | Aturan fokus, Escape, Tab, dan skip link di bagian 9. |
| R-33 patch script | PASS | Tidak ada kode atau patch script. |
| R-34 tema | N/A | Hanya satu tema terang, tanpa toggle. |
| R-35 verifikasi runtime | N/A | Belum ada aplikasi. Wajib diuji saat implementasi. |
| R-36 klaim | PASS | Tidak ada klaim keamanan, performa, atau pelanggan. |
| R-37 arah desain | PASS | Palet, font, dan mood diberikan pengguna. Dial ditetapkan di bagian 2.1. |
| R-38 konten palsu | PASS | Data dummy dilabeli fiktif, tanpa testimoni atau tim fiktif. |
| R-39 semantik | PASS | Elemen native, label, alt, dan status ditetapkan di bagian 9. |
| R-40 performa | PASS | Dimensi gambar, font lokal, dan larangan script pihak ketiga di bagian 14. |
| R-01 gradien | PASS | Tidak ada gradien atau glow. |
| R-04 ikon | PASS | Ikon kustom dan relevan, tanpa bintang atau percikan. |
| R-06 tipografi | PASS | Plus Jakarta Sans dengan alasan di bagian 3.3. |
| R-07 background | PASS | Tidak ada grid atau pola dekoratif. |
| R-08 panah | PASS | Tidak ada panah dekoratif pada tombol. |
| R-09 badge | PASS | Badge hanya untuk Unggulan, stok, dan kontak. |
| R-10 glassmorphism | PASS | Tidak ada blur atau kaca. |
| R-12 bayangan | PASS | Hanya overlay yang memakai bayangan. |
| R-13 glow | PASS | Tidak ada glow. |
| R-14 kartu | PASS | Kartu katalog seragam untuk pemindaian, kartu ringkasan seragam untuk perbandingan KPI. |
| R-19 animasi | PASS | Hanya transisi umpan balik, sesuai MOTION 1. |
| R-22 ilustrasi | PASS | Tidak ada ilustrasi generik. Placeholder bersifat fungsional. |
| R-05 layout | PASS | Hero terbelah, katalog grid, tentang terbelah, footer gelap. Tidak memakai template fitur atau pricing. |
| R-11 radius | PASS | Skala radius ditetapkan, tidak semua pill. |
| R-15 CTA | PASS | "Lihat Katalog", "Tambah Penawaran", "Pesan via WhatsApp" spesifik. |
| R-16 buzzword | PASS | Tidak ada istilah pemasaran kosong. |
| R-20 identitas | PASS | Palet, tipografi, dan motif titik terracotta konsisten. |
| R-21 tema | PASS | Tema terang dipilih dengan alasan brand dan ruang lingkup. |
| R-29 palet | PASS | Dua warna inti plus netral dan turunan status. |
| R-30 bukan clone | PASS | Tidak meniru produk populer tertentu. |
| R-31 alasan | PASS | Tabel alasan di bagian 16.1. |

---

## 17. Keputusan terbuka

Keputusan berikut tidak menghambat pembuatan UI, tetapi perlu dikonfirmasi sebelum implementasi atau publikasi.

| No | Keputusan | Rekomendasi | Dampak |
|---:|---|---|---|
| 1 | Satuan harga | Tampilkan harga tanpa satuan sampai ada keputusan. Jika semua penawaran memakai satuan yang sama, tambahkan label global seperti "per hari". | Mengubah tampilan harga di kartu, detail, dan tabel. |
| 2 | Logo final | Gunakan wordmark "PinjamYuk" dengan titik terracotta sebagai placeholder. | Menghindari pembuatan aset logo tanpa persetujuan. |
| 3 | Nomor WhatsApp | Gunakan nomor bisnis nonpribadi yang disetujui. Tampilkan "Kontak WhatsApp belum tersedia" selama kosong. | Menentukan apakah tombol WhatsApp muncul. |
| 4 | Foto produk | Gunakan placeholder kategori sampai foto lokal tersedia. | Menentukan kualitas visual katalog. |
| 5 | Routing dashboard | Pisahkan `dashboard.html` dari `index.html`. | Menentukan struktur Vite dan navigasi. |
| 6 | Mode gelap | Tidak disertakan di MVP. | Menjaga ruang lingkup dan kualitas tema terang. |
| 7 | Kartu ringkasan tambahan | Tampilkan Stok Habis dan Unggulan selain dua KPI wajib. | Menambah informasi bagi pengelola tanpa mengubah data. |
| 8 | Tentang Kami | Jadikan section di landing, bukan halaman terpisah. | Menjaga navigasi tetap sederhana. |
| 9 | Harga pecahan | Tampilkan maksimal 2 desimal hanya jika nilai memang pecahan. | Menjaga format Rupiah tetap konsisten. |

---

## 18. Di luar ruang lingkup

- Backend, API, database server, dan sinkronisasi cloud.
- Login, registrasi, autentikasi, dan otorisasi.
- Multi-toko dengan akun terpisah.
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

**Akhir dokumen - UI-SPEC.md**
