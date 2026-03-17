/**
 * Resource Optimizer for IronAdamant Portfolio
 * Handles image loading optimization
 */
(function() {
    'use strict';

    // Add lazy loading to images that don't already have a loading attribute
    function init() {
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            img.setAttribute('loading', 'lazy');
            img.setAttribute('decoding', 'async');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
