document.addEventListener("DOMContentLoaded", function () {
    // Set footer year
    const yearEl = document.getElementById("footer-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    [setupContactProtection, setupLegalEmails, setupSmoothScrolling, setupImageFlip, setupScrollAnimations, setupBackToTop]
        .forEach(fn => { try { fn(); } catch (e) { console.error(fn.name, e); } });
});

function setupContactProtection() {
    const contactButton = document.getElementById("contact-button");
    const emailContainer = document.getElementById("email-container");
    const emailLink = document.getElementById("email-link");
    if (!contactButton || !emailContainer || !emailLink) return;

    const parts = ["hi", "@", "bmako", ".de"];

    contactButton.addEventListener("click", () => {
        const addr = parts[0] + parts[1] + parts[2] + parts[3];
        emailLink.textContent = addr;
        emailLink.href = "mailto:" + addr + "?subject=Anfrage";
        emailContainer.classList.remove("hidden");
        contactButton.classList.add("hidden");
    });
}

function setupSmoothScrolling() {
    document.addEventListener("click", (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        const target = document.querySelector(anchor.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 20, behavior: "smooth" });
        history.pushState(null, "", anchor.getAttribute("href"));
    });
}

function setupImageFlip() {
    const container = document.querySelector(".profile-image-container");
    if (!container) return;
    const flip = () => {
        container.classList.toggle("flipped");
        if (window.themeManager) window.themeManager.toggleTheme();
    };
    container.addEventListener("click", flip);
    container.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            flip();
        }
    });
}

function setupScrollAnimations() {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.style.willChange = "opacity, transform";
                e.target.classList.add("fade-in");
                e.target.addEventListener("transitionend", () => {
                    e.target.style.willChange = "";
                }, { once: true });
            }
        }),
        { threshold: 0.08 }
    );
    document.querySelectorAll(".section").forEach((s) => observer.observe(s));
}

function setupLegalEmails() {
    const els = document.querySelectorAll(".legal-email");
    if (!els.length) return;
    const parts = ["hi", "@", "bmako", ".de"];
    const addr = parts.join("");
    els.forEach((el) => {
        el.textContent = addr;
        el.href = "mailto:" + addr;
    });
}

function setupBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;
    const progress = btn.querySelector(".back-to-top-progress");
    const circumference = 2 * Math.PI * 20;
    if (progress) {
        progress.style.strokeDasharray = circumference;
        progress.style.strokeDashoffset = circumference;
    }
    let ticking = false;
    window.addEventListener("scroll", () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            btn.classList.toggle("visible", window.scrollY > 300);
            if (progress) {
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = docHeight > 0 ? window.scrollY / docHeight : 0;
                progress.style.strokeDashoffset = circumference * (1 - scrollPercent);
            }
            ticking = false;
        });
    }, { passive: true });
    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        history.pushState(null, "", window.location.pathname);
    });
}

window.addEventListener("pageshow", (e) => {
    if (e.persisted && window.themeManager) window.themeManager.initTheme();
});
