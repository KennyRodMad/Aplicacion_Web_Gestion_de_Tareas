const Proyecto = require('../models/Proyecto');

// Crear proyecto
exports.crearProyecto = async (req, res) => {
  try {
    const proyecto = new Proyecto(req.body);
    await proyecto.save();
    res.status(201).json(proyecto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todos los proyectos
exports.listarProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find().populate('miembros').populate('tareas');
    res.json(proyectos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener proyecto por ID
exports.obtenerProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.params.id).populate('miembros').populate('tareas');
    if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' });
    res.json(proyecto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar proyecto
exports.actualizarProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' });
    res.json(proyecto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar proyecto
exports.eliminarProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByIdAndDelete(req.params.id);
    if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' });
    res.json({ mensaje: 'Proyecto eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
