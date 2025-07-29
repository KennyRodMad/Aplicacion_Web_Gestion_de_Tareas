const Archivo = require('../models/Archivo');

exports.subirArchivo = async (req, res) => {
  try {
    const archivo = new Archivo(req.body);
    await archivo.save();
    res.status(201).json(archivo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listarArchivos = async (req, res) => {
  try {
    const archivos = await Archivo.find().populate('usuario').populate('tarea').populate('proyecto');
    res.json(archivos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerArchivo = async (req, res) => {
  try {
    const archivo = await Archivo.findById(req.params.id).populate('usuario').populate('tarea').populate('proyecto');
    if (!archivo) return res.status(404).json({ error: 'Archivo no encontrado' });
    res.json(archivo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.eliminarArchivo = async (req, res) => {
  try {
    const archivo = await Archivo.findByIdAndDelete(req.params.id);
    if (!archivo) return res.status(404).json({ error: 'Archivo no encontrado' });
    res.json({ mensaje: 'Archivo eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};