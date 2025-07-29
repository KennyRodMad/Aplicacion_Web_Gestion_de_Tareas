const express = require('express');
const router = express.Router();
const mensajeController = require('../controllers/mensajeController');

router.get('/', mensajeController.listarMensajes);
router.post('/', mensajeController.enviarMensaje);
router.get('/:id', mensajeController.obtenerMensaje);
router.put('/:id/leido', mensajeController.marcarComoLeido);
router.delete('/:id', mensajeController.eliminarMensaje);

module.exports = router;