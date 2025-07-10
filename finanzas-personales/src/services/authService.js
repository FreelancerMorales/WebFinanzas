import api from './api';

export const authService = {
  // Login con Google - almacena token automáticamente
  loginConGoogle: async (token) => {
    // Configurar token temporalmente para esta petición
    const originalToken = localStorage.getItem('token');
    localStorage.setItem('token', token);
    
    try {
      const result = await api.post('/usuarios');
      // El token ya está guardado, solo retornamos los datos
      window.location.href = '/home';
      return result.data;
    } catch (error) {
      // Si falla, restaurar token original
      if (originalToken) {
        localStorage.setItem('token', originalToken);
      } else {
        localStorage.removeItem('token');
      }
      throw error;
    }
  },

  // Obtener usuario autenticado
  obtenerUsuarioAutenticado: () => api.get('/usuarios/me'),
  
  // Logout - limpiar datos locales
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
};