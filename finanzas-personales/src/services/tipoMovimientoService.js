import api from './api';

export const tipoMovimientoService = {
  // Obtener todos los tipos de movimiento
  obtenerTiposMovimiento: () => api.get('/tipos-movimiento'),
  
  // Obtener tipo de movimiento por ID
  obtenerTipoMovimientoPorId: (id) => api.get(`/tipos-movimiento/${id}`),
  
  // Obtener categorías por tipo
  obtenerCategoriasPorTipo: (id) => api.get(`/tipos-movimiento/${id}/categorias`),
  
  // Obtener estadísticas por tipo
  obtenerEstadisticasPorTipo: (id) => api.get(`/tipos-movimiento/${id}/estadisticas`),
  
  // Crear tipo de movimiento (admin)
  crearTipoMovimiento: (datos) => api.post('/tipos-movimiento', datos),
  
  // Actualizar tipo de movimiento (admin)
  actualizarTipoMovimiento: (id, datos) => api.put(`/tipos-movimiento/${id}`, datos),
  
  // Eliminar tipo de movimiento (admin)
  eliminarTipoMovimiento: (id) => api.delete(`/tipos-movimiento/${id}`)
};