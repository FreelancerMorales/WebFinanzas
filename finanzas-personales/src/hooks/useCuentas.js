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
      const ok = result.ok;
      const data = result.datos.cuentas || [];

      if (!ok) {
        throw new Error(result.mensaje);
      }


      // logs desgloce JSON
      console.log('Resultado de obtenerCuentas:', result);
      console.log('Estado de la respuesta:', ok);
      console.log('Mensaje de la respuesta:', result.mensaje);

      console.log('Datos:', result.datos);
      console.log('Cantidad Cuentas: ', result.datos.total);
      console.log('Paginas:', result.datos.page);
      console.log('Total de Paginas:', result.datos.totalPages);

      console.log('Cuentas:', result.datos.cuentas);
      console.log('Cuentas:', result.datos.cuentas.map(cuenta => ({
        id: cuenta.id,
        nombre: cuenta.nombre,
        saldo: cuenta.montoInicial
      })));
      console.log( 'Tipo Cuentas: ' + result.datos.cuentas.map(cuenta => cuenta.tipo));
      

      setCuentas(data || []);
    } catch (error) {
      showAlert('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const crearCuenta = async (data) => {
    try {
      const result = await cuentaService.crearCuenta(data);
      await cargarCuentas();
      showAlert('success', 'Cuenta creada exitosamente');
      return result;
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    }
  };

  const actualizarCuenta = async (id, data) => {
    try {
      const result = await cuentaService.actualizarCuenta(id, data);
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