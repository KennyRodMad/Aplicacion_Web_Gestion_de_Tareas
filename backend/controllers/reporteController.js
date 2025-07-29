const Reporte = require('../models/Reporte');
const Usuario = require('../models/Usuario');
const Proyecto = require('../models/Proyecto');

exports.crearReporte = async (req, res) => {
  try {
    const { usuario, proyecto } = req.body;

    // Validar que al menos uno exista
    if (!usuario && !proyecto) {
      return res.status(400).json({ error: 'El reporte debe estar vinculado a un usuario o proyecto' });
    }

    // Validar existencia de usuario y/o proyecto si se envían
    if (usuario) {
      const usuarioExiste = await Usuario.findById(usuario);
      if (!usuarioExiste) {
        return res.status(400).json({ error: 'El usuario especificado no existe' });
      }
    }
    if (proyecto) {
      const proyectoExiste = await Proyecto.findById(proyecto);
      if (!proyectoExiste) {
        return res.status(400).json({ error: 'El proyecto especificado no existe' });
      }
    }

    const reporte = new Reporte(req.body);
    await reporte.save();
    res.status(201).json(reporte);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listarReportes = async (req, res) => {
  try {
    const reportes = await Reporte.find().populate('usuario').populate('proyecto');
    res.json(reportes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerReporte = async (req, res) => {
  try {
    const reporte = await Reporte.findById(req.params.id).populate('usuario').populate('proyecto');
    if (!reporte) return res.status(404).json({ error: 'Reporte no encontrado' });
    res.json(reporte);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.eliminarReporte = async (req, res) => {
  try {
    const reporte = await Reporte.findByIdAndDelete(req.params.id);
    if (!reporte) return res.status(404).json({ error: 'Reporte no encontrado' });
    res.json({ mensaje: 'Reporte eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};