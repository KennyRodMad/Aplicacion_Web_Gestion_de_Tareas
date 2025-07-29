const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  tarea: { type: mongoose.Schema.Types.ObjectId, ref: 'Tarea' },
  proyecto: { type: mongoose.Schema.Types.ObjectId, ref: 'Proyecto' },
  mensaje: { type: String, required: true },
  tipo: { type: String, enum: ['nota', 'retroalimentacion', 'discusion'], default: 'nota' },
  fecha: { type: Date, default: Date.now }
}, { timestamps: true });

// Validación: al menos uno de 'tarea' o 'proyecto' debe existir
comentarioSchema.pre('validate', function(next) {
  if (!this.tarea && !this.proyecto) {
    this.invalidate('tarea', 'El comentario debe estar vinculado a una tarea o proyecto');
    this.invalidate('proyecto', 'El comentario debe estar vinculado a una tarea o proyecto');
  }
  next();
});

module.exports = mongoose.model('Comentario', comentarioSchema);