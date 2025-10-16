document.addEventListener("DOMContentLoaded", async () => {
  const tabla = document.getElementById("tabla-instrumentos");

  try {
    const response = await fetch("../scripts/instrumentos.json");
    const data = await response.json();

    const fila = document.createElement("tr");

    data.instrumentos.forEach(instr => {
      const celda = document.createElement("td");
      celda.innerHTML = `
        <a class="link-instrumento" href="${instr.link}">
          ${instr.nombre}
          <figure>
            <img src="${instr.imagen}" alt="${instr.nombre}">
          </figure>
        </a>
      `;
      fila.appendChild(celda);
    });

    tabla.appendChild(fila);
  } catch (err) {
    console.error("Error al cargar los instrumentos:", err);
  }
});
