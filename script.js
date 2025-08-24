// ====== CAMBIO DE COLOR DE IMAGEN ======
function changeColor(imgId, newSrc) {
  const el = document.getElementById(imgId);
  if (!el) return;
  el.src = "images/" + newSrc;
}

// ====== MENÚ DESPLEGABLE (BOTONES, NO <a>) ======
function toggleDropdown(menuId, btnEl) {
  document.querySelectorAll('.dropdown').forEach(dd => {
    const content = dd.querySelector('.dropdown-content');
    const btn = dd.querySelector('.dropbtn');
    if (content && content.id !== menuId) {
      dd.classList.remove('open');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }
  });

  const parent = btnEl.closest('.dropdown');
  const content = document.getElementById(menuId);
  if (!parent || !content) return;

  const isOpen = parent.classList.toggle('open');
  btnEl.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

document.addEventListener('click', (e) => {
  const clickedInside = e.target.closest('.dropdown');
  if (!clickedInside) {
    document.querySelectorAll('.dropdown').forEach(dd => {
      dd.classList.remove('open');
      const btn = dd.querySelector('.dropbtn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.dropdown-content a').forEach(a => {
    a.addEventListener('click', () => {
      document.querySelectorAll('.dropdown').forEach(dd => dd.classList.remove('open'));
      document.querySelectorAll('.dropbtn').forEach(btn => btn.setAttribute('aria-expanded', 'false'));
    });
  });
});

// ====== BUSCADOR + FILTROS RÁPIDOS + PAGINACIÓN ======
(function setupSearchAndFilters() {
  const searchInput = document.getElementById('searchInput');
  const pills = document.querySelectorAll('.pill');
  const cards = Array.from(document.querySelectorAll('.card'));
  const paginationEl = document.getElementById('pagination');

  let currentGender = 'all';
  let currentCategory = 'all';
  let currentQuery = '';
  let currentPage = 1;
  const perPage = 20;

  const normalize = (str) =>
    (str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  function applyFilters() {
    const q = normalize(currentQuery);
    const filtered = cards.filter(card => {
      const gender = card.dataset.gender || '';
      const category = card.dataset.category || '';
      const name = normalize(card.dataset.name || '');
      const genderOk = currentGender === 'all' || gender === currentGender;
      const categoryOk = currentCategory === 'all' || category === currentCategory;
      const searchOk = q === '' || name.includes(q) || normalize(gender).includes(q) || normalize(category).includes(q);
      return genderOk && categoryOk && searchOk;
    });
    showPage(filtered, currentPage);
    setupPagination(filtered);
  }

  function showPage(filteredCards, page) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    filteredCards.forEach((card, idx) => {
      card.style.display = (idx >= start && idx < end) ? '' : 'none';
    });
  }

  function setupPagination(filteredCards) {
    if (!paginationEl) return;
    paginationEl.innerHTML = '';
    const totalPages = Math.ceil(filteredCards.length / perPage);
    if (totalPages <= 1) return; // solo una página, no mostrar

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.classList.add('page-btn');
      if (i === currentPage) btn.classList.add('active');
      btn.addEventListener('click', () => {
        currentPage = i;
        showPage(filteredCards, currentPage);
        setupPagination(filteredCards);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      paginationEl.appendChild(btn);
    }
  }

  // Input de búsqueda
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentQuery = e.target.value;
      currentPage = 1;
      applyFilters();
    });
  }

  // Click en pills
  pills.forEach(p => {
    p.addEventListener('click', () => {
      const type = p.dataset.filterType;
      const value = p.dataset.filterValue;
      document.querySelectorAll(`.pill[data-filter-type="${type}"]`).forEach(b => b.classList.remove('active'));
      p.classList.add('active');
      if (type === 'gender') currentGender = value;
      if (type === 'category') currentCategory = value;
      currentPage = 1;
      applyFilters();
    });
  });

  applyFilters();
})();

// ====== SCROLL REVEAL ======
(function revealOnScroll() {
  const items = document.querySelectorAll('.revealable');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('reveal'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => io.observe(el));
})();

// ====== BOTÓN FLOTANTE SUBIR ======
(function setupBackToTop() {
  const btn = document.getElementById('btnTop');
  if (!btn) return;
  function onScroll() {
    btn.style.display = window.scrollY > 400 ? 'block' : 'none';
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ====== PARTICULAS DE FONDO ======
particlesJS("particles-js", {
  "particles": {
    "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
    "color": { "value": "#ffffff" },
    "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" } },
    "opacity": { "value": 0.45, "random": false },
    "size": { "value": 3, "random": true },
    "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.25, "width": 1 },
    "move": { "enable": true, "speed": 2.4, "direction": "none", "random": false, "straight": false, "out_mode": "out" }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { "enable": true, "mode": "repulse" },
      "onclick": { "enable": true, "mode": "push" },
      "resize": true
    },
    "modes": { "repulse": { "distance": 100, "duration": 0.4 }, "push": { "particles_nb": 3 } }
  },
  "retina_detect": true
});
