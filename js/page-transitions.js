/**
 * Page Transitions Module - Smooth page navigation with loading overlay
 */

// ====== PAGE TRANSITIONS ======
function handlePageTransition(e) {
    // Only handle internal links that aren't anchors
    if (e.target.tagName === 'A' &&
        e.target.href &&
        e.target.href.startsWith(window.location.origin) &&
        !e.target.href.includes('#') &&
        e.target.target !== '_blank') {

        e.preventDefault();
        const targetUrl = e.target.href;

        // Create and inject black background style
        const styleTag = document.createElement('style');
        styleTag.textContent = `
            html, body {
                background-color: #050505 !important;
                transition: none !important;
            }
        `;
        document.head.appendChild(styleTag);
        void document.documentElement.offsetWidth;

        // Create transition overlay
        let transitionOverlay = document.querySelector('.page-transition');
        if (!transitionOverlay) {
            transitionOverlay = document.createElement('div');
            transitionOverlay.className = 'page-transition';

            const spinner = document.createElement('div');
            spinner.className = 'loader-spinner';
            transitionOverlay.appendChild(spinner);

            const loadingText = document.createElement('div');
            loadingText.className = 'loading-text';
            loadingText.textContent = 'LOADING';
            transitionOverlay.appendChild(loadingText);

            document.body.appendChild(transitionOverlay);
        }

        document.documentElement.style.backgroundColor = '#050505';
        document.body.style.backgroundColor = '#050505';
        void transitionOverlay.offsetWidth;

        transitionOverlay.style.opacity = '1';
        transitionOverlay.style.visibility = 'visible';

        // Save transition state
        try {
            window.name = JSON.stringify({ transitioning: true });
            localStorage.setItem('pageTransitioning', 'true');
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
        if (window.name) {
            try {
                const state = JSON.parse(window.name);
                wasTransitioning = state.transitioning === true;
                window.name = '';
            } catch (e) { }
        }
        if (!wasTransitioning && localStorage.getItem('pageTransitioning') === 'true') {
            wasTransitioning = true;
            localStorage.removeItem('pageTransitioning');
        }
        if (!wasTransitioning && sessionStorage.getItem('pageTransitioning') === 'true') {
            wasTransitioning = true;
            sessionStorage.removeItem('pageTransitioning');
        }
    } catch (e) { }

    // Set background colors
    document.documentElement.style.backgroundColor = '#050505';
    document.body.style.backgroundColor = '#050505';

    const style = document.createElement('style');
    style.textContent = `
        html, body {
            background-color: #050505 !important;
            transition: none !important;
        }
    `;
    document.head.insertBefore(style, document.head.firstChild);

    // Create overlay if needed
    let transitionOverlay = document.querySelector('.page-transition');
    if (!transitionOverlay && wasTransitioning) {
        transitionOverlay = document.createElement('div');
        transitionOverlay.className = 'page-transition';
        transitionOverlay.style.opacity = '1';
        transitionOverlay.style.visibility = 'visible';

        const spinner = document.createElement('div');
        spinner.className = 'loader-spinner';
        transitionOverlay.appendChild(spinner);

        const loadingText = document.createElement('div');
        loadingText.className = 'loading-text';
        loadingText.textContent = 'LOADING';
        transitionOverlay.appendChild(loadingText);

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
            style.textContent = `html, body { background-color: #050505 !important; }`;
            transitionOverlay.style.opacity = '0';
            setTimeout(() => {
                if (transitionOverlay && transitionOverlay.parentNode) {
                    transitionOverlay.parentNode.removeChild(transitionOverlay);
                }
            }, 300);
        }, 100);
    }
}

// Export for use in main.js
window.initPageTransitions = initPageTransitions;
window.handlePageLoad = handlePageLoad;
