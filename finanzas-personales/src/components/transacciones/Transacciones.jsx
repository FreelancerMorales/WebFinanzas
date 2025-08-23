import { useState, useEffect } from 'react';
import { useTransacciones } from '../../hooks/useTransacciones';
import { useUI } from '../../context/UIContext';
import { 
  FiPlus, 
  FiEdit3, 
  FiTrash2, 
  FiFilter, 
  FiX, 
  FiCalendar, 
  FiDollarSign, 
  FiCreditCard, 
  FiTag,
  FiSearch,
  FiRefreshCw
} from 'react-icons/fi';

import {
  TfiBarChart
} from 'react-icons/tfi';
import Loader from '../static/Loader';
import { useCuentas } from '../../hooks/useCuentas';
import { useTiposMovimiento } from '../../hooks/useTiposMovimiento';
import { useCategorias } from '../../hooks/useCategorias';

const Transacciones = () => {
  const {
    transacciones,
    estadisticas,
    loading,
    cargarTransacciones,
    cargarEstadisticas,
    crearTransaccion,
    actualizarTransaccion,
    eliminarTransaccion
  } = useTransacciones();

  const { cuentas } = useCuentas();
  const { tiposMovimiento } = useTiposMovimiento();
  const { categorias } = useCategorias();

  const { showModal } = useUI();

  // Estados para filtros
  const [filtros, setFiltros] = useState({
    fechaInicio: '',
    fechaFin: '',
    cuentaId: '',
    categoriaId: '',
    tipoMovimientoId: '',
    page: 1,
    limit: 10
  });

  // Estados para formulario de nueva transacción
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [transaccionEditando, setTransaccionEditando] = useState(null);
  const [formData, setFormData] = useState({
    monto: '',
    descripcion: '',
    fecha: new Date().toISOString().split('T')[0],
    cuentaId: '',
    categoriaId: '',
    tipoMovimientoId: '',
    tipoPagoId: '',
    plantillaId: '',
    etiquetaIds: []
  });

  // Cargar transacciones al montar el componente
  useEffect(() => {
    cargarTransacciones(filtros);
  }, []);

  // Manejar cambios en filtros
  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value,
      page: 1 // Reset page when filters change
    }));
  };

  // Aplicar filtros
  const aplicarFiltros = () => {
    cargarTransacciones(filtros);
  };

  // Limpiar filtros
  const limpiarFiltros = () => {
    const filtrosLimpios = {
      fechaInicio: '',
      fechaFin: '',
      cuentaId: '',
      categoriaId: '',
      tipoMovimientoId: '',
      page: 1,
      limit: 10
    };
    setFiltros(filtrosLimpios);
    cargarTransacciones(filtrosLimpios);
  };

  // Manejar cambios del formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Abrir formulario para nueva transacción
  const abrirFormularioNuevo = () => {
    setTransaccionEditando(null);
    setFormData({
      monto: '',
      descripcion: '',
      fecha: new Date().toISOString().split('T')[0],
      cuentaId: '',
      categoriaId: '',
      tipoMovimientoId: '',
      tipoPagoId: '',
      plantillaId: '',
      etiquetaIds: []
    });
    setMostrarFormulario(true);
  };

  // Abrir formulario para editar transacción
  const abrirFormularioEditar = (transaccion) => {
    setTransaccionEditando(transaccion);
    setFormData({
      monto: transaccion.monto.toString(),
      descripcion: transaccion.descripcion || '',
      fecha: new Date(transaccion.fecha).toISOString().split('T')[0],
      cuentaId: transaccion.cuentaId.toString(),
      categoriaId: transaccion.categoriaId.toString(),
      tipoMovimientoId: transaccion.tipoMovimientoId.toString(),
      tipoPagoId: transaccion.tipoPagoId?.toString() || '',
      plantillaId: transaccion.plantillaId?.toString() || '',
      etiquetaIds: transaccion.etiquetas?.map(e => e.id) || []
    });
    setMostrarFormulario(true);
  };

  // Guardar transacción (crear o actualizar)
  const guardarTransaccion = async () => {
    
    try {
      const datos = {
        ...formData,
        monto: parseFloat(formData.monto),
        cuentaId: parseInt(formData.cuentaId),
        categoriaId: parseInt(formData.categoriaId),
        tipoMovimientoId: parseInt(formData.tipoMovimientoId),
        tipoPagoId: formData.tipoPagoId ? parseInt(formData.tipoPagoId) : null,
        plantillaId: formData.plantillaId ? parseInt(formData.plantillaId) : null
      };

      if (transaccionEditando) {
        await actualizarTransaccion(transaccionEditando.id, datos);
      } else {
        await crearTransaccion(datos);
      }

      setMostrarFormulario(false);
      cargarTransacciones(filtros); // Recargar lista
    } catch (error) {
      console.error('Error al guardar transacción:', error);
    }
  };

  // Confirmar eliminación
  const confirmarEliminacion = (transaccion) => {
    showModal({
      title: 'Eliminar Transacción',
      description: `¿Estás seguro de que deseas eliminar la transacción "${transaccion.descripcion || 'Sin descripción'}"?`,
      onConfirm: () => handleEliminar(transaccion.id)
    });
  };

  // Eliminar transacción
  const handleEliminar = async (id) => {
    try {
      await eliminarTransaccion(id);
      cargarTransacciones(filtros); // Recargar lista
    } catch (error) {
      console.error('Error al eliminar transacción:', error);
    }
  };

  // Formatear fecha para mostrar
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES');
  };

  const numberFormatter = new Intl.NumberFormat('es-US', {
    style: 'currency',
  currency: 'GTQ',
  });
  
  // Formatear monto
  const formatearMonto = (monto) => {
    return numberFormatter.format(monto);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-base-content">Gestión de Transacciones</h1>
          <p className="text-base-content/70 mt-1">Administra y controla todas tus transacciones financieras</p>
        </div>
        <button 
          onClick={abrirFormularioNuevo} 
          className="btn btn-primary gap-2 shadow-lg"
        >
          <FiPlus className="w-4 h-4" />
          Nueva Transacción
        </button>
      </div>

      {/* Filtros Card */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <FiFilter className="w-5 h-5 text-primary" />
            <h3 className="card-title">Filtros de Búsqueda</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  <FiCalendar className="w-4 h-4 inline mr-1" />
                  Fecha Inicio
                </span>
              </label>
              <input
                type="date"
                name="fechaInicio"
                value={filtros.fechaInicio}
                onChange={handleFiltroChange}
                className="input input-bordered focus:input-primary"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  <FiCalendar className="w-4 h-4 inline mr-1" />
                  Fecha Fin
                </span>
              </label>
              <input
                type="date"
                name="fechaFin"
                value={filtros.fechaFin}
                onChange={handleFiltroChange}
                className="input input-bordered focus:input-primary"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  <FiCreditCard className="w-4 h-4 inline mr-1" />
                  Cuenta
                </span>
              </label>
              <select
                name="cuentaId"
                value={filtros.cuentaId}
                onChange={handleFiltroChange}
                className="input input-bordered focus:input-primary"
              >
                <option value="">Seleccione una cuenta</option>
                {transacciones.map((transaccion) => (
                  <option key={transaccion.id} value={transaccion.cuenta?.id}>
                    {transaccion.cuenta?.nombre || 'N/A'}
                  </option>
                ))}
              </select> 
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  <FiTag className="w-4 h-4 inline mr-1" />
                  Categoría
                </span>
              </label>
              {/* Transformar a OPTION con {transaccion.categoria?.nombre || 'N/A'} */}
              <select
                name="categoriaId"
                value={filtros.categoriaId}
                onChange={handleFiltroChange}
                className="input input-bordered focus:input-primary"
              >
                <option value="">Seleccione una categoría</option>
                {transacciones.map((transaccion) => (
                  <option key={transaccion.id} value={transaccion.categoria?.id}>
                    {transaccion.categoria?.nombre || 'N/A'}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Tipo Movimiento</span>
              </label>
              <select
                name="tipoMovimientoId"
                value={filtros.tipoMovimientoId}
                onChange={handleFiltroChange}
                className="input input-bordered focus:input-primary"
              >
                <option value="">Seleccione un tipo de movimiento</option>
                {transacciones.map((transaccion) => (
                  <option key={transaccion.id} value={transaccion.tipoMovimiento?.id}>
                    {transaccion.tipoMovimiento?.nombre || 'N/A'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            <button 
              onClick={aplicarFiltros}
              className="btn btn-primary gap-2"
            >
              <FiSearch className="w-4 h-4" />
              Aplicar Filtros
            </button>
            <button 
              onClick={limpiarFiltros}
              className="btn btn-outline gap-2"
            >
              <FiRefreshCw className="w-4 h-4" />
              Limpiar
            </button>
            <button 
              onClick={() => cargarEstadisticas(filtros)}
              className="btn btn-accent gap-2"
            >
              <TfiBarChart className="w-4 h-4" />
              Estadísticas
            </button>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <Loader />
      )}

      {/* Lista de Transacciones */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h3 className="card-title">
              Transacciones
              <div className="badge badge-primary badge-lg ml-2">{transacciones.length}</div>
            </h3>
          </div>

          {transacciones.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💰</div>
              <p className="text-xl text-base-content/70 mb-2">No hay transacciones disponibles</p>
              <p className="text-base-content/50">Comienza creando tu primera transacción</p>
            </div>
          ) : (
            <>
              {/* Vista Desktop - Tabla */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th className="font-bold">Fecha</th>
                      <th className="font-bold">Descripción</th>
                      <th className="font-bold">Monto</th>
                      <th className="font-bold">Cuenta</th>
                      <th className="font-bold">Categoría</th>
                      <th className="font-bold">Tipo</th>
                      <th className="font-bold text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transacciones.map((transaccion) => (
                      <tr key={transaccion.id} className="hover">
                        <td>{formatearFecha(transaccion.fecha)}</td>
                        <td>
                          <div className="max-w-xs truncate" title={transaccion.descripcion}>
                            {transaccion.descripcion || 'Sin descripción'}
                          </div>
                        </td>
                        <td>
                          <div className={`font-bold ${transaccion.monto >= 0 ? 'text-success' : 'text-error'}`}>
                            {formatearMonto(transaccion.monto)}
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: transaccion.cuenta?.color || '#gray' }}
                            ></div>
                            {transaccion.cuenta?.nombre || 'N/A'}
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{transaccion.categoria?.icono || '📝'}</span>
                            {transaccion.categoria?.nombre || 'N/A'}
                          </div>
                        </td>
                        <td>
                          <div className="badge badge-outline">
                            {transaccion.tipoMovimiento?.nombre || 'N/A'}
                          </div>
                        </td>
                        <td>
                          <div className="flex gap-1 justify-center">
                            <button 
                              onClick={() => abrirFormularioEditar(transaccion)}
                              className="btn btn-ghost btn-sm text-info hover:bg-info hover:text-white"
                              title="Editar"
                            >
                              <FiEdit3 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => confirmarEliminacion(transaccion)}
                              className="btn btn-ghost btn-sm text-error hover:bg-error hover:text-white"
                              title="Eliminar"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Vista Mobile - Cards */}
              <div className="lg:hidden space-y-4">
                {transacciones.map((transaccion) => (
                  <div key={transaccion.id} className="card bg-base-200 shadow-md">
                    <div className="card-body p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-base-content/70">
                            {formatearFecha(transaccion.fecha)}
                          </div>
                        </div>
                        <div className={`font-bold text-lg ${transaccion.monto >= 0 ? 'text-success' : 'text-error'}`}>
                          {formatearMonto(transaccion.monto)}
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="font-medium text-base-content">
                          {transaccion.descripcion || 'Sin descripción'}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: transaccion.cuenta?.color || '#gray' }}
                          ></div>
                          <span className="truncate">{transaccion.cuenta?.nombre || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>{transaccion.categoria?.icono || '📝'}</span>
                          <span className="truncate">{transaccion.categoria?.nombre || 'N/A'}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="badge badge-outline">
                          {transaccion.tipoMovimiento?.nombre || 'N/A'}
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => abrirFormularioEditar(transaccion)}
                            className="btn btn-sm btn-info gap-1"
                          >
                            <FiEdit3 className="w-3 h-3" />
                            Editar
                          </button>
                          <button 
                            onClick={() => confirmarEliminacion(transaccion)}
                            className="btn btn-sm btn-error gap-1"
                          >
                            <FiTrash2 className="w-3 h-3" />
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Estadísticas */}
      {estadisticas && (
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <TfiBarChart className="w-5 h-5 text-accent" />
              <h3 className="card-title">Estadísticas</h3>
            </div>
            <div className="mockup-code">
              <pre><code>{JSON.stringify(estadisticas, null, 2)}</code></pre>
            </div>
          </div>
        </div>
      )}

      {/* Modal Formulario */}
      {mostrarFormulario && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl">
                {transaccionEditando ? 'Editar Transacción' : 'Nueva Transacción'}
              </h3>
              <button 
                onClick={() => setMostrarFormulario(false)}
                className="btn btn-sm btn-circle btn-ghost"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    <FiDollarSign className="w-4 h-4 inline mr-1" />
                    Monto *
                  </span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="monto"
                  value={formData.monto}
                  onChange={handleFormChange}
                  required
                  className="input input-bordered focus:input-primary"
                  placeholder="0.00"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    <FiCalendar className="w-4 h-4 inline mr-1" />
                    Fecha *
                  </span>
                </label>
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleFormChange}
                  required
                  className="input input-bordered focus:input-primary"
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Descripción</span>
                </label>
                <input
                  type="text"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleFormChange}
                  className="input input-bordered focus:input-primary"
                  placeholder="Descripción de la transacción..."
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    <FiCreditCard className="w-4 h-4 inline mr-1" />
                    Cuenta *
                  </span>
                </label>
                {/* Transformar a OPTION con useCuenta */}
                <select
                  name="cuentaId"
                  value={formData.cuentaId}
                  onChange={handleFormChange}
                  required
                  className="input input-bordered focus:input-primary"
                >
                  <option value="">Seleccione una cuenta</option>
                  {cuentas.map((cuenta) => (
                    <option key={cuenta.id} value={cuenta.id}>
                      {cuenta.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    <FiTag className="w-4 h-4 inline mr-1" />
                    Categoría *
                  </span>
                </label>
                {/* Arreglar Categoria */}
                <select
                  name="categoriaId"
                  value={formData.categoriaId}
                  onChange={handleFormChange}
                  required
                  className="input input-bordered focus:input-primary"
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  name="categoriaId"
                  value={formData.categoriaId}
                  onChange={handleFormChange}
                  required
                  className="input input-bordered focus:input-primary"
                  placeholder="ID de categoría"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Tipo Movimiento ID *</span>
                </label>
                <select
                  name="tipoMovimientoId"
                  value={formData.tipoMovimientoId}
                  onChange={handleFormChange}
                  required
                  className="input input-bordered focus:input-primary"
                >
                  <option value="">Seleccione un tipo de movimiento</option>
                  {tiposMovimiento.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Tipo Pago ID</span>
                </label>
                <input
                  type="number"
                  name="tipoPagoId"
                  value={formData.tipoPagoId}
                  onChange={handleFormChange}
                  className="input input-bordered focus:input-primary"
                  placeholder="ID tipo pago (opcional)"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Plantilla</span>
                </label>
                {/* SIMPLIFICAR */}
                <select
                  name="plantillaId"
                  value={formData.plantillaId}
                  onChange={handleFormChange}
                  className="input input-bordered focus:input-primary"
                >
                  <option value="">Seleccione una plantilla</option>
                  {transacciones.map((transaccion) => (
                    <option key={transaccion.id} value={transaccion.plantillaId}>
                      {transaccion.plantilla?.nombre || 'N/A'}
                    </option>
                  ))}
                  <option value=""> null</option>
                </select>
              </div>
            </div>

            <div className="modal-action mt-6">
              <button 
                onClick={() => setMostrarFormulario(false)}
                className="btn btn-outline"
              >
                Cancelar
              </button>
              <button 
                onClick={guardarTransaccion}
                className="btn btn-primary gap-2"
              >
                <FiPlus className="w-4 h-4" />
                {transaccionEditando ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transacciones;