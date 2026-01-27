// Main JavaScript for Mapains eSIM Website

document.addEventListener("DOMContentLoaded", function () {
  // Initialize counters animation
  initializeCounters();

  // Initialize intersection observer for animations
  initializeIntersectionObserver();

  // Initialize form validations
  initializeForms();

  // Initialize plan selection
  initializePlanSelection();

  // Add current year to footer
  updateCopyrightYear();
});

// Counter Animation
function initializeCounters() {
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target")) || 1000;
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.floor(current).toLocaleString();
        setTimeout(updateCounter, 16);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };

    // Start counter when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(counter);
  });
}

// Intersection Observer for animations
function initializeIntersectionObserver() {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll(".card-hover").forEach((el) => {
    observer.observe(el);
  });
}

// Form Validations
function initializeForms() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let isValid = true;
      const inputs = this.querySelectorAll("input[required]");

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add("border-red-500");

          // Add error message
          let errorMsg = input.nextElementSibling;
          if (!errorMsg || !errorMsg.classList.contains("error-msg")) {
            errorMsg = document.createElement("p");
            errorMsg.className = "error-msg text-red-500 text-sm mt-1";
            errorMsg.textContent = "This field is required";
            input.parentNode.appendChild(errorMsg);
          }
        } else {
          input.classList.remove("border-red-500");
          const errorMsg = input.nextElementSibling;
          if (errorMsg && errorMsg.classList.contains("error-msg")) {
            errorMsg.remove();
          }
        }
      });

      if (isValid) {
        // Show success state
        this.classList.add("submitting");
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
        submitBtn.disabled = true;

        setTimeout(() => {
          this.classList.remove("submitting");
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          alert("Form submitted successfully!");
        }, 2000);
      }
    });
  });
}

// Plan Selection
function initializePlanSelection() {
  // Plan duration toggle
  const durationBtns = document.querySelectorAll(".duration-toggle button");

  durationBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      durationBtns.forEach((b) =>
        b.classList.remove("bg-primary-600", "text-white"),
      );

      // Add active class to clicked button
      this.classList.add("bg-primary-600", "text-white");

      // Update plan prices based on duration
      updatePlanPrices(this.textContent.toLowerCase());
    });
  });

  // Plan selection
  document.querySelectorAll(".plan-select-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const planCard = this.closest(".plan-card");
      const planName = planCard.querySelector("h3").textContent;
      const planPrice = planCard.querySelector(".price").textContent;

      // Add to cart logic
      addToCart({
        name: planName,
        price: planPrice,
        duration: "monthly",
      });
    });
  });
}

// Update plan prices based on duration
function updatePlanPrices(duration) {
  const prices = {
    daily: {
      regional: "$0.99/day",
      global: "$2.99/day",
      unlimited: "$5.99/day",
    },
    weekly: {
      regional: "$4.99/week",
      global: "$14.99/week",
      unlimited: "$29.99/week",
    },
    monthly: {
      regional: "$14.99/month",
      global: "$39.99/month",
      unlimited: "$79.99/month",
    },
  };

  document.querySelectorAll(".plan-card").forEach((card) => {
    const planType = card.querySelector("h3").textContent.toLowerCase();
    const priceElement = card.querySelector(".price");

    if (prices[duration] && prices[duration][planType]) {
      priceElement.textContent = prices[duration][planType];
    }
  });
}

// Add to cart functionality
function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem("mapainsCart")) || [];
  cart.push(item);
  localStorage.setItem("mapainsCart", JSON.stringify(cart));

  // Show notification
  showNotification(`${item.name} added to cart!`, "success");
  updateCartCount();
}

// Update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("mapainsCart")) || [];
  const count = cart.length;

  const cartCount = document.getElementById("cartCount");
  if (cartCount) {
    cartCount.textContent = count;
    cartCount.classList.toggle("hidden", count === 0);
  }
}

// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${type === "success" ? "bg-green-500" : "bg-blue-500"} text-white animate-fade-in`;
  notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === "success" ? "check-circle" : "info-circle"} mr-3"></i>
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.classList.add(
      "opacity-0",
      "transition-opacity",
      "duration-300",
    );
    setTimeout(() => notification.remove(), 300);
  }, 3000);

  // Close button
  notification.querySelector("button").addEventListener("click", () => {
    notification.remove();
  });
}

// Update copyright year
function updateCopyrightYear() {
  const yearElements = document.querySelectorAll("[data-current-year]");
  const currentYear = new Date().getFullYear();

  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });
}

// Utility function for currency formatting
function formatCurrency(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
