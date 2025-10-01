import { useCallback } from 'react';
import { useApi } from './useApi';
import { reportesService } from '../services/reportesService';

export const useReportes = () => {
  // 📊 Resumen General
  const {
    data: resumenGeneral,
    loading: loadingResumen,
    error: errorResumen,
    execute: obtenerResumenGeneral,
    reset: resetResumen
  } = useApi(reportesService.resumenGeneral, {
    showErrorAlert: true,
    autoExecute: false
  });

  // 📈 Gastos por Categoría
  const {
    data: gastosPorCategoria,
    loading: loadingGastos,
    error: errorGastos,
    execute: obtenerGastosPorCategoria,
    reset: resetGastos
  } = useApi(reportesService.gastosPorCategoria, {
    showErrorAlert: true,
    autoExecute: false
  });

  // 💰 Ingresos por Categoría
  const {
    data: ingresosPorCategoria,
    loading: loadingIngresos,
    error: errorIngresos,
    execute: obtenerIngresosPorCategoria,
    reset: resetIngresos
  } = useApi(reportesService.ingresosPorCategoria, {
    showErrorAlert: true,
    autoExecute: false
  });

  // 🏦 Movimientos por Cuenta
  const {
    data: movimientosPorCuenta,
    loading: loadingMovimientos,
    error: errorMovimientos,
    execute: obtenerMovimientosPorCuenta,
    reset: resetMovimientos
  } = useApi(reportesService.movimientosPorCuenta, {
    showErrorAlert: true,
    autoExecute: false
  });

  // 📊 Tendencia Mensual
  const {
    data: tendenciaMensual,
    loading: loadingTendencia,
    error: errorTendencia,
    execute: obtenerTendenciaMensual,
    reset: resetTendencia
  } = useApi(reportesService.tendenciaMensual, {
    showErrorAlert: true,
    autoExecute: false
  });

  // 🏷️ Análisis de Etiquetas
  const {
    data: analisisEtiquetas,
    loading: loadingEtiquetas,
    error: errorEtiquetas,
    execute: obtenerAnalisisEtiquetas,
    reset: resetEtiquetas
  } = useApi(reportesService.analisisEtiquetas, {
    showErrorAlert: true,
    autoExecute: false
  });

  // ⚖️ Comparativa entre Períodos
  const {
    data: comparativaPeriodos,
    loading: loadingComparativa,
    error: errorComparativa,
    execute: obtenerComparativaPeriodos,
    reset: resetComparativa
  } = useApi(reportesService.comparativaPeriodos, {
    showErrorAlert: true,
    autoExecute: false
  });

  // 💳 Estado Actual de Cuentas (se ejecuta automáticamente)
  const {
    data: estadoCuentas,
    loading: loadingEstado,
    error: errorEstado,
    execute: obtenerEstadoCuentas,
    reset: resetEstado
  } = useApi(reportesService.estadoCuentas, {
    showErrorAlert: true,
    autoExecute: true
  });

  // 🔝 Top Transacciones
  const {
    data: topTransacciones,
    loading: loadingTop,
    error: errorTop,
    execute: obtenerTopTransacciones,
    reset: resetTop
  } = useApi(reportesService.topTransacciones, {
    showErrorAlert: true,
    autoExecute: false
  });

  // 🔄 Funciones de conveniencia para rangos comunes
  const obtenerReporteMensual = useCallback(async (mes, año) => {
    const fechaInicio = new Date(año, mes - 1, 1);
    const fechaFin = new Date(año, mes, 0, 23, 59, 59, 999);
    
    const [resumen, gastos, ingresos, tendencia] = await Promise.all([
      obtenerResumenGeneral(fechaInicio, fechaFin),
      obtenerGastosPorCategoria(fechaInicio, fechaFin),
      obtenerIngresosPorCategoria(fechaInicio, fechaFin),
      obtenerTendenciaMensual(fechaInicio, fechaFin)
    ]);

    return { resumen, gastos, ingresos, tendencia };
  }, [obtenerResumenGeneral, obtenerGastosPorCategoria, obtenerIngresosPorCategoria, obtenerTendenciaMensual]);

  const obtenerReporteAnual = useCallback(async (año) => {
    const fechaInicio = new Date(año, 0, 1);
    const fechaFin = new Date(año, 11, 31, 23, 59, 59, 999);
    
    const [resumen, gastos, ingresos, tendencia, movimientos] = await Promise.all([
      obtenerResumenGeneral(fechaInicio, fechaFin),
      obtenerGastosPorCategoria(fechaInicio, fechaFin),
      obtenerIngresosPorCategoria(fechaInicio, fechaFin),
      obtenerTendenciaMensual(fechaInicio, fechaFin),
      obtenerMovimientosPorCuenta(fechaInicio, fechaFin)
    ]);

    return { resumen, gastos, ingresos, tendencia, movimientos };
  }, [obtenerResumenGeneral, obtenerGastosPorCategoria, obtenerIngresosPorCategoria, obtenerTendenciaMensual, obtenerMovimientosPorCuenta]);

  const compararMeses = useCallback(async (mes1, año1, mes2, año2) => {
    const fechaInicio1 = new Date(año1, mes1 - 1, 1);
    const fechaFin1 = new Date(año1, mes1, 0, 23, 59, 59, 999);
    const fechaInicio2 = new Date(año2, mes2 - 1, 1);
    const fechaFin2 = new Date(año2, mes2, 0, 23, 59, 59, 999);
    
    return obtenerComparativaPeriodos(fechaInicio1, fechaFin1, fechaInicio2, fechaFin2);
  }, [obtenerComparativaPeriodos]);

  // 🧹 Reset todos los reportes
  const resetTodosLosReportes = useCallback(() => {
    resetResumen();
    resetGastos();
    resetIngresos();
    resetMovimientos();
    resetTendencia();
    resetEtiquetas();
    resetComparativa();
    resetTop();
  }, [resetResumen, resetGastos, resetIngresos, resetMovimientos, resetTendencia, resetEtiquetas, resetComparativa, resetTop]);

  // 📊 Estado de loading general
  const isLoadingAnyReport = loadingResumen || loadingGastos || loadingIngresos || 
                            loadingMovimientos || loadingTendencia || loadingEtiquetas || 
                            loadingComparativa || loadingEstado || loadingTop;

  return {
    // Datos
    resumenGeneral: resumenGeneral?.datos,
    gastosPorCategoria: gastosPorCategoria?.datos,
    ingresosPorCategoria: ingresosPorCategoria?.datos,
    movimientosPorCuenta: movimientosPorCuenta?.datos,
    tendenciaMensual: tendenciaMensual?.datos,
    analisisEtiquetas: analisisEtiquetas?.datos,
    comparativaPeriodos: comparativaPeriodos?.datos,
    estadoCuentas: estadoCuentas?.datos,
    topTransacciones: topTransacciones?.datos,

    // Loading states
    loadingResumen,
    loadingGastos,
    loadingIngresos,
    loadingMovimientos,
    loadingTendencia,
    loadingEtiquetas,
    loadingComparativa,
    loadingEstado,
    loadingTop,
    isLoadingAnyReport,

    // Errores
    errorResumen,
    errorGastos,
    errorIngresos,
    errorMovimientos,
    errorTendencia,
    errorEtiquetas,
    errorComparativa,
    errorEstado,
    errorTop,

    // Funciones individuales
    obtenerResumenGeneral,
    obtenerGastosPorCategoria,
    obtenerIngresosPorCategoria,
    obtenerMovimientosPorCuenta,
    obtenerTendenciaMensual,
    obtenerAnalisisEtiquetas,
    obtenerComparativaPeriodos,
    obtenerEstadoCuentas,
    obtenerTopTransacciones,

    // Funciones de conveniencia
    obtenerReporteMensual,
    obtenerReporteAnual,
    compararMeses,
    resetTodosLosReportes
  };
};