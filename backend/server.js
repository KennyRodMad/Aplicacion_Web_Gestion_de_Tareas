const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Conexión a MongoDB
const connectDB = require('./config/db');
connectDB();

// Rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const proyectoRoutes = require('./routes/proyectoRoutes');
const tareaRoutes = require('./routes/tareaRoutes');
const comentarioRoutes = require('./routes/comentarioRoutes');
const notificacionRoutes = require('./routes/notificacionRoutes');
const archivoRoutes = require('./routes/archivoRoutes');
const reporteRoutes = require('./routes/reporteRoutes');
const mensajeRoutes = require('./routes/mensajeRoutes');

app.use('/usuarios', usuarioRoutes);
app.use('/proyectos', proyectoRoutes);
app.use('/tareas', tareaRoutes);
app.use('/comentarios', comentarioRoutes);
app.use('/notificaciones', notificacionRoutes);
app.use('/archivos', archivoRoutes);
app.use('/reportes', reporteRoutes);
app.use('/mensajes', mensajeRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'Funcionando correctamente' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
