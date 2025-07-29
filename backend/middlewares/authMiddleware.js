const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ mensaje: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(decoded.id);
    if (!usuario) return res.status(401).json({ mensaje: 'Usuario no válido' });
    req.usuario = usuario;
    next();
  } catch (err) {
    res.status(401).json({ mensaje: 'Token inválido' });
  }
};