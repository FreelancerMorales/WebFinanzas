import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://192.168.1.14:3001';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // 🔥 DETECTA errores de conexión específicamente
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      console.error('❌ No se puede conectar al servidor');
      console.error(`   Verifica que esté corriendo en ${API_BASE_URL}`);
      
      return Promise.reject({
        message: '🔌 No se puede conectar al servidor. Verifica:\n' +
                 '1. Que el backend esté corriendo\n' +
                 '2. Que la IP sea correcta\n' +
                 `3. URL actual: ${API_BASE_URL}`,
        status: 0,
        tipo: 'CONEXION'
      });
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    const errorMessage = error.response?.data?.error?.mensaje || 
                        error.response?.data?.message || 
                        error.message || 
                        'Error desconocido';
    
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      errors: error.response?.data?.error?.errores || []
    });
  }
);

export default api;