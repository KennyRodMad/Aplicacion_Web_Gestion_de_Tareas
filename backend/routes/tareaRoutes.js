const express = require('express');
const router = express.Router();
const {
  crearTarea,
  obtenerTareas,
  obtenerTareasPorProyecto,
  obtenerTareaPorId,
  actualizarTarea,
  eliminarTarea
} = require('../controllers/tareaController');

router.post('/', crearTarea);
router.get('/', obtenerTareas);
router.get('/proyecto/:proyectoId', obtenerTareasPorProyecto);
router.get('/:id', obtenerTareaPorId); // 👈 obtener una tarea
router.put('/:id', actualizarTarea);   // 👈 actualizar tarea
router.delete('/:id', eliminarTarea);  // 👈 eliminar tarea

module.exports = router;
