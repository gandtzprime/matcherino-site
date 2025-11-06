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

// --- modifier les tournois qui s'affiche ---
const tournaments = [
    { name: "YF7 Tournaments #7", date: "2025-11-08T21:00:00", link: "https://matcherino.com/supercell/tournaments/173149" },
    { name: "YF7 Tournaments X BTLN #1", date: "2025-11-29T21:00:00", link: "https://matcherino.com/supercell/tournaments/173159" }
];


const list = document.getElementById("tournament-list");

// Filtrer uniquement les tournois à venir
const now = new Date();
const upcoming = tournaments.filter(t => new Date(t.date) > now);

// Trier par date
upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));

// Fonction pour créer le compte à rebours
function getCountdown(date) {
    const diff = new Date(date) - new Date();
    if (diff <= 0) return "En cours / terminé";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    return `${days}j ${hours}h ${minutes}m`;
}

// Afficher la liste des tournois
upcoming.forEach((t, index) => {
    const li = document.createElement("li");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("tournament-info");
    infoDiv.innerHTML = `<span>${t.name} — ${new Date(t.date).toLocaleDateString()} à ${new Date(t.date).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                         <span class="countdown" id="countdown-${index}"></span>`;

    const btn = document.createElement("a");
    btn.href = t.link;
    btn.target = "_blank";
    btn.textContent = "S'inscrire";
    btn.classList.add("btn-register");

    // Bouton copier le lien
    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copier lien";
    copyBtn.classList.add("copy-btn");
    copyBtn.onclick = () => {
        navigator.clipboard.writeText(t.link).then(() => alert("Lien copié !"));
    };

    li.appendChild(infoDiv);
    li.appendChild(btn);
    li.appendChild(copyBtn);

    list.appendChild(li);

    // Mettre à jour le compte à rebours toutes les minutes
    function updateCountdown() {
        document.getElementById(`countdown-${index}`).textContent = getCountdown(t.date);
    }
    updateCountdown();
    setInterval(updateCountdown, 60000);
});
