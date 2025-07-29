const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

// Registro seguro de usuario (con hash de contraseña)
exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, email, contraseña, rol, preferencias } = req.body;

    // Verificar si el email ya está registrado
    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contraseña, salt);

    const usuario = new Usuario({
      nombre,
      email,
      contraseña: hash,
      rol,
      preferencias
    });

    await usuario.save();

    // No devolver la contraseña en la respuesta
    const usuarioSinContraseña = usuario.toObject();
    delete usuarioSinContraseña.contraseña;

    res.status(201).json(usuarioSinContraseña);
  } catch (err) {
    res.status(400).json({ error: err.message });
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

// Actualizar usuario (incluyendo cambio seguro de contraseña)
exports.actualizarUsuario = async (req, res) => {
  try {
    const { nombre, email, contraseña, rol, preferencias } = req.body;
    const updateFields = {};

    if (nombre) updateFields.nombre = nombre;
    if (email) updateFields.email = email;
    if (rol) updateFields.rol = rol;
    if (preferencias) updateFields.preferencias = preferencias;

    // Si se envía una nueva contraseña, hashearla antes de guardar
    if (contraseña) {
      const salt = await bcrypt.genSalt(10);
      updateFields.contraseña = await bcrypt.hash(contraseña, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    ).select('-contraseña');

    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const usuarioSinContraseña = usuario.toObject();
    delete usuarioSinContraseña.contraseña;

    res.json(usuarioSinContraseña);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
