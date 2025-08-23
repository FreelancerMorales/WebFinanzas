import api from './api';

const TRANSACCION_ENDPOINTS = {
  base: '/transacciones',
  resumen: '/transacciones/resumen',
  cuenta: (cuentaId) => `/transacciones/cuenta/${cuentaId}`,
  porId: (id) => `/transacciones/${id}`,
  etiquetas: (id) => `/transacciones/${id}/etiquetas`,
  confirmar: (id) => `/transacciones/${id}/confirmar`,
  desconfirmar: (id) => `/transacciones/${id}/desconfirmar`
};

export const transaccionService = {
  // Crear nueva transacción
  async crear(datos) {
    return await api.post(TRANSACCION_ENDPOINTS.base, datos);
  },

  // Obtener todas las transacciones con filtros
  async obtenerTodas(filtros = {}) {
    const params = new URLSearchParams();
    
    // Agregar parámetros de consulta solo si existen
    if (filtros.limite) params.append('limite', filtros.limite);
    if (filtros.pagina) params.append('pagina', filtros.pagina);
    if (filtros.fechaInicio) params.append('fechaInicio', filtros.fechaInicio);
    if (filtros.fechaFin) params.append('fechaFin', filtros.fechaFin);
    if (filtros.cuentaId) params.append('cuentaId', filtros.cuentaId);
    if (filtros.tipoMovimientoId) params.append('tipoMovimientoId', filtros.tipoMovimientoId);
    if (filtros.confirmada !== undefined) params.append('confirmada', filtros.confirmada);

    const queryString = params.toString();
    const url = queryString ? `${TRANSACCION_ENDPOINTS.base}?${queryString}` : TRANSACCION_ENDPOINTS.base;
    
    return await api.get(url);
  },

  // Obtener transacción por ID
  async obtenerPorId(id) {
    return await api.get(TRANSACCION_ENDPOINTS.porId(id));
  },

  // Actualizar transacción
  async actualizar(id, datos) {
    return await api.put(TRANSACCION_ENDPOINTS.porId(id), datos);
  },

  // Eliminar transacción
  async eliminar(id) {
    return await api.delete(TRANSACCION_ENDPOINTS.porId(id));
  },

  // Obtener resumen de transacciones por período
  async obtenerResumen(fechaInicio, fechaFin) {
    const params = new URLSearchParams({
      fechaInicio,
      fechaFin
    });
    
    return await api.get(`${TRANSACCION_ENDPOINTS.resumen}?${params.toString()}`);
  },

  // Obtener transacciones por cuenta
  async obtenerPorCuenta(cuentaId, filtros = {}) {
    const params = new URLSearchParams();
    
    if (filtros.limite) params.append('limite', filtros.limite);
    if (filtros.pagina) params.append('pagina', filtros.pagina);
    if (filtros.fechaInicio) params.append('fechaInicio', filtros.fechaInicio);
    if (filtros.fechaFin) params.append('fechaFin', filtros.fechaFin);

    const queryString = params.toString();
    const url = queryString 
      ? `${TRANSACCION_ENDPOINTS.cuenta(cuentaId)}?${queryString}` 
      : TRANSACCION_ENDPOINTS.cuenta(cuentaId);
    
    return await api.get(url);
  },

  // Agregar etiquetas a transacción
  async agregarEtiquetas(id, etiquetaIds) {
    return await api.post(TRANSACCION_ENDPOINTS.etiquetas(id), { etiquetaIds });
  },

  // Remover etiquetas de transacción
  async removerEtiquetas(id, etiquetaIds) {
    return await api.delete(TRANSACCION_ENDPOINTS.etiquetas(id), { 
      data: { etiquetaIds } 
    });
  },

  // Confirmar transacción
  async confirmar(id) {
    return await api.patch(TRANSACCION_ENDPOINTS.confirmar(id));
  },

  // Desconfirmar transacción
  async desconfirmar(id) {
    return await api.patch(TRANSACCION_ENDPOINTS.desconfirmar(id));
  }
};