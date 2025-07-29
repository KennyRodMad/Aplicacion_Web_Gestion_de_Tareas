const express = require('express');
const router = express.Router();
const archivoController = require('../controllers/archivoController');
const multer = require('multer');
const path = require('path');

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Asegúrate de que la carpeta 'uploads' exista
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const tiposPermitidos = ['.pdf', '.docx', '.xlsx', '.png', '.jpg', '.jpeg', '.zip', '.rar'];
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (tiposPermitidos.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido'), false);
  }
};

const upload = multer({ storage, fileFilter });

router.get('/', archivoController.listarArchivos);
router.post('/', upload.single('archivo'), archivoController.subirArchivo);
router.get('/:id', archivoController.obtenerArchivo);
router.put('/:id', archivoController.actualizarArchivo);
router.delete('/:id', archivoController.eliminarArchivo);

module.exports = router;