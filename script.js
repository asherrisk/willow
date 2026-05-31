let testimonials = [];
let currentIndex = 0;
let isAnimating = false;

const transitionDuration = 700;
const track = document.querySelector('.carousel-track');
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');

async function init() {
  const response = await fetch('testimonials.json');
  testimonials = await response.json();

  renderCards();
  updateCardPositions();
  setupButtons();
}

function createCard(testimonial, index) {
  const card = document.createElement('article');
  card.className = 'testimonial-card';
  card.dataset.index = index;

  const image = document.createElement('img');
  image.src = testimonial.image;
  image.alt = testimonial.name;

  const name = document.createElement('h2');
  name.textContent = testimonial.name;

  const quote = document.createElement('p');
  quote.textContent = testimonial.text;

  card.append(image, name, quote);

  return card;
}

function renderCards() {
  if (!testimonials.length) return;

  const fragment = document.createDocumentFragment();

  testimonials.forEach((testimonial, index) => {
    fragment.append(createCard(testimonial, index));
  });

  track.replaceChildren(fragment);
}

function getRelativePosition(index) {
  const total = testimonials.length;
  const forward = (index - currentIndex + total) % total;
  const backward = forward - total;

  return Math.abs(forward) <= Math.abs(backward) ? forward : backward;
}

function getPositionClass(position) {
  if (position === 0) return 'position-active';
  if (position === -1) return 'position-left';
  if (position === 1) return 'position-right';
  if (position < -1) return 'position-far-left';
  return 'position-far-right';
}

function updateCardPositions() {
  const cards = track.querySelectorAll('.testimonial-card');

  cards.forEach((card) => {
    const position = getRelativePosition(Number(card.dataset.index));
    const positionClass = getPositionClass(position);

    card.classList.remove(
      'position-active',
      'position-left',
      'position-right',
      'position-far-left',
      'position-far-right',
    );

    card.classList.add(positionClass);
    card.setAttribute('aria-hidden', position === 0 ? 'false' : 'true');
  });
}

function moveTo(index) {
  if (isAnimating || !testimonials.length) return;

  isAnimating = true;
  currentIndex = (index + testimonials.length) % testimonials.length;
  updateCardPositions();

  window.setTimeout(() => {
    isAnimating = false;
  }, transitionDuration);
}

function setupButtons() {
  nextButton.addEventListener('click', () => {
    moveTo(currentIndex + 1);
  });

  prevButton.addEventListener('click', () => {
    moveTo(currentIndex - 1);
  });
}

init();
