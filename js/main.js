document.addEventListener('DOMContentLoaded', function () {
    // Signal that JS is running — enables fade-in animations
    document.documentElement.classList.add('js-ready');

    // Dynamic copyright year — index.html uses #footer-year, service subpages use .footer-year
    var year = String(new Date().getFullYear());
    document.querySelectorAll('#footer-year, .footer-year').forEach(function (el) { el.textContent = year; });

    // iMessage button visibility is handled by <html class="is-apple"> + CSS
    // (set by js/theme.js in <head>) — no JS toggling needed here.

    // Initialize all features
    // Smooth-scrolling for anchor links is handled by CSS (scroll-behavior + scroll-padding-top in base.css).
    [setupKineticName, setupHeroBannerFlip, setupBannerCycle, setupContactProtection, setupLegalEmails, setupScrollFadeIn, setupBackToTop]
        .forEach(function (fn) { try { fn(); } catch (e) { console.error(fn.name, e); } });
});

/* ── Kinetic name: "Bartosz Makosch" → letters spread, revealing "BMako" ── */
function setupKineticName() {
    var nameText = 'Bartosz Makosch';
    var brandIndices = [0, 8, 9, 10, 11]; // B, M, a, k, o
    var container = document.getElementById('hero-name-kinetic');
    if (!container) return;

    var html = '';
    for (var i = 0; i < nameText.length; i++) {
        if (nameText[i] === ' ') {
            html += '<span class="letter-space"></span>';
        } else {
            var isBrand = brandIndices.indexOf(i) !== -1;
            html += '<span class="letter' + (isBrand ? ' brand' : '') + '">' + nameText[i] + '</span>';
        }
    }
    container.innerHTML = html;
    // Decorative per-letter spans read awkwardly to screen readers; expose the
    // full name as a single accessible label and treat the spans as one image.
    container.setAttribute('role', 'img');
    container.setAttribute('aria-label', nameText);

    // Expand/collapse logic
    var heroVisible = true;
    var idleTimer = null;
    var IDLE_DELAY = 1200;

    function setExpanded(expanded) {
        container.classList.toggle('expanded', expanded);
    }

    function triggerExpand() {
        if (!heroVisible) return;
        setExpanded(true);
        clearTimeout(idleTimer);
        idleTimer = setTimeout(function () {
            setExpanded(false);
        }, IDLE_DELAY);
    }

    // Track hero visibility
    var heroContent = document.querySelector('.hero-content');
    if (heroContent && 'IntersectionObserver' in window) {
        var heroObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                heroVisible = entry.isIntersecting;
                if (!heroVisible) {
                    clearTimeout(idleTimer);
                    setExpanded(false);
                }
            });
        }, { threshold: 0 });
        heroObs.observe(heroContent);
    }

    // Scroll triggers expand
    window.addEventListener('scroll', function () {
        if (heroVisible && window.scrollY > 40) triggerExpand();
    }, { passive: true });

    // Mouse movement over the hero triggers expand. Listener is scoped to the
    // hero element so it only fires there — no getBoundingClientRect per move.
    var heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('mousemove', function () {
            if (heroVisible) triggerExpand();
        }, { passive: true });
    }
}

/* ── Hero banner flip → toggle theme at midpoint ──────────────── */
function setupHeroBannerFlip() {
    var banner = document.querySelector('.hero-banner');
    if (!banner) return;

    function doFlip() {
        if (banner.dataset.flipping) return;
        banner.dataset.flipping = 'true';
        banner.classList.toggle('flipped');

        // At the midpoint of the flip animation, switch the theme
        setTimeout(function () {
            if (window.themeManager) window.themeManager.toggleTheme();
        }, 375);

        // Clean up flipping flag after animation completes
        setTimeout(function () {
            delete banner.dataset.flipping;
        }, 850);
    }

    banner.addEventListener('click', doFlip);
    banner.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            doFlip();
        }
    });
}

/* ── Banner cycle (loads messages from data/banner-messages.json) ──
   Static HTML banner is a generic no-JS fallback. JS hydrates with the first JSON
   message on mount (with fade) and then cycles through the rest. The HTML text is
   intentionally NOT a copy of JSON[0] — that decoupling is what makes the banner
   maintainable: JSON is the single source of truth for cycled messages. */
function setupBannerCycle() {
    var banner = document.getElementById('top-banner');
    if (!banner) return;

    var textEl = banner.querySelector('.top-banner-text');
    var linkEl = banner.querySelector('.top-banner-link');
    if (!textEl || !linkEl) return;

    var INTERVAL = 6000;
    var FADE_DURATION = 400; // must match CSS transition
    var messages = [];
    var currentIdx = 0;
    var timerId = null;

    function render(idx) {
        var msg = messages[idx];
        textEl.textContent = msg.text;
        linkEl.href = msg.link;
        linkEl.textContent = msg.linkText + ' ';
        var arrow = document.createElement('span');
        arrow.className = 'arrow';
        arrow.textContent = '›';
        linkEl.appendChild(arrow);
    }

    function fadeTo(idx) {
        banner.classList.add('fading');
        setTimeout(function () {
            render(idx);
            banner.classList.remove('fading');
        }, FADE_DURATION);
    }

    function next() {
        currentIdx = (currentIdx + 1) % messages.length;
        fadeTo(currentIdx);
    }

    function startCycle() {
        if (timerId || messages.length < 2) return;
        timerId = setInterval(next, INTERVAL);
    }

    function stopCycle() {
        if (!timerId) return;
        clearInterval(timerId);
        timerId = null;
    }

    fetch('data/banner-messages.json')
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (!Array.isArray(data) || !data.length) return;
            messages = data;
            fadeTo(0);
            startCycle();
        })
        .catch(function () {
            // JSON unavailable — keep static HTML banner, no cycling
        });

    // Pause when tab is hidden — saves battery and avoids catch-up bursts on resume
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) stopCycle(); else startCycle();
    });
}

/* ── Contact email obfuscation ────────────────────────────────── */
function setupContactProtection() {
    var contactBtn = document.getElementById('contact-button');
    if (!contactBtn) return;

    var parts = ['hi', '@', 'bmako', '.de'];

    contactBtn.addEventListener('click', function () {
        var addr = parts[0] + parts[1] + parts[2] + parts[3];
        window.location.href = 'mailto:' + addr + '?subject=Anfrage';
    });
}

/* ── Legal page email reveal ──────────────────────────────────── */
function setupLegalEmails() {
    var els = document.querySelectorAll('.legal-email');
    if (!els.length) return;
    var parts = ['hi', '@', 'bmako', '.de'];
    var addr = parts.join('');
    els.forEach(function (el) {
        el.textContent = addr;
        el.href = 'mailto:' + addr;
    });
}

/* ── Scroll fade-in (IntersectionObserver) ────────────────────── */
function setupScrollFadeIn() {
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
        // Reduced motion or no observer support: reveal everything immediately.
        document.querySelectorAll('.fade-in').forEach(function (el) {
            el.classList.add('visible');
        });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in').forEach(function (el) {
        observer.observe(el);
    });
}

/* ── Back to top (glossy pill with scroll progress ring) ──────── */
function setupBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    var ring = document.getElementById('scroll-progress');
    var circ = ring ? 2 * Math.PI * 11.5 : 0;

    if (ring) {
        ring.style.strokeDasharray = String(circ);
        ring.style.strokeDashoffset = String(circ);
    }

    function onScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var pct = docHeight > 0 ? scrollTop / docHeight : 0;

        // Show/hide
        if (scrollTop > 200) {
            btn.classList.add('btt-visible');
        } else {
            btn.classList.remove('btt-visible');
        }

        // Progress ring
        if (ring) {
            ring.style.strokeDashoffset = String(circ - (pct * circ));
        }

        // Light mode sync
        if (window.themeManager) {
            var isLight = window.themeManager.getCurrentTheme() === 'light';
            btn.classList.toggle('light-mode', isLight);
        }
    }

    // rAF-throttle: coalesce scroll bursts (esp. 120 Hz) into one DOM update per frame.
    var ticking = false;
    window.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
            ticking = false;
            onScroll();
        });
    }, { passive: true });
    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Run once to set initial state
    onScroll();

    // Set initial accent color
    requestAnimationFrame(function () {
        if (ring) {
            ring.style.stroke = getComputedStyle(document.body).getPropertyValue('--accent').trim();
        }
    });
}

/* ── BFCache support ──────────────────────────────────────────── */
window.addEventListener('pageshow', function (e) {
    if (e.persisted && window.themeManager) {
        window.themeManager.applyThemeVisuals();
    }
});
