import { useState, useEffect } from 'react';
import { tipoMovimientoService } from '../services/tipoMovimientoService';
import { useUI } from '../context/UIContext';

export const useTiposMovimiento = () => {
  const [tiposMovimiento, setTiposMovimiento] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useUI();

  const cargarTiposMovimiento = async () => {
    try {
      setLoading(true);
      const result = await tipoMovimientoService.obtenerTiposMovimiento();
      const ok = result.ok;
      const data = result.datos.tiposMovimiento || [];

      if (!ok) {
        throw new Error(result.mensaje);
      }

      setTiposMovimiento(data || []);
    } catch (error) {
      showAlert('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const obtenerCategoriasPorTipo = async (id) => {
    try {
      const result = await tipoMovimientoService.obtenerCategoriasPorTipo(id);
      return result.data || [];
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    }
  };

  const obtenerEstadisticasPorTipo = async (id) => {
    try {
      const result = await tipoMovimientoService.obtenerEstadisticasPorTipo(id);
      return result.data || {};
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    }
  };

  // Funciones de administrador
  const crearTipoMovimiento = async (datos) => {
    try {
      const result = await tipoMovimientoService.crearTipoMovimiento(datos);
      await cargarTiposMovimiento();
      showAlert('success', 'Tipo de movimiento creado exitosamente');
      return result;
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    }
  };

  const actualizarTipoMovimiento = async (id, datos) => {
    try {
      const result = await tipoMovimientoService.actualizarTipoMovimiento(id, datos);
      await cargarTiposMovimiento();
      showAlert('success', 'Tipo de movimiento actualizado exitosamente');
      return result;
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    }
  };

  const eliminarTipoMovimiento = async (id) => {
    try {
      await tipoMovimientoService.eliminarTipoMovimiento(id);
      await cargarTiposMovimiento();
      showAlert('success', 'Tipo de movimiento eliminado exitosamente');
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    }
  };

  useEffect(() => {
    cargarTiposMovimiento();
  }, []);

  return {
    tiposMovimiento,
    loading,
    cargarTiposMovimiento,
    obtenerCategoriasPorTipo,
    obtenerEstadisticasPorTipo,
    crearTipoMovimiento,
    actualizarTipoMovimiento,
    eliminarTipoMovimiento
  };
};