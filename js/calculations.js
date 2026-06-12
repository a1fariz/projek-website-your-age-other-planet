/**
 * calculations.js
 * Logic for calculations page. Uses centralized PLANETS_DATA.
 */

// Filter planets with valid orbital periods (exclude the Sun)
const planetsCalculationData = Object.values(PLANETS_DATA).filter(planet => planet.period > 0);

document.addEventListener('DOMContentLoaded', function() {
    populateOrbitalDataTable();

    // Event listener from form submit
    const ageCalculatorForm = document.getElementById('age-calculator-form');
    if (ageCalculatorForm) {
        ageCalculatorForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent page reload on submit
            calculateAllPlanetaryAges();
        });
    }

    function calculateAllPlanetaryAges() {
        const ageInput = document.getElementById('age-input');
        const earthAge = parseFloat(ageInput.value);

        if (isNaN(earthAge) || earthAge < 0) {
            alert('Please enter a valid positive Earth age!');
            return;
        }

        const resultsContainer = document.getElementById('calculator-results');
        resultsContainer.replaceChildren(); // Clear previous results

        planetsCalculationData.forEach(planet => {
            const planetAge = (earthAge / planet.period).toFixed(2);

            const resultCard = document.createElement('div');
            resultCard.className = 'planet-result';

            const h3 = document.createElement('h3');
            h3.textContent = planet.name;

            const planetAgeDiv = document.createElement('div');
            planetAgeDiv.className = 'planet-age';
            planetAgeDiv.textContent = planetAge;

            const planetDetailsDiv = document.createElement('div');
            planetDetailsDiv.className = 'planet-details';
            planetDetailsDiv.textContent = 'years old';

            resultCard.appendChild(h3);
            resultCard.appendChild(planetAgeDiv);
            resultCard.appendChild(planetDetailsDiv);

            resultsContainer.appendChild(resultCard);
        });
    }
});

function populateOrbitalDataTable() {
    const tableBody = document.querySelector('#orbital-table tbody');
    if (!tableBody) return;

    tableBody.replaceChildren();

    planetsCalculationData.forEach(planet => {
        const row = document.createElement('tr');

        // Name cell
        const nameCell = document.createElement('td');
        nameCell.textContent = planet.name;
        nameCell.setAttribute('data-label', 'Planet');
        row.appendChild(nameCell);

        // Period in years cell
        const periodYearsCell = document.createElement('td');
        periodYearsCell.textContent = planet.period.toFixed(3);
        periodYearsCell.setAttribute('data-label', 'Orbital Period (Earth Years)');
        row.appendChild(periodYearsCell);

        // Period in days cell
        const periodDaysCell = document.createElement('td');
        const periodInDays = (planet.period * 365.25).toFixed(2);
        periodDaysCell.textContent = periodInDays;
        periodDaysCell.setAttribute('data-label', 'Orbital Period (Earth Days)');
        row.appendChild(periodDaysCell);

        // Distance cell
        const distanceCell = document.createElement('td');
        distanceCell.textContent = planet.distance;
        distanceCell.setAttribute('data-label', 'Distance from Sun');
        row.appendChild(distanceCell);

        tableBody.appendChild(row);
    });
}