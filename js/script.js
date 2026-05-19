document.addEventListener('DOMContentLoaded', function() {

    // ========== BAGIAN LOGIKA NAVIGASI ==========
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-links');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(event) {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            event.stopPropagation();
        });

        navMenu.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    document.addEventListener('click', function(event) {
        if (navMenu && navToggle && navMenu.classList.contains('active')) {
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });

    // ========== BAGIAN KALKULATOR UMUR (Halaman Index) ==========
    const calculateBtn = document.getElementById('calculate-age-btn');
    if (calculateBtn) {
        const monthSelect = document.getElementById('month-select');
        const yearSelect = document.getElementById('year-select');
        populateYears();
        monthSelect.addEventListener('change', populateDays);
        yearSelect.addEventListener('change', populateDays);
        calculateBtn.addEventListener('click', calculateAge);

        const closeResultsBtn = document.getElementById('close-results-btn');
        if (closeResultsBtn) {
            closeResultsBtn.addEventListener('click', closeResults);
        }
    }

    // ========== BAGIAN FUNGSI UNIVERSAL ==========
    const starsContainer = document.getElementById('stars');
    if (starsContainer) {
        createStars(100);
    }
});

// ========== KUMPULAN FUNGSI ==========

/* Data planet yang digunakan untuk perhitungan.
 Periode dalam satuan TAHUN BUMI.
 */
const planetsData = {
    mercury: { name: "Mercury", period: 0.241, color: "#8c7853" },
    venus: { name: "Venus", period: 0.615, color: "#ffc649" },
    earth: { name: "Earth", period: 1.0, color: "#4f94cd" },
    mars: { name: "Mars", period: 1.881, color: "#cd5c5c" },
    jupiter: { name: "Jupiter", period: 11.862, color: "#d2691e" },
    saturn: { name: "Saturn", period: 29.456, color: "#fad5a5" },
    uranus: { name: "Uranus", period: 84.07, color: "#4fd0e7" },
    neptune: { name: "Neptune", period: 164.81, color: "#4169e1" },
    pluto: { name: "Pluto", period: 248.1, color: "#8b7d6b" }
};

/*
Membuat bintang-bintang di background.
 */
function createStars(count) {
    const starsContainer = document.getElementById('stars');
    starsContainer.replaceChildren(); // Menggunakan replaceChildren untuk menghapus konten
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.animationDuration = `${Math.random() * 2 + 2}s`;
        starsContainer.appendChild(star);
    }
}

/*
Mengisi dropdown tahun dari tahun sekarang hingga 1900.
 */
function populateYears() {
    const yearSelect = document.getElementById('year-select');
    if (!yearSelect) return;
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}

/*
 * Mengisi dropdown hari berdasarkan bulan dan tahun yang dipilih.
 */
function populateDays() {
    const daySelect = document.getElementById('day-select');
    const month = document.getElementById('month-select').value;
    const year = document.getElementById('year-select').value;
    if (!daySelect) return;
    
    // PERBAIKAN: Menggunakan replaceChildren dan createElement untuk opsi
    daySelect.replaceChildren(); 
    const defaultDayOption = document.createElement('option');
    defaultDayOption.value = "";
    defaultDayOption.textContent = "DD";
    daySelect.appendChild(defaultDayOption);

    if (month && year) {
        const daysInMonth = new Date(year, month, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            const option = document.createElement('option');
            option.value = day;
            option.textContent = day;
            daySelect.appendChild(option);
        }
    }
}

/*
 * Fungsi utama untuk menghitung umur.
 */
function calculateAge() {
    const month = document.getElementById('month-select').value;
    const day = document.getElementById('day-select').value;
    const year = document.getElementById('year-select').value;

    if (!month || !day || !year) {
        alert('Mohon isi semua kolom tanggal lahir!');
        return;
    }

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    
    if (birthDate > today) {
        alert('Tanggal lahir tidak boleh di masa depan!');
        return;
    }

    // Hitung total hari sejak lahir
    const totalDaysOnEarth = (today - birthDate) / (1000 * 60 * 60 * 24);
    
    displayResults(totalDaysOnEarth);
}

/*
 * Menampilkan hasil perhitungan umur di semua planet dengan detail tahun, bulan, dan hari.
 */
function displayResults(totalDaysOnEarth) {
    const planetGrid = document.getElementById('planet-grid');
    const resultsContainer = document.getElementById('results-container');
    if (!planetGrid || !resultsContainer) return;

    planetGrid.replaceChildren();

    Object.values(planetsData).forEach((planet, index) => {
        // 1. Hitung panjang tahun planet dalam satuan HARI BUMI
        const planetYearInEarthDays = planet.period * 365.25;

        // 2. Hitung total umur dalam satuan TAHUN PLANET (termasuk desimal)
        const totalPlanetYears = totalDaysOnEarth / planetYearInEarthDays;
        
        // 3. Ambil bagian TAHUN (angka bulat)
        const years = Math.floor(totalPlanetYears);
        
        // 4. Hitung sisa desimal setelah tahun diambil, lalu konversi ke BULAN
        const remainingMonthsDecimal = (totalPlanetYears - years) * 12;
        const months = Math.floor(remainingMonthsDecimal);

        // 5. Hitung sisa desimal setelah bulan diambil, lalu konversi ke HARI (asumsi 1 bulan = 30 hari)
        const remainingDaysDecimal = (remainingMonthsDecimal - months) * 30;
        const days = Math.floor(remainingDaysDecimal);

        // Buat elemen kartu
        const card = document.createElement('div');
        card.className = 'planet-card';
        card.style.animationDelay = `${index * 0.05}s`;
        
        // Buat elemen nama planet
        const nameDisplay = document.createElement('div');
        nameDisplay.className = 'planet-name';
        nameDisplay.style.color = planet.color;
        nameDisplay.textContent = planet.name; // Menggunakan textContent

        // Menggunakan createElement dan appendChild untuk ageDisplay
        const ageDisplay = document.createElement('div');
        ageDisplay.className = 'planet-age';

        const yearsValue = document.createElement('span');
        yearsValue.textContent = years;
        const yearsUnit = document.createElement('span');
        yearsUnit.className = 'age-unit';
        yearsUnit.textContent = ' Years';

        const monthsValue = document.createElement('span');
        monthsValue.textContent = months;
        const monthsUnit = document.createElement('span');
        monthsUnit.className = 'age-unit';
        monthsUnit.textContent = ' Months';

        const daysValue = document.createElement('span');
        daysValue.textContent = days;
        const daysUnit = document.createElement('span');
        daysUnit.className = 'age-unit';
        daysUnit.textContent = ' Days';

        ageDisplay.appendChild(yearsValue);
        ageDisplay.appendChild(yearsUnit);
        ageDisplay.appendChild(document.createTextNode(', '));
        ageDisplay.appendChild(monthsValue);
        ageDisplay.appendChild(monthsUnit);
        ageDisplay.appendChild(document.createTextNode(', '));
        ageDisplay.appendChild(daysValue);
        ageDisplay.appendChild(daysUnit);
        
        // Gabungkan semua ke dalam kartu
        card.appendChild(nameDisplay);
        card.appendChild(ageDisplay);

        planetGrid.appendChild(card);
    });

    resultsContainer.style.display = 'flex';
}

/*
 * Menutup modal hasil perhitungan.
 */
function closeResults() {
    const resultsContainer = document.getElementById('results-container');
    if (resultsContainer) {
        resultsContainer.style.display = 'none';
    }
}