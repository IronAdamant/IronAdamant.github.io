/**
 * Main JavaScript Entry Point
 * Orchestrates all modular JS components.
 * Page transitions are handled natively by the View Transitions API (see animations.css).
 */

// ====== INITIALIZATION ======
function initApp() {
    // Initialize all modules (each page loads only the modules it needs)
    if (typeof initScrollAnimations === 'function') initScrollAnimations();
    if (typeof initMobileNav === 'function') initMobileNav();
    if (typeof initContactForm === 'function') initContactForm();
}

// ====== BOOTSTRAP ======
// Deferred scripts run while readyState is 'interactive', BEFORE DOMContentLoaded
// fires — so wait for it unless the document is already fully loaded. This keeps
// initApp after project-loader's own DOMContentLoaded handler (registered earlier),
// so dynamically rendered cards exist by the time the observers initialize.
if (document.readyState === 'complete') {
    initApp();
} else {
    document.addEventListener('DOMContentLoaded', initApp);
}
