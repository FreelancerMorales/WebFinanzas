import { useApi } from './useApi';
import { tipoPagoService } from '../services/tiposPagoService';

export const useTipoPago = () => {
  // Obtener todos los tipos de pago
  const {
    data: tiposPago,
    loading: loadingTiposPago,
    error: errorTiposPago,
    execute: obtenerTiposPago
  } = useApi(tipoPagoService.obtenerTodos, {
    autoExecute: false
  });

  // Obtener estadísticas
  const {
    data: estadisticas,
    loading: loadingEstadisticas,
    error: errorEstadisticas,
    execute: obtenerEstadisticas
  } = useApi(tipoPagoService.obtenerEstadisticas, {
    autoExecute: false
  });

  // Obtener por ID
  const {
    data: tipoPago,
    loading: loadingTipoPago,
    error: errorTipoPago,
    execute: obtenerTipoPagoPorId
  } = useApi(tipoPagoService.obtenerPorId, {
    autoExecute: false
  });

  // Crear tipo de pago
  const {
    loading: loadingCrear,
    error: errorCrear,
    execute: crear
  } = useApi(tipoPagoService.crear, {
    autoExecute: false,
    showSuccessAlert: true,
    successMessage: 'Tipo de pago creado exitosamente'
  });

  // Actualizar tipo de pago
  const {
    loading: loadingActualizar,
    error: errorActualizar,
    execute: actualizar
  } = useApi(tipoPagoService.actualizar, {
    autoExecute: false,
    showSuccessAlert: true,
    successMessage: 'Tipo de pago actualizado exitosamente'
  });

  // Eliminar tipo de pago
  const {
    loading: loadingEliminar,
    error: errorEliminar,
    execute: eliminar
  } = useApi(tipoPagoService.eliminar, {
    autoExecute: false,
    showSuccessAlert: true,
    successMessage: 'Tipo de pago eliminado exitosamente'
  });

  // Reactivar tipo de pago
  const {
    loading: loadingReactivar,
    error: errorReactivar,
    execute: reactivar
  } = useApi(tipoPagoService.reactivar, {
    autoExecute: false,
    showSuccessAlert: true,
    successMessage: 'Tipo de pago reactivado exitosamente'
  });

  return {
    // Datos
    tiposPago: tiposPago?.datos || [],
    estadisticas: estadisticas?.datos || [],
    tipoPago: tipoPago?.datos || null,

    // Loading states
    loadingTiposPago,
    loadingEstadisticas,
    loadingTipoPago,
    loadingCrear,
    loadingActualizar,
    loadingEliminar,
    loadingReactivar,

    // Error states
    errorTiposPago,
    errorEstadisticas,
    errorTipoPago,
    errorCrear,
    errorActualizar,
    errorEliminar,
    errorReactivar,

    // Funciones
    obtenerTiposPago,
    obtenerEstadisticas,
    obtenerTipoPagoPorId,
    crear,
    actualizar,
    eliminar,
    reactivar
  };
};