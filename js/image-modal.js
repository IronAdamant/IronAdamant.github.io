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

// ====== IMAGE LOADING AND MODAL ======
function initImagesAndModal() {
    // Immediate loading for all images with data-src
    const images = document.querySelectorAll('img[data-src]');
    const projectImages = document.querySelectorAll('.project-image img');

    images.forEach(img => {
        img.classList.add('loading');
        img.fetchPriority = 'high';

        if (img.dataset.src) {
            img.src = img.dataset.src;

            img.onload = function () {
                img.classList.remove('loading');
                img.classList.add('loaded');
                img.removeAttribute('data-src');
            };

            img.onerror = function () {
                img.classList.remove('loading');
                img.classList.add('error');
                img.alt = 'Failed to load image';
            };
        }
    });

    // Create modal if it doesn't exist
    if (!document.querySelector('.image-modal')) {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <img class="modal-image" alt="Expanded image">
                <div class="modal-caption"></div>
            </div>
        `;
        document.body.appendChild(modal);

        const modalImage = modal.querySelector('.modal-image');
        const modalCaption = modal.querySelector('.modal-caption');
        const modalClose = modal.querySelector('.modal-close');

        // Click handlers for images
        projectImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.title = 'Click to expand';

            img.addEventListener('click', function () {
                modal.style.display = 'flex';
                modalImage.src = this.src;
                modalCaption.textContent = this.alt || 'Project Image';
                document.body.style.overflow = 'hidden';
            });
        });

        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }

        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', function (e) {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
        });

        // Add modal styles
        if (!document.querySelector('style#modal-styles')) {
            const modalStyles = document.createElement('style');
            modalStyles.id = 'modal-styles';
            modalStyles.textContent = `
                .image-modal {
                    display: none;
                    position: fixed;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                    background-color: rgba(0, 0, 0, 0.95);
                    z-index: 9999;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                }
                .modal-content {
                    position: relative;
                    max-width: 90vw;
                    max-height: 90vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .modal-image {
                    max-width: 100%;
                    max-height: calc(90vh - 60px);
                    object-fit: contain;
                    border: 2px solid var(--primary);
                    box-shadow: 0 0 30px rgba(0, 255, 157, 0.3);
                    animation: zoomIn 0.3s ease;
                }
                .modal-caption {
                    color: var(--text);
                    text-align: center;
                    padding: 10px;
                    font-size: 1rem;
                    margin-top: 10px;
                }
                .modal-close {
                    position: absolute;
                    top: -40px; right: 0;
                    color: var(--primary);
                    font-size: 40px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    z-index: 10000;
                }
                .modal-close:hover {
                    color: var(--primary-light);
                    text-shadow: 0 0 10px var(--primary);
                    transform: scale(1.1);
                }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes zoomIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                .project-image img { transition: transform 0.3s ease, box-shadow 0.3s ease; }
                .project-image img:hover { transform: scale(1.05); box-shadow: 0 0 15px rgba(0, 255, 157, 0.3); }
                @media (max-width: 768px) {
                    .modal-close {
                        top: 10px; right: 10px;
                        font-size: 30px;
                        background: rgba(0, 0, 0, 0.7);
                        width: 40px; height: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 50%;
                    }
                }
            `;
            document.head.appendChild(modalStyles);
        }
    }
}

// Export for use in main.js
window.initImageExpansion = initImageExpansion;
window.initImagesAndModal = initImagesAndModal;
