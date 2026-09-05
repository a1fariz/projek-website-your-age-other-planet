# 🪐 Solar Explorer — Planetary Telemetry & Space-Tech Orrery

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-Semantics-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-Modern_Variables-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/Three.js-WebGL_Orrery-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js"/>
  <img src="https://img.shields.io/badge/NASA-Open_Data_JPL-0B3D91?style=for-the-badge&logo=nasa&logoColor=white" alt="NASA Data"/>
  <img src="https://img.shields.io/badge/Design-Awwwards_Space_Tech-06B6D4?style=for-the-badge" alt="Space-Tech Design"/>
</p>

Selamat datang di **Solar Explorer**, aplikasi web interaktif bertaraf modern *Space-Tech HUD / Editorial Telemetry*. Dirancang dengan prinsip Awwwards-style UI/UX dan astrofisika presisi tinggi untuk menghitung usia Anda di seluruh planet tata surya, menjelajahi orrery 3D interaktif, dan mengakses arsip astronomi NASA JPL.

🌐 **Live Demo:** [solar-explorer.alfarizi.my.id](https://solar-explorer.alfarizi.my.id) *(atau kunjungi [alfarizi.my.id](https://alfarizi.my.id))*

---

## ⚡ Fitur Utama (Rebuilt Architecture)

- **Planetary Age Telemetry (Kalkulator Umur Presisi)**:
  - Input tanggal lahir berbasis native kalender UTC dengan *quick calibration epochs* (Apollo 11, Y2K, milestone umur).
  - Ticker desimal *real-time* (animasi fraksi tahun bergerak dinamis).
  - Indikator penyelesaian orbit Kepler saat ini (`% completed`) dan hitung mundur menuju hari ulang tahun planet berikutnya (*Solar Return*).
- **Interactive 3D Orrery (Three.js r128)**:
  - Tata surya heliosentris 3D interaktif dengan pencahayaan PBR procedural canvas textures.
  - Kamera interaktif dengan transisi GSAP *fly-to* mulus saat mengeklik planet apa pun di kanvas 3D.
  - Kontrol simulasi HUD: Play/Pause, pengatur kecepatan orbit (0.1x - 5.0x), toggle jejak orbit (*Orbit Trails*), dan tombol kembali ke ikhtisar penuh.
- **NASA Deep Space Observatory**:
  - Integrasi live NASA APOD (*Astronomy Picture of the Day*) API dengan caching lokal otomatis.
  - Flyby multimedia tata surya dari arsip penjelajahan NASA JPL.
- **High-Performance Canvas Starfield Engine**:
  - Menggantikan 100+ elemen div DOM dengan satu canvas 60fps *requestAnimationFrame* yang ringan dan hemat daya.
  - Mendukung efek mouse parallax 3D dan menghormati preferensi aksesibilitas `prefers-reduced-motion`.
- **Editorial Sub-Modules**:
  - 📐 **Kepler Math**: Penjelasan Hukum Kepler Ketiga, rumus rasio orbit, simulator interaktif real-time, dan tabel ephemeris heliosentris resmi.
  - 📖 **Orbital Data**: Katalog karakteristik fisik planet lengkap (diameter, massa, panjang hari, suhu ekstrem, jarak rata-rata).
  - 📡 **NASA Portal**: Direktori rujukan open science API NASA (APOD, NeoWs, JPL Horizons, Mars Weather) dan terminal formulir log telemetri.

---

## 🎨 Tipografi & Design System

- **Display & Headings**: `Space Grotesk` (Geometric, bold, clean editorial).
- **Telemetry & Numbers**: `Space Mono` (Tabular numbers, scientific notation).
- **Body Text**: `Inter` (Tingkat keterbacaan tinggi).
- **Palet Warna**:
  - Void Background: `#05070f`
  - Telemetry Blue: `#3b82f6`
  - Cyan Accent: `#06b6d4`
  - Star White: `#f8fafc`
  - Slate Muted: `#94a3b8`
- **Iconography**: 100% Simbol astronomi standar (`☉`, `☿`, `♀`, `♁`, `♂`, `♃`, `♄`, `♅`, `♆`, `♇`) dan SVG vektor presisi tanpa emoji.

---

## 🚀 Cara Menjalankan Secara Lokal

Website ini berbasis *static web* murni (HTML5, CSS3, Vanilla ES6+ JS) tanpa kompilasi build yang rumit:

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/a1fariz/new.git
   cd new
   ```

2. **Jalankan dengan Server Lokal (Pilihan)**:
   - **VS Code**: Klik kanan `index.html` dan pilih **"Open with Live Server"**.
   - **Python 3**:
     ```bash
     python -m http.server 8000
     ```
   - **Node.js `npx serve`**:
     ```bash
     npx serve .
     ```
   Buka `http://localhost:8000` di browser.

---

## 📁 Struktur Direktori

```text
ALFA_RIZI/
├── index.html            # Halaman Utama (Planetary Telemetry & Age Engine)
├── README.md             # Dokumentasi Proyek
├── html/                 # Halaman Sub-Menu
│   ├── about.html        # Katalog Orbital & Karakteristik Fisik Planet
│   ├── calculations.html # Matematika Hukum Kepler & Simulator Rasio
│   ├── resources.html    # NASA Open Science Data Portal
│   └── solar-walk.html   # Orrery 3D Interaktif & Observatorium APOD
├── css/                  # Lembar Gaya (Modern CSS Variables)
│   ├── styles.css        # Variabel Global, Tipografi, & Gaya Inti
│   ├── about.css
│   ├── calculations.css
│   ├── resources.css
│   ├── solar-walk.css
│   └── assets/           # Media Video & Aset Grafis
│       ├── ast.png
│       └── video-tata-surya.mp4
└── js/                   # Logika Interaktif & Mesin Fisika
    ├── starfield.js      # Canvas Particle Engine (60fps Parallax)
    ├── planets-data.js   # Sumber Data Tunggal Karakteristik Planet
    ├── script.js         # Logika Telemetri Umur & Live Fractional Ticker
    ├── solar-walk.js     # Engine 3D Three.js & Integrasi NASA APOD
    ├── calculations.js   # Logika Simulator Slider & Tabel Data
    ├── about.js          # Generator Kartu Perbandingan Planet
    └── resources.js      # Logika Terminal Log Telemetri
```

---

## 👨‍💻 Author

Dikembangkan oleh **Muhammad Hafiz Alfarizi** ([@a1fariz](https://github.com/a1fariz)).  
*Didedikasikan untuk penjelajahan sains astronomi dan keindahan mekanika langit.*
