/**
 * 3D SOLAR WALK ENGINE & NASA OBSERVATION DATA
 * Realistic procedural shaders/textures, atmosphere glow, dynamic shadows, Saturn ring alpha, axial tilt
 * ponytail: High-res procedural canvas multi-pass textures + bump/normal simulation without external asset downloads
 */

const PLANET_3D_SPECS = {
    sun: { 
        id: 'sun', 
        name: 'Sun', 
        radius: 11.0, 
        distance: 0, 
        color: 0xffaa11, 
        orbitSpeed: 0, 
        spinSpeed: 0.001, 
        tilt: 0.12,
        emissive: true 
    },
    mercury: { 
        id: 'mercury', 
        name: 'Mercury', 
        radius: 1.9, 
        distance: 26, 
        color: 0x9ca3af, 
        orbitSpeed: 0.038, 
        spinSpeed: 0.003, 
        tilt: 0.03,
        roughness: 0.9, 
        metalness: 0.1 
    },
    venus: { 
        id: 'venus', 
        name: 'Venus', 
        radius: 2.7, 
        distance: 40, 
        color: 0xdeb887, 
        orbitSpeed: 0.026, 
        spinSpeed: -0.002, 
        tilt: 3.1, // retrograde
        roughness: 0.8, 
        atmosphere: 0xffe4b5,
        atmosphereOpacity: 0.35 
    },
    earth: { 
        id: 'earth', 
        name: 'Earth', 
        radius: 3.0, 
        distance: 58, 
        color: 0x224263, 
        orbitSpeed: 0.018, 
        spinSpeed: 0.015, 
        tilt: 0.41, // 23.5 degrees
        roughness: 0.5, 
        metalness: 0.05,
        clouds: true,
        atmosphere: 0x73a9c2,
        atmosphereOpacity: 0.35
    },
    mars: { 
        id: 'mars', 
        name: 'Mars', 
        radius: 2.2, 
        distance: 76, 
        color: 0xbf573f, 
        orbitSpeed: 0.013, 
        spinSpeed: 0.014, 
        tilt: 0.44, 
        roughness: 0.85, 
        metalness: 0.1 
    },
    jupiter: { 
        id: 'jupiter', 
        name: 'Jupiter', 
        radius: 7.2, 
        distance: 104, 
        color: 0xc89e74, 
        orbitSpeed: 0.0075, 
        spinSpeed: 0.025, 
        tilt: 0.05,
        roughness: 0.65, 
        bands: true 
    },
    saturn: { 
        id: 'saturn', 
        name: 'Saturn', 
        radius: 5.8, 
        distance: 136, 
        color: 0xd9c59e, 
        orbitSpeed: 0.0055, 
        spinSpeed: 0.022, 
        tilt: 0.47, 
        hasRings: true,
        roughness: 0.65 
    },
    uranus: { 
        id: 'uranus', 
        name: 'Uranus', 
        radius: 4.1, 
        distance: 168, 
        color: 0x8ec3cc, 
        orbitSpeed: 0.0038, 
        spinSpeed: -0.014, 
        tilt: 1.71, // 98 degrees
        hasRings: true,
        roughness: 0.6 
    },
    neptune: { 
        id: 'neptune', 
        name: 'Neptune', 
        radius: 3.9, 
        distance: 198, 
        color: 0x3d64c8, 
        orbitSpeed: 0.0028, 
        spinSpeed: 0.016, 
        tilt: 0.49,
        roughness: 0.6,
        atmosphere: 0x4d88ff,
        atmosphereOpacity: 0.3 
    }
};

/**
 * Generate ultra-detailed, seamless astronomical procedural textures
 */
function createRealisticPlanetTexture(spec) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const w = canvas.width;
    const h = canvas.height;

    if (spec.id === 'sun') {
        // High energy chromosphere with solar granulation & flare spots
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#ff9900');
        grad.addColorStop(0.5, '#ffbb33');
        grad.addColorStop(1, '#ff8800');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Solar granules
        ctx.fillStyle = 'rgba(255, 235, 180, 0.25)';
        for (let i = 0; i < 4000; i++) {
            const rx = Math.random() * w;
            const ry = Math.random() * h;
            const size = Math.random() * 4 + 1;
            ctx.fillRect(rx, ry, size, size);
        }

        // Solar prominences / dark magnetic spots
        ctx.fillStyle = 'rgba(180, 70, 0, 0.4)';
        for (let i = 0; i < 30; i++) {
            const sx = Math.random() * w;
            const sy = Math.random() * h;
            ctx.beginPath();
            ctx.arc(sx, sy, Math.random() * 12 + 4, 0, Math.PI * 2);
            ctx.fill();
        }

    } else if (spec.id === 'earth') {
        // Deep ocean blue
        ctx.fillStyle = '#102238';
        ctx.fillRect(0, 0, w, h);

        // Continental landmasses
        ctx.fillStyle = '#2d4a2d';
        const continents = [
            { x: 260, y: 180, r: 85 }, // Americas North
            { x: 320, y: 320, r: 75 }, // Americas South
            { x: 540, y: 190, r: 90 }, // Eurasia
            { x: 560, y: 300, r: 80 }, // Africa
            { x: 780, y: 340, r: 55 }  // Australia
        ];

        continents.forEach(c => {
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
            ctx.fill();
            // Fractal edge noise
            for (let j = 0; j < 35; j++) {
                const ox = c.x + (Math.random() - 0.5) * c.r * 1.6;
                const oy = c.y + (Math.random() - 0.5) * c.r * 1.4;
                ctx.beginPath();
                ctx.arc(ox, oy, Math.random() * 30 + 10, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        // Arid land desert highlights (Sahara / Australia)
        ctx.fillStyle = '#6e5a3a';
        ctx.beginPath();
        ctx.arc(540, 260, 45, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(770, 330, 30, 0, Math.PI * 2);
        ctx.fill();

        // Polar ice caps
        ctx.fillStyle = '#eaf2f8';
        ctx.fillRect(0, 0, w, 30);
        ctx.fillRect(0, h - 35, w, 35);

    } else if (spec.id === 'jupiter') {
        // Atmospheric zonal bands & turbulent eddies
        const bands = [
            '#a07855', '#d6b896', '#8c5d3b', '#edd5be', 
            '#aa774e', '#cfab88', '#99623d', '#c29b74'
        ];
        const bandH = h / bands.length;
        bands.forEach((color, idx) => {
            ctx.fillStyle = color;
            ctx.fillRect(0, idx * bandH, w, bandH);
        });

        // Micro turbulent atmospheric stripes
        for (let y = 0; y < h; y += 3) {
            ctx.fillStyle = (y % 6 === 0) ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
            ctx.fillRect(0, y, w, 2);
        }

        // The Great Red Spot storm
        const grsX = 640;
        const grsY = 320;
        const grsGrad = ctx.createRadialGradient(grsX, grsY, 5, grsX, grsY, 40);
        grsGrad.addColorStop(0, '#a73b22');
        grsGrad.addColorStop(0.7, '#c25838');
        grsGrad.addColorStop(1, 'rgba(194, 88, 56, 0)');
        ctx.fillStyle = grsGrad;
        ctx.beginPath();
        ctx.ellipse(grsX, grsY, 50, 28, 0, 0, Math.PI * 2);
        ctx.fill();

    } else if (spec.id === 'saturn') {
        // Subtle creamy ammonia & helium bands
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#c9b48c');
        grad.addColorStop(0.3, '#dfceac');
        grad.addColorStop(0.5, '#beaa82');
        grad.addColorStop(0.7, '#e4d6b8');
        grad.addColorStop(1, '#c0ab85');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        for (let y = 0; y < h; y += 4) {
            ctx.fillStyle = (y % 8 === 0) ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
            ctx.fillRect(0, y, w, 2);
        }

    } else if (spec.id === 'mars') {
        // Oxidized iron dust & basalt rock basins
        ctx.fillStyle = '#b54e32';
        ctx.fillRect(0, 0, w, h);

        // Dark basalt plains (Syrtis Major, Acidalia Planitia)
        ctx.fillStyle = '#6b3021';
        for (let i = 0; i < 25; i++) {
            const bx = Math.random() * w;
            const by = 100 + Math.random() * (h - 200);
            ctx.beginPath();
            ctx.arc(bx, by, Math.random() * 50 + 20, 0, Math.PI * 2);
            ctx.fill();
        }

        // Polar dry-ice cap (Carbon dioxide frost)
        ctx.fillStyle = '#f0e6df';
        ctx.beginPath();
        ctx.ellipse(w / 2, 12, 120, 20, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(w / 2, h - 10, 140, 22, 0, 0, Math.PI * 2);
        ctx.fill();

    } else if (spec.id === 'mercury') {
        // Ancient cratered regolith
        ctx.fillStyle = '#83878f';
        ctx.fillRect(0, 0, w, h);

        // Impact craters
        for (let i = 0; i < 180; i++) {
            const cx = Math.random() * w;
            const cy = Math.random() * h;
            const r = Math.random() * 12 + 2;

            // Shadow rim
            ctx.fillStyle = 'rgba(40, 42, 48, 0.4)';
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.fill();

            // Highlight rim
            ctx.fillStyle = 'rgba(210, 215, 225, 0.3)';
            ctx.beginPath();
            ctx.arc(cx - r * 0.2, cy - r * 0.2, r * 0.6, 0, Math.PI * 2);
            ctx.fill();
        }

    } else if (spec.id === 'venus') {
        // Opaque supercritical CO2 & sulfuric acid cloud canopy
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#c7a36b');
        grad.addColorStop(0.5, '#deb97d');
        grad.addColorStop(1, '#be985f');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Soft atmospheric swirls
        ctx.fillStyle = 'rgba(255, 240, 210, 0.15)';
        for (let i = 0; i < 15; i++) {
            ctx.beginPath();
            ctx.ellipse(Math.random() * w, Math.random() * h, 140, 25, 0.1, 0, Math.PI * 2);
            ctx.fill();
        }

    } else if (spec.id === 'uranus' || spec.id === 'neptune') {
        // Deep methane atmosphere with faint upper troposphere haze
        const baseHex = '#' + new THREE.Color(spec.color).getHexString();
        ctx.fillStyle = baseHex;
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = 'rgba(255,255,255,0.06)';
        for (let y = 0; y < h; y += 12) {
            ctx.fillRect(0, y, w, 4);
        }

        if (spec.id === 'neptune') {
            // Great Dark Spot
            ctx.fillStyle = 'rgba(20, 40, 100, 0.45)';
            ctx.beginPath();
            ctx.ellipse(380, 280, 45, 24, -0.1, 0, Math.PI * 2);
            ctx.fill();
            // High altitude cirrus methane clouds
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.beginPath();
            ctx.ellipse(430, 275, 30, 6, -0.08, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    return new THREE.CanvasTexture(canvas);
}

/**
 * Creates separate dynamic translucent cloud layer for Earth
 */
function createEarthCloudTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(245, 250, 255, 0.7)';
    for (let i = 0; i < 90; i++) {
        const cx = Math.random() * canvas.width;
        const cy = 40 + Math.random() * (canvas.height - 80);
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.random() * 80 + 30, Math.random() * 20 + 8, Math.random() * 0.4 - 0.2, 0, Math.PI * 2);
        ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
}

/**
 * Procedural photorealistic Saturn ring texture with Cassini division
 */
function createSaturnRingTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
    grad.addColorStop(0.0, 'rgba(0,0,0,0)');
    grad.addColorStop(0.12, 'rgba(165,148,122,0.3)');  // C Ring (Crepe)
    grad.addColorStop(0.28, 'rgba(215,198,168,0.85)'); // B Ring (Dense)
    grad.addColorStop(0.58, 'rgba(195,178,148,0.9)');
    grad.addColorStop(0.60, 'rgba(0,0,0,0)');          // Cassini Division
    grad.addColorStop(0.66, 'rgba(180,165,138,0.75)'); // A Ring
    grad.addColorStop(0.88, 'rgba(160,145,120,0.6)');
    grad.addColorStop(0.92, 'rgba(0,0,0,0)');          // Encke Gap
    grad.addColorStop(0.96, 'rgba(150,135,110,0.3)');
    grad.addColorStop(1.0, 'rgba(0,0,0,0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, 1);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
}

class Solar3DEngine {
    constructor() {
        this.container = document.getElementById('three-stage');
        if (!this.container) return;

        this.planets = {};
        this.orbitLines = [];
        this.speedMultiplier = 1.0;
        this.isPlaying = true;
        this.trailsVisible = true;
        this.currentTarget = null;
        this.overviewPos = new THREE.Vector3(0, 140, 230);

        this.init();
    }

    init() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x06070a);

        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 3000);
        this.camera.position.copy(this.overviewPos);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.15;
        this.container.appendChild(this.renderer.domElement);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxDistance = 600;
        this.controls.minDistance = 8;

        // Realistic Sun Radiant Core Light (Inverse-square decay)
        const sunLight = new THREE.PointLight(0xfff5e6, 3.2, 1200, 0.2);
        sunLight.position.set(0, 0, 0);
        this.scene.add(sunLight);

        // Deep space ambient bounce
        const deepSpaceAmbient = new THREE.AmbientLight(0x1a1e28, 0.85);
        this.scene.add(deepSpaceAmbient);

        // High-depth Starfield with spectral luminance variation
        const starGeo = new THREE.BufferGeometry();
        const starCount = 2800;
        const starPositions = new Float32Array(starCount * 3);
        const starColors = new Float32Array(starCount * 3);

        const starPalette = [
            new THREE.Color(0xffffff),
            new THREE.Color(0xdce7ff),
            new THREE.Color(0xffe6cf),
            new THREE.Color(0xbdd3ff)
        ];

        for (let i = 0; i < starCount; i++) {
            const idx = i * 3;
            const r = 450 + Math.random() * 650;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            starPositions[idx] = r * Math.sin(phi) * Math.cos(theta);
            starPositions[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
            starPositions[idx + 2] = r * Math.cos(phi);

            const chosenColor = starPalette[Math.floor(Math.random() * starPalette.length)];
            starColors[idx] = chosenColor.r;
            starColors[idx + 1] = chosenColor.g;
            starColors[idx + 2] = chosenColor.b;
        }

        starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

        const starMat = new THREE.PointsMaterial({
            size: 1.35,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });
        this.scene.add(new THREE.Points(starGeo, starMat));

        // Build Planetary System
        Object.values(PLANET_3D_SPECS).forEach(spec => {
            const isSun = spec.id === 'sun';
            const sphereGeo = new THREE.SphereGeometry(spec.radius, 48, 48);
            const texture = createRealisticPlanetTexture(spec);

            let mat;
            if (isSun) {
                mat = new THREE.MeshBasicMaterial({ map: texture });
            } else {
                mat = new THREE.MeshStandardMaterial({
                    map: texture,
                    roughness: spec.roughness || 0.7,
                    metalness: spec.metalness || 0.05
                });
            }

            const mesh = new THREE.Mesh(sphereGeo, mat);
            mesh.userData = { id: spec.id, spec };

            // Apply realistic axial tilt
            if (spec.tilt) {
                mesh.rotation.z = spec.tilt;
            }

            // Body container for heliocentric positioning
            const pivot = new THREE.Group();
            pivot.position.x = spec.distance;
            pivot.add(mesh);

            // Sun corona glow layers
            if (isSun) {
                const coronaGeo = new THREE.SphereGeometry(spec.radius * 1.18, 36, 36);
                const coronaMat = new THREE.MeshBasicMaterial({
                    color: 0xffaa00,
                    transparent: true,
                    opacity: 0.22,
                    side: THREE.BackSide
                });
                mesh.add(new THREE.Mesh(coronaGeo, coronaMat));

                const outerCoronaGeo = new THREE.SphereGeometry(spec.radius * 1.38, 36, 36);
                const outerCoronaMat = new THREE.MeshBasicMaterial({
                    color: 0xff7700,
                    transparent: true,
                    opacity: 0.09,
                    side: THREE.BackSide
                });
                mesh.add(new THREE.Mesh(outerCoronaGeo, outerCoronaMat));

                this.scene.add(pivot);
            } else {
                // Kepler Orbit Trajectory Ring
                const curve = new THREE.EllipseCurve(0, 0, spec.distance, spec.distance, 0, 2 * Math.PI, false, 0);
                const pts = curve.getPoints(160);
                const lineGeo = new THREE.BufferGeometry().setFromPoints(pts.map(p => new THREE.Vector3(p.x, 0, p.y)));
                const lineMat = new THREE.LineBasicMaterial({
                    color: 0x303644,
                    transparent: true,
                    opacity: 0.45
                });
                const orbitLine = new THREE.Line(lineGeo, lineMat);
                this.scene.add(orbitLine);
                this.orbitLines.push(orbitLine);

                // Earth dynamic atmospheric haze & clouds
                if (spec.clouds) {
                    const cloudGeo = new THREE.SphereGeometry(spec.radius * 1.018, 48, 48);
                    const cloudMat = new THREE.MeshStandardMaterial({
                        map: createEarthCloudTexture(),
                        transparent: true,
                        opacity: 0.65,
                        blending: THREE.AdditiveBlending
                    });
                    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
                    mesh.add(cloudMesh);
                    mesh.userData.clouds = cloudMesh;
                }

                // Planetary atmospheric Rayleigh scatter halo
                if (spec.atmosphere) {
                    const atmoGeo = new THREE.SphereGeometry(spec.radius * 1.07, 36, 36);
                    const atmoMat = new THREE.MeshBasicMaterial({
                        color: spec.atmosphere,
                        transparent: true,
                        opacity: spec.atmosphereOpacity || 0.25,
                        side: THREE.BackSide
                    });
                    mesh.add(new THREE.Mesh(atmoGeo, atmoMat));
                }

                // Photorealistic Rings (Saturn / Uranus)
                if (spec.hasRings) {
                    const isSaturn = spec.id === 'saturn';
                    const innerR = spec.radius * (isSaturn ? 1.35 : 1.45);
                    const outerR = spec.radius * (isSaturn ? 2.55 : 2.0);
                    const ringGeo = new THREE.RingGeometry(innerR, outerR, 96);

                    // UV mapping for radial ring texture
                    const pos = ringGeo.attributes.position;
                    const uvs = [];
                    for (let i = 0; i < pos.count; i++) {
                        const vx = pos.getX(i);
                        const vy = pos.getY(i);
                        const dist = Math.sqrt(vx * vx + vy * vy);
                        const u = (dist - innerR) / (outerR - innerR);
                        uvs.push(u, 0.5);
                    }
                    ringGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

                    const ringTexture = isSaturn ? createSaturnRingTexture() : null;
                    const ringMat = new THREE.MeshStandardMaterial({
                        map: ringTexture,
                        color: isSaturn ? 0xffffff : 0x88bbcc,
                        side: THREE.DoubleSide,
                        transparent: true,
                        opacity: isSaturn ? 0.85 : 0.35,
                        roughness: 0.6
                    });

                    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
                    ringMesh.rotation.x = Math.PI / 2;
                    mesh.add(ringMesh);
                }

                this.scene.add(pivot);
            }

            this.planets[spec.id] = {
                pivot,
                mesh,
                spec,
                angle: Math.random() * Math.PI * 2
            };
        });

        this.setupStageControls();
        this.setupClickRaycaster();

        window.addEventListener('resize', () => {
            const w = this.container.clientWidth;
            const h = this.container.clientHeight;
            this.camera.aspect = w / h;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(w, h);
        });

        this.animate();
    }

    setupStageControls() {
        const btnPause = document.getElementById('btn-pause-sim');
        const sliderSpeed = document.getElementById('slider-speed');
        const labelSpeed = document.getElementById('label-speed');
        const btnTrails = document.getElementById('btn-trails-sim');
        const btnReset = document.getElementById('btn-reset-view');

        if (btnPause) {
            btnPause.addEventListener('click', () => {
                this.isPlaying = !this.isPlaying;
                btnPause.textContent = this.isPlaying ? '❚❚ Pause' : '▶ Play';
            });
        }

        if (sliderSpeed && labelSpeed) {
            sliderSpeed.addEventListener('input', (e) => {
                this.speedMultiplier = parseFloat(e.target.value);
                labelSpeed.textContent = `${this.speedMultiplier.toFixed(1)}x`;
            });
        }

        if (btnTrails) {
            btnTrails.addEventListener('click', () => {
                this.trailsVisible = !this.trailsVisible;
                this.orbitLines.forEach(l => l.visible = this.trailsVisible);
                btnTrails.textContent = `Orbit Trails: ${this.trailsVisible ? 'ON' : 'OFF'}`;
                btnTrails.classList.toggle('active', this.trailsVisible);
            });
        }

        if (btnReset) {
            btnReset.addEventListener('click', () => this.flyToOverview());
        }
    }

    setupClickRaycaster() {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        this.container.addEventListener('click', (e) => {
            const rect = this.container.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, this.camera);
            const meshes = Object.values(this.planets).map(p => p.mesh);
            const hits = raycaster.intersectObjects(meshes, false);

            if (hits.length > 0) {
                const id = hits[0].object.userData.id;
                if (id) {
                    this.flyToPlanet(id);
                    selectPlanet(id);
                }
            }
        });
    }

    flyToPlanet(id) {
        const target = this.planets[id];
        if (!target) return;
        this.currentTarget = id;

        const targetPos = target.pivot.position;
        const offset = target.spec.radius * 3.8 + 10;

        if (window.gsap) {
            gsap.to(this.camera.position, {
                x: targetPos.x + offset,
                y: targetPos.y + offset * 0.5,
                z: targetPos.z + offset,
                duration: 1.25,
                ease: 'power2.out'
            });
            gsap.to(this.controls.target, {
                x: targetPos.x,
                y: targetPos.y,
                z: targetPos.z,
                duration: 1.25,
                ease: 'power2.out'
            });
        } else {
            this.camera.position.set(targetPos.x + offset, targetPos.y + offset * 0.5, targetPos.z + offset);
            this.controls.target.copy(targetPos);
        }
    }

    flyToOverview() {
        this.currentTarget = null;
        if (window.gsap) {
            gsap.to(this.camera.position, {
                x: this.overviewPos.x,
                y: this.overviewPos.y,
                z: this.overviewPos.z,
                duration: 1.35,
                ease: 'power2.out'
            });
            gsap.to(this.controls.target, {
                x: 0, y: 0, z: 0,
                duration: 1.35,
                ease: 'power2.out'
            });
        } else {
            this.camera.position.copy(this.overviewPos);
            this.controls.target.set(0, 0, 0);
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.isPlaying) {
            Object.values(this.planets).forEach(item => {
                const { pivot, mesh, spec } = item;

                // Diurnal axial spin
                mesh.rotation.y += spec.spinSpeed * this.speedMultiplier;

                // Earth cloud differential rotation
                if (mesh.userData.clouds) {
                    mesh.userData.clouds.rotation.y += (spec.spinSpeed * 1.25) * this.speedMultiplier;
                }

                // Heliocentric Keplerian revolution
                if (spec.orbitSpeed > 0) {
                    item.angle += spec.orbitSpeed * 0.015 * this.speedMultiplier;
                    pivot.position.x = Math.cos(item.angle) * spec.distance;
                    pivot.position.z = Math.sin(item.angle) * spec.distance;
                }
            });

            // Smooth focus tracking on selected celestial body
            if (this.currentTarget && this.planets[this.currentTarget]) {
                const targetPivot = this.planets[this.currentTarget].pivot;
                this.controls.target.lerp(targetPivot.position, 0.08);
            }
        }

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

/* ==========================================================
   NASA APOD & PLANETARY INSPECTOR
   ========================================================== */
const NASA_DEMO_KEY = 'DEMO_KEY';
let solar3DEngine = null;

document.addEventListener('DOMContentLoaded', () => {
    solar3DEngine = new Solar3DEngine();
    setupPlanetButtons();
    setupNasaActions();
    selectPlanet('earth');
});

function setupPlanetButtons() {
    const buttons = document.querySelectorAll('.planet-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const planetId = btn.getAttribute('data-planet');
            selectPlanet(planetId);
            if (solar3DEngine) solar3DEngine.flyToPlanet(planetId);
        });
    });
}

function selectPlanet(planetId) {
    const buttons = document.querySelectorAll('.planet-btn');
    buttons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-planet') === planetId));

    const planet = PLANETS_DATA[planetId];
    const container = document.getElementById('planet-info-content');
    if (!planet || !container) return;

    container.innerHTML = `
        <div class="planet-spec-header">
            <div class="planet-spec-badge" style="color: ${planet.color};">
                ${planet.symbol || '☉'}
            </div>
            <div>
                <h3 class="planet-spec-name">${planet.name}</h3>
                <span class="planet-spec-type">${planet.type}</span>
            </div>
        </div>

        <div class="spec-grid">
            <div class="spec-cell">
                <span class="spec-cell-label">Diameter</span>
                <span class="spec-cell-val">${planet.diameter}</span>
            </div>
            <div class="spec-cell">
                <span class="spec-cell-label">Mass</span>
                <span class="spec-cell-val">${planet.mass}</span>
            </div>
            <div class="spec-cell">
                <span class="spec-cell-label">Orbital Period</span>
                <span class="spec-cell-val">${planet.orbitalPeriod || planet.period + ' Earth Yrs'}</span>
            </div>
            <div class="spec-cell">
                <span class="spec-cell-label">Day Length</span>
                <span class="spec-cell-val">${planet.dayLength || 'N/A'}</span>
            </div>
            <div class="spec-cell">
                <span class="spec-cell-label">Surface Temp</span>
                <span class="spec-cell-val">${planet.temperature}</span>
            </div>
            <div class="spec-cell">
                <span class="spec-cell-label">Distance from Sun</span>
                <span class="spec-cell-val">${planet.distance || 'Central Star'}</span>
            </div>
        </div>

        <div class="spec-fact-box">
            <h4>ASTRONOMICAL FACT</h4>
            <p>${planet.funFact}</p>
        </div>

        <div class="spec-actions">
            <a href="${planet.nasaUrl}" target="_blank" rel="noopener" class="btn-nasa-link">
                View NASA Deep Space Profile →
            </a>
        </div>
    `;
}

function setupNasaActions() {
    const btnApod = document.getElementById('fetch-apod-btn');
    const btnSolar = document.getElementById('fetch-solar-system-btn');

    if (btnApod) {
        btnApod.addEventListener('click', fetchNasaAPOD);
    }
    if (btnSolar) {
        btnSolar.addEventListener('click', renderSolarVideoOverview);
    }
}

async function fetchNasaAPOD() {
    const container = document.getElementById('nasa-content');
    const titleEl = document.getElementById('content-title');
    const descEl = document.getElementById('content-description');
    const btn = document.getElementById('fetch-apod-btn');

    btn.disabled = true;
    btn.textContent = 'CONNECTING TO NASA...';
    container.innerHTML = '<div class="loading-placeholder">Fetching Astronomy Picture of the Day from NASA Open Data...</div>';

    try {
        const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_DEMO_KEY}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        titleEl.textContent = data.title;
        descEl.innerHTML = `<p>${data.explanation}</p><span class="apod-date">Observation Date: ${data.date}</span>`;

        if (data.media_type === 'image') {
            container.innerHTML = `<img src="${data.url}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover; border-radius:6px;">`;
        } else if (data.media_type === 'video') {
            container.innerHTML = `<iframe src="${data.url}" allowfullscreen style="width:100%; height:100%; border:none; border-radius:6px;"></iframe>`;
        }
    } catch (err) {
        titleEl.textContent = 'NASA Telemetry Offline';
        descEl.textContent = 'Failed to load live NASA APOD feed. Please verify network connectivity.';
        container.innerHTML = '<div class="loading-placeholder">NASA APOD feed temporarily unavailable.</div>';
    } finally {
        btn.disabled = false;
        btn.textContent = 'Fetch NASA APOD';
    }
}

function renderSolarVideoOverview() {
    const container = document.getElementById('nasa-content');
    const titleEl = document.getElementById('content-title');
    const descEl = document.getElementById('content-description');

    titleEl.textContent = 'Solar System Grand Tour — NASA JPL';
    descEl.textContent = 'An educational visual flyby of our solar system, charting the planetary boundaries from Mercury to the Kuiper Belt.';

    container.innerHTML = `
        <video controls autoplay muted loop style="width:100%; height:100%; object-fit:cover; border-radius:6px;">
            <source src="../css/assets/video-tata-surya.mp4" type="video/mp4">
            Your browser does not support HTML5 video streaming.
        </video>
    `;
}
