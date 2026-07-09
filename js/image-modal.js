/**
 * Native <dialog> image lightbox for work images.
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
    view.alt = img.alt || '';
    dialog.showModal();
}

function initImageExpansion() {
    document.querySelectorAll('.work-card-image').forEach((container) => {
        if (container.dataset.expandInit) return;
        const img = container.querySelector('img');
        if (!img) return;
        container.dataset.expandInit = 'true';

        const expandHint = document.createElement('span');
        expandHint.className = 'expand-hint';
        expandHint.textContent = 'Expand';
        container.appendChild(expandHint);

        container.setAttribute('role', 'button');
        container.setAttribute('tabindex', '0');
        container.setAttribute('aria-label', `Expand image: ${img.alt || 'screenshot'}`);

        container.addEventListener('click', () => openLightbox(img));
        container.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(img);
            }
        });
    });
}

window.initImageExpansion = initImageExpansion;
