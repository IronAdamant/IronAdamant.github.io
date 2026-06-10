/**
 * Navigation Module - Mobile nav drawer and scroll-reveal animations.
 * Smooth anchor scrolling is handled by CSS (scroll-behavior + scroll-padding-top in base.css).
 */

// ====== SCROLL-REVEAL ANIMATIONS ======
// Adds .in-view as cards enter the viewport; the hidden initial state lives in
// animations.css behind @media (scripting: enabled), so content is never
// hidden for no-JS visitors.
function initScrollAnimations() {
    // Idempotent: only picks up elements not yet initialized, so it can be
    // called again after dynamic renders (see project-loader.js)
    const elements = [...document.querySelectorAll('.project-item, .project-card')]
        .filter(el => !el.dataset.revealInit);
    if (elements.length === 0) return;
    elements.forEach(el => { el.dataset.revealInit = 'true'; });

    if (!('IntersectionObserver' in window)) {
        elements.forEach(el => el.classList.add('in-view'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        }
    }, { rootMargin: '0px 0px -60px 0px' });

    elements.forEach(el => observer.observe(el));
}

// ====== MOBILE NAVIGATION ======
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const navOverlay = document.querySelector('.nav-overlay');

    if (!hamburger || !mobileNav || !navOverlay) return;

    const toggleMobileNav = () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        navOverlay.classList.toggle('active');

        const isExpanded = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
        document.body.style.overflow = isExpanded ? 'hidden' : '';
    };

    hamburger.addEventListener('click', toggleMobileNav);
    navOverlay.addEventListener('click', toggleMobileNav);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            toggleMobileNav();
        }
    });

    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav.classList.contains('active')) {
                toggleMobileNav();
            }
        });
    });
}

// Export for use in main.js
window.initScrollAnimations = initScrollAnimations;
window.initMobileNav = initMobileNav;
