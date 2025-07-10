import { useState, useEffect } from 'react';
import { cuentaService } from '../services/cuentaService';
import { useUI } from '../context/UIContext';

export const useCuentas = () => {
  const [cuentas, setCuentas] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useUI();

  const cargarCuentas = async () => {
    try {
      setLoading(true);
      const result = await cuentaService.obtenerCuentas();
      setCuentas(result.data || []);
    } catch (error) {
      showAlert('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const crearCuenta = async (datos) => {
    try {
      const result = await cuentaService.crearCuenta(datos);
      await cargarCuentas();
      showAlert('success', 'Cuenta creada exitosamente');
      return result;
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    }
  };

  const actualizarCuenta = async (id, datos) => {
    try {
      const result = await cuentaService.actualizarCuenta(id, datos);
      await cargarCuentas();
      showAlert('success', 'Cuenta actualizada exitosamente');
      return result;
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    }
  };

  const eliminarCuenta = async (id) => {
    try {
      await cuentaService.eliminarCuenta(id);
      await cargarCuentas();
      showAlert('success', 'Cuenta eliminada exitosamente');
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    }
  };

  const obtenerSaldoCuenta = async (id) => {
    try {
      return await cuentaService.obtenerSaldoCuenta(id);
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    }
  };

  useEffect(() => {
    cargarCuentas();
  }, []);

  return {
    cuentas,
    loading,
    cargarCuentas,
    crearCuenta,
    actualizarCuenta,
    eliminarCuenta,
    obtenerSaldoCuenta
  };
};