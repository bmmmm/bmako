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

  // Function to initialize theme based on user preference or system preference
  initTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      document.body.dataset.theme = savedTheme;
    } else if (this.systemDarkModeQuery.matches) {
      document.body.dataset.theme = "dark";
    }
  }

  // Function to toggle between light and dark themes
  toggleTheme() {
    const currentTheme = document.body.dataset.theme || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.body.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
  }

  // Get current theme
  getCurrentTheme() {
    return document.body.dataset.theme || "light";
  }
}

// Initialize the theme manager
window.themeManager = new ThemeManager();
