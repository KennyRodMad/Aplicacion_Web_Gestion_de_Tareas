const Tarea = require('../models/Tarea');

// Crear tarea
exports.crearTarea = async (req, res) => {
  try {
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.status(201).json(tarea);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todas las tareas
exports.listarTareas = async (req, res) => {
  try {
    const tareas = await Tarea.find()
      .populate('responsables')
      .populate('comentarios')
      .populate('adjuntos');
    res.json(tareas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener tarea por ID
exports.obtenerTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id)
      .populate('responsables')
      .populate('comentarios')
      .populate('adjuntos');
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(tarea);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar tarea
exports.actualizarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(tarea);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar tarea
exports.eliminarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndDelete(req.params.id);
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json({ mensaje: 'Tarea eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
