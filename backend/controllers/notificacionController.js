const Notificacion = require('../models/Notificacion');

exports.crearNotificacion = async (req, res) => {
  try {
    const notificacion = new Notificacion(req.body);
    await notificacion.save();
    res.status(201).json(notificacion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listarNotificaciones = async (req, res) => {
  try {
    const notificaciones = await Notificacion.find().populate('usuario');
    res.json(notificaciones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerNotificacion = async (req, res) => {
  try {
    const notificacion = await Notificacion.findById(req.params.id).populate('usuario');
    if (!notificacion) return res.status(404).json({ error: 'Notificación no encontrada' });
    res.json(notificacion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.marcarComoLeida = async (req, res) => {
  try {
    const notificacion = await Notificacion.findByIdAndUpdate(req.params.id, { leida: true }, { new: true });
    if (!notificacion) return res.status(404).json({ error: 'Notificación no encontrada' });
    res.json(notificacion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.eliminarNotificacion = async (req, res) => {
  try {
    const notificacion = await Notificacion.findByIdAndDelete(req.params.id);
    if (!notificacion) return res.status(404).json({ error: 'Notificación no encontrada' });
    res.json({ mensaje: 'Notificación eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};