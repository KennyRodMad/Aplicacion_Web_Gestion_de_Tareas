import api from './api';

export const usuarioService = {
  getUsuarios: () => {
    return api.get('/usuarios');
  },

  getUsuario: (id) => {
    return api.get(`/usuarios/${id}`);
  },

  createUsuario: (usuarioData) => {
    return api.post('/usuarios', usuarioData);
  },

  updateUsuario: (id, usuarioData) => {
    return api.put(`/usuarios/${id}`, usuarioData);
  },

  deleteUsuario: (id) => {
    return api.delete(`/usuarios/${id}`);
  }
}; 