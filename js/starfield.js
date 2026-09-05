/* ==========================================================
   STARFIELD ENGINE - HIGH PERFORMANCE CANVAS (NO DOM BLOAT)
   ponytail: Minimal realistic star luminance, no disco neon
   ========================================================== */
(function() {
    const canvas = document.createElement('canvas');
    canvas.id = 'starfield-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    Object.assign(canvas.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: '0'
    });

    const oldContainer = document.getElementById('stars');
    if (oldContainer) {
        oldContainer.parentNode.replaceChild(canvas, oldContainer);
    } else {
        document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    let width = 0;
    let height = 0;
    let stars = [];
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let animId = null;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        initStars();
    }

    function initStars() {
        const count = Math.min(Math.floor((width * height) / 5000), 220);
        stars = new Array(count);
        for (let i = 0; i < count; i++) {
            stars[i] = {
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.2 + 0.4,
                alpha: Math.random() * 0.5 + 0.15,
                twinkleSpeed: Math.random() * 0.015 + 0.005,
                phase: Math.random() * Math.PI * 2,
                depth: Math.random() * 0.6 + 0.1
            };
        }
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', function(e) {
        targetX = (e.clientX / width - 0.5) * 15;
        targetY = (e.clientY / height - 0.5) * 15;
    }, { passive: true });

    function render() {
        if (prefersReducedMotion.matches) {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < stars.length; i++) {
                const s = stars[i];
                ctx.fillStyle = `rgba(200, 205, 215, ${s.alpha * 0.7})`;
                ctx.fillRect(s.x, s.y, s.size, s.size);
            }
            return;
        }

        mouseX += (targetX - mouseX) * 0.04;
        mouseY += (targetY - mouseY) * 0.04;

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < stars.length; i++) {
            const s = stars[i];
            s.phase += s.twinkleSpeed;
            const currentAlpha = Math.max(0.08, s.alpha + Math.sin(s.phase) * 0.18);

            const px = s.x - mouseX * s.depth;
            const py = s.y - mouseY * s.depth;

            const wrappedX = (px % width + width) % width;
            const wrappedY = (py % height + height) % height;

            ctx.fillStyle = `rgba(220, 225, 235, ${currentAlpha})`;
            ctx.beginPath();
            ctx.arc(wrappedX, wrappedY, s.size, 0, Math.PI * 2);
            ctx.fill();
        }

        animId = requestAnimationFrame(render);
    }

    resize();
    render();
})();
