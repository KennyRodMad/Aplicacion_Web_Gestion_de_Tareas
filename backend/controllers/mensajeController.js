const Mensaje = require('../models/Mensaje');

exports.enviarMensaje = async (req, res) => {
  try {
    const mensaje = new Mensaje(req.body);
    await mensaje.save();
    res.status(201).json(mensaje);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listarMensajes = async (req, res) => {
  try {
    const mensajes = await Mensaje.find().populate('usuarios').populate('leidoPor');
    res.json(mensajes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerMensaje = async (req, res) => {
  try {
    const mensaje = await Mensaje.findById(req.params.id).populate('usuarios').populate('leidoPor');
    if (!mensaje) return res.status(404).json({ error: 'Mensaje no encontrado' });
    res.json(mensaje);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.marcarComoLeido = async (req, res) => {
  try {
    const { usuarioId } = req.body;
    if (!usuarioId) {
      return res.status(400).json({ error: 'usuarioId es requerido' });
    }
    const mensaje = await Mensaje.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { leidoPor: usuarioId } },
      { new: true }
    );
    if (!mensaje) return res.status(404).json({ error: 'Mensaje no encontrado' });
    res.json(mensaje);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.eliminarMensaje = async (req, res) => {
  try {
    const mensaje = await Mensaje.findByIdAndDelete(req.params.id);
    if (!mensaje) return res.status(404).json({ error: 'Mensaje no encontrado' });
    res.json({ mensaje: 'Mensaje eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};