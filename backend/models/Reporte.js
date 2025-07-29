const mongoose = require('mongoose');

const reporteSchema = new mongoose.Schema({
  tipo: { type: String, enum: ['individual', 'equipo', 'proyecto', 'global'], required: true },
  datos: { type: mongoose.Schema.Types.Mixed, required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  proyecto: { type: mongoose.Schema.Types.ObjectId, ref: 'Proyecto' },
  fecha: { type: Date, default: Date.now }
}, { timestamps: true });

// Validación: al menos uno de 'usuario' o 'proyecto' debe existir
reporteSchema.pre('validate', function(next) {
  if (!this.usuario && !this.proyecto) {
    this.invalidate('usuario', 'El reporte debe estar vinculado a un usuario o proyecto');
    this.invalidate('proyecto', 'El reporte debe estar vinculado a un usuario o proyecto');
  }
  next();
});

module.exports = mongoose.model('Reporte', reporteSchema);