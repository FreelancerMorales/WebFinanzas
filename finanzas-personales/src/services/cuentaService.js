import api from './api';

const cuentasService = {
  // POST /cuentas - Crear nueva cuenta
  crear: (datos) => api.post('/cuentas', datos),

  // GET /cuentas - Obtener todas las cuentas del usuario
  obtenerTodas: (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.activo !== undefined) {
      queryParams.append('activo', params.activo);
    }
    
    const query = queryParams.toString();
    return api.get(`/cuentas${query ? `?${query}` : ''}`);
  },

  // GET /cuentas/:id - Obtener cuenta por ID
  obtenerPorId: (id) => api.get(`/cuentas/${id}`),

  // PUT /cuentas/:id - Actualizar cuenta
  actualizar: (id, datos) => api.put(`/cuentas/${id}`, datos),

  // DELETE /cuentas/:id - Eliminar cuenta (soft delete)
  eliminar: (id) => api.delete(`/cuentas/${id}`),

  // GET /cuentas/resumen - Obtener resumen de cuentas
  obtenerResumen: () => api.get('/cuentas/resumen'),

  // PATCH /cuentas/orden - Actualizar orden de cuentas
  actualizarOrden: (ordenCuentas) => api.patch('/cuentas/orden', { ordenCuentas }),
};

export default cuentasService;