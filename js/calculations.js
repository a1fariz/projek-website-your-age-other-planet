document.addEventListener('DOMContentLoaded', function() {
    populateOrbitalDataTable(); // panggil function baru

    const planetsCalculationData = [
        { name: "Mercury", period: 0.241, distance: "57.9 million km" },
        { name: "Venus", period: 0.615, distance: "108.2 million km" },
        { name: "Earth", period: 1.0, distance: "149.6 million km" },
        { name: "Mars", period: 1.881, distance: "227.9 million km" },
        { name: "Jupiter", period: 11.862, distance: "778.6 million km" },
        { name: "Saturn", period: 29.456, distance: "1.432 billion km" },
        { name: "Uranus", period: 84.07, distance: "2.867 billion km" },
        { name: "Neptune", period: 164.81, distance: "4.515 billion km" },
        { name: "Pluto", period: 248.1, distance: "5.906 billion km" }
    ];

    // Mengganti event listener dari tombol ke form
    const ageCalculatorForm = document.getElementById('age-calculator-form');
    if (ageCalculatorForm) {
        ageCalculatorForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah form melakukan submit default (reload halaman)
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
        resultsContainer.replaceChildren(); // Menggunakan replaceChildren untuk menghapus hasil sebelumnya

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

    const planetsCalculationData = [
        { name: "Mercury", period: 0.241, distance: "57.9 million km" },
        { name: "Venus", period: 0.615, distance: "108.2 million km" },
        { name: "Earth", period: 1.0, distance: "149.6 million km" },
        { name: "Mars", period: 1.881, distance: "227.9 million km" },
        { name: "Jupiter", period: 11.862, distance: "778.6 million km" },
        { name: "Saturn", period: 29.456, distance: "1.432 billion km" },
        { name: "Uranus", period: 84.07, distance: "2.867 billion km" },
        { name: "Neptune", period: 164.81, distance: "4.515 billion km" },
        { name: "Pluto", period: 248.1, distance: "5.906 billion km" }
    ];

    planetsCalculationData.forEach(planet => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = planet.name;
        row.appendChild(nameCell);

        const periodYearsCell = document.createElement('td');
        periodYearsCell.textContent = planet.period.toFixed(3);
        row.appendChild(periodYearsCell);

        const periodDaysCell = document.createElement('td');
        const periodInDays = (planet.period * 365.25).toFixed(2);
        periodDaysCell.textContent = periodInDays;
        row.appendChild(periodDaysCell);

        const distanceCell = document.createElement('td');
        distanceCell.textContent = planet.distance;
        row.appendChild(distanceCell);

        tableBody.appendChild(row);
    });
}