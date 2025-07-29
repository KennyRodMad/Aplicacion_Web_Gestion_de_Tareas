const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');

router.get('/', reporteController.listarReportes);
router.post('/', reporteController.crearReporte);
router.get('/:id', reporteController.obtenerReporte);
router.delete('/:id', reporteController.eliminarReporte);

module.exports = router;