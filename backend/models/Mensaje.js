const mongoose = require('mongoose');

const mensajeSchema = new mongoose.Schema({
  canal: { type: String, required: true }, // Ej: 'proyecto', 'tarea', 'privado'
  usuarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
  contenido: { type: String, required: true },
  leidoPor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
  fecha: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Mensaje', mensajeSchema);