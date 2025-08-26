// Progress Bar
window.addEventListener("scroll", () => {
  const scrolled =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  document.querySelector(".progress-bar").style.width = scrolled + "%";
});

// Smooth Scrolling
document.querySelector(".cta-button").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#portfolio").scrollIntoView({
    behavior: "smooth",
  });
});

// Animated Counter
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    if (target >= 1000000) {
      element.textContent = (current / 1000000).toFixed(1) + "M+";
    } else {
      element.textContent = Math.floor(current) + "+";
    }
  }, 20);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Animate counters when stats section is visible
      if (entry.target.classList.contains("stats")) {
        const counters = entry.target.querySelectorAll(".stat-number");
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-target"));
          animateCounter(counter, target);
        });
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Filter functionality
const filterButtons = document.querySelectorAll(".filter-btn");
const videoCards = document.querySelectorAll(".video-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    videoCards.forEach((card) => {
      const category = card.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        card.style.display = "block";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 100);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  });
});

// Lightbox functionality
const lightbox = document.getElementById("lightbox");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDescription = document.getElementById("lightbox-description");
const closeBtn = document.querySelector(".close-btn");

videoCards.forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.getAttribute("data-title");
    const description = card.getAttribute("data-description");

    lightboxTitle.textContent = title;
    lightboxDescription.textContent = description;
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
  document.body.style.overflow = "auto";
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Keyboard navigation for lightbox
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.style.display === "flex") {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Add ripple effect to CTA button
document.querySelector(".cta-button").addEventListener("click", function (e) {
  const ripple = document.createElement("span");
  const rect = this.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  ripple.classList.add("ripple");

  this.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
});

// Feature 1: Floating Action Menu
const floatingBtn = document.getElementById("floatingBtn");
const floatingOptions = document.getElementById("floatingOptions");
let isFloatingMenuOpen = false;

floatingBtn.addEventListener("click", () => {
  isFloatingMenuOpen = !isFloatingMenuOpen;
  floatingOptions.classList.toggle("active", isFloatingMenuOpen);
  floatingBtn.style.transform = isFloatingMenuOpen
    ? "rotate(45deg)"
    : "rotate(0deg)";
});

function scrollToSection(sectionClass) {
  const section = document.querySelector("." + sectionClass);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// Feature 2: Theme Toggle (Demo - shows concept)
const themeToggle = document.getElementById("themeToggle");
let isDarkMode = true;

themeToggle.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  themeToggle.textContent = isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode";
  // In a real implementation, this would switch themes
  document.body.style.filter = isDarkMode
    ? "none"
    : "invert(0.1) hue-rotate(180deg)";
});

// Feature 3: Video Preview Enhancement
videoCards.forEach((card) => {
  const preview = document.createElement("div");
  preview.className = "video-preview";
  card.querySelector(".video-thumbnail").appendChild(preview);
});

// Feature 4: Testimonials Carousel
const testimonialSlider = document.getElementById("testimonialSlider");
const testimonialDots = document.querySelectorAll(".testimonial-dot");
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll(".testimonial-card");
const totalTestimonials = testimonialCards.length;

function updateTestimonialDisplay() {
  const translateX = -currentTestimonial * 100; // 100% width per card
  testimonialSlider.style.transform = `translateX(${translateX}%)`;

  // Update dots
  testimonialDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentTestimonial);
  });
}

function changeTestimonial(direction) {
  currentTestimonial =
    (currentTestimonial + direction + totalTestimonials) % totalTestimonials;
  updateTestimonialDisplay();
}

function goToTestimonial(index) {
  currentTestimonial = index;
  updateTestimonialDisplay();
}

function slideTestimonials() {
  changeTestimonial(1);
}

setInterval(slideTestimonials, 5000);

// Skills Animation
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillBars = entry.target.querySelectorAll(".skill-progress");
        skillBars.forEach((bar) => {
          const width = bar.getAttribute("data-width");
          setTimeout(() => {
            bar.style.width = width + "%";
          }, 500);
        });
      }
    });
  },
  { threshold: 0.5 }
);

const skillsSection = document.querySelector(".skills-section");
if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// Feature 6: Timeline Animation Enhancement
const timelineItems = document.querySelectorAll(".timeline-item");
const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.3 }
);

timelineItems.forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translateY(30px)";
  item.style.transition = "all 0.6s ease";
  timelineObserver.observe(item);
});

// Feature 7: Pricing Calculator
const calculatorOptions = document.querySelectorAll(
  '.calculator-option input[type="checkbox"]'
);
const totalPriceDisplay = document.getElementById("totalPrice");

function updateTotalPrice() {
  let total = 0;
  calculatorOptions.forEach((option) => {
    if (option.checked) {
      total += parseInt(option.getAttribute("data-price"));
    }
  });
  totalPriceDisplay.textContent = `Total: ₹${total.toLocaleString()}`;
}

calculatorOptions.forEach((option) => {
  option.addEventListener("change", updateTotalPrice);
});

// Simple Chat Popup
const chatPopup = document.getElementById("chatPopup");
const chatOverlay = document.getElementById("chatOverlay");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");

function toggleChat() {
  chatPopup.style.display = "flex";
  chatOverlay.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeChat() {
  chatPopup.style.display = "none";
  chatOverlay.style.display = "none";
  document.body.style.overflow = "auto";
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  if (input.value.trim()) {
    addUserMessage(input.value);
    input.value = "";
  }
}

function addUserMessage(text) {
  const userMessage = document.createElement("div");
  userMessage.className = "message user";
  userMessage.textContent = text;
  chatMessages.appendChild(userMessage);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Simulate bot response
  setTimeout(() => {
    const botMessage = document.createElement("div");
    botMessage.className = "message bot";

    const responses = [
      "That sounds like an exciting project! 🎬 Let me connect you with our creative team. What's your budget range?",
      "Great! 🚀 We'd love to help you with that. What's your timeline and preferred style?",
      "Perfect! ✨ Our specialists can definitely handle that type of content. Would you like to see similar work samples?",
      "Awesome! 🎯 Let's schedule a call to discuss your vision in detail. When works best for you?",
      "Fantastic idea! 💡 We've done similar projects before. What platform is this content for?",
      "Love it! 🔥 That type of content performs really well. Do you have existing footage or need filming too?",
    ];

    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];
    botMessage.textContent = randomResponse;
    chatMessages.appendChild(botMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1000);
}

function handleChatInput(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

// Feature 9: Video Loading Simulation
videoCards.forEach((card) => {
  const loadingOverlay = document.createElement("div");
  loadingOverlay.className = "loading-overlay";
  loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
  card.appendChild(loadingOverlay);

  card.addEventListener("click", () => {
    loadingOverlay.style.display = "flex";
    setTimeout(() => {
      loadingOverlay.style.display = "none";
    }, 1500);
  });
});

// Feature 10: Social Proof Notifications
const socialProof = document.getElementById("socialProof");
const socialProofText = document.getElementById("socialProofText");

const proofMessages = [
  "🔥 Someone just ordered a gaming montage from Mumbai!",
  "⚡ New client from Delhi booked a documentary project!",
  "🎬 Fashion brand from Bangalore ordered product ads!",
  "🏆 Esports team from Pune requested highlight reel!",
  "💫 YouTuber from Chennai ordered color grading service!",
  "🚀 Startup from Hyderabad booked promotional video!",
];

function showSocialProof() {
  const randomMessage =
    proofMessages[Math.floor(Math.random() * proofMessages.length)];
  socialProofText.textContent = randomMessage;
  socialProof.classList.add("show");

  setTimeout(() => {
    socialProof.classList.remove("show");
  }, 4000);
}

function hideSocialProof() {
  socialProof.classList.remove("show");
}

// Show social proof notifications periodically
setInterval(showSocialProof, 8000);
setTimeout(showSocialProof, 3000); // First notification after 3 seconds

// Enhanced video card interactions
videoCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Smooth scroll for all internal links
document.addEventListener("click", (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }
});

// Enhanced scroll animations
const animatedElements = document.querySelectorAll(".fade-in");
const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Special animations for specific sections
        if (entry.target.classList.contains("stats")) {
          const counters = entry.target.querySelectorAll(".stat-number");
          counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute("data-target"));
            animateCounter(counter, target);
          });
        }
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

animatedElements.forEach((el) => scrollObserver.observe(el));
