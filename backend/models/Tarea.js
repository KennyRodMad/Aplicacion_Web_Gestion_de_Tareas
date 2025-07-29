const mongoose = require('mongoose');

const historialSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  accion: { type: String },
  fecha: { type: Date, default: Date.now },
  cambios: { type: mongoose.Schema.Types.Mixed }
}, { _id: false });

const tareaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String },
  prioridad: { type: String, enum: ['baja', 'media', 'alta', 'crítica'], default: 'media' },
  estado: { type: String, enum: ['pendiente', 'en progreso', 'en revisión', 'completada'], default: 'pendiente' },
  fechaVencimiento: { type: Date },
  etiquetas: [{ type: String }],
  responsables: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
  historial: [historialSchema],
  comentarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comentario' }],
  adjuntos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Archivo' }],
  proyecto: { type: mongoose.Schema.Types.ObjectId, ref: 'Proyecto' }
}, { timestamps: true });

module.exports = mongoose.model('Tarea', tareaSchema);
