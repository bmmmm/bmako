/**
 * Site init — runs synchronously in <head> before render.
 * Single source of truth for:
 *   - Apple device detection (sets <html class="is-apple">)
 *   - Theme initialization from localStorage (sets <html data-theme="…">)
 *   - Theme toggle API exposed as window.themeManager
 *
 * Loaded from <head> WITHOUT defer/async so it executes before the body paints.
 * Touches only documentElement; does not require <body> to exist yet.
 */
(function () {
    var html = document.documentElement;

    // Apple device detection — userAgent matches macOS, iOS, iPadOS across all browsers
    if (/Macintosh|Mac OS X|iPhone|iPad|iPod/.test(navigator.userAgent)) {
        html.classList.add('is-apple');
    }

    // Restore theme preference; only accept known values
    var stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
        html.dataset.theme = stored;
    }

    var systemDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    function getCurrentTheme() {
        var ds = html.dataset.theme;
        if (ds === 'light' || ds === 'dark') return ds;
        return systemDarkQuery.matches ? 'dark' : 'light';
    }

    function applyThemeVisuals() {
        var isLight = getCurrentTheme() === 'light';
        var btt = document.getElementById('back-to-top');
        if (btt) btt.classList.toggle('light-mode', isLight);
        var ring = document.getElementById('scroll-progress');
        if (ring && document.body) {
            ring.style.stroke = getComputedStyle(document.body).getPropertyValue('--accent').trim();
        }
    }

    // Keep the optional legal-page toggle button in sync with the active theme.
    function syncToggleButton() {
        var btn = document.getElementById('theme-toggle');
        if (!btn) return;
        var isDark = getCurrentTheme() === 'dark';
        btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        btn.setAttribute('aria-label', isDark ? 'Zum hellen Design wechseln' : 'Zum dunklen Design wechseln');
    }

    function toggleTheme() {
        var current = getCurrentTheme();
        var next = current === 'dark' ? 'light' : 'dark';
        var systemTheme = systemDarkQuery.matches ? 'dark' : 'light';

        html.dataset.theme = next;
        if (next === systemTheme) {
            localStorage.removeItem('theme');
        } else {
            localStorage.setItem('theme', next);
        }
        applyThemeVisuals();
        syncToggleButton();
    }

    systemDarkQuery.addEventListener('change', function () {
        if (!localStorage.getItem('theme')) {
            delete html.dataset.theme;
            applyThemeVisuals();
            syncToggleButton();
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        applyThemeVisuals();
        var btn = document.getElementById('theme-toggle');
        if (btn) btn.addEventListener('click', toggleTheme);
        syncToggleButton();
    });

    window.themeManager = {
        toggleTheme: toggleTheme,
        getCurrentTheme: getCurrentTheme,
        applyThemeVisuals: applyThemeVisuals
    };
})();
