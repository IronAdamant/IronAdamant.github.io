/**
 * Navigation Module - Smooth scroll, mobile nav, project filtering, scroll animations
 */

// ====== NAVIGATION AND FILTERING ======
function initNavigation() {
    // Optimized smooth scrolling for anchor links
    const handleSmoothScroll = (e) => {
        const targetId = e.currentTarget.getAttribute('href');
        if (targetId === '#' || !targetId.startsWith('#')) return;

        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    // Initialize smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });

    // Add active class to current navigation item
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('nav ul li a');
    menuItems.forEach(item => {
        if (item.href === currentLocation) {
            item.classList.add('active');
        }
    });
}

// ====== PROJECT FILTERING ======
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-category');

            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ====== SCROLL ANIMATIONS ======
function initScrollAnimations() {
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.project-item, .project-card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles
    document.querySelectorAll('.project-item, .project-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
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
window.initNavigation = initNavigation;
window.initProjectFiltering = initProjectFiltering;
window.initScrollAnimations = initScrollAnimations;
window.initMobileNav = initMobileNav;
