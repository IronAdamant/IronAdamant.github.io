/**
 * Image Modal Module - Image expansion and modal functionality
 */

// ====== IMAGE EXPANSION (Inline) ======
function initImageExpansion() {
    const projectImages = document.querySelectorAll('.project-image');

    projectImages.forEach(container => {
        const expandHint = document.createElement('span');
        expandHint.className = 'expand-hint';
        expandHint.textContent = 'Click to expand';
        container.appendChild(expandHint);

        container.addEventListener('click', function () {
            const img = this.querySelector('img');
            if (!this.classList.contains('expanded')) {
                this.classList.add('expanded');
                this.style.zIndex = '1000';

                const closeHint = document.createElement('span');
                closeHint.className = 'close-hint';
                closeHint.textContent = 'Click anywhere to close';
                closeHint.style.cssText = 'position:absolute;top:20px;left:50%;transform:translateX(-50%);color:var(--primary);padding:10px 20px;border-radius:4px;background:rgba(0,0,0,0.7);';
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
        element.style.zIndex = '';

        const closeHint = element.querySelector('.close-hint');
        if (closeHint) closeHint.remove();

        document.body.style.overflow = '';
    }
}

// Export for use in main.js
window.initImageExpansion = initImageExpansion;
