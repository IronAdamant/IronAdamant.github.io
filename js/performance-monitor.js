// Performance monitoring and optimization
(function() {
    'use strict';
    
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
        // Largest Contentful Paint
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
        }).observe({entryTypes: ['largest-contentful-paint']});
        
        // First Input Delay
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        }).observe({entryTypes: ['first-input']});
        
        // Cumulative Layout Shift
        let clsValue = 0;
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                    console.log('CLS:', clsValue);
                }
            }
        }).observe({entryTypes: ['layout-shift']});
    }
    
    // Prefetch links on hover
    let prefetchedUrls = new Set();
    
    document.addEventListener('mouseover', function(e) {
        const link = e.target.closest('a');
        if (link && link.href && !prefetchedUrls.has(link.href)) {
            const url = new URL(link.href);
            
            // Only prefetch internal links
            if (url.origin === window.location.origin) {
                const linkEl = document.createElement('link');
                linkEl.rel = 'prefetch';
                linkEl.href = link.href;
                document.head.appendChild(linkEl);
                prefetchedUrls.add(link.href);
            }
        }
    });
    
    // Connection-aware loading
    if ('connection' in navigator) {
        const connection = navigator.connection;
        
        // Reduce animations on slow connections
        if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            document.documentElement.classList.add('reduce-motion');
            console.log('Reduced motion enabled due to slow connection');
        }
        
        // Monitor connection changes
        connection.addEventListener('change', () => {
            console.log('Connection type changed to:', connection.effectiveType);
        });
    }
    
    // Memory management - clean up unused images
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && entry.target.complete) {
                // Image is out of viewport and loaded
                const rect = entry.target.getBoundingClientRect();
                if (rect.top > window.innerHeight * 3 || rect.bottom < -window.innerHeight * 3) {
                    // Image is far from viewport, consider cleanup
                    entry.target.loading = 'lazy';
                }
            }
        });
    }, {
        rootMargin: '300% 0px'
    });
    
    // Observe all images
    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
    
    // Report performance metrics
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Performance Metrics:', {
                DNS: perfData.domainLookupEnd - perfData.domainLookupStart,
                TCP: perfData.connectEnd - perfData.connectStart,
                Request: perfData.responseStart - perfData.requestStart,
                Response: perfData.responseEnd - perfData.responseStart,
                DOM: perfData.domComplete - perfData.domLoading,
                Load: perfData.loadEventEnd - perfData.loadEventStart,
                Total: perfData.loadEventEnd - perfData.fetchStart
            });
        }, 0);
    });
})();
