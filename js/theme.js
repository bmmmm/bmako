/**
 * Theme Manager - Handles theme switching via hero banner flip
 * Dark (Midnight) is default; Light (Snow) is alternate via data-theme="light"
 */
(function () {
    var systemDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Determine current effective theme
    function getCurrentTheme() {
        var ds = document.body.dataset.theme;
        if (ds === 'light' || ds === 'dark') return ds;
        // No explicit override — use system preference
        return systemDarkQuery.matches ? 'dark' : 'light';
    }

    // Apply theme visually and update back-to-top light-mode class
    function applyThemeVisuals() {
        var theme = getCurrentTheme();
        var isLight = theme === 'light';

        // Back-to-top light mode class
        var btt = document.getElementById('back-to-top');
        if (btt) btt.classList.toggle('light-mode', isLight);

        // Scroll progress ring accent color
        var ring = document.getElementById('scroll-progress');
        if (ring) {
            ring.style.stroke = getComputedStyle(document.body).getPropertyValue('--accent').trim();
        }
    }

    // Toggle between dark and light
    function toggleTheme() {
        var current = getCurrentTheme();
        var next = current === 'dark' ? 'light' : 'dark';
        var systemTheme = systemDarkQuery.matches ? 'dark' : 'light';

        document.body.dataset.theme = next;

        if (next === systemTheme) {
            localStorage.removeItem('theme');
        } else {
            localStorage.setItem('theme', next);
        }

        applyThemeVisuals();
    }

    // Listen for system preference changes (only if no manual override)
    systemDarkQuery.addEventListener('change', function (e) {
        if (!localStorage.getItem('theme')) {
            // Remove explicit attribute to let CSS @media handle it
            delete document.body.dataset.theme;
            applyThemeVisuals();
        }
    });

    // Apply visuals once DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        applyThemeVisuals();
    });

    // Expose for use by main.js (hero banner flip)
    window.themeManager = {
        toggleTheme: toggleTheme,
        getCurrentTheme: getCurrentTheme,
        applyThemeVisuals: applyThemeVisuals
    };
})();
