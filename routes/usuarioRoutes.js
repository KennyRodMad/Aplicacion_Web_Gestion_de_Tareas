const express = require('express');
const router = express.Router();
const {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
} = require('../controllers/usuarioController');

// Rutas existentes
router.post('/', crearUsuario);
router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuarioPorId);    // Obtener usuario por ID
router.put('/:id', actualizarUsuario);      // Actualizar usuario
router.delete('/:id', eliminarUsuario);     // Eliminar usuario

module.exports = router;
