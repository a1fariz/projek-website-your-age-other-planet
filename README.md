# 🪐 Planetary Age Calculator & Solar Explorer

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/Design-Glassmorphism-9333EA?style=for-the-badge" alt="Glassmorphism"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License"/>
</p>

Selamat datang di **Planetary Age Calculator & Solar Explorer**, sebuah aplikasi web interaktif bertema penjelajahan antariksa modern yang dirancang untuk menghitung usia Anda di berbagai planet dalam tata surya serta menjelajahi fakta sains astronomi!

🌐 **Live Demo:** [solar-explorer.alfarizi.my.id](https://solar-explorer.alfarizi.my.id) *(atau kunjungi [alfarizi.my.id](https://alfarizi.my.id))*

---

## ✨ Fitur Utama

- **Kalkulator Umur Antar-Planet**: Masukkan tanggal lahir Anda (di Bumi) dan hitung usia Anda secara presisi di Merkurius, Venus, Mars, Jupiter, Saturnus, Uranus, Neptunus, hingga Pluto.
- **Desain Glassmorphism Modern**: Tampilan antarmuka transparan elegan dengan gradien warna luar angkasa, pencahayaan neon, dan tata letak responsif di desktop, tablet, maupun ponsel.
- **Informasi Edukasi Tata Surya**:
  - 📖 **About**: Penjelasan konsep periode revolusi dan rotasi planet serta perbandingan karakteristik fisik.
  - 📐 **Calculations**: Rumus matematika dan logika astrofisika di balik konversi kalender planet.
  - 🚀 **Solar-Walk**: Penjelajahan tata surya interaktif dilengkapi data astronomi dan multimedia.
  - 📚 **Resources**: Direktori rujukan sumber belajar antariksa dan integrasi data portal NASA.
- **Micro-Animations & Efek Visual**: Partikel bintang bergerak di latar belakang, animasi astronot melayang, dan interaksi hover 3D di setiap kartu planet.

---

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Struktur halaman semantik dan aksesibel.
- **CSS3 (Vanilla)**:
  - Custom CSS Variables untuk tema Deep Space (Cyan, Indigo, Purple).
  - Flexbox & CSS Grid modern untuk tata letak responsif.
  - Efek `backdrop-filter: blur()` untuk aksen Glassmorphism.
- **JavaScript (ES6+)**:
  - Perhitungan matematika kalender revolusi orbit planet.
  - Manipulasi DOM dinamis, modal dialog, dan navigasi menu responsif.
  - Dukungan REST API antariksa (NASA APOD / NeoWs).

---

## 🚀 Cara Menjalankan Secara Lokal

Karena proyek ini berbasis *static web*, Anda dapat menjalankannya langsung tanpa konfigurasi server backend:

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/a1fariz/new.git
   cd new
   ```

2. **Jalankan dengan Live Server (Direkomendasikan)**:
   - Buka direktori proyek di **Visual Studio Code**.
   - Klik kanan pada `index.html` dan pilih **"Open with Live Server"**.
   - Website akan terbuka di `http://127.0.0.1:5500`.

3. **Buka Langsung di Browser**:
   - Klik ganda file `index.html` untuk membuka langsung di browser web favorit Anda.

---

## 📁 Struktur Direktori

```text
ALFA_RIZI/
├── index.html            # Halaman Utama (Kalkulator Umur Planet)
├── README.md             # Dokumentasi Proyek
├── html/                 # Halaman Sub-Menu
│   ├── about.html        # Fakta & Komparasi Planet
│   ├── calculations.html # Penjelasan Rumus Matematika
│   ├── resources.html    # Sumber Referensi & Atribusi
│   └── solar-walk.html   # Eksplorasi Visual Tata Surya
├── css/                  # Tata Gaya (CSS)
│   ├── styles.css        # Variabel Global & Gaya Utama
│   ├── about.css
│   ├── calculations.css
│   ├── resources.css
│   ├── solar-walk.css
│   └── assets/           # Media Gambar & Video
│       ├── ast.png
│       └── video-tata-surya.mp4
└── js/                   # Logika Interaktif (JavaScript)
    ├── script.js         # Logika Utama Kalkulator & Mobile Nav
    ├── about.js
    ├── calculations.js
    ├── planets-data.js
    ├── resources.js
    └── solar-walk.js
```

---

## 👨‍💻 Author

Dikembangkan oleh **Muhammad Hafiz Alfarizi** ([@a1fariz](https://github.com/a1fariz)).  
*Dibuat untuk menjelajahi keindahan tata surya dan sains astronomi! 🚀✨*
