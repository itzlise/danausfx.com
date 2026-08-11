document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const gridSize = 70;
    const particleLayer = document.querySelector('.cursor-particles');

    const offsetX = Math.floor(Math.random() * gridSize);
    const offsetY = Math.floor(Math.random() * gridSize);

    root.style.setProperty('--grid-offset-x', `${offsetX}px`);
    root.style.setProperty('--grid-offset-y', `${offsetY}px`);

    if (!particleLayer) {
        return;
    }

    let lastSpawn = 0;
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;

    const spawnParticle = (x, y, spread = 16) => {
        const particle = document.createElement('span');
        particle.className = 'cursor-particle';

        const size = 5 + Math.random() * 5;
        const driftX = (Math.random() - 0.5) * 16;
        const driftY = -8 - Math.random() * 14;
        const posX = x + (Math.random() - 0.5) * spread;
        const posY = y + (Math.random() - 0.5) * spread;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.setProperty('--particle-drift-x', `${driftX}px`);
        particle.style.setProperty('--particle-drift-y', `${driftY}px`);

        particleLayer.appendChild(particle);

        window.setTimeout(() => {
            particle.remove();
        }, 1200);
    };

    window.addEventListener('pointermove', (event) => {
        cursorX = event.clientX;
        cursorY = event.clientY;

        const now = performance.now();

        if (now - lastSpawn < 36) {
            return;
        }

        lastSpawn = now;
        spawnParticle(cursorX, cursorY, 14);
    }, { passive: true });

    window.setInterval(() => {
        spawnParticle(cursorX, cursorY, 10);
    }, 220);
});
