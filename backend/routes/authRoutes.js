const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator');
const validationHandler = require('../middlewares/validationHandler');

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('contraseña').notEmpty().withMessage('La contraseña es obligatoria')
  ],
  validationHandler,
  authController.login
);

module.exports = router;