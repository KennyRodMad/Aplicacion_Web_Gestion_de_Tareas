const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  tarea: { type: mongoose.Schema.Types.ObjectId, ref: 'Tarea' },
  proyecto: { type: mongoose.Schema.Types.ObjectId, ref: 'Proyecto' },
  mensaje: { type: String, required: true },
  tipo: { type: String, enum: ['nota', 'retroalimentacion', 'discusion'], default: 'nota' },
  fecha: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Comentario', comentarioSchema);