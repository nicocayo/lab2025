//funciones bateria
const drumPads = document.querySelectorAll('.pad');

drumPads.forEach(pad => {
  pad.addEventListener('click', () => playPad(pad.dataset.key));
});

const playPad = (key) => {
  if (!key) return; // evita keys vacías
  const audio = new Audio(`../sonidos/drumkit/${key}.wav`); // 
  audio.play().catch(e => console.warn('play error:', e));
  const activePad = document.querySelector(`.pad[data-key="${key}"]`);
  if (activePad) {
    activePad.style.transform = "scale(0.9)";
    setTimeout(() => activePad.style.transform = "scale(1)", 100);
  }
};

document.addEventListener('keydown', (event) => {
  playPad(event.key.toLowerCase());
});
