const AppError = require('../error/AppError');

module.exports = (err, req, res, next) => {
  // Si el error es una instancia de AppError, usa su statusCode y details
  const status = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';
  const details = err.details || null;

  res.status(status).json({
    error: message,
    ...(details && { details })
  });
};