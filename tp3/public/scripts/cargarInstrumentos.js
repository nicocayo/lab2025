let paginaActual = 0;
let instrumentosPorPagina = 6;
let totalInstrumentos = 0;
let totalPaginas = 0;

async function cargarInstrumentos() {
  try {
    // Mostrar mensaje de carga
    document.getElementById('cuerpo-tabla').innerHTML = 
      '<tr><td colspan="2" class="mensaje-carga">Cargando instrumentos...</td></tr>';

    const response = await fetch(
      `/api/instrumentos?cantidad=${instrumentosPorPagina}&from=${paginaActual * instrumentosPorPagina}`
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    
    // guardo total
    totalInstrumentos = data.total;
    totalPaginas = Math.ceil(totalInstrumentos / instrumentosPorPagina);

    mostrarInstrumentos(data.datos);
    
    actualizarControlesPaginacion();

  } catch (error) {
    console.error('Error al cargar instrumentos:', error);
    document.getElementById('cuerpo-tabla').innerHTML = 
      '<tr><td colspan="2" class="mensaje-carga"> Error al cargar instrumentos</td></tr>';
  }
}

// carga la tabla (de a 2 columnas)
function mostrarInstrumentos(instrumentos) {
  const cuerpoTabla = document.getElementById('cuerpo-tabla');
  cuerpoTabla.innerHTML = ''; // limpiamos inicialmente

  if (instrumentos.length === 0) {
    cuerpoTabla.innerHTML = 
      '<tr><td colspan="2" class="mensaje-carga">No hay instrumentos para mostrar</td></tr>';
    return;
  }

  // Crear filas (2 columnas)
  for (let i = 0; i < instrumentos.length; i += 2) {
    const fila = document.createElement('tr');
    
    // Primera columna
    fila.appendChild(crearCeldaInstrumento(instrumentos[i]));
    
    // Segunda columna (si existe)
    if (instrumentos[i + 1]) {
      fila.appendChild(crearCeldaInstrumento(instrumentos[i + 1]));
    } else {
      // Celda vacía si hay número impar
      const celdaVacia = document.createElement('td');
      celdaVacia.style.backgroundColor = 'transparent';
      fila.appendChild(celdaVacia);
    }
    
    cuerpoTabla.appendChild(fila);
  }
}

// crea una celda con el instrumento
function crearCeldaInstrumento(instrumento) {
  const celda = document.createElement('td');
  
  // chequeo si es un instrumento funcional
  const esFuncional = instrumento.id <= 3;
  const enDesarrollo = esFuncional ? '' : '<span class="en-desarrollo">En Desarrollo</span>';
  
  celda.innerHTML = `
    <a href="${instrumento.link}?id=${instrumento.id}" style="text-decoration: none; color: inherit;">
      <img src="${instrumento.imagen}" alt="${instrumento.nombre}" onerror="this.src='../assets/img/placeholder.png'">
      <p>${instrumento.nombre} ${enDesarrollo}</p>
      <small>
        ${instrumento.categoria} | ${instrumento.tipoSonido}
      </small>
    </a>
  `;
  
  return celda;
}

function actualizarControlesPaginacion() {
  const inicio = (paginaActual * instrumentosPorPagina) + 1;
  const fin = Math.min((paginaActual + 1) * instrumentosPorPagina, totalInstrumentos);
  
  document.getElementById('info-paginacion').textContent = 
    `Mostrando ${inicio}-${fin} de ${totalInstrumentos} instrumentos | Página ${paginaActual + 1} de ${totalPaginas}`;
  
  // Habilitar/deshabilitar botones
  document.getElementById('btn-primera').disabled = paginaActual === 0;
  document.getElementById('btn-anterior').disabled = paginaActual === 0;
  document.getElementById('btn-siguiente').disabled = paginaActual >= totalPaginas - 1;
  document.getElementById('btn-ultima').disabled = paginaActual >= totalPaginas - 1;
}

function cambiarPagina(direccion) {
  const nuevaPagina = paginaActual + direccion;
  
  if (nuevaPagina >= 0 && nuevaPagina < totalPaginas) {
    paginaActual = nuevaPagina;
    cargarInstrumentos();
  }
}

function irAPagina(numeroPagina) {
  if (numeroPagina >= 0 && numeroPagina < totalPaginas) {
    paginaActual = numeroPagina;
    cargarInstrumentos();
  }
}

function irAUltimaPagina() {
  paginaActual = totalPaginas - 1;
  cargarInstrumentos();
}

document.getElementById('select-cantidad').addEventListener('change', (e) => {
  const valor = e.target.value;
  
  if (valor === 'Todos') {
    instrumentosPorPagina = 1000; // para traer todos
  } else {
    instrumentosPorPagina = parseInt(valor);
  }
  
  paginaActual = 0; // Resetear a primera página
  cargarInstrumentos();
});

// para cargar al inicio
cargarInstrumentos();