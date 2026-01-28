// Component Loader for Tailwind Website
document.addEventListener("DOMContentLoaded", function () {
  // Components to load
  const components = [
    { id: "navbar-container", file: "components/navbar.html" },
    { id: "hero-container", file: "components/hero.html" },
    { id: "destinations", file: "components/destinations.html" },
    { id: "what-is-esim", file: "components/what-is-esim.html" },

    { id: "how-it-works-container", file: "components/how-it-works.html" },

    { id: "plans-container", file: "components/plans.html" },
    { id: "achievements", file: "components/achievements.html" },
    // { id: "connection", file: "components/connection.html" },
    { id: "testimonials-container", file: "components/testimonials.html" },
    { id: "blog", file: "components/blog.html" },

    { id: "faq-container", file: "components/faq.html" },
    { id: "footer-container", file: "components/footer.html" },
  ];

  // Load each component
  components.forEach((component) => {
    loadComponent(component.id, component.file);
  });

  // Initialize after components are loaded
  setTimeout(initializeWebsite, 500);
});

// Function to load components
async function loadComponent(containerId, componentUrl) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const response = await fetch(componentUrl);
    if (!response.ok) {
      throw new Error(`Failed to load ${componentUrl}: ${response.status}`);
    }
    const html = await response.text();
    container.innerHTML = html;
  } catch (error) {
    console.error("Error loading component:", error);
    container.innerHTML = `<div class="text-red-500 p-4">Error loading component</div>`;
  }
}

// Initialize website functionality
function initializeWebsite() {
  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById("mobileMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("block");
    });
  }

  // Hero Search Functionality
  const searchBtn = document.getElementById("searchPlansBtn");
  const destinationInput = document.getElementById("destinationInput");

  if (searchBtn && destinationInput) {
    searchBtn.addEventListener("click", function () {
      const destination = destinationInput.value.trim();
      if (!destination) {
        destinationInput.classList.add("border-red-500");
        destinationInput.placeholder = "Please enter a destination";
        destinationInput.focus();
        return;
      }

      // Show loading state
      const originalText = searchBtn.innerHTML;
      searchBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin mr-2"></i> Searching...';
      searchBtn.disabled = true;

      setTimeout(() => {
        alert(`Found the best eSIM plans for ${destination}!`);
        searchBtn.innerHTML = originalText;
        searchBtn.disabled = false;
      }, 1500);
    });

    // Clear error on input
    destinationInput.addEventListener("input", function () {
      this.classList.remove("border-red-500");
      this.placeholder = "Where are you traveling? (e.g., Japan, Europe, Bali)";
    });
  }

  // FAQ Accordion
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      const icon = this.querySelector("i");

      // Toggle answer
      answer.classList.toggle("hidden");

      // Toggle icon
      if (icon.classList.contains("fa-plus")) {
        icon.classList.replace("fa-plus", "fa-minus");
      } else {
        icon.classList.replace("fa-minus", "fa-plus");
      }
    });
  });

  // Plan Selection
  document.querySelectorAll(".plan-select-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const planName =
        this.closest(".plan-card").querySelector("h3").textContent;
      alert(`Selected: ${planName}\nRedirecting to checkout...`);
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Add shine effect to buttons on hover
  document.querySelectorAll(".shine-effect").forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.backgroundPosition = "200px 0";
    });

    button.addEventListener("mouseleave", function () {
      this.style.backgroundPosition = "-200px 0";
    });
  });
}
