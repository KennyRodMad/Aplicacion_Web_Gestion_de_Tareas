const mongoose = require('mongoose');

const notificacionSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  tipo: { type: String, enum: ['tarea', 'proyecto', 'comentario', 'sistema'], required: true },
  mensaje: { type: String, required: true },
  leida: { type: Boolean, default: false },
  origen: { type: mongoose.Schema.Types.ObjectId },
  fecha: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Notificacion', notificacionSchema);