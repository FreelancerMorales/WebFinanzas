import { useState, useEffect } from 'react';
import { categoriaService } from '../services/categoriaService';
import { useUI } from '../context/UIContext';

export const useCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [jerarquiaCategorias, setJerarquiaCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useUI();

  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [totalCategorias, setTotalCategorias] = useState(0);

  const cargarCategorias = async (pagina = 1) => {
    console.log('🔄 Cargando página:', pagina);
    console.log('📍 Página actual antes:', paginaActual);
    
    try {
      setLoading(true);
      const result = await categoriaService.obtenerCategorias(pagina);
      const ok = result.ok;
      const data = result.datos.categorias || [];

      if (!ok) {
        throw new Error(result.mensaje);
      }
      
      // logs desgloce JSON
      console.log('Resultado de cargarCategorias:', result);
      console.log('Estado de la respuesta:', ok);
      console.log('Mensaje de la respuesta:', result.mensaje);

      console.log('Datos:', result.datos);
      console.log('Cantidad Categorias: ', result.datos.total);
      console.log('Paginas:', result.datos.page);
      console.log('Total de Paginas:', result.datos.totalPages);

      console.log('Categorias:', result.datos.categorias);
      console.log('Categoria:', result.datos.categorias.map(categoria => ({
        id: categoria.id,
        nombre: categoria.nombre,
        icono: categoria.icono,
        color: categoria.color,
        tipoMovimientoId: categoria.tipoMovimientoId,
        tipoMovimiento: categoria.tipoMovimiento,
        padreId: categoria.padreId,
        padre: categoria.padre ? {
          id: categoria.padre.id,
          nombre: categoria.padre.nombre
        } : null,
        _count: {
          transacciones: categoria._count.transacciones,
          subcategorias: categoria._count.subcategorias
        }
      })));

      // Actualizar estados de paginación
      setPaginaActual(result.datos.page);
      setTotalPaginas(result.datos.totalPages);
      setTotalCategorias(result.datos.total);

      setCategorias(data || []);
      
      console.log('✅ Página cargada exitosamente:', result.datos.page);
    } catch (error) {
      console.error('❌ Error al cargar página:', error);
      showAlert('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Funciones para manejar la paginación
  const irAPagina = (pagina) => {
    console.log('🎯 Intentando ir a página:', pagina);
    if (pagina >= 1 && pagina <= totalPaginas && pagina !== paginaActual) {
      cargarCategorias(pagina);
    }
  };

  const paginaAnterior = () => {
    if (paginaActual > 1) {
      cargarCategorias(paginaActual - 1);
    }
  };

  const paginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      cargarCategorias(paginaActual + 1);
    }
  };

  const cargarJerarquiaCategorias = async () => {
    try {
      const result = await categoriaService.obtenerJerarquiaCategorias();
      console.log('Resultado de cargarJerarquiaCategorias:', result.datos);
      setJerarquiaCategorias(result.datos || []);
    } catch (error) {
      showAlert('error', error.message);
    }
  };

  const crearCategoria = async (datos) => {
    console.log('Datos a crear categoría:', datos);
    try {
      const result = await categoriaService.crearCategoria(datos);
      // IMPORTANTE: Mantener la página actual después de crear
      await cargarCategorias(paginaActual);
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
      // IMPORTANTE: Mantener la página actual después de actualizar
      await cargarCategorias(paginaActual);
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
      // IMPORTANTE: Mantener la página actual después de eliminar
      await cargarCategorias(paginaActual);
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
    cargarCategorias(1); // Cargar página 1 al inicializar
    cargarJerarquiaCategorias();
  }, []);

  return {
    categorias,
    irAPagina,
    paginaAnterior,
    paginaActual,
    paginaSiguiente,
    totalCategorias, // Corregido el nombre
    totalPaginas,
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