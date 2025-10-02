import { useCallback } from 'react';
import { useApi } from './useApi';
import categoriaService from '../services/categoriaService';

export const useCategorias = () => {
  // === CATEGORÍAS BASE ===
  const {
    data: categoriasBase,
    loading: loadingBase,
    error: errorBase,
    execute: fetchCategoriasBase,
  } = useApi(categoriaService.obtenerCategoriasBase);

  const obtenerCategoriasBase = useCallback((tipoMovimientoId = null) => {
    return fetchCategoriasBase(tipoMovimientoId);
  }, [fetchCategoriasBase]);

  // === CATEGORÍAS JERÁRQUICAS ===
  const {
    data: categoriasJerarquicas,
    loading: loadingJerarquicas,
    error: errorJerarquicas,
    execute: fetchCategoriasJerarquicas,
  } = useApi(categoriaService.obtenerCategoriasJerarquicas);

  const obtenerCategoriasJerarquicas = useCallback((tipoMovimientoId = null) => {
    return fetchCategoriasJerarquicas(tipoMovimientoId);
  }, [fetchCategoriasJerarquicas]);

  // === CATEGORÍAS DE USUARIO ===
  const {
    data: categoriasUsuario,
    loading: loadingUsuario,
    error: errorUsuario,
    execute: fetchCategoriasUsuario,
  } = useApi(categoriaService.obtenerCategoriasUsuario);

  const obtenerCategoriasUsuario = useCallback((tipoMovimientoId = null) => {
    return fetchCategoriasUsuario(tipoMovimientoId);
  }, [fetchCategoriasUsuario]);

  // === CATEGORÍA DE USUARIO POR ID ===
  const {
    data: categoriaUsuario,
    loading: loadingCategoriaUsuario,
    error: errorCategoriaUsuario,
    execute: fetchCategoriaUsuarioPorId,
  } = useApi(categoriaService.obtenerCategoriaUsuarioPorId);

  const obtenerCategoriaUsuarioPorId = useCallback((id) => {
    return fetchCategoriaUsuarioPorId(id);
  }, [fetchCategoriaUsuarioPorId]);

  // === ASIGNAR CATEGORÍA ===
  const {
    loading: loadingAsignar,
    error: errorAsignar,
    execute: executeAsignar,
  } = useApi(categoriaService.asignarCategoriaAUsuario, {
    showSuccessAlert: true,
    successMessage: 'Categoría asignada exitosamente'
  });

  const asignarCategoriaAUsuario = useCallback((categoriaBaseId, tipoMovimientoId) => {
    return executeAsignar(categoriaBaseId, tipoMovimientoId);
  }, [executeAsignar]);

  // === DESACTIVAR CATEGORÍA ===
  const {
    loading: loadingDesactivar,
    error: errorDesactivar,
    execute: executeDesactivar,
  } = useApi(categoriaService.desactivarCategoriaUsuario, {
    showSuccessAlert: true,
    successMessage: 'Categoría desactivada exitosamente'
  });

  const desactivarCategoriaUsuario = useCallback((id) => {
    return executeDesactivar(id);
  }, [executeDesactivar]);

  // === REACTIVAR CATEGORÍA ===
  const {
    loading: loadingReactivar,
    error: errorReactivar,
    execute: executeReactivar,
  } = useApi(categoriaService.reactivarCategoriaUsuario, {
    showSuccessAlert: true,
    successMessage: 'Categoría reactivada exitosamente'
  });

  const reactivarCategoriaUsuario = useCallback((id) => {
    return executeReactivar(id);
  }, [executeReactivar]);

  // === ICONOS ===
  const {
    data: iconos,
    loading: loadingIconos,
    error: errorIconos,
    execute: fetchIconos,
  } = useApi(categoriaService.obtenerIconos);

  const obtenerIconos = useCallback((categoria = null) => {
    return fetchIconos(categoria);
  }, [fetchIconos]);

  // === COLORES ===
  const {
    data: colores,
    loading: loadingColores,
    error: errorColores,
    execute: fetchColores,
  } = useApi(categoriaService.obtenerColores);

  const obtenerColores = useCallback(() => {
    return fetchColores();
  }, [fetchColores]);

  // === TIPOS DE MOVIMIENTO ===
  const {
    data: tiposMovimiento,
    loading: loadingTiposMovimiento,
    error: errorTiposMovimiento,
    execute: fetchTiposMovimiento,
  } = useApi(categoriaService.obtenerTiposMovimiento);

  const obtenerTiposMovimiento = useCallback(() => {
    return fetchTiposMovimiento();
  }, [fetchTiposMovimiento]);

  return {
    // Categorías Base
    categoriasBase,
    loadingBase,
    errorBase,
    obtenerCategoriasBase,

    // Categorías Jerárquicas
    categoriasJerarquicas,
    loadingJerarquicas,
    errorJerarquicas,
    obtenerCategoriasJerarquicas,

    // Categorías de Usuario
    categoriasUsuario,
    loadingUsuario,
    errorUsuario,
    obtenerCategoriasUsuario,

    // Categoría de Usuario por ID
    categoriaUsuario,
    loadingCategoriaUsuario,
    errorCategoriaUsuario,
    obtenerCategoriaUsuarioPorId,

    // Asignar Categoría
    loadingAsignar,
    errorAsignar,
    asignarCategoriaAUsuario,

    // Desactivar Categoría
    loadingDesactivar,
    errorDesactivar,
    desactivarCategoriaUsuario,

    // Reactivar Categoría
    loadingReactivar,
    errorReactivar,
    reactivarCategoriaUsuario,

    // Iconos
    iconos,
    loadingIconos,
    errorIconos,
    obtenerIconos,

    // Colores
    colores,
    loadingColores,
    errorColores,
    obtenerColores,

    // Tipos de Movimiento
    tiposMovimiento,
    loadingTiposMovimiento,
    errorTiposMovimiento,
    obtenerTiposMovimiento,
  };
};