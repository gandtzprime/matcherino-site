// Sélection des éléments
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const dots = document.querySelectorAll('.dot');

let index = 0;

// --- Afficher une slide ---
function showSlide(i) {
  slides.forEach((slide, n) => {
    slide.classList.toggle('active', n === i);
  });
  dots.forEach((dot, n) => {
    dot.classList.toggle('active', n === i);
  });
}

// --- Navigation flèches ---
nextBtn.addEventListener('click', () => {
  index = (index + 1) % slides.length;
  showSlide(index);
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
});

// --- Clic sur les points ---
dots.forEach((dot, n) => {
  dot.addEventListener('click', () => {
    index = n;
    showSlide(index);
  });
});

// --- Auto-défilement ---
setInterval(() => {
  index = (index + 1) % slides.length;
  showSlide(index);
}, 4000);
