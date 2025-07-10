import api from './api';

export const categoriaService = {
  // Obtener todas las categorías
  obtenerCategorias: () => api.get('/categorias'),
  
  // Obtener jerarquía de categorías
  obtenerJerarquiaCategorias: () => api.get('/categorias/jerarquia'),
  
  // Obtener categoría por ID
  obtenerCategoriaPorId: (id) => api.get(`/categorias/${id}`),
  
  // Obtener estadísticas de categoría
  obtenerEstadisticasCategoria: (id) => api.get(`/categorias/${id}/estadisticas`),
  
  // Crear categoría
  crearCategoria: (datos) => api.post('/categorias', datos),
  
  // Actualizar categoría
  actualizarCategoria: (id, datos) => api.put(`/categorias/${id}`, datos),
  
  // Eliminar categoría
  eliminarCategoria: (id) => api.delete(`/categorias/${id}`)
};