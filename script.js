// ===== Pure black space + tiny twinkling stars only =====
function createStars() {
  // clean up any old ones
  document.querySelectorAll(".star-particle").forEach((el) => el.remove());

  const starCount = 400;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.className = "star-particle";

    // tiny dots only (0.5px – 1.5px)
    const size = Math.random() < 0.85 ? 1 : 1.5;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = 2 + Math.random() * 4;
    const delay = Math.random() * 5;
    const baseOpacity = 0.3 + Math.random() * 0.5;

    // mostly pure white, a few soft blue
    const color = Math.random() > 0.8 ? "#a0c4ff" : "#ffffff";

    star.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      border-radius: 50%;
      left: ${x}%;
      top: ${y}%;
      opacity: ${baseOpacity};
      pointer-events: none;
      z-index: 0;
      animation: starTwinkle ${duration}s ease-in-out infinite;
      animation-delay: ${delay}s;
    `;

    document.body.appendChild(star);
  }
}

// only opacity changes – no scaling that can look like circles
const style = document.createElement("style");
style.textContent = `
  @keyframes starTwinkle {
    0%, 100% { opacity: 0.1; }
    50% { opacity: 0.9; }
  }
`;
document.head.appendChild(style);

// ===== Mobile nav =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

// ===== Card reveal =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(24px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

createStars();
