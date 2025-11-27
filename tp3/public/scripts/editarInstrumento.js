// Saco id del instrumento de la URL
const urlParams = new URLSearchParams(window.location.search);
const instrumentoId = parseInt(urlParams.get('id'));

// Cargo datos ACTUALES del instrumento
async function cargarDatosInstrumento() {
  try {
    const response = await fetch(`/api/instrumentos/${instrumentoId}`);
    
    if (!response.ok) {
      throw new Error('Instrumento no encontrado');
    }

    const instrumento = await response.json();

    // Actualizar título principal con el nombre del instrumento
    document.getElementById('nombre-instrumento').textContent = instrumento.nombre;
    
    // Cambiar título de la página
    document.title = `${instrumento.nombre} - Ático de Vilma`;

    // Rellenar formulario con datos actuales
    document.getElementById('input-nombre').value = instrumento.nombre;
    document.getElementById('input-categoria').value = instrumento.categoria || 'teclado';
    document.getElementById('input-tipoSonido').value = instrumento.tipoSonido;
    document.getElementById('input-escala').value = instrumento.escala || 'ninguna';

    // Aplicar escala si hay una seleccionada
    if (instrumento.escala && instrumento.escala !== 'ninguna') {
      resaltarEscala(instrumento.escala);
    }

  } catch (error) {
    console.error('Error:', error);
    document.getElementById('nombre-instrumento').textContent = 'Error al cargar';
    mostrarMensaje('Error al cargar instrumento', 'error');
  }
}

// Manejar envío del formulario
document.getElementById('form-instrumento').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevenir recarga de página

  const datosActualizados = {
    nombre: document.getElementById('input-nombre').value,
    categoria: document.getElementById('input-categoria').value,
    tipoSonido: document.getElementById('input-tipoSonido').value,
    escala: document.getElementById('input-escala').value
  };

  try {
    const response = await fetch(`/api/instrumentos/${instrumentoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosActualizados)
    });

    const resultado = await response.json();

    if (!response.ok) {
      // Mostrar errores del array que devuelve la validación
      const errores = resultado.detalles ? resultado.detalles.join(', ') : resultado.error;
      mostrarMensaje(errores, 'error');
      return;
    }

    // Actualizar el título con el nuevo nombre
    document.getElementById('nombre-instrumento').textContent = resultado.nombre;
    document.title = `${resultado.nombre} - Ático de Vilma`;

    mostrarMensaje('¡Instrumento actualizado correctamente!', 'exito');

  } catch (error) {
    console.error('Error:', error);
    mostrarMensaje('Error al actualizar', 'error');
  }
});

function mostrarMensaje(texto, tipo) {
  const div = document.getElementById('mensaje-resultado');
  div.textContent = texto;
  div.className = tipo;
  
  setTimeout(() => {
    div.textContent = '';
    div.className = '';
  }, 3000);
}

// Cargar datos al inicio
if (instrumentoId) {
  cargarDatosInstrumento();
} else {
  document.getElementById('nombre-instrumento').textContent = 'Error: ID no encontrado';
  mostrarMensaje('No se especificó un ID de instrumento', 'error');
}