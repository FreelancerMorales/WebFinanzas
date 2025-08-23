import { useCallback } from 'react';
import { useApi } from './useApi';
import { usuarioService } from '../services/usuarioService';

export const useUsuario = () => {
  // Hook para autenticación
  const {
    data: authData,
    loading: authLoading,
    error: authError,
    execute: autenticar
  } = useApi(usuarioService.autenticar, {
    showSuccessAlert: true,
    successMessage: 'Autenticación exitosa'
  });

  // Hook para obtener perfil
  const {
    data: perfil,
    loading: perfilLoading,
    error: perfilError,
    execute: obtenerPerfil
  } = useApi(usuarioService.obtenerPerfil);

  // Hook para actualizar perfil
  const {
    data: perfilActualizado,
    loading: actualizandoPerfil,
    error: errorActualizacion,
    execute: ejecutarActualizacion
  } = useApi(usuarioService.actualizarPerfil, {
    showSuccessAlert: true,
    successMessage: 'Perfil actualizado exitosamente'
  });

  // Hook para obtener resumen/dashboard
  const {
    data: resumen,
    loading: resumenLoading,
    error: resumenError,
    execute: obtenerResumen
  } = useApi(usuarioService.obtenerResumen);

  // Hook para inicializar categorías
  const {
    data: categoriasInicializadas,
    loading: inicializandoCategorias,
    error: errorCategorias,
    execute: inicializarCategorias
  } = useApi(usuarioService.inicializarCategorias, {
    showSuccessAlert: true,
    successMessage: 'Categorías inicializadas exitosamente'
  });

  // Hook para obtener estadísticas
  const {
    data: estadisticas,
    loading: estadisticasLoading,
    error: estadisticasError,
    execute: ejecutarEstadisticas
  } = useApi(usuarioService.obtenerEstadisticas);

  // Hook para desactivar cuenta
  const {
    data: cuentaDesactivada,
    loading: desactivando,
    error: errorDesactivacion,
    execute: desactivar
  } = useApi(usuarioService.desactivar, {
    showSuccessAlert: true,
    successMessage: 'Cuenta desactivada exitosamente'
  });

  // Hook para reactivar cuenta
  const {
    data: cuentaReactivada,
    loading: reactivando,
    error: errorReactivacion,
    execute: reactivar
  } = useApi(usuarioService.reactivar, {
    showSuccessAlert: true,
    successMessage: 'Cuenta reactivada exitosamente'
  });

  // Función wrapper para actualizar perfil
  const actualizarPerfil = useCallback((datos) => {
    return ejecutarActualizacion(datos);
  }, [ejecutarActualizacion]);

  // Función wrapper para obtener estadísticas
  const obtenerEstadisticas = useCallback((fechaInicio, fechaFin) => {
    return ejecutarEstadisticas(fechaInicio, fechaFin);
  }, [ejecutarEstadisticas]);

  return {
    // Autenticación
    authData,
    authLoading,
    authError,
    autenticar,

    // Perfil
    perfil,
    perfilLoading,
    perfilError,
    obtenerPerfil,

    // Actualizar perfil
    perfilActualizado,
    actualizandoPerfil,
    errorActualizacion,
    actualizarPerfil,

    // Resumen/Dashboard
    resumen,
    resumenLoading,
    resumenError,
    obtenerResumen,

    // Categorías
    categoriasInicializadas,
    inicializandoCategorias,
    errorCategorias,
    inicializarCategorias,

    // Estadísticas
    estadisticas,
    estadisticasLoading,
    estadisticasError,
    obtenerEstadisticas,

    // Gestión de cuenta
    cuentaDesactivada,
    desactivando,
    errorDesactivacion,
    desactivar,

    cuentaReactivada,
    reactivando,
    errorReactivacion,
    reactivar
  };
};