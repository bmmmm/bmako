/**
 * Theme Manager - Handles theme switching functionality
 */
class ThemeManager {
  constructor() {
    this.systemDarkModeQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );
    this.init();
  }

  init() {
    // Initialize theme
    this.initTheme();

    // Add event listener after modules are loaded
    document.addEventListener("DOMContentLoaded", () => {
      // Theme toggle handler using event delegation for better performance
      document.addEventListener("click", (e) => {
        if (e.target.closest("#theme-toggle")) {
          this.toggleTheme();
        }
      });

      // Listen for system theme preference changes
      this.systemDarkModeQuery.addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          // Only change theme automatically if user hasn't set a preference
          const newTheme = e.matches ? "dark" : "light";
          document.body.dataset.theme = newTheme;
        }
      });
    });
  }

  // Initialize theme: only apply saved override, let CSS handle system preference
  initTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.body.dataset.theme = savedTheme;
    }
    // No saved preference → CSS prefers-color-scheme handles it automatically
  }

  // Toggle theme; if result matches system preference, clear override so
  // future visits auto-follow system again
  toggleTheme() {
    const currentTheme = document.body.dataset.theme ||
      (this.systemDarkModeQuery.matches ? "dark" : "light");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    const systemTheme = this.systemDarkModeQuery.matches ? "dark" : "light";

    document.body.dataset.theme = newTheme;

    if (newTheme === systemTheme) {
      localStorage.removeItem("theme"); // back to system default
    } else {
      localStorage.setItem("theme", newTheme);
    }
  }

  // Get current theme
  getCurrentTheme() {
    return document.body.dataset.theme || "light";
  }
}

// Initialize the theme manager
window.themeManager = new ThemeManager();
