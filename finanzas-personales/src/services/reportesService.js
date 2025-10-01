import api from './api';

const REPORTES_BASE = '/reportes';

export const reportesService = {
  // 📊 Resumen General
  async resumenGeneral(fechaInicio, fechaFin) {
    const params = new URLSearchParams({
      fechaInicio: fechaInicio.toISOString(),
      fechaFin: fechaFin.toISOString()
    });
    
    return api.get(`${REPORTES_BASE}/resumen-general?${params}`);
  },

  // 📈 Gastos por Categoría
  async gastosPorCategoria(fechaInicio, fechaFin) {
    const params = new URLSearchParams({
      fechaInicio: fechaInicio.toISOString(),
      fechaFin: fechaFin.toISOString()
    });
    
    return api.get(`${REPORTES_BASE}/gastos-categoria?${params}`);
  },

  // 💰 Ingresos por Categoría
  async ingresosPorCategoria(fechaInicio, fechaFin) {
    const params = new URLSearchParams({
      fechaInicio: fechaInicio.toISOString(),
      fechaFin: fechaFin.toISOString()
    });
    
    return api.get(`${REPORTES_BASE}/ingresos-categoria?${params}`);
  },

  // 🏦 Movimientos por Cuenta
  async movimientosPorCuenta(fechaInicio, fechaFin) {
    const params = new URLSearchParams({
      fechaInicio: fechaInicio.toISOString(),
      fechaFin: fechaFin.toISOString()
    });
    
    return api.get(`${REPORTES_BASE}/movimientos-cuenta?${params}`);
  },

  // 📊 Tendencia Mensual
  async tendenciaMensual(fechaInicio, fechaFin) {
    const params = new URLSearchParams({
      fechaInicio: fechaInicio.toISOString(),
      fechaFin: fechaFin.toISOString()
    });
    
    return api.get(`${REPORTES_BASE}/tendencia-mensual?${params}`);
  },

  // 🏷️ Análisis de Etiquetas
  async analisisEtiquetas(fechaInicio, fechaFin) {
    const params = new URLSearchParams({
      fechaInicio: fechaInicio.toISOString(),
      fechaFin: fechaFin.toISOString()
    });
    
    return api.get(`${REPORTES_BASE}/analisis-etiquetas?${params}`);
  },

  // ⚖️ Comparativa entre Períodos
  async comparativaPeriodos(fechaInicio1, fechaFin1, fechaInicio2, fechaFin2) {
    const params = new URLSearchParams({
      fechaInicio1: fechaInicio1.toISOString(),
      fechaFin1: fechaFin1.toISOString(),
      fechaInicio2: fechaInicio2.toISOString(),
      fechaFin2: fechaFin2.toISOString()
    });
    
    return api.get(`${REPORTES_BASE}/comparativa?${params}`);
  },

  // 💳 Estado Actual de Cuentas
  async estadoCuentas() {
    return api.get(`${REPORTES_BASE}/estado-cuentas`);
  },

  // 🔝 Top Transacciones
  async topTransacciones(fechaInicio, fechaFin, limite = 10, tipo = 2) {
    const params = new URLSearchParams({
      fechaInicio: fechaInicio.toISOString(),
      fechaFin: fechaFin.toISOString(),
      limite: limite.toString(),
      tipo: tipo.toString()
    });
    
    return api.get(`${REPORTES_BASE}/top-transacciones?${params}`);
  }
};