/**
 * Resource Optimizer for IronAdamant Portfolio
 * Handles preloading, resource optimization, responsive images, and faster transitions
 * Handles preloading, responsive images, performance metrics, and connection-aware optimizations
 */
(function() {
    'use strict';
    
    // Configuration
    const config = {
        // List of pages to preload on mouse hover
        pagesToPreload: [
            'index.html',
            'projects.html',
            'apps.html',
            'contact.html'
        ],
        // Critical resources to preload immediately
        criticalResources: [
            { url: 'css/main.css', as: 'style' }
        ],
        // Images to preload after critical content
        imagesToPreload: [],
        // Link hover delay before preloading (in ms)
        hoverDelay: 100,
        // Link hover distance for mobile touch detection
        hoverDistance: 150
    };
    
    // Initialize the resource optimizer
    function init() {
        // Collect images to preload from the page
        collectImagesToPreload();
        
        // Set up page preloading on link hover
        setupLinkPreloading();
        
        // Implement improved transition caching
        setupTransitionCaching();
        
        // Optimize image loading
        optimizeImageLoading();
        
        // Collect performance metrics
        collectPerformanceMetrics();
    }
    
    // Collect all images that should be preloaded
    function collectImagesToPreload() {
        // Find all images in project cards
        const projectImages = document.querySelectorAll('.project-card img, .project-item img');
        projectImages.forEach(img => {
            if (img.src && !config.imagesToPreload.includes(img.src)) {
                config.imagesToPreload.push(img.src);
            }
        });
    }
    
    // Set up preloading on link hover
    function setupLinkPreloading() {
        // Find all internal navigation links
        const internalLinks = document.querySelectorAll('a[href]');
        
        internalLinks.forEach(link => {
            // Skip external links or anchor links
            if (!link.href.startsWith(window.location.origin) || 
                link.href.includes('#') || 
                link.target === '_blank') {
                return;
            }
            
            let hoverTimer;

            link.addEventListener('mouseenter', () => {
                hoverTimer = setTimeout(() => {
                    preloadPage(link.href);
                }, config.hoverDelay);
            });

            link.addEventListener('mouseleave', () => {
                clearTimeout(hoverTimer);
            });
        });
    }
    
    // Preload a page and its resources
    function preloadPage(url) {
        // Skip if already preloaded
        if (document.querySelector(`link[rel="prefetch"][href="${url}"]`)) {
            return;
        }
        
        // Create prefetch link
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = url;
        document.head.appendChild(prefetchLink);
    }
    
    // Preload an individual image
    function preloadImage(url) {
        // Skip if already preloaded or if it's a data URL
        if (url.startsWith('data:') || document.querySelector(`link[rel="prefetch"][href="${url}"]`)) {
            return;
        }
        
        // Normalize URL if needed
        if (!url.startsWith('http') && !url.startsWith('/')) {
            url = '/' + url;
        }
        
        // Create prefetch link
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = url;
        prefetchLink.as = 'image';
        document.head.appendChild(prefetchLink);
    }
    
    // Set up transition caching
    function setupTransitionCaching() {
        // Use browser cache control when available
        if ('caches' in window) {
            // Create a custom cache for our site
            caches.open('iron-adamant-portfolio-cache').then(cache => {
                // Cache critical resources
                config.criticalResources.forEach(resource => {
                    cache.add(resource.url).catch(err => {
                        console.error('Failed to cache:', resource.url, err);
                    });
                });
                
                // Pre-cache other pages
                config.pagesToPreload.forEach(page => {
                    cache.add(page).catch(err => {
                        console.error('Failed to cache page:', page, err);
                    });
                });
            });
        }
    }
    
    // Optimize image loading with lazy loading
    function optimizeImageLoading() {
        // Find all images that can be lazy loaded
        const images = document.querySelectorAll('img:not([loading])');
        
        images.forEach(img => {
            // Add loading="lazy" to images
            img.setAttribute('loading', 'lazy');
            
            // Add decode="async" for better rendering performance
            img.setAttribute('decoding', 'async');
            
            // Mark images as not important for LCP
            img.setAttribute('fetchpriority', 'low');
        });
        
        // Preload critical images (hero, first project)
        const criticalImages = document.querySelectorAll('.hero img, .project-item:first-child img');
        criticalImages.forEach(img => {
            img.removeAttribute('loading'); // Remove lazy loading for critical images
            img.setAttribute('fetchpriority', 'high');
        });
        
        // Memory management - clean up unused images
        const memoryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && entry.target.complete) {
                    // Image is out of viewport and loaded
                    const rect = entry.target.getBoundingClientRect();
                    if (rect.top > window.innerHeight * 3 || rect.bottom < -window.innerHeight * 3) {
                        // Image is far from viewport, re-enable lazy loading
                        entry.target.loading = 'lazy';
                    }
                }
            });
        }, {
            rootMargin: '300% 0px'
        });
        
        // Observe all images for memory management
        document.querySelectorAll('img').forEach(img => memoryObserver.observe(img));
    }
    
    // Collect performance metrics
    function collectPerformanceMetrics() {
        if ('performance' in window && 'PerformanceObserver' in window) {
            // Track LCP (Largest Contentful Paint)
            const lcpObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.debug('LCP:', lastEntry.startTime / 1000, 'seconds');
            });
            
            lcpObserver.observe({type: 'largest-contentful-paint', buffered: true});
            
            // Track FID (First Input Delay)
            const fidObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const firstInput = entries[0];
                console.debug('FID:', firstInput.processingStart - firstInput.startTime, 'ms');
            });
            
            fidObserver.observe({type: 'first-input', buffered: true});
            
            // Track CLS (Cumulative Layout Shift)
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                        console.debug('CLS:', clsValue);
                    }
                }
            });
            
            clsObserver.observe({type: 'layout-shift', buffered: true});
            
            // Report comprehensive performance metrics after load
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                        console.debug('Performance Metrics:', {
                            DNS: perfData.domainLookupEnd - perfData.domainLookupStart,
                            TCP: perfData.connectEnd - perfData.connectStart,
                            Request: perfData.responseStart - perfData.requestStart,
                            Response: perfData.responseEnd - perfData.responseStart,
                            DOM: perfData.domComplete - perfData.domLoading,
                            Load: perfData.loadEventEnd - perfData.loadEventStart,
                            Total: perfData.loadEventEnd - perfData.fetchStart
                        });
                    }
                }, 0);
            });
        }
        
        // Connection-aware optimizations
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            // Reduce animations on slow connections
            if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                document.documentElement.classList.add('reduce-motion');
                console.debug('Reduced motion enabled due to slow connection');
            }
            
            // Monitor connection changes
            connection.addEventListener('change', () => {
                console.debug('Connection type changed to:', connection.effectiveType);
            });
        }
    }
    
    // Initialize on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
