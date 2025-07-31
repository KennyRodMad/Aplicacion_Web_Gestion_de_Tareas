import api from './api';

export const tareaService = {
  getTareas: (filtros = {}) => {
    return api.get('/tareas', { params: filtros });
  },

  getTarea: (id) => {
    return api.get(`/tareas/${id}`);
  },

  createTarea: (tareaData) => {
    return api.post('/tareas', tareaData);
  },

  updateTarea: (id, tareaData) => {
    return api.put(`/tareas/${id}`, tareaData);
  },

  deleteTarea: (id) => {
    return api.delete(`/tareas/${id}`);
  },

  getTareasByProyecto: (proyectoId) => {
    return api.get(`/tareas/proyecto/${proyectoId}`);
  }
}; 