const siteHeader = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#main-nav');
const desktopMedia = window.matchMedia('(min-width: 1101px)');

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
    const link = event.target.closest('a');

    if (link) {
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

document.querySelectorAll('a[href="#home"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    scrollHomeLinkToTop(event, link);
  });
});

function scrollHomeLinkToTop(event, link) {
  if (link.getAttribute('href') !== '#home') return;

  event.preventDefault();
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;
  const scrollToTop = () => {
    window.scrollTo(0, 0);

    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }

    document.body.scrollTop = 0;
    root.scrollTop = 0;
  };

  root.style.scrollBehavior = 'auto';
  scrollToTop();
  window.requestAnimationFrame(() => {
    scrollToTop();
    root.style.scrollBehavior = previousScrollBehavior;
  });

  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
}
