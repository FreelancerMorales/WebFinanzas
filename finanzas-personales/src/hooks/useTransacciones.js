import { useState, useCallback } from 'react';
import { transaccionService } from '../services/transaccionService';
import { useUI } from '../context/UIContext';

export const useTransacciones = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useUI();

  const cargarTransacciones = useCallback(async (filtros = {}) => {
    try {
      setLoading(true);
      const result = await transaccionService.obtenerTransacciones(filtros);
      setTransacciones(result.data || []);
      return result;
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showAlert]);

  const cargarEstadisticas = useCallback(async (filtros = {}) => {
    try {
      const result = await transaccionService.obtenerEstadisticasTransacciones(filtros);
      setEstadisticas(result.data || null);
      return result;
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    }
  }, [showAlert]);

  const crearTransaccion = async (datos) => {
    try {
      const result = await transaccionService.crearTransaccion(datos);
      showAlert('success', 'Transacción creada exitosamente');
      return result;
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    }
  };

  const actualizarTransaccion = async (id, datos) => {
    try {
      const result = await transaccionService.actualizarTransaccion(id, datos);
      showAlert('success', 'Transacción actualizada exitosamente');
      return result;
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    }
  };

  const eliminarTransaccion = async (id) => {
    try {
      await transaccionService.eliminarTransaccion(id);
      showAlert('success', 'Transacción eliminada exitosamente');
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    }
  };

  return {
    transacciones,
    estadisticas,
    loading,
    cargarTransacciones,
    cargarEstadisticas,
    crearTransaccion,
    actualizarTransaccion,
    eliminarTransaccion
  };
};