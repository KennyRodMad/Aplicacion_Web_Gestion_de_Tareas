const { body } = require('express-validator');

exports.crearUsuarioValidator = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('email').isEmail().withMessage('Email inválido'),
  body('contraseña').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('rol').optional().isIn(['aprendiz', 'instructor', 'admin']).withMessage('Rol inválido')
];

exports.actualizarUsuarioValidator = [
  body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
  body('email').optional().isEmail().withMessage('Email inválido'),
  body('contraseña').optional().isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('rol').optional().isIn(['aprendiz', 'instructor', 'admin']).withMessage('Rol inválido')
];