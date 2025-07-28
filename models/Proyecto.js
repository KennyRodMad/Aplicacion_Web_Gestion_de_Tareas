const mongoose = require('mongoose');

const proyectoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String
  },
  fechaInicio: {
    type: Date
  },
  fechaFin: {
    type: Date
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en_progreso', 'finalizado'],
    default: 'pendiente'
  },
  participantes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Proyecto', proyectoSchema);

hsert