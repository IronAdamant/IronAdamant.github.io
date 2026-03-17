/**
 * Immediate execution preloader script
 * Creates a black overlay before any content loads to prevent FOUC
 */
(function() {
    // Hide content immediately via injected styles
    var style = document.createElement('style');
    style.id = 'preloader-styles';
    style.textContent = '#page-preloader{opacity:1!important;visibility:visible!important}html,body{background-color:#050505!important;color:transparent!important;visibility:hidden!important}';
    document.head.appendChild(style);

    // Create preloader overlay element
    var preloader = document.createElement('div');
    preloader.id = 'page-preloader';
    preloader.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background-color:#050505;z-index:9999999;display:block;pointer-events:none;';

    // Add preloader to body once it exists
    document.addEventListener('DOMContentLoaded', function() {
        if (!document.getElementById('page-preloader')) {
            document.body.appendChild(preloader);
        }
        document.documentElement.style.backgroundColor = '#050505';
        document.body.style.backgroundColor = '#050505';
    });

    // Restore visibility after everything loads
    window.addEventListener('load', function() {
        var restoreStyle = document.createElement('style');
        restoreStyle.textContent = 'html,body{background-color:#050505!important;color:inherit!important;visibility:visible!important}';
        document.head.appendChild(restoreStyle);

        var el = document.getElementById('page-preloader');
        if (el) {
            setTimeout(function() {
                if (el.parentNode) el.parentNode.removeChild(el);
                document.documentElement.style.visibility = 'visible';
                document.body.style.visibility = 'visible';
            }, 200);
        }
    });
})();
