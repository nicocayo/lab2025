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
