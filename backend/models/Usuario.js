const mongoose = require('mongoose');

const preferenciasSchema = new mongoose.Schema({
  notificaciones: { type: Boolean, default: true },
  frecuencia: { type: String, enum: ['inmediato', 'diario', 'semanal'], default: 'inmediato' },
  medio: { type: [String], enum: ['correo', 'push', 'in-app'], default: ['in-app'] },
  idioma: { type: String, default: 'es' }
}, { _id: false });

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  contraseña: { type: String, required: true, minlength: 6 },
  rol: { type: String, enum: ['aprendiz', 'instructor', 'admin'], default: 'aprendiz' },
  estado: { type: String, enum: ['activo', 'inactivo'], default: 'activo' },
  preferencias: { type: preferenciasSchema, default: () => ({}) }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);
