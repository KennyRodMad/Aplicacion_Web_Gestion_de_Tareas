const mongoose = require('mongoose');

const reporteSchema = new mongoose.Schema({
  tipo: { type: String, enum: ['individual', 'equipo', 'proyecto', 'global'], required: true },
  datos: { type: mongoose.Schema.Types.Mixed, required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  proyecto: { type: mongoose.Schema.Types.ObjectId, ref: 'Proyecto' },
  fecha: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Reporte', reporteSchema);