





/* ==========================================
   DATA PLANET UNTUK PERBANDINGAN
   ========================================== */
const planetsComparisonData = Object.fromEntries(
    Object.entries(PLANETS_DATA).filter(([key, planet]) => planet.period > 0)
);




/* ==========================================
   MEMBUAT GRID PERBANDINGAN PLANET DENGAN MANIPULASI DOM
   ========================================== */
function createPlanetComparisonGrid() {
    const container = document.getElementById('planet-comparison-grid');
    if (!container) return; // Pengaman
    
    container.replaceChildren();
    
    // Loop untuk setiap planet dalam data
    Object.entries(planetsComparisonData).forEach(([key, planet]) => {
        // Buat kartu planet
        const card = document.createElement('div');
        card.className = 'planet-comparison-card';
        card.style.borderColor = planet.color; // Atur warna border dari data planet
        
        // Nama planet
        const name = document.createElement('h3');
        name.style.color = planet.color;
        name.textContent = planet.name;
        
        // Kontainer detail planet
        const details = document.createElement('div');
        details.className = 'planet-details';
        
        // Periode orbital
        const orbitalPeriod = document.createElement('div');
        orbitalPeriod.className = 'detail-item';
        const strongOrbital = document.createElement('strong');
        strongOrbital.textContent = 'Orbital Period:';
        orbitalPeriod.appendChild(strongOrbital);
        orbitalPeriod.appendChild(document.createTextNode(` ${planet.period} Earth years`));
        
        // Jarak dari Matahari
        const distance = document.createElement('div');
        distance.className = 'detail-item';
        const strongDistance = document.createElement('strong');
        strongDistance.textContent = 'Distance from Sun:';
        distance.appendChild(strongDistance);
        distance.appendChild(document.createTextNode(` ${planet.distance}`));
        
        // Panjang hari
        const dayLength = document.createElement('div');
        dayLength.className = 'detail-item';
        const strongDayLength = document.createElement('strong');
        strongDayLength.textContent = 'Day Length:';
        dayLength.appendChild(strongDayLength);
        dayLength.appendChild(document.createTextNode(` ${planet.dayLength}`));
        
        // Contoh perhitungan usia
        const ageExample = document.createElement('div');
        ageExample.className = 'age-example';
        const earthAge = 25; // Contoh usia di Bumi
        const planetAge = (earthAge / planet.period).toFixed(1);
        const emAgeExample = document.createElement('em');
        emAgeExample.textContent = `At 25 Earth years old, you'd be ${planetAge} ${planet.name} years old!`;
        ageExample.appendChild(emAgeExample);
        
        // Gabungkan semua elemen ke dalam kartu
        details.appendChild(orbitalPeriod);
        details.appendChild(distance);
        details.appendChild(dayLength);
        details.appendChild(ageExample);
        
        card.appendChild(name);
        card.appendChild(details);
        container.appendChild(card);
        
        // Tambahkan efek hover
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = `0 10px 40px ${planet.color}40`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}




/* ==========================================
   EFEK INTERAKTIF DI ITEM FAKTA
   ========================================== */
function addFactItemEffects() {
    const factItems = document.querySelectorAll('.fact-item');
    
    factItems.forEach((item, index) => {
        // Tambahkan animasi staggered
        item.style.animation = `slide-in-up 0.5s ease forwards ${index * 0.1}s`;
        
        // Tambahkan efek klik (ripple effect)
        item.addEventListener('click', function(event) {
            // Hapus ripple yang ada jika ada
            const existingRipple = this.querySelector('.ripple-effect');
            if(existingRipple) existingRipple.remove();

            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            // Hapus ripple setelah animasi selesai
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}


/* ==========================================
   MENGANIMASIKAN KARTU KONSEP SAAT TERLIHAT DI VIEWPORT
   ========================================== */
function animateConceptCards() {
    const conceptCards = document.querySelectorAll('.concept-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Tambahkan animasi staggered
                 entry.target.style.animation = `slide-in-up 0.6s ease forwards ${index * 0.2}s`;
                observer.unobserve(entry.target); // Hentikan observasi setelah animasi
            }
        });
    }, {
        threshold: 0.1 // Trigger saat 10% elemen terlihat
    });
    
    conceptCards.forEach(card => {
        observer.observe(card);
    });
}

/* ==========================================
   EVENT LISTENERS & INISIALISASI
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    createPlanetComparisonGrid();
    addFactItemEffects();
    animateConceptCards();
});