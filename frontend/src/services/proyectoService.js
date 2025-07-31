import api from './api';

export const proyectoService = {
  getProyectos: (filtros = {}) => {
    return api.get('/proyectos', { params: filtros });
  },

  getProyecto: (id) => {
    return api.get(`/proyectos/${id}`);
  },

  createProyecto: (proyectoData) => {
    return api.post('/proyectos', proyectoData);
  },

  updateProyecto: (id, proyectoData) => {
    return api.put(`/proyectos/${id}`, proyectoData);
  },

  deleteProyecto: (id) => {
    return api.delete(`/proyectos/${id}`);
  }
}; 