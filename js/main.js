document.addEventListener("DOMContentLoaded", function () {
    // Set footer year
    const yearEl = document.getElementById("footer-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    setupContactProtection();
    setupSmoothScrolling();
    setupImageFlip();
    setupScrollAnimations();
    setupBackToTop();
});

function setupContactProtection() {
    const contactButton = document.getElementById("contact-button");
    const emailContainer = document.getElementById("email-container");
    if (!contactButton || !emailContainer) return;

    contactButton.addEventListener("click", () => {
        document.getElementById("email-part1").textContent = "hi";
        document.getElementById("email-part2").textContent = "bmako.de";
        emailContainer.classList.remove("hidden");
        contactButton.classList.add("hidden");
    });

    document.querySelector(".protected-email")?.addEventListener("click", () => {
        const email =
            document.getElementById("email-part1").textContent +
            "@" +
            document.getElementById("email-part2").textContent;

        navigator.clipboard.writeText(email).then(() => {
            const el = document.querySelector(".protected-email");
            const instr = document.getElementById("email-copy-instruction");
            el.classList.add("email-copied");
            if (instr) instr.textContent = "E-Mail kopiert!";
            setTimeout(() => {
                el.classList.remove("email-copied");
                if (instr) instr.textContent = "Klicken zum Kopieren";
            }, 2000);
        });
    });

    // Hide email when scrolled away from contact section
    let scrollTimeout;
    window.addEventListener("scroll", () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (emailContainer.classList.contains("hidden")) return;
            const rect = document.getElementById("contact-section")?.getBoundingClientRect();
            if (!rect) return;
            if (rect.top < -100 || rect.bottom > window.innerHeight + 100) {
                emailContainer.classList.add("hidden");
                contactButton.classList.remove("hidden");
            }
        }, 200);
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
        history.pushState(null, null, anchor.getAttribute("href"));
    });
}

function setupImageFlip() {
    const container = document.querySelector(".profile-image-container");
    if (!container) return;
    container.addEventListener("click", () => container.classList.toggle("flipped"));
    container.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            container.classList.toggle("flipped");
        }
    });
}

function setupScrollAnimations() {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("fade-in"); }),
        { threshold: 0.08 }
    );
    document.querySelectorAll(".section").forEach((s) => observer.observe(s));
}

function setupBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;
    window.addEventListener("scroll", () => btn.classList.toggle("visible", window.scrollY > 300));
    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        history.pushState(null, null, window.location.pathname);
    });
}

window.addEventListener("pageshow", (e) => {
    if (e.persisted && window.themeManager) window.themeManager.initTheme();
});
