const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

// Crear usuario (mantener existente)
exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;
    
    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    // Cifrar contraseña
    const salt = await bcrypt.genSalt(10);
    const contraseñaCifrada = await bcrypt.hash(contraseña, salt);

    const usuario = new Usuario({
      nombre,
      correo,
      contraseña: contraseñaCifrada,
      rol
    });

    const guardado = await usuario.save();
    
    // No devolver la contraseña en la respuesta
    const { contraseña: _, ...usuarioSinContraseña } = guardado.toObject();
    res.status(201).json(usuarioSinContraseña);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear usuario', error });
  }
};

// Obtener todos los usuarios (mantener existente)
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-contraseña');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error });
  }
};

// 🆕 Obtener usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-contraseña');
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar usuario', error });
  }
};

// 🆕 Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;
    const actualizacion = { nombre, correo, rol };

    // Si se proporciona una nueva contraseña, cifrarla
    if (contraseña) {
      const salt = await bcrypt.genSalt(10);
      actualizacion.contraseña = await bcrypt.hash(contraseña, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id, 
      actualizacion, 
      { new: true, runValidators: true }
    ).select('-contraseña');

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ mensaje: 'El correo ya está en uso' });
    }
    res.status(500).json({ mensaje: 'Error al actualizar usuario', error });
  }
};

// 🆕 Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario', error });
  }
};
