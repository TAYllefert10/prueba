// Cambio de imágenes
function changeColor(imgId, imgFile) {
  document.getElementById(imgId).src = "images/" + imgFile;
}

// Partículas
particlesJS.load('particles-js', 'https://cdn.jsdelivr.net/gh/VincentGarreau/particles.js/demo/particles.json');

// Dropdown en móvil y PC con clic
document.querySelectorAll('.dropbtn').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault(); // evitar que "salte"
    const dropdown = button.parentElement;
    dropdown.classList.toggle('active');

    // Cerrar otros menús
    document.querySelectorAll('.dropdown').forEach(other => {
      if (other !== dropdown) other.classList.remove('active');
    });
  });
});

// Cerrar menú al hacer scroll
window.addEventListener('scroll', () => {
  document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
});
