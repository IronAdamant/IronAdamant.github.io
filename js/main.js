/**
 * Site bootstrap — init modules present on the page.
 */

function initApp() {
    if (typeof initMobileNav === 'function') initMobileNav();
    if (typeof initContactForm === 'function') initContactForm();
    if (typeof initWorkFilters === 'function') initWorkFilters();
    if (typeof initImageExpansion === 'function') initImageExpansion();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
