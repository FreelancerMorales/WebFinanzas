import api from './api';

const BASE_URL = '/tipos-pago';

export const tipoPagoService = {
  // GET /tipos-pago - Obtener todos los tipos de pago
  obtenerTodos: async () => {
    return await api.get(BASE_URL);
  },

  // GET /tipos-pago/estadisticas - Obtener tipos de pago con estadísticas
  obtenerEstadisticas: async () => {
    return await api.get(`${BASE_URL}/estadisticas`);
  },

  // GET /tipos-pago/:id - Obtener tipo de pago por ID
  obtenerPorId: async (id) => {
    return await api.get(`${BASE_URL}/${id}`);
  },

  // POST /tipos-pago - Crear nuevo tipo de pago
  crear: async (datos) => {
    return await api.post(BASE_URL, datos);
  },

  // PUT /tipos-pago/:id - Actualizar tipo de pago
  actualizar: async (id, datos) => {
    return await api.put(`${BASE_URL}/${id}`, datos);
  },

  // DELETE /tipos-pago/:id - Eliminar tipo de pago (soft delete)
  eliminar: async (id) => {
    return await api.delete(`${BASE_URL}/${id}`);
  },

  // PATCH /tipos-pago/:id/reactivar - Reactivar tipo de pago
  reactivar: async (id) => {
    return await api.patch(`${BASE_URL}/${id}/reactivar`);
  }
};