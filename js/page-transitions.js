/**
 * Page Transitions Module - Smooth page navigation with loading overlay
 */

// ====== PAGE TRANSITIONS ======
function handlePageTransition(e) {
    // Only handle internal links that aren't anchors
    const link = e.target.closest('a');
    if (link &&
        link.href &&
        link.href.startsWith(window.location.origin) &&
        !link.href.includes('#') &&
        link.target !== '_blank') {

        e.preventDefault();
        const targetUrl = link.href;

        // Create transition overlay (spinner/text handled by CSS pseudo-elements)
        let transitionOverlay = document.querySelector('.page-transition');
        if (!transitionOverlay) {
            transitionOverlay = document.createElement('div');
            transitionOverlay.className = 'page-transition';
            document.body.appendChild(transitionOverlay);
        }

        void transitionOverlay.offsetWidth;
        transitionOverlay.style.opacity = '1';
        transitionOverlay.style.visibility = 'visible';

        // Save transition state
        try {
            sessionStorage.setItem('pageTransitioning', 'true');
        } catch (e) { }

        // Preload target page
        const prefetch = document.createElement('link');
        prefetch.rel = 'prefetch';
        prefetch.href = targetUrl;
        document.head.appendChild(prefetch);

        // Navigate
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 50);
    }
}

function initPageTransitions() {
    document.addEventListener('click', handlePageTransition);

    // Prefetch pages on hover
    const links = document.getElementsByTagName('a');
    Array.from(links).forEach(link => {
        if (link.href &&
            link.href.startsWith(window.location.origin) &&
            !link.href.includes('#') &&
            link.target !== '_blank') {

            link.addEventListener('mouseenter', () => {
                const prefetchLink = document.createElement('link');
                prefetchLink.rel = 'prefetch';
                prefetchLink.href = link.href;
                document.head.appendChild(prefetchLink);
            }, { once: true });
        }
    });
}

function handlePageLoad() {
    // Check if we were in a page transition
    let wasTransitioning = false;
    try {
        if (sessionStorage.getItem('pageTransitioning') === 'true') {
            wasTransitioning = true;
            sessionStorage.removeItem('pageTransitioning');
        }
    } catch (e) { }

    // Create overlay if needed (spinner/text handled by CSS pseudo-elements)
    let transitionOverlay = document.querySelector('.page-transition');
    if (!transitionOverlay && wasTransitioning) {
        transitionOverlay = document.createElement('div');
        transitionOverlay.className = 'page-transition';
        transitionOverlay.style.opacity = '1';
        transitionOverlay.style.visibility = 'visible';
        document.body.appendChild(transitionOverlay);
    }

    // Fade out overlay
    if (transitionOverlay) {
        if (getComputedStyle(transitionOverlay).opacity === '0') {
            transitionOverlay.style.opacity = '1';
            transitionOverlay.style.visibility = 'visible';
            void transitionOverlay.offsetWidth;
        }

        setTimeout(() => {
            transitionOverlay.style.opacity = '0';
            setTimeout(() => {
                if (transitionOverlay) {
                    transitionOverlay.remove();
                }
            }, 300);
        }, 100);
    }
}

// Export for use in main.js
window.initPageTransitions = initPageTransitions;
window.handlePageLoad = handlePageLoad;
