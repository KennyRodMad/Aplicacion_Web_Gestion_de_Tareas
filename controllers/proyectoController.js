const Proyecto = require('../models/Proyecto');

// Crear proyecto
exports.crearProyecto = async (req, res) => {
  try {
    const proyecto = new Proyecto(req.body);
    const guardado = await proyecto.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear proyecto', error });
  }
};

// Obtener todos los proyectos
exports.obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find().populate('participantes', 'nombre correo');
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener proyectos', error });
  }
};

// Obtener proyecto por ID
exports.obtenerProyectoPorId = async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.params.id);
    if (!proyecto) return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    res.json(proyecto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar proyecto', error });
  }
};

// Actualizar proyecto
exports.actualizarProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!proyecto) return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    res.json(proyecto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar proyecto', error });
  }
};

// Eliminar proyecto
exports.eliminarProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByIdAndDelete(req.params.id);
    if (!proyecto) return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    res.json({ mensaje: 'Proyecto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar proyecto', error });
  }
};
