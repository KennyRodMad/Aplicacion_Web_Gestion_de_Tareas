const express = require('express');
const router = express.Router();
const archivoController = require('../controllers/archivoController');

router.get('/', archivoController.listarArchivos);
router.post('/', archivoController.subirArchivo);
router.get('/:id', archivoController.obtenerArchivo);
router.delete('/:id', archivoController.eliminarArchivo);

module.exports = router;