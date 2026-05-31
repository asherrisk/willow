let testimonials = [];

async function init() {
  const response = await fetch('testimonials.json');
  testimonials = await response.json();
	renderCarousel();
}

init();

let currentIndex = 0;

function populateCard(element, testimonial) {
  console.log(testimonials);
  element.innerHTML = `
        <img src="${testimonial.image}" alt="${testimonial.name}">
        <h2>${testimonial.name}</h2>
        <p>${testimonial.text}</p>
    `;
}

function renderCarousel() {
  const leftIndex =
    (currentIndex - 1 + testimonials.length) % testimonials.length;

  const rightIndex = (currentIndex + 1) % testimonials.length;

  populateCard(document.querySelector('.left-card'), testimonials[leftIndex]);

  populateCard(
    document.querySelector('.active-card'),
    testimonials[currentIndex],
  );

  populateCard(document.querySelector('.right-card'), testimonials[rightIndex]);
}

document.querySelector('.next-btn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % testimonials.length;

  renderCarousel();
});

document.querySelector('.prev-btn').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;

  renderCarousel();
});

