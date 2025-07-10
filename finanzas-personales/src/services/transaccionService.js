import api from './api';

export const transaccionService = {
  // Obtener transacciones con filtros
  obtenerTransacciones: (filtros = {}) => {
    const params = new URLSearchParams();
    
    Object.entries(filtros).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });
    
    return api.get(`/transacciones?${params.toString()}`);
  },
  
  // Obtener estadísticas de transacciones
  obtenerEstadisticasTransacciones: (filtros = {}) => {
    const params = new URLSearchParams();
    
    Object.entries(filtros).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });
    
    return api.get(`/transacciones/estadisticas?${params.toString()}`);
  },
  
  // Obtener transacción por ID
  obtenerTransaccionPorId: (id) => api.get(`/transacciones/${id}`),
  
  // Crear transacción
  crearTransaccion: (datos) => api.post('/transacciones', datos),
  
  // Actualizar transacción
  actualizarTransaccion: (id, datos) => api.put(`/transacciones/${id}`, datos),
  
  // Eliminar transacción
  eliminarTransaccion: (id) => api.delete(`/transacciones/${id}`)
};