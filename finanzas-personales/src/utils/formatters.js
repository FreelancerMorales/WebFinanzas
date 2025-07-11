// formatters.js - Utilidades para formatear datos
import { TIPOS_CUENTA } from './constants';

export const formatters = {
  // Formatear moneda
  moneda: (valor, moneda = 'GTQ') => {
    if (valor === null || valor === undefined) return 'Q0.00';
    
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: moneda,
      minimumFractionDigits: 2
    }).format(valor);
  },

  // Formatear número
  numero: (valor, decimales = 2) => {
    if (valor === null || valor === undefined) return '0';
    
    return new Intl.NumberFormat('es-GT', {
      minimumFractionDigits: decimales,
      maximumFractionDigits: decimales
    }).format(valor);
  },

  // Formatear fecha
  fecha: (fecha, formato = 'short') => {
    if (!fecha) return '';
    
    const opciones = {
      short: { day: '2-digit', month: '2-digit', year: 'numeric' },
      long: { day: '2-digit', month: 'long', year: 'numeric' },
      dateTime: { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    };

    return new Intl.DateTimeFormat('es-GT', opciones[formato]).format(new Date(fecha));
  },

  // Formatear tipo de cuenta
  tipoCuenta: (tipo) => {
    const tipos = {
      [TIPOS_CUENTA.EFECTIVO]: 'Efectivo',
      [TIPOS_CUENTA.BANCO]: 'Cuenta Bancaria',
      [TIPOS_CUENTA.TARJETA_CREDITO]: 'Tarjeta de Crédito',
      [TIPOS_CUENTA.TARJETA_DEBITO]: 'Tarjeta de Débito',
      [TIPOS_CUENTA.AHORRO]: 'Cuenta de Ahorro',
      [TIPOS_CUENTA.INVERSION]: 'Inversión'
    };
    
    return tipos[tipo] || tipo;
  },

  // Formatear texto (capitalizar primera letra)
  capitalize: (texto) => {
    if (!texto) return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  },

  // Formatear porcentaje
  porcentaje: (valor, decimales = 1) => {
    if (valor === null || valor === undefined) return '0%';
    return `${(valor * 100).toFixed(decimales)}%`;
  },

  // Truncar texto
  truncar: (texto, limite = 50) => {
    if (!texto) return '';
    return texto.length > limite ? texto.substring(0, limite) + '...' : texto;
  }
};