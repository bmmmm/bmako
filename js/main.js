/**
 * Main Application Script - Handles initialization and functionality
 */
document.addEventListener("DOMContentLoaded", function () {
  // Set up the protected contact email functionality
  setupContactProtection();

  // Enable smooth scrolling for navigation links
  setupSmoothScrolling();

  // Set up image flip animation
  setupImageFlip();

  // Add scroll animations
  setupScrollAnimations();

  // Set up back to top button
  setupBackToTop();

  // Function to set up the anti-spam contact protection
  function setupContactProtection() {
    // Use event delegation for better performance
    document.addEventListener("click", (e) => {
      const contactButton = e.target.closest("#contact-button");
      const protectedEmail = e.target.closest(".protected-email");

      if (contactButton) {
        const emailContainer = document.getElementById("email-container");
        if (emailContainer) {
          // Set up real email parts (these are split to make it harder for bots)
          const emailPart1 = document.getElementById("email-part1");
          const emailPart2 = document.getElementById("email-part2");

          if (emailPart1 && emailPart2) {
            emailPart1.textContent = "hi";
            emailPart2.textContent = "bmako.de";
          }

          emailContainer.classList.remove("hidden");
          contactButton.classList.add("hidden");
        }
      } else if (protectedEmail) {
        const emailPart1 = document.getElementById("email-part1");
        const emailPart2 = document.getElementById("email-part2");

        if (emailPart1 && emailPart2) {
          // Combine the email parts
          const fullEmail = `${emailPart1.textContent}@${emailPart2.textContent}`;

          // Copy to clipboard with modern API and error handling
          navigator.clipboard
            .writeText(fullEmail)
            .then(() => {
              // Visual feedback that email was copied
              protectedEmail.classList.add("email-copied");

              // Change the instruction text
              const instruction = document.getElementById(
                "email-copy-instruction",
              );
              if (instruction) {
                instruction.textContent = "E-Mail kopiert!";
              }

              // Reset after 2 seconds
              setTimeout(() => {
                protectedEmail.classList.remove("email-copied");
                if (instruction) {
                  instruction.textContent = "Klicken zum Kopieren";
                }
              }, 2000);
            })
            .catch((err) => {
              console.error("Konnte Text nicht kopieren:", err);
              // Provide fallback or user notification here
            });
        }
      }
    });
  }

  // Function to set up smooth scrolling
  function setupSmoothScrolling() {
    // Use event delegation for better performance
    document.addEventListener("click", (e) => {
      const anchor = e.target.closest('a[href^="#"]');

      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Add a small offset to account for fixed elements
          const offset = 20;
          const targetPosition =
            targetElement.getBoundingClientRect().top + window.scrollY - offset;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Update URL for bookmarking/sharing
          history.pushState(null, null, targetId);
        }
      }
    });
  }

  // Function to set up image flip animation
  function setupImageFlip() {
    // Use event delegation for click and keyboard interactions
    document.addEventListener("click", (e) => {
      const profileContainer = e.target.closest(".profile-image-container");
      if (profileContainer) {
        profileContainer.classList.toggle("flipped");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const profileContainer = e.target.closest(".profile-image-container");
        if (profileContainer) {
          e.preventDefault();
          profileContainer.classList.toggle("flipped");
        }
      }
    });
  }

  // Function to handle scroll animations using Intersection Observer API
  function setupScrollAnimations() {
    // Check if IntersectionObserver is supported
    if ("IntersectionObserver" in window) {
      const sections = document.querySelectorAll(".section");

      // Create a single observer instance for better performance
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("fade-in");
              // No need to unobserve - we want animations on scroll back up too
            }
          });
        },
        {
          root: null, // viewport
          threshold: 0.1, // trigger when 10% of the element is visible
          rootMargin: "0px",
        },
      );

      // Add initial styles and observe each section
      sections.forEach((section) => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        sectionObserver.observe(section);
      });
    }
  }

  // Function to set up back to top button
  function setupBackToTop() {
    const backToTop = document.getElementById("back-to-top");

    if (!backToTop) return;

    // Show button when scrolled down
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    });

    // Scroll to top on click
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      // Update URL without the hash
      history.pushState(null, null, window.location.pathname);
    });
  }

  // Add functionality to detect when page is loaded from cache
  window.addEventListener("pageshow", (event) => {
    // If the page is loaded from cache (back/forward navigation)
    if (event.persisted) {
      // Re-initialize theme to ensure consistency
      if (window.themeManager) {
        window.themeManager.initTheme();
      }
    }
  });

  // Helper function to add services dynamically if needed
  window.addService = function (icon, title, description) {
    const servicesGrid = document.querySelector(".services-grid");
    if (!servicesGrid) return false;

    const serviceCard = document.createElement("div");
    serviceCard.className = "service-card";
    serviceCard.innerHTML = `
      <div class="service-icon">${icon}</div>
      <h3>${title}</h3>
      <p>${description}</p>
    `;

    servicesGrid.appendChild(serviceCard);

    // Apply scroll animations if they exist
    if (serviceCard.classList) {
      serviceCard.style.opacity = "0";
      serviceCard.style.transform = "translateY(20px)";

      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        setTimeout(() => {
          serviceCard.classList.add("fade-in");
        }, 100);
      });
    }

    return true;
  };
});
