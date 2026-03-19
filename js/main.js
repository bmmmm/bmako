document.addEventListener('DOMContentLoaded', function () {
    // Signal that JS is running — enables fade-in animations
    document.documentElement.classList.add('js-ready');

    // Dynamic copyright year
    var yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Initialize all features
    [setupKineticName, setupHeroBannerFlip, setupBannerCycle, setupContactProtection, setupLegalEmails, setupSmoothScrolling, setupScrollFadeIn, setupBackToTop]
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

    // Mouse movement triggers expand
    var heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        document.addEventListener('mousemove', function (e) {
            if (!heroVisible) return;
            var rect = heroSection.getBoundingClientRect();
            if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
                triggerExpand();
            }
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

/* ── Banner cycle (loads messages from data/banner-messages.json) ── */
function setupBannerCycle() {
    var banner = document.getElementById('top-banner');
    if (!banner) return;

    var textEl = banner.querySelector('.top-banner-text');
    var linkEl = banner.querySelector('.top-banner-link');
    if (!textEl || !linkEl) return;

    var INTERVAL = 6000; // ms between cycles
    var FADE_DURATION = 400; // ms for fade transition (matches CSS)
    var messages = null;
    var currentIdx = 0;

    // Load messages from JSON file
    fetch('data/banner-messages.json')
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (!Array.isArray(data) || data.length < 2) return;
            messages = data;
            // Start cycling from second message (first is already in HTML)
            currentIdx = 0;
            setInterval(cycleNext, INTERVAL);
        })
        .catch(function () {
            // JSON not available — keep static banner, no cycling
        });

    function cycleNext() {
        if (!messages) return;
        currentIdx = (currentIdx + 1) % messages.length;
        var msg = messages[currentIdx];

        // Fade out
        banner.classList.add('fading');

        // Swap content at midpoint, then fade in
        setTimeout(function () {
            textEl.textContent = msg.text;
            linkEl.href = msg.link;
            linkEl.innerHTML = msg.linkText + ' <span class="arrow">›</span>';
            banner.classList.remove('fading');
        }, FADE_DURATION);
    }
}

/* ── Contact email obfuscation ────────────────────────────────── */
function setupContactProtection() {
    var contactBtn = document.getElementById('contact-button');
    var emailContainer = document.getElementById('email-container');
    var emailLink = document.getElementById('email-link');
    if (!contactBtn || !emailContainer || !emailLink) return;

    var parts = ['hi', '@', 'bmako', '.de'];

    contactBtn.addEventListener('click', function () {
        var addr = parts[0] + parts[1] + parts[2] + parts[3];
        emailLink.textContent = addr;
        emailLink.href = 'mailto:' + addr + '?subject=Anfrage';
        emailContainer.classList.remove('hidden');
        contactBtn.classList.add('hidden');
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

/* ── Smooth scrolling for anchor links ────────────────────────── */
function setupSmoothScrolling() {
    document.addEventListener('click', function (e) {
        var anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        var href = anchor.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        // Offset for fixed nav (44px)
        var offset = 44 + 12;
        window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - offset,
            behavior: 'smooth'
        });
        history.pushState(null, '', href);
    });
}

/* ── Scroll fade-in (IntersectionObserver) ────────────────────── */
function setupScrollFadeIn() {
    if (!('IntersectionObserver' in window)) {
        // Fallback: show all immediately
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

    window.addEventListener('scroll', onScroll, { passive: true });
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
