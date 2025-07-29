const mongoose = require('mongoose');

const faseSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fechaInicio: { type: Date },
  fechaFin: { type: Date }
}, { _id: false });

const indicadorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  valor: { type: mongoose.Schema.Types.Mixed }
}, { _id: false });

const proyectoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  objetivos: [{ type: String }],
  fechaInicio: { type: Date },
  fechaFin: { type: Date },
  fases: [faseSchema],
  miembros: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
  tareas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tarea' }],
  indicadores: [indicadorSchema],
  estado: { type: String, enum: ['activo', 'finalizado', 'en pausa'], default: 'activo' }
}, { timestamps: true });

module.exports = mongoose.model('Proyecto', proyectoSchema);