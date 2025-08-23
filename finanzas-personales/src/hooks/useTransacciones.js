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
      const ok = result.ok;
      const data = result.datos.transacciones || [];

      if (!ok) {
        throw new Error(result.mensaje);
      }

      /*POST BACK
          const nuevaTransaccion = await prisma.transaccion.create({
      data: {
        monto: parseFloat(monto),
        descripcion,
        fecha: fecha ? new Date(fecha) : new Date(),
        cuentaId,
        categoriaId,
        tipoMovimientoId,
        tipoPagoId,
        plantillaId,
        usuarioId: req.usuario.id,
        etiquetas: {
          create: etiquetaIds.map((etiquetaId) => ({
            etiquetaId,
          })),
        },
      },
      include: {
        cuenta: {
          select: { id: true, nombre: true, tipo: true, color: true },
        },
        categoria: {
          select: { id: true, nombre: true, icono: true, color: true },
        },
        tipoMovimiento: {
          select: { id: true, nombre: true },
        },
        tipoPago: {
          select: { id: true, nombre: true },
        },
        plantilla: {
          select: { id: true, nombre: true },
        },
        etiquetas: {
          include: {
            etiqueta: {
              select: { id: true, nombre: true, color: true },
            },
          },
        },
      },
    });
      */

      // logs desgloce JSON
      console.log('Resultado de cargarTransacciones:', result);
      console.log('Estado de la respuesta:', ok);
      console.log('Mensaje de la respuesta:', result.mensaje);
      console.log('Datos:', result.datos);
      console.log('Cantidad Transacciones: ', result.datos.total);
      console.log('Paginas:', result.datos.page);
      console.log('Total de Paginas:', result.datos.totalPages);
      console.log('Transacciones:', result.datos.transacciones);
      console.log('Transacción:', result.datos.transacciones.map(transaccion => ({
        id: transaccion.id,
        monto: transaccion.monto,
        descripcion: transaccion.descripcion,
        fecha: transaccion.fecha,
        cuentaId: transaccion.cuentaId,
        categoriaId: transaccion.categoriaId,
        cuenta: {
          id: transaccion.cuenta.id,
          nombre: transaccion.cuenta.nombre,
          tipo: transaccion.cuenta.tipo,
          color: transaccion.cuenta.color
        },
        categoria: {
          id: transaccion.categoria.id,
          nombre: transaccion.categoria.nombre,
          icono: transaccion.categoria.icono,
          color: transaccion.categoria.color
        },
        tipoMovimientoId: transaccion.tipoMovimientoId,
        tipoMovimiento: {
          id: transaccion.tipoMovimiento.id,
          nombre: transaccion.tipoMovimiento.nombre
        },
        tipoPagoId: transaccion.tipoPagoId,
        plantillaId: transaccion.plantillaId,
        plantilla: transaccion.plantilla ? {
          id: transaccion.plantilla.id,
          nombre: transaccion.plantilla.nombre
        } : null,

        usuarioId: transaccion.usuarioId,
        etiquetas: transaccion.etiquetas.map(etiqueta => ({
          id: etiqueta.id,
          nombre: etiqueta.nombre,
          color: etiqueta.color
        }))
      })));
      console.log('✅ Transacciones cargadas exitosamente:', result.datos.transacciones.length);

      setTransacciones(data || []);
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
      const ok = result.ok;
      const data = result.datos || [];
      if (!ok) {
        throw new Error(result.mensaje);
      }

      setEstadisticas(data || null);
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