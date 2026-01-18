
/* ==========================================
   API & LOCAL STORAGE
   ========================================== */

const NASA_API_KEY = 'uRlqkEJIXEcH9btbVeUlf6ZBafcvTgFC6nY5u8zZ';
const NASA_BASE_URL = 'https://www.nasa.gov/';


const PLANET_DATA = {
    sun: {
        name: 'Sun',
        icon: '☀️',
        type: 'Star',
        diameter: '1,392,700 km',
        mass: '1.989 × 10³⁰ kg',
        temperature: '5,778 K (surface)',
        composition: 'Hydrogen (73%), Helium (25%)',
        funFact: 'The Sun contains 99.86% of the mass in the Solar System',
        nasaUrl: 'https://solarsystem.nasa.gov/solar-system/sun/overview/'
    },
    mercury: {
        name: 'Mercury',
        icon: '🟠',
        type: 'Terrestrial Planet',
        diameter: '4,879 km',
        mass: '3.301 × 10²³ kg',
        distance: '57.9 million km from Sun',
        orbitalPeriod: '88 Earth days',
        dayLength: '59 Earth days',
        temperature: '-173°C to 427°C',
        composition: 'Iron core, silicate mantle',
        funFact: 'Mercury has no atmosphere and extreme temperature variations',
        nasaUrl: 'https://solarsystem.nasa.gov/planets/mercury/overview/'
    },
    venus: {
        name: 'Venus',
        icon: '🔴',
        type: 'Terrestrial Planet',
        diameter: '12,104 km',
        mass: '4.867 × 10²⁴ kg',
        distance: '108.2 million km from Sun',
        orbitalPeriod: '225 Earth days',
        dayLength: '243 Earth days',
        temperature: '462°C (hottest planet)',
        composition: 'Dense CO₂ atmosphere, sulfuric acid clouds',
        funFact: 'Venus rotates backwards and is the hottest planet in our solar system',
        nasaUrl: 'https://solarsystem.nasa.gov/planets/venus/overview/'
    },
    earth: {
        name: 'Earth',
        icon: '🌍',
        type: 'Terrestrial Planet',
        diameter: '12,756 km',
        mass: '5.972 × 10²⁴ kg',
        distance: '149.6 million km from Sun',
        orbitalPeriod: '365.25 days',
        dayLength: '24 hours',
        temperature: '-89°C to 58°C',
        composition: 'Nitrogen (78%), Oxygen (21%) atmosphere',
        funFact: 'The only known planet with life and liquid water on its surface',
        nasaUrl: 'https://solarsystem.nasa.gov/planets/earth/overview/'
    },
    mars: {
        name: 'Mars',
        icon: '🟠',
        type: 'Terrestrial Planet',
        diameter: '6,792 km',
        mass: '6.39 × 10²³ kg',
        distance: '227.9 million km from Sun',
        orbitalPeriod: '687 Earth days',
        dayLength: '24.6 hours',
        temperature: '-87°C to -5°C',
        composition: 'Thin CO₂ atmosphere, iron oxide surface',
        funFact: 'Mars has the largest volcano in the solar system - Olympus Mons',
        nasaUrl: 'https://solarsystem.nasa.gov/planets/mars/overview/'
    },
    jupiter: {
        name: 'Jupiter',
        icon: '🟤',
        type: 'Gas Giant',
        diameter: '142,984 km',
        mass: '1.898 × 10²⁷ kg',
        distance: '778.5 million km from Sun',
        orbitalPeriod: '12 Earth years',
        dayLength: '9.9 hours',
        temperature: '-108°C',
        composition: 'Hydrogen (89%), Helium (10%)',
        funFact: 'Jupiter has over 80 moons and a Great Red Spot storm larger than Earth',
        nasaUrl: 'https://solarsystem.nasa.gov/planets/jupiter/overview/'
    },
    saturn: {
        name: 'Saturn',
        icon: '🪐',
        type: 'Gas Giant',
        diameter: '120,536 km',
        mass: '5.683 × 10²⁶ kg',
        distance: '1.432 billion km from Sun',
        orbitalPeriod: '29.5 Earth years',
        dayLength: '10.7 hours',
        temperature: '-139°C',
        composition: 'Hydrogen (96%), Helium (3%)',
        funFact: 'Saturn has spectacular rings made of ice and rock particles',
        nasaUrl: 'https://solarsystem.nasa.gov/planets/saturn/overview/'
    },
    uranus: {
        name: 'Uranus',
        icon: '🟣',
        type: 'Ice Giant',
        diameter: '51,118 km',
        mass: '8.681 × 10²⁵ kg',
        distance: '2.867 billion km from Sun',
        orbitalPeriod: '84 Earth years',
        dayLength: '17.2 hours',
        temperature: '-197°C',
        composition: 'Water, methane, ammonia ices',
        funFact: 'Uranus rotates on its side at a 98-degree angle',
        nasaUrl: 'https://solarsystem.nasa.gov/planets/uranus/overview/'
    },
    neptune: {
        name: 'Neptune',
        icon: '🔵',
        type: 'Ice Giant',
        diameter: '49,528 km',
        mass: '1.024 × 10²⁶ kg',
        distance: '4.515 billion km from Sun',
        orbitalPeriod: '165 Earth years',
        dayLength: '16.1 hours',
        temperature: '-201°C',
        composition: 'Water, methane, ammonia ices',
        funFact: 'Neptune has the fastest winds in the solar system, up to 2,100 km/h',
        nasaUrl: 'https://solarsystem.nasa.gov/planets/neptune/overview/'
    }
};

// Global variabel
let currentPlanet = null;

// inisialisasi aplikasi
function init() {
    createStars();
    setupEventListeners();
    showDefaultPlanetInfo();
}

// membuat animasi bintang
function createStars() {
    const starsContainer = document.getElementById('stars');
    const numberOfStars = 200;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = (Math.random() * 3) + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        starsContainer.appendChild(star);
    }
}

// Setup event listeners
function setupEventListeners() {
    // tombol konten nasa
    document.getElementById('fetch-apod-btn').addEventListener('click', fetchAPOD);
    document.getElementById('fetch-solar-system-btn').addEventListener('click', fetchSolarSystemOverview);

    // tombol planet
    const planetButtons = document.querySelectorAll('.planet-btn');
    planetButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planetName = this.dataset.planet;
            selectPlanet(planetName);
        });
    });
}

// menampilkan planet info
function showDefaultPlanetInfo() {
    const infoContent = document.getElementById('planet-info-content');
    infoContent.replaceChildren(); 
    const placeholderDiv = document.createElement('div');
    placeholderDiv.className = 'loading-placeholder';
    const p = document.createElement('p');
    p.textContent = 'Select a planet from the left to view detailed information powered by NASA data';
    placeholderDiv.appendChild(p);
    infoContent.appendChild(placeholderDiv);
}

// Fetch untuk NASA Astronomy Picture of the Day
async function fetchAPOD() {
    const contentContainer = document.getElementById('nasa-content');
    const titleElement      = document.getElementById('content-title');
    const descriptionElement= document.getElementById('content-description');
    const button            = document.getElementById('fetch-apod-btn');

    // 1. coba ambil cache dulu
    if (
        localStorage.getItem('lastAPOD') &&
        Date.now() - localStorage.getItem('lastAPODTime') < 3600000
    ) {
        renderAPOD(JSON.parse(localStorage.getItem('lastAPOD')));
        return; // keluar fungsi
    }

    // 2. jika belum ada cache / sudah kadaluarsa
    button.disabled = true;
    button.textContent = '🔄 Loading...';

    contentContainer.replaceChildren();
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.textContent = 'Loading NASA Astronomy Picture of the Day...';
    contentContainer.appendChild(loadingDiv);

    try {
        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
        );
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

        const data = await response.json();

        // simpan ke cache
        localStorage.setItem('lastAPOD', JSON.stringify(data));
        localStorage.setItem('lastAPODTime', Date.now());

        renderAPOD(data);
    } catch (err) {
        console.error(err);
        contentContainer.replaceChildren();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = `Error: ${err.message}`;
        contentContainer.appendChild(errorDiv);

        titleElement.textContent = 'Error Loading Content';
        descriptionElement.textContent = 'Please try again later.';
    } finally {
        button.disabled = false;
        button.textContent = '🚀 Get NASA Picture of the Day';
    }
}


/* ==========================================
   RENDER APOD
   ========================================== */
function renderAPOD(data) {
    const contentContainer = document.getElementById('nasa-content');
    const titleElement      = document.getElementById('content-title');
    const descriptionElement= document.getElementById('content-description');

    titleElement.textContent = data.title;


/* ==========================================
   DESKRIPSI
   ========================================== */
    descriptionElement.replaceChildren();
    const explanationP = document.createElement('p');
    explanationP.textContent = data.explanation;
    descriptionElement.appendChild(explanationP);

    const dateDiv = document.createElement('div');
    dateDiv.className = 'apod-date';
    dateDiv.textContent = `Date: ${data.date}`;
    descriptionElement.appendChild(dateDiv);

    if (data.copyright) {
        const copyrightDiv = document.createElement('div');
        copyrightDiv.className = 'apod-copyright';
        copyrightDiv.textContent = `Copyright: ${data.copyright}`;
        descriptionElement.appendChild(copyrightDiv);
    }

    
/* ==========================================
   MEDIA
   ========================================== */
    contentContainer.replaceChildren();
    let media;
    switch (data.media_type) {
        case 'image':
            media = document.createElement('img');
            media.src = data.hdurl || data.url;
            media.alt = data.title || 'NASA APOD';
            Object.assign(media.style, { maxWidth:'100%', maxHeight:'100%', objectFit:'contain', borderRadius:'10px' });
            break;
        case 'video':
            const embed = data.url.includes('watch?v=')
                ? data.url.replace('watch?v=', 'embed/')
                : data.url;
            media = document.createElement('iframe');
            media.src = embed;
            media.allowFullscreen = true;
            Object.assign(media.style, { width:'100%', height:'100%', border:'none' });
            break;
        case 'audio':
            media = document.createElement('audio');
            media.src = data.url;
            media.controls = true;
            media.style.width = '100%';
            break;
        default:
            media = document.createElement('div');
            media.className = 'fallback-media';
            const link = document.createElement('a');
            link.href = data.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = 'View interactive content on NASA site ↗';
            link.className = 'nasa-link';
            media.appendChild(link);
    }
    contentContainer.appendChild(media);
}


/* ==========================================
   FETCH UNTUK SOLAR SYSTEM OVERVIEW
   ========================================== */
async function fetchSolarSystemOverview() {
    const contentContainer = document.getElementById('nasa-content');
    const titleElement = document.getElementById('content-title');
    const descriptionElement = document.getElementById('content-description');
    const button = document.getElementById('fetch-solar-system-btn');

    // Set untuk loading state
    button.disabled = true;
    button.textContent = '🔄 Loading...';
    contentContainer.replaceChildren(); 
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.textContent = 'Loading Solar System Overview...';
    contentContainer.appendChild(loadingDiv);

    try {
        const solarSystemVideoUrl = 'https://www.youtube.com/embed/libKVRa01L8'; // NASA Solar System Tour
        
        titleElement.textContent = 'Solar System Overview';
        
        // Refactor untuk descriptionElemen
        descriptionElement.replaceChildren(); 
        const p1 = document.createElement('p');
        p1.textContent = 'Explore our Solar System with this comprehensive overview from NASA.';
        descriptionElement.appendChild(p1);

        const p2 = document.createElement('p');
        p2.textContent = 'Learn about the eight planets, their moons, and other celestial bodies that make up our cosmic neighborhood.';
        descriptionElement.appendChild(p2);

        const aLink = document.createElement('a');
        aLink.href = 'https://solarsystem.nasa.gov/';
        aLink.target = '_blank';
        aLink.className = 'nasa-link';
        aLink.textContent = 'Visit NASA Solar System Exploration';
        descriptionElement.appendChild(aLink);
        
        // Refactor untuk contentContainer
        contentContainer.replaceChildren();
        const iframe = document.createElement('iframe');
        iframe.src = solarSystemVideoUrl;
        iframe.frameBorder = '0';
        iframe.allowFullscreen = true;
        contentContainer.appendChild(iframe);

    } catch (error) {
        console.error('Error loading solar system overview:', error);
        contentContainer.replaceChildren(); 
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = `Error loading Solar System overview: ${error.message}`;
        contentContainer.appendChild(errorDiv);

        titleElement.textContent = 'Error Loading Content';
        descriptionElement.textContent = 'Please try again later or check your internet connection.';
    } finally {
        button.disabled = false;
        button.textContent = '🌟 Solar System Overview';
    }
}



/* ==========================================
   MEMILIH DAN MELIHAT DATA PLANER
   ========================================== */
function selectPlanet(planetName) {
    currentPlanet = planetName;
    
    // Update active button
    const planetButtons = document.querySelectorAll('.planet-btn');
    planetButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-planet="${planetName}"]`).classList.add('active');
    
    // menampilkan planet information
    displayPlanetInfo(planetName);
    
    // Fetch untuk mengambil data tambahan di nasa
    fetchPlanetNASAData(planetName);
}



/* ==========================================
   DISPLAY PLANET INFORMATION
   ========================================== */
function displayPlanetInfo(planetName) {
    const planet = PLANET_DATA[planetName];
    const infoContent = document.getElementById('planet-info-content');
    
    infoContent.replaceChildren(); 

    if (!planet) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = 'Planet data not found';
        infoContent.appendChild(errorDiv);
        return;
    }
    
    const planetDetailsDiv = document.createElement('div');
    planetDetailsDiv.className = 'planet-details active';

    
/* ==========================================
   PLANET HEADER
   ========================================== */
    const planetHeaderDiv = document.createElement('div');
    planetHeaderDiv.className = 'planet-header';
    const planetIconDiv = document.createElement('div');
    planetIconDiv.className = 'planet-icon';
    planetIconDiv.textContent = planet.icon;
    const h3Name = document.createElement('h3');
    h3Name.textContent = planet.name;
    planetHeaderDiv.appendChild(planetIconDiv);
    planetHeaderDiv.appendChild(h3Name);
    planetDetailsDiv.appendChild(planetHeaderDiv);

    // Info Grid
    const infoGridDiv = document.createElement('div');
    infoGridDiv.className = 'info-grid';

    // pembantu untuk create info items
    const createInfoItem = (title, content, gridColumn = null) => {
        const item = document.createElement('div');
        item.className = 'info-item';
        if (gridColumn) {
            item.style.gridColumn = gridColumn;
        }
        const h4 = document.createElement('h4');
        h4.textContent = title;
        item.appendChild(h4);
        const p = document.createElement('p');
        p.textContent = content;
        item.appendChild(p);
        return item;
    };

    infoGridDiv.appendChild(createInfoItem('Type', planet.type));
    infoGridDiv.appendChild(createInfoItem('Diameter', planet.diameter));
    infoGridDiv.appendChild(createInfoItem('Mass', planet.mass));

    if (planet.distance) {
        infoGridDiv.appendChild(createInfoItem('Distance from Sun', planet.distance));
    }
    if (planet.orbitalPeriod) {
        infoGridDiv.appendChild(createInfoItem('Orbital Period', planet.orbitalPeriod));
    }
    if (planet.dayLength) {
        infoGridDiv.appendChild(createInfoItem('Day Length', planet.dayLength));
    }

    infoGridDiv.appendChild(createInfoItem('Temperature', planet.temperature));
    infoGridDiv.appendChild(createInfoItem('Composition', planet.composition));
    infoGridDiv.appendChild(createInfoItem('Fun Fact', planet.funFact, '1 / -1')); // Fun Fact spans all columns

    planetDetailsDiv.appendChild(infoGridDiv);

    // NASA Link
    const nasaLinkDiv = document.createElement('div');
    nasaLinkDiv.style.textAlign = 'center';
    nasaLinkDiv.style.marginTop = '2rem';
    const nasaLinkA = document.createElement('a');
    nasaLinkA.href = planet.nasaUrl;
    nasaLinkA.target = '_blank';
    nasaLinkA.className = 'nasa-link';
    nasaLinkA.textContent = `View ${planet.name} on NASA Solar System Exploration`;
    nasaLinkDiv.appendChild(nasaLinkA);
    planetDetailsDiv.appendChild(nasaLinkDiv);

    // Wadah NASA Data Container
    const additionalDataContainer = document.createElement('div');
    additionalDataContainer.id = `nasa-planet-data-${planetName}`;
    additionalDataContainer.className = 'nasa-additional-data';
    planetDetailsDiv.appendChild(additionalDataContainer);

    infoContent.appendChild(planetDetailsDiv);
}



/* ==========================================
   FETCH DATA NASA TAMBAHAN UNTUK PLANET TERTENTU
   ========================================== */
async function fetchPlanetNASAData(planetName) {
    const additionalDataContainer = document.getElementById(`nasa-planet-data-${planetName}`);
    
    if (!additionalDataContainer) return;
    
    // Show loading 
    additionalDataContainer.replaceChildren();
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.textContent = 'Loading additional NASA data...';
    additionalDataContainer.appendChild(loadingDiv);
    
    try {
        if (planetName === 'mars') {
            await fetchMarsWeatherData(additionalDataContainer);
        } else if (planetName === 'earth') {
            await fetchEarthImagery(additionalDataContainer);
        } else {
            // untuk planet lain, menampilkan pencarian umum NASA atau untuk konten terkait
            await fetchGeneralPlanetData(planetName, additionalDataContainer);
        }
    } catch (error) {
        console.error(`Error fetching NASA data for ${planetName}:`, error);
        additionalDataContainer.replaceChildren(); 
        const itemDiv = document.createElement('div');
        itemDiv.className = 'info-item';
        const h4 = document.createElement('h4');
        h4.textContent = 'NASA Data';
        itemDiv.appendChild(h4);
        const p = document.createElement('p');
        p.textContent = 'Additional NASA data temporarily unavailable. Please visit the NASA link above for more information.';
        itemDiv.appendChild(p);
        additionalDataContainer.appendChild(itemDiv);
    }
}

// Fetch data MARS cuasa mars (jika api nya ada)
async function fetchMarsWeatherData(container) {
    container.replaceChildren();
    const itemDiv = document.createElement('div');
    itemDiv.className = 'info-item';
    itemDiv.style.marginTop = '2rem';

    const h4 = document.createElement('h4');
    h4.textContent = 'Mars Exploration';
    itemDiv.appendChild(h4);

    const p = document.createElement('p');
    p.textContent = `Mars is currently being explored by NASA's Perseverance rover and Ingenuity helicopter.
    The rover is searching for signs of ancient microbial life and collecting rock samples for future return to Earth.`;
    itemDiv.appendChild(p);

    const aLink = document.createElement('a');
    aLink.href = 'https://mars.nasa.gov/mars2020/';
    aLink.target = '_blank';
    aLink.className = 'nasa-link';
    aLink.textContent = 'Follow Mars 2020 Mission';
    itemDiv.appendChild(aLink);

    container.appendChild(itemDiv);
}

// Fetch untuk Earth imagery
async function fetchEarthImagery(container) {
    container.replaceChildren(); 
    const itemDiv = document.createElement('div');
    itemDiv.className = 'info-item';
    itemDiv.style.marginTop = '2rem';

    const h4 = document.createElement('h4');
    h4.textContent = 'Earth from Space';
    itemDiv.appendChild(h4);

    const p = document.createElement('p');
    p.textContent = `NASA's Earth Observing System provides continuous observations of Earth's climate system.
    These satellites help us understand climate change, weather patterns, and natural disasters.`;
    itemDiv.appendChild(p);

    const aLink = document.createElement('a');
    aLink.href = 'https://earthobservatory.nasa.gov/';
    aLink.target = '_blank';
    aLink.className = 'nasa-link';
    aLink.textContent = 'Visit NASA Earth Observatory';
    itemDiv.appendChild(aLink);

    container.appendChild(itemDiv);
}

/* ==========================================
   FETCH DATA PLANET UMUM
   ========================================== */
async function fetchGeneralPlanetData(planetName, container) {
    container.replaceChildren();
    const missionInfo = {
        mercury: {
            mission: "MESSENGER",
            description: "NASA's MESSENGER spacecraft provided detailed information about Mercury's surface, magnetic field, and interior structure.",
            link: "https://solarsystem.nasa.gov/missions/messenger/in-depth/"
        },
        venus: {
            mission: "Magellan",
            description: "NASA's Magellan mission mapped Venus's surface using radar, revealing volcanic features and impact craters.",
            link: "https://solarsystem.nasa.gov/missions/magellan/in-depth/"
        },
        jupiter: {
            mission: "Juno",
            description: "NASA's Juno spacecraft is currently orbiting Jupiter, studying its atmosphere, magnetosphere, and interior structure.",
            link: "https://solarsystem.nasa.gov/missions/juno/in-depth/"
        },
        saturn: {
            mission: "Cassini",
            description: "NASA's Cassini mission provided incredible insights into Saturn's rings, moons, and atmospheric dynamics.",
            link: "https://solarsystem.nasa.gov/missions/cassini/in-depth/"
        },
        uranus: {
            mission: "Voyager 2",
            description: "NASA's Voyager 2 is the only spacecraft to visit Uranus, providing most of our knowledge about this ice giant.",
            link: "https://solarsystem.nasa.gov/missions/voyager-2/in-depth/"
        },
        neptune: {
            mission: "Voyager 2",
            description: "NASA's Voyager 2 also visited Neptune, discovering its dynamic atmosphere and unusual magnetic field.",
            link: "https://solarsystem.nasa.gov/missions/voyager-2/in-depth/"
        }
    };

    const info = missionInfo[planetName];
    const itemDiv = document.createElement('div');
    itemDiv.className = 'info-item';
    itemDiv.style.marginTop = '2rem';

    if (info) {
        const h4 = document.createElement('h4');
        h4.textContent = `NASA Mission: ${info.mission}`;
        itemDiv.appendChild(h4);

        const p = document.createElement('p');
        p.textContent = info.description;
        itemDiv.appendChild(p);

        const aLink = document.createElement('a');
        aLink.href = info.link;
        aLink.target = '_blank';
        aLink.className = 'nasa-link';
        aLink.textContent = `Learn More About ${info.mission}`;
        itemDiv.appendChild(aLink);
    } else {
        const h4 = document.createElement('h4');
        h4.textContent = 'NASA Exploration';
        itemDiv.appendChild(h4);

        const p = document.createElement('p');
        p.textContent = `NASA continues to study ${PLANET_DATA[planetName].name} through various space missions and telescopic observations.`;
        itemDiv.appendChild(p);
    }
    container.appendChild(itemDiv);
}

// fungsi untuk menangani kesalahan api
function handleAPIError(error, context) {
    console.error(`API Error in ${context}:`, error);
    
    if (error.message.includes('API key')) {
        return 'NASA API key required. Please configure a valid API key.';
    } else if (error.message.includes('rate limit')) {
        return 'NASA API rate limit exceeded. Please try again later.';
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
        return 'Network error. Please check your internet connection.';
    } else {
        return `Error loading ${context}. Please try again later.`;
    }
}

// inisialisasi saat dom dimuat
document.addEventListener('DOMContentLoaded', init);