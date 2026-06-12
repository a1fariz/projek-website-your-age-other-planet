# 🪐 Planetary Age Calculator (Solar Explorer)

Selamat datang di **Planetary Age Calculator**, sebuah website interaktif bertema luar angkasa yang dirancang untuk menghitung umur Anda di planet-planet lain dalam tata surya kita! 

Proyek ini dibuat menggunakan HTML, CSS (Vanilla), dan JavaScript, dengan mengusung antarmuka **Glassmorphism** modern, animasi yang mulus, dan desain responsif yang *eye-friendly*.

## ✨ Fitur Utama

- **Kalkulator Umur Antar-Planet**: Masukkan tanggal lahir Anda (di Earth) dan lihat secara instan umur Anda di Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, dan Pluto!
- **Desain Modern & Responsif**: Menggunakan efek kaca buram (Glassmorphism), gradien warna luar angkasa yang elegan, dan optimalisasi tata letak yang tampil sempurna di layar desktop, tablet, maupun smartphone.
- **Informasi Edukasi Tata Surya**: 
  - 📖 **About**: Penjelasan konsep tahun dan hari di berbagai planet, serta perbandingan detail setiap planet.
  - 🧮 **Calculations**: Penjelasan tentang rumus matematika dan logika di balik perhitungan umur planetary.
  - 🚀 **Solar-Walk**: Penjelajahan tata surya interaktif dengan dukungan *fetch* data dari NASA API (APOD, NeoWs, dll).
  - 🔗 **Resources**: Kumpulan sumber belajar tambahan terkait antariksa dan atribusi data NASA.
- **Micro-Animations & Visuals**: Animasi bintang di latar belakang, animasi astronot melayang, dan interaksi *hover* yang hidup di setiap tombol dan kartu.

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Struktur semantik untuk seluruh halaman web.
- **CSS3**: 
  - *Vanilla CSS* tanpa *framework*.
  - Menggunakan CSS Variables untuk konsistensi tema (Warna Deep Space, Cyan, Purple).
  - Flexbox & CSS Grid untuk kemudahan *layout*.
  - Media Queries untuk *Responsive Web Design* (Mobile-first adaptions).
- **JavaScript (ES6)**: 
  - Logika perhitungan matematika kalender.
  - Manipulasi DOM (tampil-sembunyikan modal, isi dropdown otomatis).
  - Navigasi hamburger menu pada layar *mobile*.
  - (Opsional) *Fetch* API dari portal data NASA.

## 🚀 Cara Menjalankan Proyek Secara Lokal

Karena proyek ini sepenuhnya *static website*, Anda bisa menjalankannya dengan mudah tanpa perlu instalasi server yang rumit:

1. **Unduh atau Clone Repositori**:
   ```bash
   git clone https://github.com/username-anda/ALFA_RIZI.git
   ```
2. **Buka Folder Proyek**:
   Arahkan ke folder proyek di komputer Anda.
   ```bash
   cd ALFA_RIZI
   ```
3. **Gunakan Live Server (Sangat Disarankan)**:
   - Jika Anda menggunakan **Visual Studio Code**, instal ekstensi **Live Server**.
   - Klik kanan pada file `index.html` dan pilih **"Open with Live Server"**.
   - Website akan otomatis terbuka di *browser* pada alamat `https://projek-website-your-age-other-plane.vercel.app/`.
4. **Buka Langsung (Alternatif)**:
   - Anda juga dapat sekadar mengklik ganda (double-click) file `index.html` untuk membukanya secara lokal (alamat `https://projek-website-your-age-other-plane.vercel.app/`). 
   - *Catatan: Semua path dalam proyek ini telah menggunakan relative paths (`./`, `../`) sehingga aman dibuka tanpa server sekalipun.*

## 📂 Struktur Direktori

```text
ALFA_RIZI/
│
├── index.html            # Halaman Beranda (Kalkulator Utama)
├── README.md             # Dokumentasi Proyek ini
├── README.txt            # (File kosong/opsional lama)
│
├── html/                 # Halaman Sub-Menu
│   ├── about.html
│   ├── calculations.html
│   ├── resources.html
│   └── solar-walk.html
│
├── css/                  # Styling (CSS)
│   ├── styles.css        # Global variables & Main Styles
│   ├── about.css
│   ├── calculations.css
│   ├── resources.css
│   ├── solar-walk.css
│   └── assets/           # Gambar, video, dan ikon
│       ├── ast.png
│       └── video-tata-surya.mp4
│
└── js/                   # Logika Interaktif (JavaScript)
    ├── script.js         # Logika Utama & Navigasi Mobile
    ├── about.js
    ├── calculations.js
    ├── resources.js
    └── solar-walk.js
```

## 🤝 Kontribusi & Feedback

Proyek ini dibuat untuk tujuan edukasi. Jika Anda menemukan *bug* atau memiliki ide untuk menambah animasi planet, integrasi API NASA yang baru, atau perbaikan kode, jangan ragu untuk melakukan **Pull Request** atau membuka **Issue** di repositori GitHub ini.

---
*Dibuat untuk menjelajahi bintang-bintang! 🌌*
