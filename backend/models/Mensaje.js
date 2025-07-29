const mongoose = require('mongoose');

const mensajeSchema = new mongoose.Schema({
  canal: { 
    type: String, 
    enum: ['proyecto', 'tarea', 'privado'], 
    required: true 
  },
  usuarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
  contenido: { type: String, required: true },
  leidoPor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
  fecha: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Mensaje', mensajeSchema);