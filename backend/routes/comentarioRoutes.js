const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentarioController');

router.get('/', comentarioController.listarComentarios);
router.post('/', comentarioController.crearComentario);
router.get('/:id', comentarioController.obtenerComentario);
router.delete('/:id', comentarioController.eliminarComentario);

module.exports = router;