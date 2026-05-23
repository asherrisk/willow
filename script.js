// Add shadow to navbar when scrolling
const navbar = document.getElementById("mainNavbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

// Set footer year automatically
document.getElementById("year").textContent = new Date().getFullYear();

// Demo contact form behavior
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  formMessage.classList.remove("d-none");
  contactForm.reset();

  setTimeout(() => {
    formMessage.classList.add("d-none");
  }, 4500);
});

// Close mobile menu after clicking a nav link
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
const navbarCollapse = document.getElementById("navbarMenu");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navbarCollapse.classList.contains("show")) {
      const collapse = new bootstrap.Collapse(navbarCollapse);
      collapse.hide();
    }
  });
});
