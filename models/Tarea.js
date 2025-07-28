const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String
  },
  prioridad: {
    type: String,
    enum: ['baja', 'media', 'alta'],
    default: 'media'
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en_progreso', 'completada'],
    default: 'pendiente'
  },
  fechaEntrega: {
    type: Date
  },
  responsable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  proyecto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proyecto',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Tarea', tareaSchema);
