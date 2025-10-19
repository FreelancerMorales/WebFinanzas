import { useApi } from './useApi';
import etiquetasService from '../services/etiquetasService';

export const useEtiquetas = () => {
  // Crear etiqueta
  const {
    execute: crear,
    loading: creando,
    error: errorCrear
  } = useApi(etiquetasService.crear, {
    showSuccessAlert: true,
    successMessage: 'Etiqueta creada exitosamente'
  });

  // Obtener todas las etiquetas
  const {
    data: etiquetas,
    execute: obtenerTodas,
    loading: cargandoTodas,
    error: errorObtenerTodas
  } = useApi(etiquetasService.obtenerTodas);

  // Obtener etiqueta por ID
  const {
    data: etiqueta,
    execute: obtenerPorId,
    loading: cargandoPorId,
    error: errorObtenerPorId
  } = useApi(etiquetasService.obtenerPorId);

  // Actualizar etiqueta
  const {
    execute: actualizar,
    loading: actualizando,
    error: errorActualizar
  } = useApi(etiquetasService.actualizar, {
    showSuccessAlert: true,
    successMessage: 'Etiqueta actualizada exitosamente'
  });

  // Eliminar etiqueta
  const {
    execute: eliminar,
    loading: eliminando,
    error: errorEliminar
  } = useApi(etiquetasService.eliminar, {
    showSuccessAlert: true,
    successMessage: 'Etiqueta eliminada exitosamente'
  });

  // Obtener etiquetas con estadísticas
  const {
    data: estadisticas,
    execute: obtenerConEstadisticas,
    loading: cargandoEstadisticas,
    error: errorEstadisticas
  } = useApi(etiquetasService.obtenerConEstadisticas);

  // Obtener transacciones de una etiqueta
  const {
    data: transacciones,
    execute: obtenerTransacciones,
    loading: cargandoTransacciones,
    error: errorTransacciones
  } = useApi(etiquetasService.obtenerTransacciones);

  return {
    // Crear
    crear,
    creando,
    errorCrear,

    // Obtener todas
    etiquetas,
    obtenerTodas,
    cargandoTodas,
    errorObtenerTodas,

    // Obtener por ID
    etiqueta,
    obtenerPorId,
    cargandoPorId,
    errorObtenerPorId,

    // Actualizar
    actualizar,
    actualizando,
    errorActualizar,

    // Eliminar
    eliminar,
    eliminando,
    errorEliminar,

    // Estadísticas
    estadisticas,
    obtenerConEstadisticas,
    cargandoEstadisticas,
    errorEstadisticas,

    // Transacciones de etiqueta
    transacciones,
    obtenerTransacciones,
    cargandoTransacciones,
    errorTransacciones,
  };
};