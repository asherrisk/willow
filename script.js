const fallbackTestimonials = [
  {
    name: 'Leslie',
    image: 'images/testimonial-placeholder.svg',
    text: "Incredible... how you put all of these together so fast. You're a great songwriter! You're my hero.",
  },
  {
    name: 'N.S.',
    image: 'images/testimonial-placeholder.svg',
    text: "Your music offers chills in such a classic soulful style that we haven't heard in so long. The lyrics, your cadence, on how you flow with words and how you package your music is so special and unique.",
  },
  {
    name: 'Mentee',
    image: 'images/testimonial-placeholder.svg',
    text: 'Willow is a creative genius. Her versatility is outstanding.',
  },
  {
    name: 'Mentee',
    image: 'images/testimonial-placeholder.svg',
    text: "Your work is beautiful and reminds me that vulnerability creates connection. I'm now realizing that.",
  },
  {
    name: 'N.D.',
    image: 'images/testimonial-placeholder.svg',
    text: "You are the absolute coolest. You're amazing and I love hearing you sing. Your voice suits this so much.",
  },
  {
    name: 'Mentee',
    image: 'images/testimonial-placeholder.svg',
    text: 'I\'m so inspired. Love your energy, confidence, and work ethic.',
  },
  {
    name: 'Mentee',
    image: 'images/testimonial-placeholder.svg',
    text: "Willow, probably one of the most genuine souls I've ever met. She's a songwriter with so much soul and talent.",
  },
  {
    name: 'Mentee',
    image: 'images/testimonial-placeholder.svg',
    text: "You're always so supportive. Appreciate you.",
  },
  {
    name: 'Mentee',
    image: 'images/testimonial-placeholder.svg',
    text: 'Your notes are so precise and clean.',
  },
  {
    name: 'Shel',
    image: 'images/testimonial-placeholder.svg',
    text: "So soulful. The production, omg it's great. Well done. I'm impressed.",
  },
  {
    name: 'MAS',
    image: 'images/testimonial-placeholder.svg',
    text: 'You nailed it. Gosh your vocal control is amazing.',
  },
  {
    name: 'P. A.',
    image: 'images/testimonial-placeholder.svg',
    text: 'Life is too short to hold back.',
  },
  {
    name: 'Chloe',
    image: 'images/chloe-guitar.jpeg',
    text: 'Willow has not only taught me how music enriches our lives, but also been a huge inspiration to me. She guided me through the songwriting process - we wrote a song together!! - and she taught me the importance of consistency, perseverance, having goals, and building meaningful community connections.',
  },
  {
    name: 'Maya Dejesus',
    image: 'images/testimonial-placeholder.svg',
    text: "Willow, thank you so much for today. I had so much fun! I got less nervous as I played and that's because of you, so thank you so much. I appreciate you and all your help so much!!!",
  },
];

let testimonials = [];
let currentIndex = 0;
let isAnimating = false;

const transitionDuration = 700;
const track = document.querySelector('.carousel-track');
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');

async function init() {
  testimonials = await loadTestimonials();

  renderCards();
  updateCardPositions();
  setupButtons();
}

async function loadTestimonials() {
  if (window.location.protocol === 'file:') {
    return fallbackTestimonials;
  }

  try {
    const response = await fetch('testimonials.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`Testimonials request failed: ${response.status}`);
    return response.json();
  } catch (error) {
    console.warn('Using bundled testimonials because testimonials.json could not be loaded.', error);
    return fallbackTestimonials;
  }
}

function createCard(testimonial, index) {
  const card = document.createElement('article');
  card.className = 'testimonial-card';
  card.dataset.index = index;

  const image = document.createElement('img');
  image.src = testimonial.image;
  image.alt = testimonial.name;

  const quote = document.createElement('p');
  quote.textContent = testimonial.text;

  const name = document.createElement('h2');
  name.textContent = testimonial.name;

  card.append(image, quote, name);

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
