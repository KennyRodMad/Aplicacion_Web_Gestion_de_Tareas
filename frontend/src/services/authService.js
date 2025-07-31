import api from './api';

export const authService = {
  login: (email, contraseña) => {
    return api.post('/auth/login', { email, contraseña });
  },

  register: (userData) => {
    return api.post('/usuarios', userData);
  },

  getCurrentUser: () => {
    return api.get('/usuarios/me');
  }
}; 