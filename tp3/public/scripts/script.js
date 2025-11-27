document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("botonAumentada");
  boton.addEventListener("click", () => {
    window.location.href = "./pages/aumentada.html";
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("botonCuadriculada");
  boton.addEventListener("click", () => {
    window.location.href = "./pages/cuadriculada.html";
  });
});




//Funciones del piano 
const pianoKeys = document.querySelectorAll('.key');
let audio = new Audio('../assets/sonidos/piano/a.wav');

pianoKeys.forEach((key) => {
    key.addEventListener('click', () => 
        playKey(key.dataset.key))
})

const playKey = (key) => {
    audio.src = `../assets/sonidos/piano/${key}.wav`;
    audio.play();
}

document.addEventListener('keydown', (event) => {
    playKey(event.key);
})

// marcas de escalas

// Definición de escalas musicales
const escalas = {
  ninguna: [],
  
  // Do Mayor: Do, Re, Mi, Fa, Sol, La, Si
  DOr: ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'],
  
  // Do Menor: Do, Re, Mib, Fa, Sol, Lab, Sib
  DOm: ['do', 're', 're#', 'fa', 'sol', 'sol#', 'la#'],
  
  // Re Mayor: Re, Mi, Fa#, Sol, La, Si, Do#
  RE: ['re', 'mi', 'fa#', 'sol', 'la', 'si', 'do#'],
  
  // Re Menor: Re, Mi, Fa, Sol, La, Sib, Do
  REm: ['re', 'mi', 'fa', 'sol', 'la', 'la#', 'do'],
  
  // Mi Mayor: Mi, Fa#, Sol#, La, Si, Do#, Re#
  MI: ['mi', 'fa#', 'sol#', 'la', 'si', 'do#', 're#'],
  
  // Fa Mayor: Fa, Sol, La, Sib, Do, Re, Mi
  FA: ['fa', 'sol', 'la', 'la#', 'do', 're', 'mi'],
  
  // Sol Mayor: Sol, La, Si, Do, Re, Mi, Fa#
  SOL: ['sol', 'la', 'si', 'do', 're', 'mi', 'fa#'],
  
  // La Menor: La, Si, Do, Re, Mi, Fa, Sol
  LAm: ['la', 'si', 'do', 're', 'mi', 'fa', 'sol']
};

// Función para limpiar resaltado previo
function limpiarResaltado() {
  const teclas = document.querySelectorAll('.key');
  teclas.forEach(tecla => {
    tecla.classList.remove('resaltada-tonica', 'resaltada-nota');
  });
}

// Función para resaltar escala
function resaltarEscala(escalaSeleccionada) {
  limpiarResaltado();
  
  if (escalaSeleccionada === 'ninguna') {
    return;
  }
  
  const notasEscala = escalas[escalaSeleccionada];
  
  if (!notasEscala) {
    console.error('Escala no definida:', escalaSeleccionada);
    return;
  }
  
  // la primera nota de la escala es la tónica (color diferente)
  const tonica = notasEscala[0];
  
  // Recorrer todas las teclas del piano
  const teclas = document.querySelectorAll('.key');
  
  teclas.forEach(tecla => {
    // agarro las clases de la tecla
    const clases = Array.from(tecla.classList);
    
    // busco la nota en las clases (excluyo las clases que no me interesan y me quedo solo con 'do', 're#', etc.)
    const notaTecla = clases.find(clase => 
      clase !== 'key' && 
      clase !== 'white' && 
      clase !== 'black' &&
      clase !== 'resaltada-tonica' &&
      clase !== 'resaltada-nota'
    );
    
    if (!notaTecla) return;
    
    // Verificar si la nota está en la escala
    if (notasEscala.includes(notaTecla)) {
      if (notaTecla === tonica) {
        tecla.classList.add('resaltada-tonica'); // Rojo para tónica
      } else {
        tecla.classList.add('resaltada-nota'); // Azul para otras notas
      }
    }
  });
}

// escucha cambios en el form para escala
const selectorEscala = document.getElementById('input-escala');

if (selectorEscala) {
  selectorEscala.addEventListener('change', (e) => {
    resaltarEscala(e.target.value);
  });
  
  // Aplicar escala inicial si hay una seleccionada
  if (selectorEscala.value !== 'ninguna') {
    resaltarEscala(selectorEscala.value);
  }
}
