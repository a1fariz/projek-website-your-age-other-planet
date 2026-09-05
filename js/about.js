/**
 * ABOUT / ORBITAL FACTBOOK ENGINE
 * Renders verified NASA physical telemetry cards
 * ponytail: Pure HTML generation, zero extraneous code
 */

document.addEventListener('DOMContentLoaded', () => {
    renderPlanetaryComparison();
});

function renderPlanetaryComparison() {
    const grid = document.getElementById('planet-comparison-grid');
    if (!grid) return;

    grid.replaceChildren();

    const bodies = Object.entries(PLANETS_DATA);

    bodies.forEach(([key, planet]) => {
        const card = document.createElement('article');
        card.className = 'compare-card';

        card.innerHTML = `
            <div class="compare-card-head">
                <div class="compare-symbol" style="color: ${planet.color}; border: 1px solid ${planet.accentGlow};">
                    ${planet.symbol || '☉'}
                </div>
                <div>
                    <h3 class="compare-title">${planet.name}</h3>
                    <span style="font-family:var(--font-mono); font-size:0.68rem; color:var(--text-muted); text-transform:uppercase;">${planet.type}</span>
                </div>
            </div>

            <div class="compare-stats">
                <div class="compare-row">
                    <span class="compare-label">Orbital Period:</span>
                    <span class="compare-val">${planet.orbitalPeriod || (planet.period + ' Earth Yrs')}</span>
                </div>
                <div class="compare-row">
                    <span class="compare-label">Rotation Period:</span>
                    <span class="compare-val">${planet.dayLength || 'N/A'}</span>
                </div>
                <div class="compare-row">
                    <span class="compare-label">Mean Distance:</span>
                    <span class="compare-val">${planet.distance || 'Center of System'}</span>
                </div>
                <div class="compare-row">
                    <span class="compare-label">Temperature:</span>
                    <span class="compare-val">${planet.temperature}</span>
                </div>
            </div>

            <div class="compare-fact">
                ${planet.funFact}
            </div>
        `;

        grid.appendChild(card);
    });
}
