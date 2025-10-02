import api from './api';

const categoriaService = {
  // GET /categorias/base - Obtener categorías base disponibles
  obtenerCategoriasBase: (tipoMovimientoId = null) => {
    const params = tipoMovimientoId ? { tipoMovimientoId } : {};
    return api.get('/categorias/base', { params });
  },

  // GET /categorias/jerarquicas - Obtener categorías con estructura jerárquica
  obtenerCategoriasJerarquicas: (tipoMovimientoId = null) => {
    const params = tipoMovimientoId ? { tipoMovimientoId } : {};
    return api.get('/categorias/jerarquicas', { params });
  },

  // GET /categorias/usuario - Obtener categorías del usuario
  obtenerCategoriasUsuario: (tipoMovimientoId = null) => {
    const params = tipoMovimientoId ? { tipoMovimientoId } : {};
    return api.get('/categorias/usuario', { params });
  },

  // GET /categorias/usuario/:id - Obtener categoría de usuario por ID
  obtenerCategoriaUsuarioPorId: (id) => {
    return api.get(`/categorias/usuario/${id}`);
  },

  // POST /categorias/usuario - Asignar categoría base a usuario
  asignarCategoriaAUsuario: (categoriaBaseId, tipoMovimientoId) => {
    return api.post('/categorias/usuario', {
      categoriaBaseId,
      tipoMovimientoId
    });
  },

  // PATCH /categorias/usuario/:id/desactivar - Desactivar categoría
  desactivarCategoriaUsuario: (id) => {
    return api.patch(`/categorias/usuario/${id}/desactivar`);
  },

  // PATCH /categorias/usuario/:id/reactivar - Reactivar categoría
  reactivarCategoriaUsuario: (id) => {
    return api.patch(`/categorias/usuario/${id}/reactivar`);
  },

  // GET /categorias/iconos - Obtener iconos disponibles
  obtenerIconos: (categoria = null) => {
    const params = categoria ? { categoria } : {};
    return api.get('/categorias/iconos', { params });
  },

  // GET /categorias/colores - Obtener colores disponibles
  obtenerColores: () => {
    return api.get('/categorias/colores');
  },

  // GET /categorias/tipos-movimiento - Obtener tipos de movimiento
  obtenerTiposMovimiento: () => {
    return api.get('/categorias/tipos-movimiento');
  },
};

export default categoriaService;