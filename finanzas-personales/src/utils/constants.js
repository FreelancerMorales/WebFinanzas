export const TIPOS_MOVIMIENTO = {
  INGRESO: 1,
  EGRESO: 2,
  TRANSFERENCIA: 3
};

export const TIPOS_CUENTA = {
  EFECTIVO: 'efectivo',
  BANCO: 'banco',
  TARJETA_CREDITO: 'tarjeta_credito',
  TARJETA_DEBITO: 'tarjeta_debito',
  AHORRO: 'ahorro',
  INVERSION: 'inversion'
};

export const COLORES_CATEGORIA = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
];

export const FILTROS_TRANSACCIONES = {
  HOY: 'hoy',
  ESTA_SEMANA: 'esta_semana',
  ESTE_MES: 'este_mes',
  ULTIMOS_30_DIAS: 'ultimos_30_dias',
  ESTE_AÑO: 'este_año',
  PERSONALIZADO: 'personalizado'
};

export const LIMITE_PAGINACION = 20;

export const MENSAJES = {
  ERROR_CONEXION: 'Error de conexión. Por favor, verifica tu conexión a internet.',
  ERROR_SESION: 'La sesión ha expirado. Por favor, inicia sesión nuevamente.',
  EXITO_CREAR: 'Creado exitosamente',
  EXITO_ACTUALIZAR: 'Actualizado exitosamente',
  EXITO_ELIMINAR: 'Eliminado exitosamente',
  CONFIRMAR_ELIMINAR: '¿Estás seguro de que deseas eliminar este elemento?'
};