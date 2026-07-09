/**
 * Mobile nav drawer + focus management.
 */

function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const navOverlay = document.querySelector('.nav-overlay');

    if (!hamburger || !mobileNav || !navOverlay) return;

    const focusableSelector = 'a[href], button:not([disabled])';
    let lastFocus = null;

    const setOpen = (open) => {
        hamburger.classList.toggle('active', open);
        mobileNav.classList.toggle('active', open);
        navOverlay.classList.toggle('active', open);
        navOverlay.hidden = !open;
        hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.style.overflow = open ? 'hidden' : '';

        if (open) {
            lastFocus = document.activeElement;
            const first = mobileNav.querySelector(focusableSelector);
            if (first) first.focus();
        } else if (lastFocus && typeof lastFocus.focus === 'function') {
            lastFocus.focus();
        }
    };

    const toggle = () => setOpen(!mobileNav.classList.contains('active'));

    hamburger.addEventListener('click', toggle);
    navOverlay.addEventListener('click', () => setOpen(false));

    document.addEventListener('keydown', (e) => {
        if (!mobileNav.classList.contains('active')) return;

        if (e.key === 'Escape') {
            setOpen(false);
            return;
        }

        if (e.key !== 'Tab') return;
        const focusable = [...mobileNav.querySelectorAll(focusableSelector)];
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setOpen(false));
    });
}

window.initMobileNav = initMobileNav;
