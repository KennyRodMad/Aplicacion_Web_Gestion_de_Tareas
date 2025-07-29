const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  contraseña: {
    type: String,
    required: true,
    minlength: 6
  },
  rol: {
    type: String,
    enum: ['admin', 'usuario', 'colaborador'],
    default: 'usuario'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Usuario', usuarioSchema);
