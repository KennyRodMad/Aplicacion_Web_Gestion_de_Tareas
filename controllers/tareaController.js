const Tarea = require('../models/Tarea');

// Crear tarea
exports.crearTarea = async (req, res) => {
  try {
    const tarea = new Tarea(req.body);
    const guardada = await tarea.save();
    res.status(201).json(guardada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear tarea', error });
  }
};

// Obtener todas las tareas
exports.obtenerTareas = async (req, res) => {
  try {
    const tareas = await Tarea.find()
      .populate('responsable', 'nombre correo')
      .populate('proyecto', 'nombre');
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener tareas', error });
  }
};

// Obtener por ID de proyecto
exports.obtenerTareasPorProyecto = async (req, res) => {
  try {
    const tareas = await Tarea.find({ proyecto: req.params.proyectoId })
      .populate('responsable', 'nombre correo');
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener tareas por proyecto', error });
  }
};

// Obtener tarea por ID
exports.obtenerTareaPorId = async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id)
      .populate('responsable', 'nombre correo');
    if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar tarea', error });
  }
};

// Actualizar tarea
exports.actualizarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar tarea', error });
  }
};

// Eliminar tarea
exports.eliminarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndDelete(req.params.id);
    if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    res.json({ mensaje: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar tarea', error });
  }
};
