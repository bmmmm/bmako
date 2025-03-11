/**
 * Module Loader - Dynamically loads HTML components
 */
class ModuleLoader {
  constructor() {
    // Map of module IDs to their HTML content
    this.modules = {
      // Header/Navigation Component
      "header-container": `
        <header>
          <div class="top-controls">
            <button id="theme-toggle" aria-label="Dunkelmodus umschalten">
              <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/></svg>
              <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.979 6.979 0 0 0 10 7zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 7.999 7.999 0 0 0 4 12z"/></svg>
            </button>
          </div>
        </header>
      `,

      // Hero Component
      "hero-container": `
        <div class="hero">
          <div class="profile-image-container" tabindex="0" role="button" aria-label="Profilbild umdrehen">
            <div class="profile-image-flipper">
              <div class="profile-image-front">
                <img src="https://cdn.bio.link/uploads/profile_pictures/2023-02-25/q9Mbbxr9EEkbPOz6zzQqYN839R0MYqvv.png" alt="Profilbild Vorderseite" class="profile-image" loading="eager">
              </div>
              <div class="profile-image-back">
                <img src="https://media.printables.com/media/auth/avatars/fb/thumbs/cover/320x320/jpeg/fbdf36a3-e831-4d5f-83c9-f4d15c800ae7.webp" alt="Profilbild Rückseite" class="profile-image" loading="lazy">
              </div>
            </div>
          </div>
          <h1>Bartosz Makosch</h1>
          <p class="subtitle">Tech-Berater & Ingenieur</p>
          <nav class="hero-navigation">
            <a href="#services-section" class="nav-link">Dienstleistungen</a>
            <a href="#about-section" class="nav-link">Über Mich</a>
            <a href="#contact-section" class="nav-link">Kontakt</a>
          </nav>
        </div>
      `,

      // Services Component
      "services-container": `
        <section id="services-section" class="section services">
          <h2 class="section-title">Meine Dienstleistungen</h2>
          <div class="services-grid">
            <div class="service-card">
              <div class="service-icon">💻</div>
              <h3>Apple-Ökosystem</h3>
              <p>Expertenunterstützung für alle Apple-Geräte wie iPhone, iPad, Mac und Backup-Lösungen.</p>
            </div>
            <div class="service-card">
              <div class="service-icon">📊</div>
              <h3>Office 365</h3>
              <p>Implementierung und Support für Microsoft Teams, SharePoint und die komplette Office 365-Suite.</p>
            </div>
            <div class="service-card">
              <div class="service-icon">🤖</div>
              <h3>KI-Beratung</h3>
              <p>Strategische Anleitung zur Implementierung von KI-Lösungen, die Ihren Arbeitsablauf und Ihre Produktivität verbessern.</p>
            </div>
            <div class="service-card">
              <div class="service-icon">🏠</div>
              <h3>SmartHome & IoT</h3>
              <p>Design und Implementierung von Smart-Home-Systemen und Internet der Dinge-Lösungen.</p>
            </div>
            <div class="service-card">
              <div class="service-icon">🖥️</div>
              <h3>Multi-Plattform-Support</h3>
              <p>Umfassende Unterstützung für Linux, Windows 11, MacOS, Android und iOS-Plattformen.</p>
            </div>
          </div>
        </section>
      `,

      // About Me Component
      "about-content-container": `
        <section id="about-section" class="section about-section">
          <h2 class="section-title">Über Mich</h2>
          <div class="about-content">
            <div class="about-card">
              <div class="about-bio">
                <h3>Beruflicher Hintergrund</h3>
                <p>Ich bin ein vielseitiger Technologieberater mit Expertise in Apple-Ökosystemen, Microsoft 365, KI-Integration und Smart-Home-Lösungen. Mit einem starken Ingenieursbackground helfe ich Kunden, komplexe technische Herausforderungen zu meistern und effiziente digitale Lösungen zu implementieren.</p>
              </div>

              <div class="about-details-grid">
                <div class="about-detail-card">
                  <h3>Name</h3>
                  <p>Bartosz Makosch</p>
                </div>

                <div class="about-detail-card">
                  <h3>Ausbildung</h3>
                  <p>Master of Engineering - Hochschule Mannheim</p>
                </div>

                <div class="about-detail-card">
                  <h3>Kernkompetenz</h3>
                  <p>Technische Beratung, Systemintegration und digitale Transformation für Unternehmen und Privatpersonen.</p>
                </div>

                <div class="about-detail-card">
                  <h3>Sprachen</h3>
                  <p>Deutsch, Englisch</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      `,

      // Contact Component
      "contact-container": `
        <section id="contact-section" class="section contact-container">
          <h2 class="section-title">Kontakt aufnehmen</h2>
          <p class="contact-description">Interesse an einer Zusammenarbeit? Kontaktieren Sie mich, um zu besprechen, wie ich Ihnen bei Ihren technischen Anforderungen helfen kann.</p>

          <!-- Contact button that reveals the real email on click -->
          <button id="contact-button" class="button button-center">
            <span>Kontaktieren Sie mich</span>
          </button>

          <!-- Hidden email container that will be shown when button is clicked -->
          <div id="email-container" class="email-container hidden">
            <p>Meine E-Mail-Adresse:</p>
            <p class="protected-email" tabindex="0" role="button" aria-label="E-Mail kopieren">
              <span id="email-part1">example</span><span>@</span><span id="email-part2">example.com</span>
            </p>
            <p id="email-copy-instruction">Klicken zum Kopieren</p>
          </div>
        </section>
      `,

      // Footer Component
      "footer-container": `
        <footer>
          <div class="footer-content">
            <p>© ${new Date().getFullYear()} Bartosz Makosch</p>
            <nav class="footer-links">
              <a href="#services-section">Dienstleistungen</a>
              <a href="#about-section">Über mich</a>
              <a href="#contact-section">Kontakt</a>
            </nav>
          </div>
        </footer>
      `,
    };
  }

  // Load all modules on the page
  loadModules() {
    for (const [id, html] of Object.entries(this.modules)) {
      const container = document.getElementById(id);
      if (container) {
        // Use a more efficient way to set innerHTML (createContextualFragment)
        const template = document.createElement("template");
        template.innerHTML = html.trim();
        container.appendChild(template.content.cloneNode(true));
      }
    }
  }

  // Add a new module or update an existing one
  addModule(id, html) {
    this.modules[id] = html;

    // If the container exists on the current page, update it immediately
    const container = document.getElementById(id);
    if (container) {
      const template = document.createElement("template");
      template.innerHTML = html.trim();

      // Clear existing content and add new content
      container.innerHTML = "";
      container.appendChild(template.content.cloneNode(true));
    }
  }
}

// Initialize and load modules when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.moduleLoader = new ModuleLoader();
  window.moduleLoader.loadModules();
});
