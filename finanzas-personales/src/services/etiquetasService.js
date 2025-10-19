import api from './api';

const etiquetasService = {
  // POST /etiquetas - Crear nueva etiqueta
  crear: async (datos) => {
    return await api.post('/etiquetas', datos);
  },

  // GET /etiquetas - Obtener todas las etiquetas
  obtenerTodas: async (opciones = {}) => {
    const params = {};
    if (opciones.activo !== undefined) {
      params.activo = opciones.activo;
    }
    return await api.get('/etiquetas', { params });
  },

  // GET /etiquetas/:id - Obtener etiqueta por ID
  obtenerPorId: async (id) => {
    return await api.get(`/etiquetas/${id}`);
  },

  // PUT /etiquetas/:id - Actualizar etiqueta
  actualizar: async (id, datos) => {
    return await api.put(`/etiquetas/${id}`, datos);
  },

  // DELETE /etiquetas/:id - Eliminar etiqueta
  eliminar: async (id) => {
    return await api.delete(`/etiquetas/${id}`);
  },

  // GET /etiquetas/estadisticas - Obtener etiquetas con estadísticas
  obtenerConEstadisticas: async () => {
    return await api.get('/etiquetas/estadisticas');
  },

  // GET /etiquetas/:id/transacciones - Obtener transacciones de una etiqueta
  obtenerTransacciones: async (id, opciones = {}) => {
    const params = {
      limite: opciones.limite || 50,
      pagina: opciones.pagina || 1,
    };
    
    if (opciones.fechaInicio) {
      params.fechaInicio = opciones.fechaInicio;
    }
    if (opciones.fechaFin) {
      params.fechaFin = opciones.fechaFin;
    }

    return await api.get(`/etiquetas/${id}/transacciones`, { params });
  },
};

export default etiquetasService;