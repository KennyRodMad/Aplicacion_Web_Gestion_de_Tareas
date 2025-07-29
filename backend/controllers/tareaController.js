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

// Obtener tareas por proyecto
exports.listarTareasPorProyecto = async (req, res) => {
  try {
    const tareas = await Tarea.find({ proyecto: req.params.proyectoId })
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

// Actualizar tarea (con registro en historial)
exports.actualizarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id);
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });

    // Guardar cambios en historial
    const cambios = {};
    Object.keys(req.body).forEach(key => {
      if (tarea[key] !== req.body[key]) {
        cambios[key] = { antes: tarea[key], despues: req.body[key] };
      }
    });

    if (Object.keys(cambios).length > 0) {
      tarea.historial.push({
        usuario: req.body.usuario || null, // Puedes pasar el usuario que realiza el cambio
        accion: 'actualización',
        cambios
      });
    }

    // Actualizar campos
    Object.assign(tarea, req.body);
    await tarea.save();
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
