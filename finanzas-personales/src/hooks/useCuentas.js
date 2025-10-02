import { useApi } from './useApi';
import cuentasService from '../services/cuentaService';

export const useCuentas = () => {
  // Crear cuenta
  const {
    data: cuentaCreada,
    loading: creando,
    error: errorCrear,
    execute: crear,
    reset: resetCrear
  } = useApi(cuentasService.crear, {
    showSuccessAlert: true,
    successMessage: 'Cuenta creada exitosamente'
  });

  // Obtener todas las cuentas
  const {
    data: cuentas,
    loading: cargandoCuentas,
    error: errorCuentas,
    execute: obtenerTodas,
    reset: resetCuentas
  } = useApi(cuentasService.obtenerTodas);

  // Obtener cuenta por ID
  const {
    data: cuenta,
    loading: cargandoCuenta,
    error: errorCuenta,
    execute: obtenerPorId,
    reset: resetCuenta
  } = useApi(cuentasService.obtenerPorId);

  // Actualizar cuenta
  const {
    data: cuentaActualizada,
    loading: actualizando,
    error: errorActualizar,
    execute: actualizar,
    reset: resetActualizar
  } = useApi(cuentasService.actualizar, {
    showSuccessAlert: true,
    successMessage: 'Cuenta actualizada exitosamente'
  });

  // Eliminar cuenta
  const {
    data: cuentaEliminada,
    loading: eliminando,
    error: errorEliminar,
    execute: eliminar,
    reset: resetEliminar
  } = useApi(cuentasService.eliminar, {
    showSuccessAlert: true,
    successMessage: 'Cuenta eliminada exitosamente'
  });

  // Obtener resumen
  const {
    data: resumen,
    loading: cargandoResumen,
    error: errorResumen,
    execute: obtenerResumen,
    reset: resetResumen
  } = useApi(cuentasService.obtenerResumen);

  // Actualizar orden
  const {
    data: ordenActualizado,
    loading: actualizandoOrden,
    error: errorOrden,
    execute: actualizarOrden,
    reset: resetOrden
  } = useApi(cuentasService.actualizarOrden, {
    showSuccessAlert: true,
    successMessage: 'Orden actualizado exitosamente'
  });

  return {
    // Crear
    cuentaCreada,
    creando,
    errorCrear,
    crear,
    resetCrear,

    // Obtener todas
    cuentas,
    cargandoCuentas,
    errorCuentas,
    obtenerTodas,
    resetCuentas,

    // Obtener por ID
    cuenta,
    cargandoCuenta,
    errorCuenta,
    obtenerPorId,
    resetCuenta,

    // Actualizar
    cuentaActualizada,
    actualizando,
    errorActualizar,
    actualizar,
    resetActualizar,

    // Eliminar
    cuentaEliminada,
    eliminando,
    errorEliminar,
    eliminar,
    resetEliminar,

    // Resumen
    resumen,
    cargandoResumen,
    errorResumen,
    obtenerResumen,
    resetResumen,

    // Orden
    ordenActualizado,
    actualizandoOrden,
    errorOrden,
    actualizarOrden,
    resetOrden,
  };
};