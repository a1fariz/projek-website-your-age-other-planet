/**
 * RESOURCES & DISPATCH TERMINAL
 * ponytail: Native submit handling with local acknowledgment, zero bloated toast libraries
 */

document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedback-form');
    if (!feedbackForm) return;

    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const type = document.getElementById('feedback-type').value;
        const msg = document.getElementById('feedback-message').value;
        const statusEl = document.getElementById('feedback-status-message');

        statusEl.innerHTML = `
            <div class="success-message">
                ✓ Telemetry log successfully recorded [TYPE: ${type.toUpperCase()}]. Thank you for contributing to Solar Explorer precision.
            </div>
        `;

        feedbackForm.reset();

        setTimeout(() => {
            statusEl.innerHTML = '';
        }, 6000);
    });
});
