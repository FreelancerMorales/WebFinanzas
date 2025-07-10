import { useState, useEffect } from 'react';
import { categoriaService } from '../services/categoriaService';
import { useUI } from '../context/UIContext';

export const useCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [jerarquiaCategorias, setJerarquiaCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useUI();

  const cargarCategorias = async () => {
    try {
      setLoading(true);
      const result = await categoriaService.obtenerCategorias();
      setCategorias(result.data || []);
    } catch (error) {
      showAlert('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const cargarJerarquiaCategorias = async () => {
    try {
      const result = await categoriaService.obtenerJerarquiaCategorias();
      setJerarquiaCategorias(result.data || []);
    } catch (error) {
      showAlert('error', error.message);
    }
  };

  const crearCategoria = async (datos) => {
    try {
      const result = await categoriaService.crearCategoria(datos);
      await cargarCategorias();
      showAlert('success', 'Categoría creada exitosamente');
      return result;
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    }
  };

  const actualizarCategoria = async (id, datos) => {
    try {
      const result = await categoriaService.actualizarCategoria(id, datos);
      await cargarCategorias();
      showAlert('success', 'Categoría actualizada exitosamente');
      return result;
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    }
  };

  const eliminarCategoria = async (id) => {
    try {
      await categoriaService.eliminarCategoria(id);
      await cargarCategorias();
      showAlert('success', 'Categoría eliminada exitosamente');
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    }
  };

  const obtenerCategoriasPorTipo = (tipoMovimientoId) => {
    return categorias.filter(cat => cat.tipoMovimientoId === tipoMovimientoId);
  };

  useEffect(() => {
    cargarCategorias();
    cargarJerarquiaCategorias();
  }, []);

  return {
    categorias,
    jerarquiaCategorias,
    loading,
    cargarCategorias,
    cargarJerarquiaCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
    obtenerCategoriasPorTipo
  };
};