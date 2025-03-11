/**
 * Module Loader - Optimized for performance
 * Dynamically loads HTML components with efficient DOM operations
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

      // Services Component (remaining components unchanged...)
      "services-container": `
        <section id="services-section" class="section services">
          <h2 class="section-title">Meine Dienstleistungen</h2>
          <div class="services-grid">
            <div class="service-card">
              <div class="service-icon">🍎</div>
              <h3>Apple-Ökosystem</h3>
              <p>Expertenunterstützung für alle Apple-Geräte wie iPhone, iPad, MacBook, Mac und deren nahtloses Zusammenspiel.</p>
            </div>
            <div class="service-card">
              <div class="service-icon">☁️</div>
              <h3>Microsoft Cloud</h3>
              <p>Implementierung und Support für Microsoft Azure, Microsoft Teams, SharePoint und einen großen Teil der Office 365-Suite.</p>
            </div>
            <div class="service-card">
              <div class="service-icon">🗄️</div>
              <h3>Selfhosting</h3>
              <p>Einsatz von Docker-Containern für diverse Selfhosting-Lösungen wie Nextcloud, PiHole, HomeAssistant und mehr. Kompetente Beratung zu Website-Hosting und Serveradministration.</p>
            </div>
            <div class="service-card">
              <div class="service-icon">🔒</div>
              <h3>Datenschutz</h3>
              <p>Beratung zur Auswahl des optimalen E-Mail-Anbieters, Passwortmanagers sowie Dokumenten- und Foto-Backup-Lösungen. Implementierung datenschutzfreundlicher Technologien für maximale Privatsphäre.</p>
            </div>
            <div class="service-card">
              <div class="service-icon">⚙️</div>
              <h3>Prozessoptimierung</h3>
              <p>Analyse und Verbesserung Ihrer Arbeitsabläufe mit modernsten Tools. Spezialisiert auf Prozessautomatisierung mit Microsoft Power Automate für effizientere und fehlerfreie Workflows.</p>
            </div>
            <div class="service-card">
              <div class="service-icon">🤖</div>
              <h3>KI-Beratung</h3>
              <p>Strategische Anleitung zur Integration von KI-Lösungen, die Ihren Workflow und Ihre Produktivität signifikant steigern.</p>
            </div>
            <div class="service-card">
              <div class="service-icon">🏠</div>
              <h3>SmartHome & IoT</h3>
              <p>Design und Implementierung moderner Smart-Home-Systeme und IoT-Lösungen. Spezieller Fokus auf HomeAssistant, Apple HomeKit, MQTT und Zigbee.</p>
            </div>
            <div class="service-card">
              <div class="service-icon">👨‍💻</div>
              <h3>Coding</h3>
              <p>Maßgeschneiderte Programmier-Workshops für Einsteiger und Fortgeschrittene. Beratung zu Python, JavaScript, C und weiteren relevanten Sprachen für Ihre individuellen Projekte.</p>
            </div>
            <div class="service-card">
              <div class="service-icon">💻</div>
              <h3>Multi-Plattform-Support</h3>
              <p>Umfassende Unterstützung für Linux, Windows 11, MacOS, Android und iOS – plattformübergreifend aus einer Hand.</p>
            </div>
            <div class="service-card">
              <div class="service-icon">🖨️</div>
              <h3>3D-Druck</h3>
              <p>Professionelle Unterstützung bei CAD-Konstruktionen mit Fusion 360 und BambuLab. Praxisnahe Beratung zur erfolgreichen Umsetzung Ihrer 3D-Druck-Projekte.</p>
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
                <p>Mit über 15 Jahren Erfahrung im Technologiebereich biete ich fundierte Expertise und innovative Lösungen für moderne digitale Herausforderungen.</p>
                <p>Als Ingenieur und Technologieberater unterstütze ich Sie bei der Implementierung zukunftsorientierter Systeme und biete maßgeschneiderte Workshops für Unternehmen, Vereine und Privatpersonen an.</p>
              </div>

              <div class="about-details-grid">
                <div class="about-detail-card">
                  <h3>Projekte</h3>
                  <ul>
                    <li><a href="https://bartoszmakosch.com">Private Homepage</a></li>
                    <li><a href="https://vfcd.org">Verein für coole Dinge e.V.</a></li>
                    <li><a href="https://bolle-bonn.de">Freie Lastenräder Bonn</a></li>
                  </ul>
                </div>

                <div class="about-detail-card">
                  <h3>Ausbildung</h3>
                  <p>🎓 Master of Science - Embedded Systems &amp; Medizintechnik - Technische Hochschule Mannheim</p>
                </div>

                <div class="about-detail-card">
                  <h3>Referenzen</h3>
                  <ul>
                    <li>Migration der Castelltreff-Infrastruktur zu Microsoft Teams sowie Accountverwaltung in Microsoft Azure</li>
                    <li>Planung und Design eines Smart-Home-Systems für ein Privathaus</li>
                  </ul>
                </div>

                <div class="about-detail-card">
                  <h3>Sprachen</h3>
                  <p>🇩🇪 Deutsch, 🇬🇧 Englisch, 🇫🇷 Französisch</p>
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
          <p class="contact-description">Haben Sie technische Herausforderungen oder Fragen zu meinen Dienstleistungen? Nehmen Sie Kontakt auf, und lassen Sie uns gemeinsam maßgeschneiderte Lösungen für Ihre individuellen Anforderungen finden.</p>

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
              <!-- LinkedIn Social Button -->
              <div class="social-links">
                <a href="https://de.linkedin.com/in/bartosz-makosch" target="_blank" rel="noopener noreferrer" class="social-button linkedin-button" aria-label="LinkedIn Profil besuchen">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </nav>
          </div>
        </footer>
      `,
    };

    // Pre-create DOM parser for better performance
    this.parser = new DOMParser();
  }

  // Load all modules with performance optimizations
  loadModules() {
    // Get all container elements at once to minimize DOM queries
    const containers = {};
    for (const id of Object.keys(this.modules)) {
      containers[id] = document.getElementById(id);
    }

    // Batch DOM operations with DocumentFragment and requestAnimationFrame
    requestAnimationFrame(() => {
      for (const [id, html] of Object.entries(this.modules)) {
        const container = containers[id];
        if (!container) continue;

        // Parse HTML once outside the DOM
        const fragment = document.createDocumentFragment();
        const temp = document.createElement("div");
        temp.innerHTML = html.trim();

        // Move all nodes to fragment
        while (temp.firstChild) {
          fragment.appendChild(temp.firstChild);
        }

        // Single DOM insert
        container.appendChild(fragment);
      }
    });
  }

  // Add or update a module
  addModule(id, html) {
    this.modules[id] = html;

    // Update DOM if container exists
    const container = document.getElementById(id);
    if (!container) return;

    // More efficient DOM update with requestAnimationFrame
    requestAnimationFrame(() => {
      // Create document fragment
      const fragment = document.createDocumentFragment();
      const temp = document.createElement("div");
      temp.innerHTML = html.trim();

      // Move all nodes to fragment
      while (temp.firstChild) {
        fragment.appendChild(temp.firstChild);
      }

      // Clear and update in a single reflow
      container.innerHTML = "";
      container.appendChild(fragment);
    });
  }
}

// Initialize with performance optimization
document.addEventListener("DOMContentLoaded", () => {
  // Initialize module loader
  window.moduleLoader = new ModuleLoader();

  // Use requestAnimationFrame for non-blocking load
  requestAnimationFrame(() => {
    window.moduleLoader.loadModules();
  });
});
