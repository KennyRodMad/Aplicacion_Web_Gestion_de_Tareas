const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');

router.get('/', proyectoController.listarProyectos);
router.post('/', proyectoController.crearProyecto);
router.get('/:id', proyectoController.obtenerProyecto);
router.put('/:id', proyectoController.actualizarProyecto);
router.delete('/:id', proyectoController.eliminarProyecto);

module.exports = router;
