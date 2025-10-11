//Funciones del piano 
const pianoKeys = document.querySelectorAll('.key');
let audio = new Audio('../sonidos/a.wav');

pianoKeys.forEach((key) => {
    key.addEventListener('click', () => 
        playKey(key.dataset.key))
})

const playKey = (key) => {
    audio.src = `../sonidos/${key}.wav`;
    audio.play();
}

document.addEventListener('keydown', (event) => {
    playKey(event.key);
})