/**
 * Image Lightbox Module — native <dialog> based image expansion.
 * Replaces the old class-toggle fullscreen hack, which broke inside
 * CSS-contained project cards (contain: paint clips fixed descendants).
 * The dialog renders in the browser top layer, with focus trapping,
 * Esc handling, and a ::backdrop for free. Styles: css/lightbox.css.
 */

let lightboxDialog = null;

function getLightbox() {
    if (lightboxDialog) return lightboxDialog;

    lightboxDialog = document.createElement('dialog');
    lightboxDialog.className = 'lightbox';
    lightboxDialog.innerHTML = `
        <img alt="">
        <p class="lightbox-hint">Click anywhere or press Esc to close</p>
    `;
    lightboxDialog.addEventListener('click', () => lightboxDialog.close());
    document.body.appendChild(lightboxDialog);
    return lightboxDialog;
}

function openLightbox(img) {
    const dialog = getLightbox();
    const view = dialog.querySelector('img');
    view.src = img.currentSrc || img.src;
    view.alt = img.alt;
    dialog.showModal();
}

// ====== IMAGE EXPANSION ======
function initImageExpansion() {
    document.querySelectorAll('.project-image').forEach(container => {
        // Avoid double-init
        if (container.dataset.expandInit) return;

        const img = container.querySelector('img');
        if (!img) return;
        container.dataset.expandInit = 'true';

        const expandHint = document.createElement('span');
        expandHint.className = 'expand-hint';
        expandHint.textContent = 'Click to expand';
        container.appendChild(expandHint);

        // Keyboard-accessible: the container acts as a button
        container.setAttribute('role', 'button');
        container.setAttribute('tabindex', '0');
        container.setAttribute('aria-label', `Expand image: ${img.alt}`);

        container.addEventListener('click', () => openLightbox(img));
        container.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(img);
            }
        });
    });
}

// Export for use in project-loader.js
window.initImageExpansion = initImageExpansion;
