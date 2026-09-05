/**
 * CALCULATIONS & KEPLER MATH ENGINE
 * Controls real-time simulator slider and generates clean JPL data tables
 * ponytail: Pure arithmetic, direct DOM mutation, zero dependencies
 */

const planetsCalculations = Object.entries(PLANETS_DATA).filter(([_, p]) => p.period > 0);

const VELOCITY_DATA = {
    mercury: '47.4 km/s',
    venus: '35.0 km/s',
    earth: '29.8 km/s',
    mars: '24.1 km/s',
    jupiter: '13.1 km/s',
    saturn: '9.7 km/s',
    uranus: '6.8 km/s',
    neptune: '5.4 km/s',
    pluto: '4.7 km/s'
};

document.addEventListener('DOMContentLoaded', () => {
    populateDataTable();
    setupSimulator();
});

function setupSimulator() {
    const slider = document.getElementById('sim-slider');
    const label = document.getElementById('slider-earth-val');
    const grid = document.getElementById('sim-results-grid');

    if (!slider || !grid) return;

    function updateSimulator() {
        const earthYears = parseFloat(slider.value);
        if (label) label.textContent = `${earthYears.toFixed(1)} Solar Years`;

        grid.replaceChildren();

        planetsCalculations.forEach(([key, planet]) => {
            const age = earthYears / planet.period;
            const decimals = planet.period < 1 ? 2 : 2;

            const cell = document.createElement('div');
            cell.className = 'sim-cell';
            cell.innerHTML = `
                <div class="sim-cell-name">${planet.name}</div>
                <div class="sim-cell-val" style="color:${planet.color}">${age.toFixed(decimals)}</div>
                <div class="sim-cell-unit">Years</div>
            `;
            grid.appendChild(cell);
        });
    }

    slider.addEventListener('input', updateSimulator);
    updateSimulator();
}

function populateDataTable() {
    const tableBody = document.querySelector('#orbital-table tbody');
    if (!tableBody) return;

    tableBody.replaceChildren();

    planetsCalculations.forEach(([key, planet]) => {
        const row = document.createElement('tr');
        const periodDays = (planet.period * 365.256).toFixed(1);
        const vel = VELOCITY_DATA[key] || 'N/A';

        row.innerHTML = `
            <td>
                <span class="table-symbol" style="color: ${planet.color}">${planet.symbol}</span>
                <strong>${planet.name}</strong>
            </td>
            <td><code>${planet.symbol}</code></td>
            <td>${planet.period.toFixed(3)}</td>
            <td>${periodDays}</td>
            <td>${planet.distance || 'N/A'}</td>
            <td>${vel}</td>
        `;

        tableBody.appendChild(row);
    });
}
