const express = require('express');
const router = express.Router();
const {
  crearProyecto,
  obtenerProyectos,
  obtenerProyectoPorId,
  actualizarProyecto,
  eliminarProyecto
} = require('../controllers/proyectoController');

router.post('/', crearProyecto);
router.get('/', obtenerProyectos);
router.get('/:id', obtenerProyectoPorId); // 👈 obtener por ID
router.put('/:id', actualizarProyecto);   // 👈 actualizar
router.delete('/:id', eliminarProyecto);  // 👈 eliminar

module.exports = router;
