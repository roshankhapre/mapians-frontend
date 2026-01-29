// Global Component Loader

async function loadComponent(containerId, componentUrl) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const response = await fetch(componentUrl);
    if (!response.ok) throw new Error(`Failed to load ${componentUrl}`);
    container.innerHTML = await response.text();
  } catch (error) {
    console.error("Component load error:", error);
    container.innerHTML = `<div class="text-red-500 p-4">Component Load Error</div>`;
  }
}

// Homepage Auto Loader
document.addEventListener("DOMContentLoaded", function () {
  const components = [
    { id: "navbar-container", file: "components/navbar.html" },
    { id: "hero-container", file: "components/hero.html" },
    { id: "destinations", file: "components/destinations.html" },
    { id: "what-is-esim", file: "components/what-is-esim.html" },
    { id: "how-it-works-container", file: "components/how-it-works.html" },
    { id: "plans-container", file: "components/plans.html" },
    { id: "achievements", file: "components/achievements.html" },
    { id: "testimonials-container", file: "components/testimonials.html" },
    { id: "blog", file: "components/blog.html" },
    { id: "faq-container", file: "components/faq.html" },
    { id: "footer-container", file: "components/footer.html" },
  ];

  components.forEach((component) => {
    if (document.getElementById(component.id)) {
      loadComponent(component.id, component.file);
    }
  });

  setTimeout(initializeWebsite, 400);
});
