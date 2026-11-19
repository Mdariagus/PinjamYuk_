// Konfigurasi aplikasi PinjamYuk.
// Isi dengan nomor WhatsApp resmi pemilik UMKM.
// Format: kode negara + nomor, tanpa tanda +, spasi, atau tanda baca.
// Contoh: 6281234567890

export const WHATSAPP_OWNER_NUMBER = '';

// Digunakan untuk memeriksa apakah pemesanan WhatsApp sudah dikonfigurasi.
export const IS_WHATSAPP_CONFIGURED =
  /^\d{8,15}$/.test(WHATSAPP_OWNER_NUMBER) &&
  !WHATSAPP_OWNER_NUMBER.startsWith('0');