const express = require('express');
const path = require('path'); 
const app = express();
const PORT = 4000;

app.use(express.static(path.join(__dirname)));

const listaDeUsuarios = [
  { id: 1, nombre: 'Juan', apellido: 'Perez' },
  { id: 2, nombre: 'Ana', apellido: 'Gomez' },
  { id: 3, nombre: 'Carlos', apellido: 'Rodriguez' }
];

app.get('/usuarios', (req, res) => {
  res.json(listaDeUsuarios);
});

app.get('/usuarios/:id', (req, res) => {
  const idSolicitado = parseInt(req.params.id);
  const usuarioEncontrado = listaDeUsuarios.find(usuario => usuario.id === idSolicitado);
  if (usuarioEncontrado) {
    res.json(usuarioEncontrado);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`¡Servidor en linea y corriendo en http://localhost:${PORT}`);
});