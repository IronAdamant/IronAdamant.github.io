/**
 * Main JavaScript Entry Point
 * Orchestrates all modular JS components
 */

// ====== INITIALIZATION ======
function initApp() {
    // Initialize all modules
    if (typeof initNavigation === 'function') initNavigation();
    if (typeof initScrollAnimations === 'function') initScrollAnimations();
    if (typeof initMobileNav === 'function') initMobileNav();
    if (typeof initContactForm === 'function') initContactForm();
}

// ====== BOOTSTRAP ======
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initApp();
        if (typeof initPageTransitions === 'function') initPageTransitions();
        if (typeof handlePageLoad === 'function') handlePageLoad();
    });
} else {
    initApp();
    if (typeof initPageTransitions === 'function') initPageTransitions();
    if (typeof handlePageLoad === 'function') handlePageLoad();
}

// Handle back/forward navigation
window.addEventListener('pageshow', () => {
    if (typeof handlePageLoad === 'function') handlePageLoad();
});
