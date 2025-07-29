const Comentario = require('../models/Comentario');

exports.crearComentario = async (req, res) => {
  try {
    const { tarea, proyecto } = req.body;
    if (!tarea && !proyecto) {
      return res.status(400).json({ error: 'El comentario debe estar vinculado a una tarea o proyecto' });
    }
    const comentario = new Comentario(req.body);
    await comentario.save();
    res.status(201).json(comentario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listarComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.find().populate('usuario').populate('tarea').populate('proyecto');
    res.json(comentarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerComentario = async (req, res) => {
  try {
    const comentario = await Comentario.findById(req.params.id).populate('usuario').populate('tarea').populate('proyecto');
    if (!comentario) return res.status(404).json({ error: 'Comentario no encontrado' });
    res.json(comentario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.eliminarComentario = async (req, res) => {
  try {
    const comentario = await Comentario.findByIdAndDelete(req.params.id);
    if (!comentario) return res.status(404).json({ error: 'Comentario no encontrado' });
    res.json({ mensaje: 'Comentario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.actualizarComentario = async (req, res) => {
  try {
    const updateFields = {};
    if (req.body.mensaje) updateFields.mensaje = req.body.mensaje;
    if (req.body.tipo) updateFields.tipo = req.body.tipo;

    const comentario = await Comentario.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    if (!comentario) return res.status(404).json({ error: 'Comentario no encontrado' });
    res.json(comentario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};