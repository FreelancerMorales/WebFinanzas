import { useCallback } from 'react';
import { useApi } from './useApi';
import { transaccionService } from '../services/transaccionService';

export const useTransacciones = () => {
  
  // Crear transacción
  const {
    loading: creandoTransaccion,
    error: errorCrear,
    execute: ejecutarCrear
  } = useApi(transaccionService.crear, {
    showSuccessAlert: true,
    successMessage: 'Transacción creada exitosamente'
  });

  // Obtener todas las transacciones
  const {
    data: transacciones,
    loading: cargandoTransacciones,
    error: errorTransacciones,
    execute: ejecutarObtenerTodas
  } = useApi(transaccionService.obtenerTodas);

  // Obtener transacción por ID
  const {
    data: transaccion,
    loading: cargandoTransaccion,
    error: errorTransaccion,
    execute: ejecutarObtenerPorId
  } = useApi(transaccionService.obtenerPorId);

  // Actualizar transacción
  const {
    loading: actualizandoTransaccion,
    error: errorActualizar,
    execute: ejecutarActualizar
  } = useApi(transaccionService.actualizar, {
    showSuccessAlert: true,
    successMessage: 'Transacción actualizada exitosamente'
  });

  // Eliminar transacción
  const {
    loading: eliminandoTransaccion,
    error: errorEliminar,
    execute: ejecutarEliminar
  } = useApi(transaccionService.eliminar, {
    showSuccessAlert: true,
    successMessage: 'Transacción eliminada exitosamente'
  });

  // Obtener resumen
  const {
    data: resumen,
    loading: cargandoResumen,
    error: errorResumen,
    execute: ejecutarObtenerResumen
  } = useApi(transaccionService.obtenerResumen);

  // Obtener por cuenta
  const {
    data: transaccionesPorCuenta,
    loading: cargandoPorCuenta,
    error: errorPorCuenta,
    execute: ejecutarObtenerPorCuenta
  } = useApi(transaccionService.obtenerPorCuenta);

  // Confirmar transacción
  const {
    loading: confirmandoTransaccion,
    error: errorConfirmar,
    execute: ejecutarConfirmar
  } = useApi(transaccionService.confirmar, {
    showSuccessAlert: true,
    successMessage: 'Transacción confirmada'
  });

  // Desconfirmar transacción
  const {
    loading: desconfirmandoTransaccion,
    error: errorDesconfirmar,
    execute: ejecutarDesconfirmar
  } = useApi(transaccionService.desconfirmar, {
    showSuccessAlert: true,
    successMessage: 'Transacción desconfirmada'
  });

  // Agregar etiquetas
  const {
    loading: agregandoEtiquetas,
    error: errorAgregarEtiquetas,
    execute: ejecutarAgregarEtiquetas
  } = useApi(transaccionService.agregarEtiquetas, {
    showSuccessAlert: true,
    successMessage: 'Etiquetas agregadas'
  });

  // Remover etiquetas
  const {
    loading: removiendoEtiquetas,
    error: errorRemoverEtiquetas,
    execute: ejecutarRemoverEtiquetas
  } = useApi(transaccionService.removerEtiquetas, {
    showSuccessAlert: true,
    successMessage: 'Etiquetas removidas'
  });

  // Métodos expuestos con nombres más amigables
  const crear = useCallback(async (datos) => {
    return await ejecutarCrear(datos);
  }, [ejecutarCrear]);

  const obtenerTodas = useCallback(async (filtros = {}) => {
    return await ejecutarObtenerTodas(filtros);
  }, [ejecutarObtenerTodas]);

  const obtenerPorId = useCallback(async (id) => {
    return await ejecutarObtenerPorId(id);
  }, [ejecutarObtenerPorId]);

  const actualizar = useCallback(async (id, datos) => {
    return await ejecutarActualizar(id, datos);
  }, [ejecutarActualizar]);

  const eliminar = useCallback(async (id) => {
    return await ejecutarEliminar(id);
  }, [ejecutarEliminar]);

  const obtenerResumen = useCallback(async (fechaInicio, fechaFin) => {
    return await ejecutarObtenerResumen(fechaInicio, fechaFin);
  }, [ejecutarObtenerResumen]);

  const obtenerPorCuenta = useCallback(async (cuentaId, filtros = {}) => {
    return await ejecutarObtenerPorCuenta(cuentaId, filtros);
  }, [ejecutarObtenerPorCuenta]);

  const confirmar = useCallback(async (id) => {
    return await ejecutarConfirmar(id);
  }, [ejecutarConfirmar]);

  const desconfirmar = useCallback(async (id) => {
    return await ejecutarDesconfirmar(id);
  }, [ejecutarDesconfirmar]);

  const agregarEtiquetas = useCallback(async (id, etiquetaIds) => {
    return await ejecutarAgregarEtiquetas(id, etiquetaIds);
  }, [ejecutarAgregarEtiquetas]);

  const removerEtiquetas = useCallback(async (id, etiquetaIds) => {
    return await ejecutarRemoverEtiquetas(id, etiquetaIds);
  }, [ejecutarRemoverEtiquetas]);

  return {
    // Datos
    transacciones,
    transaccion,
    resumen,
    transaccionesPorCuenta,

    // Estados de carga
    cargandoTransacciones,
    cargandoTransaccion,
    creandoTransaccion,
    actualizandoTransaccion,
    eliminandoTransaccion,
    cargandoResumen,
    cargandoPorCuenta,
    confirmandoTransaccion,
    desconfirmandoTransaccion,
    agregandoEtiquetas,
    removiendoEtiquetas,

    // Errores
    errorTransacciones,
    errorTransaccion,
    errorCrear,
    errorActualizar,
    errorEliminar,
    errorResumen,
    errorPorCuenta,
    errorConfirmar,
    errorDesconfirmar,
    errorAgregarEtiquetas,
    errorRemoverEtiquetas,

    // Métodos
    crear,
    obtenerTodas,
    obtenerPorId,
    actualizar,
    eliminar,
    obtenerResumen,
    obtenerPorCuenta,
    confirmar,
    desconfirmar,
    agregarEtiquetas,
    removerEtiquetas
  };
};