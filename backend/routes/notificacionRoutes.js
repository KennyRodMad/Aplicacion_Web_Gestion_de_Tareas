const express = require('express');
const router = express.Router();
const notificacionController = require('../controllers/notificacionController');

router.get('/', notificacionController.listarNotificaciones);
router.post('/', notificacionController.crearNotificacion);
router.get('/:id', notificacionController.obtenerNotificacion);
router.put('/:id/leida', notificacionController.marcarComoLeida);
router.delete('/:id', notificacionController.eliminarNotificacion);

module.exports = router;