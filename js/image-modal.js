/**
 * Image Modal Module - Image expansion and modal functionality
 */

// Inject required styles once
(function injectStyles() {
    if (document.getElementById('image-modal-styles')) return;
    const style = document.createElement('style');
    style.id = 'image-modal-styles';
    style.textContent = `
        .project-image .expand-hint {
            position: absolute;
            bottom: 8px;
            right: 8px;
            color: var(--primary);
            font-size: 0.75rem;
            padding: 4px 10px;
            border-radius: 4px;
            background: rgba(0,0,0,0.7);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }
        .project-image:hover .expand-hint { opacity: 1; }
        .project-image.expanded {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            width: 100%; height: 100%;
            z-index: 1000;
            background: rgba(0,0,0,0.95);
            border-radius: 0;
            overflow: visible;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: zoom-out;
        }
        .project-image.expanded img {
            max-width: 90vw;
            max-height: 90vh;
            width: auto;
            height: auto;
            object-fit: contain;
        }
        .project-image.expanded .expand-hint { display: none; }
    `;
    document.head.appendChild(style);
})();

// ====== IMAGE EXPANSION (Inline) ======
function initImageExpansion() {
    const projectImages = document.querySelectorAll('.project-image');
    if (projectImages.length === 0) return;

    projectImages.forEach(container => {
        // Avoid double-init
        if (container.dataset.expandInit) return;
        container.dataset.expandInit = 'true';

        const expandHint = document.createElement('span');
        expandHint.className = 'expand-hint';
        expandHint.textContent = 'Click to expand';
        container.appendChild(expandHint);

        container.addEventListener('click', function () {
            if (!this.classList.contains('expanded')) {
                this.classList.add('expanded');

                const closeHint = document.createElement('span');
                closeHint.className = 'close-hint';
                closeHint.textContent = 'Click anywhere to close';
                closeHint.style.cssText = 'position:absolute;top:20px;left:50%;transform:translateX(-50%);color:var(--primary);padding:10px 20px;border-radius:4px;background:rgba(0,0,0,0.7);z-index:1001;';
                this.appendChild(closeHint);

                document.body.style.overflow = 'hidden';
                document.addEventListener('keydown', closeOnEscape);
            } else {
                closeExpandedImage(this);
            }
        });
    });

    function closeOnEscape(e) {
        if (e.key === 'Escape') {
            const expandedImage = document.querySelector('.project-image.expanded');
            if (expandedImage) {
                closeExpandedImage(expandedImage);
            }
            document.removeEventListener('keydown', closeOnEscape);
        }
    }

    function closeExpandedImage(element) {
        element.classList.remove('expanded');

        const closeHint = element.querySelector('.close-hint');
        if (closeHint) closeHint.remove();

        document.body.style.overflow = '';
        document.removeEventListener('keydown', closeOnEscape);
    }
}

// Export for use in main.js
window.initImageExpansion = initImageExpansion;
