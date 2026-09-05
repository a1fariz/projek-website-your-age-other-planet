/* ==========================================================
   AMBIENT ORRERY (HERO BACKGROUND)
   Pure canvas, no card chrome, no controls — blends into page
   ========================================================== */
(function() {
    const container = document.querySelector('.hero-visual');
    if (!container) return;

    container.innerHTML = `
        <canvas id="hero-orrery-canvas" aria-hidden="true"></canvas>
        <div id="orrery-tooltip" class="orrery-tooltip"></div>
    `;

    const canvas = document.getElementById('hero-orrery-canvas');
    const tooltip = document.getElementById('orrery-tooltip');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let mouseX = -999;
    let mouseY = -999;

    const planets = [
        { name: 'Mercury', r: 52, speed: 0.038, size: 3.2, color: '#8b9099', angle: 0.4, period: '88d', dist: '57.9M km' },
        { name: 'Venus',   r: 86, speed: 0.024, size: 4.4, color: '#b3906b', angle: 1.8, period: '225d', dist: '108.2M km' },
        { name: 'Earth',   r: 126, speed: 0.015, size: 5.0, color: '#6a8296', angle: 3.6, hasMoon: true, period: '365d', dist: '149.6M km' },
        { name: 'Mars',    r: 166, speed: 0.010, size: 3.8, color: '#a3603f', angle: 2.3, period: '687d', dist: '227.9M km' },
        { name: 'Jupiter', r: 208, speed: 0.005, size: 9.5, color: '#a07850', angle: 4.9, period: '11.9y', dist: '778.6M km' },
        { name: 'Saturn',  r: 248, speed: 0.003, size: 8.0, color: '#bfa878', angle: 0.9, hasRings: true, period: '29.5y', dist: '1.43B km' }
    ];

    function resize() {
        const rect = container.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = rect.width;
        height = rect.height;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.scale(dpr, dpr);
    }

    window.addEventListener('resize', resize);
    resize();

    // Mouse tracking for tooltips
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    container.addEventListener('mouseleave', () => {
        mouseX = -999;
        mouseY = -999;
        if (tooltip) tooltip.style.opacity = '0';
    });

    let moonAngle = 0;

    function render() {
        ctx.clearRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;
        const scale = Math.min(width, height) / 560;

        // Central Sun Radiant Core
        const sunRadius = 20 * scale;
        const sunGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, sunRadius * 3.6);
        sunGrad.addColorStop(0, 'rgba(216, 180, 130, 0.75)');
        sunGrad.addColorStop(0.3, 'rgba(190, 150, 95, 0.28)');
        sunGrad.addColorStop(0.7, 'rgba(160, 120, 70, 0.08)');
        sunGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, sunRadius * 3.6, 0, Math.PI * 2);
        ctx.fill();

        const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, sunRadius);
        coreGrad.addColorStop(0, '#f2e8d8');
        coreGrad.addColorStop(0.6, '#c8a06a');
        coreGrad.addColorStop(1, '#8a6642');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, sunRadius, 0, Math.PI * 2);
        ctx.fill();

        let hoveredPlanet = null;

        // Render Orbits & Planetary Bodies
        planets.forEach(p => {
            const orbitR = p.r * scale;

            // Subtle trajectory ring
            ctx.strokeStyle = 'rgba(200, 205, 214, 0.09)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(cx, cy, orbitR, 0, Math.PI * 2);
            ctx.stroke();

            // Advance orbit
            p.angle += p.speed * 0.4;

            const px = cx + Math.cos(p.angle) * orbitR;
            const py = cy + Math.sin(p.angle) * orbitR;
            const pSize = p.size * scale;

            // Hover detection
            const distToMouse = Math.hypot(mouseX - px, mouseY - py);
            const isHovered = distToMouse < pSize + 12;
            if (isHovered) hoveredPlanet = { p, px, py };

            // Saturn Rings
            if (p.hasRings) {
                ctx.save();
                ctx.translate(px, py);
                ctx.rotate(0.38);
                ctx.strokeStyle = 'rgba(191, 168, 120, 0.5)';
                ctx.lineWidth = 3 * scale;
                ctx.beginPath();
                ctx.ellipse(0, 0, pSize * 2.5, pSize * 0.85, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            // Planet Atmosphere Glow
            ctx.shadowColor = p.color;
            ctx.shadowBlur = isHovered ? 12 * scale : 6 * scale;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(px, py, pSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            // Day/Night Terminator Shadow
            const angleToSun = Math.atan2(py - cy, px - cx);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
            ctx.beginPath();
            ctx.arc(px, py, pSize, angleToSun - Math.PI / 2, angleToSun + Math.PI / 2, false);
            ctx.fill();

            // Hover indicator
            if (isHovered) {
                ctx.strokeStyle = 'rgba(232, 230, 225, 0.85)';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(px, py, pSize + 5, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Earth Moon
            if (p.hasMoon) {
                moonAngle += 0.05;
                const moonR = 11 * scale;
                const mx = px + Math.cos(moonAngle) * moonR;
                const my = py + Math.sin(moonAngle) * moonR;
                ctx.fillStyle = '#c5c2bb';
                ctx.beginPath();
                ctx.arc(mx, my, 1.4 * scale, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        // Tooltip
        if (tooltip) {
            if (hoveredPlanet) {
                const { p, px, py } = hoveredPlanet;
                tooltip.innerHTML = `
                    <strong>${p.name}</strong>
                    <span>Orbit: ${p.period} · ${p.dist}</span>
                `;
                tooltip.style.left = `${px + 14}px`;
                tooltip.style.top = `${py - 30}px`;
                tooltip.style.opacity = '1';
            } else {
                tooltip.style.opacity = '0';
            }
        }

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
})();
