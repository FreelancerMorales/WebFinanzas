import api from './api';

export const usuarioService = {
  // POST /usuarios/auth - Autenticar usuario con Google
  autenticar: () => api.post('/usuarios/auth'),
  
  refresh: () => api.post('/usuarios/refresh'),

  // GET /usuarios/perfil - Obtener perfil completo
  obtenerPerfil: () => api.get('/usuarios/perfil'),

  // PUT /usuarios/perfil - Actualizar perfil
  actualizarPerfil: (datos) => api.put('/usuarios/perfil', datos),

  // GET /usuarios/resumen - Obtener dashboard
  obtenerResumen: () => api.get('/usuarios/resumen'),

  // POST /usuarios/categorias/inicializar - Inicializar categorías base
  inicializarCategorias: () => api.post('/usuarios/categorias/inicializar'),

  // GET /usuarios/estadisticas - Obtener estadísticas por período
  obtenerEstadisticas: (fechaInicio, fechaFin) => 
    api.get('/usuarios/estadisticas', {
      params: { fechaInicio, fechaFin }
    }),

  // PATCH /usuarios/desactivar - Desactivar cuenta
  desactivar: () => api.patch('/usuarios/desactivar'),

  // PATCH /usuarios/reactivar - Reactivar cuenta
  reactivar: () => api.patch('/usuarios/reactivar')
};