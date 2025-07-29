const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const { crearUsuarioValidator, actualizarUsuarioValidator } = require('../validators/usuarioValidator');
const validationHandler = require('../middlewares/validationHandler');

// Rutas públicas (ejemplo: registro)
router.post('/', crearUsuarioValidator, validationHandler, usuarioController.crearUsuario);

// Rutas protegidas (requieren autenticación y rol admin para listar, actualizar y eliminar)
router.get('/', auth, role('admin'), usuarioController.obtenerUsuarios);
router.get('/:id', auth, role('admin'), usuarioController.obtenerUsuarioPorId);
router.put('/:id', auth, role('admin'), actualizarUsuarioValidator, validationHandler, usuarioController.actualizarUsuario);
router.delete('/:id', auth, role('admin'), usuarioController.eliminarUsuario);

module.exports = router;
