const mongoose = require('mongoose');

const archivoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  tipo: { 
    type: String, 
    enum: ['pdf', 'docx', 'xlsx', 'png', 'jpg', 'jpeg', 'zip', 'rar'], 
    required: true 
  },
  tarea: { type: mongoose.Schema.Types.ObjectId, ref: 'Tarea' },
  proyecto: { type: mongoose.Schema.Types.ObjectId, ref: 'Proyecto' },
  version: { type: Number, default: 1 },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  fecha: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Archivo', archivoSchema);