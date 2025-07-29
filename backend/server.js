const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
const connectDB = require('./config/db');
connectDB();

// Rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const proyectoRoutes = require('./routes/proyectoRoutes');
const tareaRoutes = require('./routes/tareaRoutes');

app.use('/usuarios', usuarioRoutes);
app.use('/proyectos', proyectoRoutes);
app.use('/tareas', tareaRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'Funcionando correctamente' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
