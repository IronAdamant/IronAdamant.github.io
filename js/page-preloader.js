/**
 * Immediate execution preloader script
 * This script runs immediately and creates a black overlay before any content loads
 */
(function() {
    // Create and apply immediate black screen (completely black, no spinner or text)
    var preloader = document.createElement('div');
    preloader.id = 'page-preloader';
    preloader.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background-color:#050505;z-index:9999999;display:block;pointer-events:none;';

    // Add styling to ensure all content is hidden during transition
    var style = document.createElement('style');
    style.textContent = `
        #page-preloader {
            opacity: 1 !important;
            visibility: visible !important;
        }
        html, body {
            background-color: #050505 !important;
            color: transparent !important;
            visibility: hidden !important;
        }
    `;
    
    // Add style to document as soon as possible
    document.head.appendChild(style);
    
    // Listen for the DOMContentLoaded event
    document.addEventListener('DOMContentLoaded', function() {
        // If the preloader hasn't been added yet, add it
        if (!document.getElementById('page-preloader')) {
            document.body.appendChild(preloader);
        }
        
        // Apply black background to html and body
        document.documentElement.style.backgroundColor = '#050505';
        document.body.style.backgroundColor = '#050505';
    });

    // Add preloader to document body when it's available
    function addPreloader() {
        if (document.body) {
            if (!document.getElementById('page-preloader')) {
                document.body.appendChild(preloader);
            }
            clearInterval(checkBodyInterval);
        }
    }

    // Check for document.body repeatedly until it's available
    var checkBodyInterval = setInterval(addPreloader, 10);
    
    // Remove preloader after everything is loaded
    window.addEventListener('load', function() {
        // Create a new style element to restore visibility
        var restoreStyle = document.createElement('style');
        restoreStyle.textContent = `
            html, body {
                background-color: #050505 !important;
                color: inherit !important;
                visibility: visible !important;
            }
        `;
        document.head.appendChild(restoreStyle);
        
        // Make sure our preloader stays on top until we explicitly remove it
        var preloader = document.getElementById('page-preloader');
        if (preloader) {
            // Keep the preloader for a moment to ensure everything is fully loaded
            setTimeout(function() {
                // Remove the preloader immediately (no fade)
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
                
                // Restore all visibility once preloader is removed
                document.documentElement.style.visibility = 'visible';
                document.body.style.visibility = 'visible';
            }, 200);
        }
    });
})();
