const Archivo = require('../models/Archivo');
const path = require('path');
const fs = require('fs');

exports.subirArchivo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se ha subido ningún archivo' });
    }

    const { originalname, filename, mimetype, path: filePath } = req.file;
    const tipo = path.extname(originalname).replace('.', '').toLowerCase();

    // Validar si el archivo ya existe por nombre o url
    const existe = await Archivo.findOne({ $or: [{ nombre: originalname }, { url: filePath }] });
    if (existe) {
      // Elimina el archivo físico recién subido si ya existe en la BD
      fs.unlinkSync(filePath);
      return res.status(409).json({ error: 'El archivo ya existe' });
    }

    const archivo = new Archivo({
      nombre: originalname,
      url: filePath,
      tipo,
      tarea: req.body.tarea,
      proyecto: req.body.proyecto,
      usuario: req.body.usuario,
      version: req.body.version || 1
    });

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
    // Elimina el archivo físico si existe
    if (archivo.url && fs.existsSync(archivo.url)) {
      fs.unlinkSync(archivo.url);
    }
    res.json({ mensaje: 'Archivo eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.actualizarArchivo = async (req, res) => {
  try {
    const updateFields = {};
    if (req.body.nombre) updateFields.nombre = req.body.nombre;
    if (req.body.version) updateFields.version = req.body.version;
    if (req.body.tarea) updateFields.tarea = req.body.tarea;
    if (req.body.proyecto) updateFields.proyecto = req.body.proyecto;
    if (req.body.usuario) updateFields.usuario = req.body.usuario;

    const archivo = await Archivo.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    if (!archivo) return res.status(404).json({ error: 'Archivo no encontrado' });
    res.json(archivo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};