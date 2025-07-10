import api from './api';

export const cuentaService = {
  // Obtener todas las cuentas
  obtenerCuentas: () => api.get('/cuentas'),
  
  // Obtener cuenta por ID
  obtenerCuentaPorId: (id) => api.get(`/cuentas/${id}`),
  
  // Obtener saldo de cuenta
  obtenerSaldoCuenta: (id) => api.get(`/cuentas/${id}/saldo`),
  
  // Obtener resumen de cuenta
  obtenerResumenCuenta: (id) => api.get(`/cuentas/${id}/resumen`),
  
  // Crear cuenta
  crearCuenta: (datos) => api.post('/cuentas', datos),
  
  // Actualizar cuenta
  actualizarCuenta: (id, datos) => api.put(`/cuentas/${id}`, datos),
  
  // Eliminar cuenta
  eliminarCuenta: (id) => api.delete(`/cuentas/${id}`),
  
  // Reactivar cuenta
  reactivarCuenta: (id) => api.put(`/cuentas/${id}/reactivar`)
};