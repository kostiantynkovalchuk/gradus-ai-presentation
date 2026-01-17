// Modern scroll-snap presentation with progress indicators
const slides = document.querySelectorAll(".slide");
const presentation = document.querySelector(".presentation");
const indicatorsContainer = document.getElementById("slideIndicators");
const navHint = document.getElementById("navHint");
let currentSlide = 0;

// Create slide indicators
slides.forEach((slide, index) => {
  const dot = document.createElement("div");
  dot.className = "slide-dot";
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    slides[index].scrollIntoView({ behavior: "smooth" });
  });
  indicatorsContainer.appendChild(dot);
});

// Update active indicator on scroll
let scrollTimeout;
presentation.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const scrollPosition = presentation.scrollTop;
    const slideHeight = window.innerHeight;
    const newSlide = Math.round(scrollPosition / slideHeight);

    if (newSlide !== currentSlide) {
      document
        .querySelectorAll(".slide-dot")
        [currentSlide].classList.remove("active");
      document
        .querySelectorAll(".slide-dot")
        [newSlide].classList.add("active");
      currentSlide = newSlide;
    }

    // Hide nav hint after first scroll
    if (navHint && scrollPosition > 50) {
      navHint.style.display = "none";
    }
  }, 100);
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown" || e.key === "PageDown") {
    e.preventDefault();
    if (currentSlide < slides.length - 1) {
      slides[currentSlide + 1].scrollIntoView({ behavior: "smooth" });
    }
  } else if (e.key === "ArrowUp" || e.key === "PageUp") {
    e.preventDefault();
    if (currentSlide > 0) {
      slides[currentSlide - 1].scrollIntoView({ behavior: "smooth" });
    }
  } else if (e.key === "Home") {
    e.preventDefault();
    slides[0].scrollIntoView({ behavior: "smooth" });
  } else if (e.key === "End") {
    e.preventDefault();
    slides[slides.length - 1].scrollIntoView({ behavior: "smooth" });
  }
});

// Tab switching function
function switchTab(event, tabId) {
  // Hide all tab contents
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Remove active state from all buttons
  document.querySelectorAll(".tab-button").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Show selected tab content
  document.getElementById(tabId).classList.add("active");

  // Add active state to clicked button
  event.currentTarget.classList.add("active");
}

// Fullscreen modal functions for avatars
function openFullscreen(avatarType) {
  const modal = document.getElementById("fullscreenModal");
  const content = document.getElementById("fullscreenContent");

  const videoSrc =
    avatarType === "maya"
      ? "assets/Maya_trends.mp4"
      : "assets/Alex Intro.mp4";

  content.innerHTML = `
        <video
          src="${videoSrc}"
          controls
          autoplay
          style="max-width: 90vw; max-height: 90vh; object-fit: contain;"
        >
        </video>
    `;

  modal.classList.add("active");
}

function closeFullscreen() {
  document.getElementById("fullscreenModal").classList.remove("active");
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeFullscreen();
  }
});
