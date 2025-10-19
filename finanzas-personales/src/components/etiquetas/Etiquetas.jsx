import { useState, useEffect } from 'react';
import { useEtiquetas } from '../../hooks/useEtiquetas';
import { useUI } from '../../context/UIContext';

import { 
  FiPlus, 
  FiX, 
  FiList, 
  FiBarChart2, 
  FiEdit2, 
  FiTrash2, 
  FiEye, 
  FiDollarSign,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiCheckCircle
} from 'react-icons/fi';

const Etiquetas = () => {
  const {
    // Obtener todas
    etiquetas,
    obtenerTodas,
    cargandoTodas,
    
    // Crear
    crear,
    creando,
    
    // Obtener por ID
    etiqueta,
    obtenerPorId,
    cargandoPorId,
    
    // Actualizar
    actualizar,
    actualizando,
    
    // Eliminar
    eliminar,
    eliminando,
    
    // Estadísticas
    estadisticas,
    obtenerConEstadisticas,
    cargandoEstadisticas,
    
    // Transacciones
    transacciones,
    obtenerTransacciones,
    cargandoTransacciones
  } = useEtiquetas();

  const { showAlert } = useUI();

  // Estados locales para formularios
  const [mostrarFormCrear, setMostrarFormCrear] = useState(false);
  const [mostrarFormEditar, setMostrarFormEditar] = useState(false);
  const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState(null);
  const [mostrarTransacciones, setMostrarTransacciones] = useState(false);
  const [vistaActual, setVistaActual] = useState('todas'); // 'todas' | 'estadisticas'
  const [filtroActivo, setFiltroActivo] = useState(undefined);

  // Form data para crear
  const [formCrear, setFormCrear] = useState({
    nombre: '',
    color: '#000000',
    descripcion: '',
    activo: true
  });

  // Form data para editar
  const [formEditar, setFormEditar] = useState({
    nombre: '',
    color: '',
    descripcion: '',
    activo: true
  });

  // Filtros para transacciones
  const [filtrosTransacciones, setFiltrosTransacciones] = useState({
    limite: 50,
    pagina: 1,
    fechaInicio: '',
    fechaFin: ''
  });

  // Cargar etiquetas al montar
  useEffect(() => {
    if (vistaActual === 'todas') {
      obtenerTodas({ activo: filtroActivo });
    } else if (vistaActual === 'estadisticas') {
      obtenerConEstadisticas();
    }
  }, [vistaActual, filtroActivo]);

  // Handlers para formulario de crear
  const handleInputCrear = (e) => {
    const { name, value, type, checked } = e.target;
    setFormCrear(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCrear = async (e) => {
    e.preventDefault();
    try {
      const datos = { ...formCrear };
      if (!datos.color) delete datos.color;
      if (!datos.descripcion) delete datos.descripcion;
      
      await crear(datos);
      
      // Resetear formulario
      setFormCrear({
        nombre: '',
        color: '#000000',
        descripcion: '',
        activo: true
      });
      setMostrarFormCrear(false);
      
      // Recargar lista
      obtenerTodas({ activo: filtroActivo });
    } catch (error) {
      console.error('Error al crear etiqueta:', error);
    }
  };

  // Handlers para formulario de editar
  const handleSeleccionarParaEditar = async (etiq) => {
    setEtiquetaSeleccionada(etiq);
    setFormEditar({
      nombre: etiq.nombre || '',
      color: etiq.color || '#000000',
      descripcion: etiq.descripcion || '',
      activo: etiq.activo
    });
    setMostrarFormEditar(true);
  };

  const handleInputEditar = (e) => {
    const { name, value, type, checked } = e.target;
    setFormEditar(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleActualizar = async (e) => {
    e.preventDefault();
    try {
      const datos = {};
      if (formEditar.nombre) datos.nombre = formEditar.nombre;
      if (formEditar.color) datos.color = formEditar.color;
      if (formEditar.descripcion) datos.descripcion = formEditar.descripcion;
      datos.activo = formEditar.activo;

      await actualizar(etiquetaSeleccionada.id, datos);
      
      setMostrarFormEditar(false);
      setEtiquetaSeleccionada(null);
      
      // Recargar lista
      obtenerTodas({ activo: filtroActivo });
    } catch (error) {
      console.error('Error al actualizar etiqueta:', error);
    }
  };

  // Handler para eliminar
  const handlePathActivo = async (id) => {
    if (window.confirm('¿Estás seguro de activar/desactivar esta etiqueta?')) {
      try {
        await eliminar(id);
        obtenerTodas({ activo: filtroActivo });
      } catch (error) {
        showAlert("error", "No se pudo eliminar la etiqueta");
        console.error('Error al eliminar etiqueta:', error);
      }
    }
  };

  // Handler para ver detalle
  const handleVerDetalle = async (id) => {
    try {
      await obtenerPorId(id);
    } catch (error) {
      console.error('Error al obtener etiqueta:', error);
    }
  };

  // Handler para ver transacciones
  const handleVerTransacciones = async (id) => {
    setEtiquetaSeleccionada({ id });
    setMostrarTransacciones(true);
    try {
      await obtenerTransacciones(id, filtrosTransacciones);
    } catch (error) {
      console.error('Error al obtener transacciones:', error);
    }
  };

  // Handler para cambiar filtros de transacciones
  const handleFiltrosTransacciones = (e) => {
    const { name, value } = e.target;
    setFiltrosTransacciones(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBuscarTransacciones = async () => {
    if (etiquetaSeleccionada) {
      try {
        await obtenerTransacciones(etiquetaSeleccionada.id, filtrosTransacciones);
      } catch (error) {
        console.error('Error al buscar transacciones:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Gestión de Etiquetas</h1>

        {/* Controles principales */}
        <div className="bg-base-100 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <button 
              onClick={() => setMostrarFormCrear(!mostrarFormCrear)}
              className={`btn ${mostrarFormCrear ? 'btn-error' : 'btn-primary'} gap-2`}
            >
              {mostrarFormCrear ? <><FiX /> Cancelar</> : <><FiPlus /> Nueva Etiqueta</>}
            </button>

            <button 
              onClick={() => setVistaActual('todas')}
              className={`btn ${vistaActual === 'todas' ? 'btn-active' : 'btn-ghost'} gap-2`}
            >
              <FiList /> Ver Todas
            </button>

            <button 
              onClick={() => setVistaActual('estadisticas')}
              className={`btn ${vistaActual === 'estadisticas' ? 'btn-active' : 'btn-ghost'} gap-2`}
            >
              <FiBarChart2 /> Ver Estadísticas
            </button>

            <div className="flex items-center gap-2 ml-auto">
              <FiFilter className="text-base-content" />
              <label className="form-control">
                <select 
                  value={filtroActivo === undefined ? 'todos' : filtroActivo}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFiltroActivo(val === 'todos' ? undefined : val === 'true');
                  }}
                  className="select select-bordered"
                >
                  <option value="todos">Todos los estados</option>
                  <option value="true">Activos</option>
                  <option value="false">Inactivos</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        {/* Formulario de crear */}
        {mostrarFormCrear && (
          <div className="bg-base-100 rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6">Crear Nueva Etiqueta</h2>
            <form onSubmit={handleCrear} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Nombre *</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formCrear.nombre}
                  onChange={handleInputCrear}
                  required
                  maxLength={100}
                  className="input input-bordered w-full"
                  placeholder="Ingrese el nombre de la etiqueta"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Color</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    name="color"
                    value={formCrear.color}
                    onChange={handleInputCrear}
                    className="w-20 h-12 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    name="color"
                    value={formCrear.color}
                    onChange={handleInputCrear}
                    placeholder="#000000"
                    maxLength={7}
                    className="input input-bordered flex-1"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Descripción</span>
                </label>
                <textarea
                  name="descripcion"
                  value={formCrear.descripcion}
                  onChange={handleInputCrear}
                  maxLength={200}
                  className="textarea textarea-bordered h-24"
                  placeholder="Descripción opcional de la etiqueta"
                />
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    name="activo"
                    checked={formCrear.activo}
                    onChange={handleInputCrear}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text font-semibold">Activo</span>
                </label>
              </div>

              <button type="submit" disabled={creando} className="btn btn-primary w-full">
                {creando ? <span className="loading loading-spinner"></span> : <FiPlus />}
                {creando ? 'Creando...' : 'Crear Etiqueta'}
              </button>
            </form>
          </div>
        )}

        {/* Lista de etiquetas - Vista Normal */}
        {vistaActual === 'todas' && (
          <div className="bg-base-100 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Listado de Etiquetas</h2>

            {cargandoTodas && (
              <div className="flex justify-center py-8">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            )}

            {etiquetas?.datos && etiquetas.datos.length === 0 && (
              <div className="alert alert-info">
                <FiList className="text-xl" />
                <span>No hay etiquetas disponibles</span>
              </div>
            )}

            {etiquetas?.datos && etiquetas.datos.length > 0 && (
              <div className="grid gap-4">
                {etiquetas.datos.map((etiq) => (
                  <div key={etiq.id} className="card bg-base-200 shadow-xl" style={{ borderLeft: `5px solid ${etiq.color || '#000'}` }}>
                    <div className="card-body">
                      <h3 className="card-title text-2xl">{etiq.nombre}</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 my-4">
                        <div className="badge badge-outline gap-2">ID: {etiq.id}</div>
                        <div className="badge badge-outline gap-2">Color: {etiq.color || 'Sin color'}</div>
                        <div className="badge badge-outline gap-2">{etiq.activo ? '✓ Activo' : '✗ Inactivo'}</div>
                        <div className="badge badge-outline gap-2">
                          {new Date(etiq.creadoEn).toLocaleDateString()}
                        </div>
                      </div>

                      <p className="text-sm text-base-content/70 mb-4">
                        {etiq.descripcion || 'Sin descripción'}
                      </p>

                      <div className="card-actions justify-end flex-wrap gap-2">
                        <button onClick={() => handleVerDetalle(etiq.id)} className="btn btn-sm btn-info gap-1">
                          <FiEye /> Ver Detalle
                        </button>
                        <button onClick={() => handleSeleccionarParaEditar(etiq)} className="btn btn-sm btn-warning gap-1">
                          <FiEdit2 /> Editar
                        </button>
                        {etiq.activo ? (
                          <button onClick={() => handlePathActivo(etiq.id)} disabled={eliminando} className="btn btn-sm btn-error gap-1">
                            <FiTrash2 /> Desactivar
                          </button>
                        ) : (
                          <button onClick={() => handlePathActivo(etiq.id)} disabled={eliminando} className="btn btn-sm btn-success gap-1">
                            <FiCheckCircle /> Activar
                          </button>
                        )}
                        <button onClick={() => handleVerTransacciones(etiq.id)} className="btn btn-sm btn-success gap-1">
                          <FiDollarSign /> Transacciones
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Lista de etiquetas - Vista Estadísticas */}
        {vistaActual === 'estadisticas' && (
          <div className="bg-base-100 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Estadísticas de Etiquetas</h2>

            {cargandoEstadisticas && (
              <div className="flex justify-center py-8">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            )}

            {estadisticas?.datos && estadisticas.datos.length === 0 && (
              <div className="alert alert-info">
                <FiBarChart2 className="text-xl" />
                <span>No hay etiquetas con estadísticas</span>
              </div>
            )}

            {estadisticas?.datos && estadisticas.datos.length > 0 && (
              <div className="grid gap-4">
                {estadisticas.datos.map((etiq) => (
                  <div key={etiq.id} className="card bg-base-200 shadow-xl" style={{ borderLeft: `5px solid ${etiq.color || '#000'}` }}>
                    <div className="card-body">
                      <h3 className="card-title text-2xl">{etiq.nombre}</h3>

                      <div className="stats shadow my-4">
                        <div className="stat">
                          <div className="stat-title">Transacciones</div>
                          <div className="stat-value text-primary">{etiq._count?.etiquetaontransaccion || 0}</div>
                          <div className="stat-desc">{etiq.activo ? 'Activo' : 'Inactivo'}</div>
                        </div>
                      </div>

                      <div className="flex gap-2 mb-2">
                        <div className="badge badge-outline">{etiq.color || 'Sin color'}</div>
                        <div className="badge badge-outline">{new Date(etiq.creadoEn).toLocaleDateString()}</div>
                      </div>

                      <div className="card-actions justify-end">
                        <button onClick={() => handleVerTransacciones(etiq.id)} className="btn btn-sm btn-success gap-1">
                          <FiDollarSign /> Ver Transacciones
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Formulario de editar */}
        {mostrarFormEditar && etiquetaSeleccionada && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-base-100 rounded-lg shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Editar Etiqueta</h2>
              <form onSubmit={handleActualizar} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Nombre</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formEditar.nombre}
                    onChange={handleInputEditar}
                    maxLength={100}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Color</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      name="color"
                      value={formEditar.color}
                      onChange={handleInputEditar}
                      className="w-20 h-12 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      name="color"
                      value={formEditar.color}
                      onChange={handleInputEditar}
                      placeholder="#000000"
                      maxLength={7}
                      className="input input-bordered flex-1"
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Descripción</span>
                  </label>
                  <textarea
                    name="descripcion"
                    value={formEditar.descripcion}
                    onChange={handleInputEditar}
                    maxLength={200}
                    className="textarea textarea-bordered h-24"
                  />
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-3">
                    <input
                      type="checkbox"
                      name="activo"
                      checked={formEditar.activo}
                      onChange={handleInputEditar}
                      className="checkbox checkbox-primary"
                    />
                    <span className="label-text font-semibold">Activo</span>
                  </label>
                </div>

                <div className="flex gap-2 pt-4">
                  <button type="submit" disabled={actualizando} className="btn btn-primary flex-1">
                    {actualizando ? <span className="loading loading-spinner"></span> : <FiEdit2 />}
                    {actualizando ? 'Actualizando...' : 'Actualizar'}
                  </button>
                  <button type="button" onClick={() => setMostrarFormEditar(false)} className="btn btn-ghost flex-1">
                    <FiX /> Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Detalle de etiqueta individual */}
        {etiqueta?.datos && !mostrarFormEditar && (
          <div className="bg-base-100 rounded-lg shadow-lg p-6 border-2 border-info">
            <h2 className="text-2xl font-bold mb-6 text-info">Detalle de Etiqueta</h2>
            <div className="space-y-3">
              <div className="flex gap-2"><strong className="min-w-[140px]">ID:</strong> <span>{etiqueta.datos.id}</span></div>
              <div className="flex gap-2"><strong className="min-w-[140px]">Nombre:</strong> <span>{etiqueta.datos.nombre}</span></div>
              <div className="flex gap-2"><strong className="min-w-[140px]">Color:</strong> <span className="badge" style={{backgroundColor: etiqueta.datos.color}}>{etiqueta.datos.color || 'Sin color'}</span></div>
              <div className="flex gap-2"><strong className="min-w-[140px]">Descripción:</strong> <span>{etiqueta.datos.descripcion || 'Sin descripción'}</span></div>
              <div className="flex gap-2"><strong className="min-w-[140px]">Estado:</strong> <span className={`badge ${etiqueta.datos.activo ? 'badge-success' : 'badge-error'}`}>{etiqueta.datos.activo ? 'Activo' : 'Inactivo'}</span></div>
              <div className="flex gap-2"><strong className="min-w-[140px]">Usuario ID:</strong> <span>{etiqueta.datos.usuarioId}</span></div>
              <div className="flex gap-2"><strong className="min-w-[140px]">Creado:</strong> <span>{new Date(etiqueta.datos.creadoEn).toLocaleString()}</span></div>
            </div>
            <button onClick={() => obtenerPorId(null)} className="btn btn-outline mt-6">
              <FiX /> Cerrar Detalle
            </button>
          </div>
        )}

        {/* Panel de transacciones */}
        {mostrarTransacciones && (
          <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
            <div className="min-h-screen py-8 px-4">
              <div className="bg-base-100 rounded-lg shadow-2xl max-w-6xl mx-auto p-6">
                <h2 className="text-3xl font-bold mb-6">Transacciones de la Etiqueta</h2>

                {/* Filtros de transacciones */}
                <div className="bg-base-200 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FiFilter /> Filtros
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Límite:</span>
                      </label>
                      <input
                        type="number"
                        name="limite"
                        value={filtrosTransacciones.limite}
                        onChange={handleFiltrosTransacciones}
                        min="1"
                        max="100"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Página:</span>
                      </label>
                      <input
                        type="number"
                        name="pagina"
                        value={filtrosTransacciones.pagina}
                        onChange={handleFiltrosTransacciones}
                        min="1"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Fecha Inicio:</span>
                      </label>
                      <input
                        type="date"
                        name="fechaInicio"
                        value={filtrosTransacciones.fechaInicio}
                        onChange={handleFiltrosTransacciones}
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Fecha Fin:</span>
                      </label>
                      <input
                        type="date"
                        name="fechaFin"
                        value={filtrosTransacciones.fechaFin}
                        onChange={handleFiltrosTransacciones}
                        className="input input-bordered"
                      />
                    </div>
                  </div>
                  <button onClick={handleBuscarTransacciones} disabled={cargandoTransacciones} className="btn btn-primary mt-4 w-full md:w-auto">
                    {cargandoTransacciones ? <span className="loading loading-spinner"></span> : <FiFilter />}
                    Buscar
                  </button>
                </div>

                {cargandoTransacciones && (
                  <div className="flex justify-center py-8">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                  </div>
                )}

                {transacciones?.datos && (
                  <div>
                    {/* Info de la etiqueta */}
                    <div className="alert alert-info mb-6">
                      <div>
                        <h3 className="font-bold text-lg">Etiqueta: {transacciones.datos.etiqueta.nombre}</h3>
                        <div className="text-sm mt-2">
                          <p>Color: <span className="badge" style={{backgroundColor: transacciones.datos.etiqueta.color}}>{transacciones.datos.etiqueta.color}</span></p>
                          <p>Descripción: {transacciones.datos.etiqueta.descripcion || 'N/A'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Paginación info */}
                    <div className="stats shadow mb-6 w-full">
                      <div className="stat">
                        <div className="stat-title">Total</div>
                        <div className="stat-value text-primary">{transacciones.datos.total}</div>
                      </div>
                      <div className="stat">
                        <div className="stat-title">Página</div>
                        <div className="stat-value text-secondary">{transacciones.datos.pagina}</div>
                      </div>
                      <div className="stat">
                        <div className="stat-title">Total Páginas</div>
                        <div className="stat-value text-accent">{transacciones.datos.totalPaginas}</div>
                      </div>
                    </div>

                    {/* Lista de transacciones */}
                    {transacciones.datos.transacciones.length === 0 && (
                      <div className="alert alert-warning">
                        <FiDollarSign className="text-xl" />
                        <span>No hay transacciones para esta etiqueta</span>
                      </div>
                    )}

                    {transacciones.datos.transacciones.length > 0 && (
                      <div className="space-y-4 mb-6">
                        {transacciones.datos.transacciones.map((trans) => (
                          <div key={trans.id} className="card bg-base-200 shadow-xl">
                            <div className="card-body">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-base-content/70">ID</p>
                                  <p className="font-semibold">{trans.id}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-base-content/70">Monto</p>
                                  <p className="font-semibold text-xl text-success">${trans.monto}</p>
                                </div>
                                <div className="md:col-span-2">
                                  <p className="text-sm text-base-content/70">Descripción</p>
                                  <p className="font-semibold">{trans.descripcion}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-base-content/70">Fecha</p>
                                  <p className="font-semibold">{new Date(trans.fecha).toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-base-content/70">Confirmada</p>
                                  <span className={`badge ${trans.confirmada ? 'badge-success' : 'badge-warning'}`}>
                                    {trans.confirmada ? 'Sí' : 'No'}
                                  </span>
                                </div>

                                {trans.cuenta && (
                                  <div className="md:col-span-2">
                                    <p className="text-sm text-base-content/70">Cuenta</p>
                                    <p className="font-semibold">{trans.cuenta.nombre} <span className="badge badge-outline ml-2">{trans.cuenta.tipo}</span></p>
                                  </div>
                                )}

                                {trans.tipomovimiento && (
                                  <div>
                                    <p className="text-sm text-base-content/70">Tipo</p>
                                    <p className="font-semibold">{trans.tipomovimiento.nombre}</p>
                                  </div>
                                )}

                                {trans.usuariocategoria?.categoriabase && (
                                  <div className="md:col-span-2">
                                    <p className="text-sm text-base-content/70">Categoría</p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                      <span className="badge badge-lg">{trans.usuariocategoria.categoriabase.nombre}</span>
                                      {trans.usuariocategoria.categoriabase.icono && (
                                        <span className="badge badge-outline">{trans.usuariocategoria.categoriabase.icono.nombre}</span>
                                      )}
                                      {trans.usuariocategoria.categoriabase.color && (
                                        <span className="badge" style={{backgroundColor: trans.usuariocategoria.categoriabase.color.hex}}>
                                          {trans.usuariocategoria.categoriabase.color.nombre}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Controles de paginación */}
                    {transacciones.datos.totalPaginas > 1 && (
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => {
                            setFiltrosTransacciones(prev => ({ ...prev, pagina: prev.pagina - 1 }));
                            setTimeout(handleBuscarTransacciones, 100);
                          }}
                          disabled={transacciones.datos.pagina === 1}
                          className="btn btn-primary gap-2"
                        >
                          <FiChevronLeft /> Anterior
                        </button>
                        <button 
                          onClick={() => {
                            setFiltrosTransacciones(prev => ({ ...prev, pagina: prev.pagina + 1 }));
                            setTimeout(handleBuscarTransacciones, 100);
                          }}
                          disabled={transacciones.datos.pagina === transacciones.datos.totalPaginas}
                          className="btn btn-primary gap-2"
                        >
                          Siguiente <FiChevronRight />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <button onClick={() => {
                  setMostrarTransacciones(false);
                  setEtiquetaSeleccionada(null);
                }} className="btn btn-error w-full mt-6 gap-2">
                  <FiX /> Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Etiquetas;