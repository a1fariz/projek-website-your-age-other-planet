/**
 * SOLAR EXPLORER - CORE TELEMETRY ENGINE
 * Auto-calculates on load (seamless default), reactive live ticker, no blank initial state
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCalculator();
});

function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', (e) => {
        const isOpen = navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('no-scroll', isOpen);
        e.stopPropagation();
    });

    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
        }
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
        });
    });
}

const EARTH_YEAR_DAYS = 365.256363004;
const MS_PER_DAY = 86400000;
const MS_PER_EARTH_YEAR = EARTH_YEAR_DAYS * MS_PER_DAY;

let liveTickerAnim = null;
let currentBirthTimestamp = null;

function initCalculator() {
    const birthdateInput = document.getElementById('birthdate-input');
    const btnCalculate = document.getElementById('btn-calculate');
    const quickChips = document.querySelectorAll('.chip-btn');

    if (!birthdateInput || !btnCalculate) return;

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    birthdateInput.setAttribute('max', todayStr);

    // Default birthdate (24 years ago)
    const defaultDate = new Date();
    defaultDate.setFullYear(defaultDate.getFullYear() - 24);
    birthdateInput.value = defaultDate.toISOString().split('T')[0];

    quickChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const offset = chip.getAttribute('data-year-offset');
            const preset = chip.getAttribute('data-preset');

            if (offset) {
                const d = new Date();
                d.setFullYear(d.getFullYear() - parseInt(offset, 10));
                birthdateInput.value = d.toISOString().split('T')[0];
            } else if (preset) {
                birthdateInput.value = preset;
            }
            executeCalculation(true);
        });
    });

    btnCalculate.addEventListener('click', () => executeCalculation(true));
    birthdateInput.addEventListener('change', () => executeCalculation(false));
    birthdateInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') executeCalculation(true);
    });

    // AUTO CALCULATE IMMEDIATELY on load so user sees full interactive telemetry right away
    executeCalculation(false);
}

function executeCalculation(shouldScroll) {
    const birthdateInput = document.getElementById('birthdate-input');
    const resultsSection = document.getElementById('results-section');
    const grid = document.getElementById('planet-telemetry-grid');

    if (!birthdateInput.value) {
        birthdateInput.focus();
        return;
    }

    const birthDate = new Date(birthdateInput.value + 'T00:00:00Z');
    const now = new Date();

    if (isNaN(birthDate.getTime()) || birthDate > now) {
        alert('Please enter a valid date in the past.');
        return;
    }

    currentBirthTimestamp = birthDate.getTime();

    renderPlanetCards(grid);

    if (shouldScroll) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    startLiveTicker();
}

function renderPlanetCards(grid) {
    grid.replaceChildren();

    const now = Date.now();
    const ageInEarthYears = (now - currentBirthTimestamp) / MS_PER_EARTH_YEAR;
    const validPlanets = Object.entries(PLANETS_DATA).filter(([_, p]) => p.period > 0);

    validPlanets.forEach(([key, planet]) => {
        const planetAge = ageInEarthYears / planet.period;
        const integerAge = Math.floor(planetAge);
        const fractionalPart = (planetAge - integerAge);
        const nextReturnProgress = (fractionalPart * 100).toFixed(1);

        const daysInPlanetYear = planet.period * EARTH_YEAR_DAYS;
        const daysUntilNext = Math.round((1 - fractionalPart) * daysInPlanetYear);

        const card = document.createElement('article');
        card.className = 'planet-card';
        card.style.setProperty('--planet-color', planet.color);

        card.innerHTML = `
            <div class="planet-card-header">
                <div class="planet-identity">
                    <div class="planet-symbol" style="color: ${planet.color}; border-color: ${planet.color}44;">
                        ${planet.symbol}
                    </div>
                    <div>
                        <h3 class="planet-name">${planet.name}</h3>
                        <span class="planet-type">${planet.type}</span>
                    </div>
                </div>
            </div>

            <div class="planet-age-display">
                <div class="age-number-row">
                    <span class="age-digits" id="age-${key}">${planetAge.toFixed(4)}</span>
                    <span class="age-unit">Years</span>
                </div>
            </div>

            <div class="planet-stats-table">
                <div class="stat-row">
                    <span class="stat-label">Orbital Period:</span>
                    <span class="stat-val">${planet.period} Earth Yrs (${(planet.period * EARTH_YEAR_DAYS).toFixed(1)}d)</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Solar Distance:</span>
                    <span class="stat-val">${planet.distance || '149.6M km'}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Orbit Completion:</span>
                    <span class="stat-val" style="color:${planet.color}">${nextReturnProgress}%</span>
                </div>
            </div>

            <div class="birthday-cue">
                <span>Next Birthday:</span>
                <strong>in ${daysUntilNext.toLocaleString()} Earth Days</strong>
            </div>
        `;

        grid.appendChild(card);
    });
}

function startLiveTicker() {
    if (liveTickerAnim) cancelAnimationFrame(liveTickerAnim);

    const earthAgeDisplay = document.getElementById('live-earth-age');
    const validPlanets = Object.entries(PLANETS_DATA).filter(([_, p]) => p.period > 0);

    function tick() {
        if (!currentBirthTimestamp) return;

        const now = Date.now();
        const earthAge = (now - currentBirthTimestamp) / MS_PER_EARTH_YEAR;

        if (earthAgeDisplay) {
            earthAgeDisplay.textContent = `EARTH AGE: ${earthAge.toFixed(8)} SOLAR YEARS`;
        }

        validPlanets.forEach(([key, planet]) => {
            const ageEl = document.getElementById(`age-${key}`);
            if (ageEl) {
                const planetAge = earthAge / planet.period;
                const decimals = planet.period < 1 ? 5 : 4;
                ageEl.textContent = planetAge.toFixed(decimals);
            }
        });

        liveTickerAnim = requestAnimationFrame(tick);
    }

    tick();
}
