/**
 * Main JavaScript Entry Point
 * Orchestrates all modular JS components
 */

// ====== INITIALIZATION ======
function initApp() {
    // Initialize all modules
    if (typeof initNavigation === 'function') initNavigation();
    if (typeof initProjectFiltering === 'function') initProjectFiltering();
    if (typeof initScrollAnimations === 'function') initScrollAnimations();
    if (typeof initMobileNav === 'function') initMobileNav();
    if (typeof initImageExpansion === 'function') initImageExpansion();
    if (typeof initContactForm === 'function') initContactForm();
}

// ====== PROJECT PAGE INITIALIZATION ======
document.addEventListener('DOMContentLoaded', () => {
    const isIndexPage = document.querySelector('.featured-projects .project-grid');
    const isProjectsPage = document.querySelector('.project-list');

    if (isIndexPage && typeof renderFeaturedProjects === 'function') {
        renderFeaturedProjects();
    }

    if (isProjectsPage) {
        if (typeof renderProjectsList === 'function') renderProjectsList();
        if (typeof initializeProjectFilters === 'function') initializeProjectFilters();
    }
});

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

// Add page-loaded class
window.addEventListener('load', () => {
    document.body.classList.add('page-loaded');
});
