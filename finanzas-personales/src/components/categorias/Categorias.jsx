import { useState } from 'react';
import { useCategorias } from '../../hooks/useCategorias';
import { useTiposMovimiento } from '../../hooks/useTiposMovimiento';
import { useUI } from '../../context/UIContext';

import { FaTags, FaPlusCircle, FaEdit, FaTrashAlt, FaSitemap } from "react-icons/fa";


const GestionCategoria = () => {
  const { 
    categorias,
    totalCategorias,
    totalPaginas,
    paginaActual,
    irAPagina,
    paginaAnterior,
    paginaSiguiente,
    jerarquiaCategorias, 
    loading, 
    crearCategoria, 
    actualizarCategoria, 
    eliminarCategoria 
  } = useCategorias();
  const { tiposMovimiento } = useTiposMovimiento();
  const { showModal } = useUI();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre: '',
    icono: '',
    color: '#000000',
    tipoMovimientoId: '',
    padreId: ''
  });

  const limpiarFormulario = () => {
    setFormulario({
      nombre: '',
      icono: '',
      color: '#000000',
      tipoMovimientoId: '',
      padreId: ''
    });
    setCategoriaEditando(null);
    setMostrarFormulario(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: name === 'tipoMovimientoId' || name === 'padreId' 
        ? (value === '' ? '' : parseInt(value)) 
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const datos = {
        ...formulario,
        padreId: formulario.padreId === '' ? null : formulario.padreId
      };

      if (categoriaEditando) {
        await actualizarCategoria(categoriaEditando.id, datos);
      } else {
        await crearCategoria(datos);
      }
      limpiarFormulario();
    } catch (error) {
      console.error('Error al guardar categoría:', error);
    }
  };

  const handleEditar = (categoria) => {
    setCategoriaEditando(categoria);
    setFormulario({
      nombre: categoria.nombre,
      icono: categoria.icono || '',
      color: categoria.color || '#000000',
      tipoMovimientoId: categoria.tipoMovimientoId,
      padreId: categoria.padreId || ''
    });
    setMostrarFormulario(true);
  };

  const handleEliminar = (categoria) => {
    showModal({
      title: 'Confirmar eliminación',
      description: `¿Está seguro de que desea eliminar la categoría "${categoria.nombre}"?`,
      onConfirm: async () => {
        try {
          await eliminarCategoria(categoria.id);
        } catch (error) {
          console.error('Error al eliminar categoría:', error);
        }
      }
    });
  };

  const obtenerNombreTipoMovimiento = (id) => {
    const tipo = tiposMovimiento.find(t => t.id === id);
    return tipo ? tipo.nombre : 'Desconocido';
  };

  const obtenerNombreCategoriaPadre = (id) => {
    const categoria = categorias.find(c => c.id === id);
    if (categoria && categoria.padre) {
      return categoria.padre.nombre;
    }
    if (categoria) {
      return categoria.nombre;
    }
    // Buscar en jerarquiaCategorias si no está en la página actual
    for (const padre of jerarquiaCategorias) {
      if (padre.id === id) return padre.nombre;
      if (padre.subcategorias) {
        const sub = padre.subcategorias.find(subcat => subcat.id === id);
        if (sub) return sub.nombre;
      }
    }
    return 'PADRE';
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <FaTags className="text-primary" />
        Gestión de Categorías
      </h1>

      <div>
        <button
          onClick={() => setMostrarFormulario(true)}
          disabled={loading}
          className="btn btn-primary btn-sm flex items-center gap-2"
        >
          <FaPlusCircle /> Nueva Categoría
        </button>
      </div>

      {/* Formulario */}
      {mostrarFormulario && (
        <div className="card bg-base-100 shadow p-6 space-y-4 mt-4">
          <h2 className="text-xl font-semibold">
            {categoriaEditando ? "Editar Categoría" : "Nueva Categoría"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label font-semibold">Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formulario.nombre}
                onChange={handleInputChange}
                required
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label font-semibold">Icono:</label>
              <input
                type="text"
                name="icono"
                value={formulario.icono}
                onChange={handleInputChange}
                placeholder="Ej: 🏠, 🚗, 💰"
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label font-semibold">Color:</label>
              <input
                type="color"
                name="color"
                value={formulario.color}
                onChange={handleInputChange}
                className="input w-20 h-10 p-0"
              />
            </div>

            <div className="form-control">
              <label className="label font-semibold">Tipo de Movimiento:</label>
              <select
                name="tipoMovimientoId"
                value={formulario.tipoMovimientoId}
                onChange={handleInputChange}
                required
                className="select select-bordered"
              >
                <option value="">Seleccione un tipo</option>
                {tiposMovimiento.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label font-semibold">Categoría Padre (opcional):</label>
              <select
                name="padreId"
                value={formulario.padreId}
                onChange={handleInputChange}
                className="select select-bordered"
              >
                <option value="">PADRE</option>
                {jerarquiaCategorias.map((categoriaPadre) => (
                  <option key={categoriaPadre.id} value={categoriaPadre.id}>
                    {categoriaPadre.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-success"
              >
                {categoriaEditando ? "Actualizar" : "Crear"}
              </button>
              <button
                type="button"
                onClick={limpiarFormulario}
                className="btn btn-ghost"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de Categorías */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Mis Categorías</h2>
          {!loading && totalCategorias > 0 && (
            <div className="text-sm text-gray-600">
              Total: {totalCategorias} categorías
            </div>
          )}
        </div>
        
        {loading ? (
          <p className="text-info">Cargando categorías...</p>
        ) : categorias.length === 0 ? (
          <p className="text-warning">No hay categorías registradas</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Icono</th>
                    <th>Color</th>
                    <th>Tipo</th>
                    <th>Categoría Padre</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.map((categoria) => (
                    <tr key={categoria.id}>
                      <td>{categoria.nombre}</td>
                      <td className="text-xl">{categoria.icono}</td>
                      <td>
                        <div
                          className="w-6 h-6 rounded-full border"
                          style={{ backgroundColor: categoria.color }}
                        />
                      </td>
                      <td>{
                        categoria.tipoMovimiento.nombre
                          ? categoria.tipoMovimiento.nombre
                          : 'Desconocido'
                      }</td>
                      <td
                        className={categoria.padreId ? "italic text-gray-500" : "font-semibold"}
                      >
                        {categoria.padreId
                          ? obtenerNombreCategoriaPadre(categoria.padreId)
                          : categoria.nombre}
                      </td>
                      <td className="flex gap-2">
                        <button
                          onClick={() => handleEditar(categoria)}
                          className="btn btn-sm btn-outline btn-info"
                        >
                          <FaEdit className="mr-1" /> Editar
                        </button>
                        <button
                          onClick={() => handleEliminar(categoria)}
                          className="btn btn-sm btn-outline btn-error"
                        >
                          <FaTrashAlt className="mr-1" /> Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
                
            {/* Controles de Paginación */}
            {totalPaginas > 1 && (
              <div className="flex justify-center items-center mt-6 gap-2">
                {/* Botón Anterior */}
                <button
                  onClick={paginaAnterior}
                  disabled={paginaActual === 1}
                  className={`btn btn-sm ${
                    paginaActual === 1 
                      ? 'btn-disabled' 
                      : 'btn-outline btn-primary'
                  }`}
                >
                  ← Anterior
                </button>
                
                {/* Números de página */}
                <div className="flex gap-1">
                  {/* Primera página */}
                  {paginaActual > 3 && (
                    <>
                      <button
                        onClick={() => irAPagina(1)}
                        className="btn btn-sm btn-outline btn-primary"
                      >
                        1
                      </button>
                      {paginaActual > 4 && <span className="px-2 py-1">...</span>}
                    </>
                  )}
      
                  {/* Páginas alrededor de la actual */}
                  {Array.from({ length: totalPaginas }, (_, i) => i + 1)
                    .filter(pagina => 
                      pagina >= Math.max(1, paginaActual - 2) && 
                      pagina <= Math.min(totalPaginas, paginaActual + 2)
                    )
                    .map(pagina => (
                      <button
                        key={pagina}
                        onClick={() => irAPagina(pagina)}
                        className={`btn btn-sm ${
                          pagina === paginaActual
                            ? 'btn-primary'
                            : 'btn-outline btn-primary'
                        }`}
                      >
                        {pagina}
                      </button>
                    ))}
      
                  {/* Última página */}
                  {paginaActual < totalPaginas - 2 && (
                    <>
                      {paginaActual < totalPaginas - 3 && <span className="px-2 py-1">...</span>}
                      <button
                        onClick={() => irAPagina(totalPaginas)}
                        className="btn btn-sm btn-outline btn-primary"
                      >
                        {totalPaginas}
                      </button>
                    </>
                  )}
                </div>
                
                {/* Botón Siguiente */}
                <button
                  onClick={paginaSiguiente}
                  disabled={paginaActual === totalPaginas}
                  className={`btn btn-sm ${
                    paginaActual === totalPaginas 
                      ? 'btn-disabled' 
                      : 'btn-outline btn-primary'
                  }`}
                >
                  Siguiente →
                </button>
              </div>
            )}
      
            {/* Información de paginación */}
            {totalPaginas > 1 && (
              <div className="text-center mt-4 text-sm text-gray-600">
                Página {paginaActual} de {totalPaginas}
              </div>
            )}
          </>
        )}
      </div>

      {/* Vista Jerarquizada */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <FaSitemap className="text-accent" />
          Vista Jerárquica
        </h2>
        {jerarquiaCategorias.length === 0 ? (
          <p className="text-info mt-2">No hay categorías organizadas</p>
        ) : (
          <div className="space-y-4 mt-4">
            {jerarquiaCategorias.map((categoriaPadre) => (
              <div key={categoriaPadre.id} className="card bg-base-200 p-4 shadow">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className="text-xl">{categoriaPadre.icono}</span> 
                  {categoriaPadre.nombre}
                  <span className="text-sm text-gray-500">
                    ({obtenerNombreTipoMovimiento(categoriaPadre.tipoMovimientoId)})
                  </span>
                </h3>
                {categoriaPadre.subcategorias && categoriaPadre.subcategorias.length > 0 && (
                  <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                    {categoriaPadre.subcategorias.map((hijo) => (
                      <li key={hijo.id} className="text-sm flex items-center gap-2">
                        <span className="text-lg">{hijo.icono}</span> {hijo.nombre}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

};

export default GestionCategoria;