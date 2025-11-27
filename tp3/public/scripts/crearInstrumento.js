document.getElementById('form-crear-instrumento').addEventListener('submit', async (e) => {
  e.preventDefault();

  // datos del form
  const datosInstrumento = {
    nombre: document.getElementById('input-nombre').value.trim(),
    categoria: document.getElementById('input-categoria').value,
    tipoSonido: document.getElementById('input-tipoSonido').value,
    escala: document.getElementById('input-escala').value || 'ninguna',
    imagen: document.getElementById('input-imagen').value.trim() || '../assets/img/placeholder.png',
    link: document.getElementById('input-link').value.trim() || './enDesarrollo.html',
    carpetaSonidos: document.getElementById('input-carpetaSonidos').value.trim() || ''
  };

  //validacion
  if (!datosInstrumento.nombre) {
    mostrarMensaje('Por favor, ingresa un nombre para el instrumento', 'error');
    return;
  }

  if (!datosInstrumento.categoria) {
    mostrarMensaje('Por favor, selecciona una categoría', 'error');
    return;
  }

  if (!datosInstrumento.tipoSonido) {
    mostrarMensaje('Por favor, selecciona un tipo de sonido', 'error');
    return;
  }

  try {
    const response = await fetch('/api/instrumentos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosInstrumento)
    });

    const resultado = await response.json();

    if (!response.ok) {
      // mostrar errores
      let mensajeError = resultado.error || 'Error al crear el instrumento';
      
      if (resultado.detalles && Array.isArray(resultado.detalles)) {
        mensajeError += '<ul class="detalles-error">';
        resultado.detalles.forEach(detalle => {
          mensajeError += `<li>${detalle}</li>`;
        });
        mensajeError += '</ul>';
      }
      
      mostrarMensaje(mensajeError, 'error');
      return;
    }

    //si ok
    mostrarMensaje(`"${resultado.nombre}" creado exitosamente con ID ${resultado.id}`, 'exito');
    
    // Limpo formulario
    document.getElementById('form-crear-instrumento').reset();

    // redirigir después de 2 segundos
    setTimeout(() => {
      location.href = './cuadriculada.html';
    }, 2000);

  } catch (error) {
    console.error('Error:', error);
    mostrarMensaje('Error de conexión con el servidor', 'error');
  }
});

function mostrarMensaje(html, tipo) {
  const div = document.getElementById('mensaje-resultado');
  div.innerHTML = html;
  div.className = tipo;
  div.style.display = 'block';
  
  // Scroll al mensaje
  div.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}