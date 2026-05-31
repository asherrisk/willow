const siteHeader = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#main-nav');
const desktopMedia = window.matchMedia('(min-width: 861px)');

function setNavOpen(isOpen) {
  siteHeader.classList.toggle('nav-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute(
    'aria-label',
    isOpen ? 'Close navigation menu' : 'Open navigation menu',
  );
}

function closeNav() {
  setNavOpen(false);
}

if (siteHeader && navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    setNavOpen(!siteHeader.classList.contains('nav-open'));
  });

  navMenu.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      closeNav();
    }
  });

  document.addEventListener('click', (event) => {
    if (!siteHeader.classList.contains('nav-open')) return;
    if (!siteHeader.contains(event.target)) {
      closeNav();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNav();
      navToggle.focus();
    }
  });

  desktopMedia.addEventListener('change', (event) => {
    if (event.matches) {
      closeNav();
    }
  });
}
