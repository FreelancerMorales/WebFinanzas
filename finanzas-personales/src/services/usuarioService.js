import api from './api';

export const usuarioService = {
  // Obtener usuario autenticado
  obtenerUsuarioAutenticado: () => api.get('/usuarios/me'),
  
  // Obtener todos los usuarios (admin)
  obtenerUsuarios: () => api.get('/usuarios'),
  
  // Crear usuario
  crearUsuario: () => api.post('/usuarios'),
  
  // Actualizar usuario
  actualizarUsuario: (id, datos) => api.put(`/usuarios/${id}`, datos),
  
  // Eliminar usuario
  eliminarUsuario: (id) => api.delete(`/usuarios/${id}`),
  
  // Reactivar usuario
  reactivarUsuario: (id) => api.put(`/usuarios/${id}/reactivar`)
};