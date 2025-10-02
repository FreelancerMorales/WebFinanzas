import { useState, useEffect } from 'react';
import { useCuentas } from '../../hooks/useCuentas';

import { FaList, FaChartPie, FaPlus, FaEdit, FaTrash, FaEye, FaArrowLeft } from 'react-icons/fa';


const Cuentas = () => {
  const {
    // Obtener todas
    cuentas,
    cargandoCuentas,
    obtenerTodas,

    // Obtener por ID
    cuenta,
    cargandoCuenta,
    obtenerPorId,
    resetCuenta,

    // Crear
    crear,
    creando,

    // Actualizar
    actualizar,
    actualizando,

    // Eliminar
    eliminar,
    eliminando,

    // Resumen
    resumen,
    cargandoResumen,
    obtenerResumen,

    // Orden
    actualizarOrden,
    actualizandoOrden,
  } = useCuentas();

  // Estados locales para filtros y formularios
  const [filtroActivo, setFiltroActivo] = useState(undefined);
  const [modoVista, setModoVista] = useState('lista'); // 'lista' | 'resumen' | 'detalle'
  const [cuentaSeleccionadaId, setCuentaSeleccionadaId] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  // Estado del formulario
  const [formulario, setFormulario] = useState({
    nombre: '',
    tipo: 'CORRIENTE',
    color: '#3B82F6',
    montoInicial: 0,
    orden: 0
  });

  // Cargar cuentas al montar el componente
  useEffect(() => {
    cargarCuentas();
  }, [filtroActivo]);

  // Cargar resumen al cambiar a vista resumen
  useEffect(() => {
    if (modoVista === 'resumen') {
      obtenerResumen();
    }
  }, [modoVista]);

  // Cargar cuenta específica cuando se selecciona
  useEffect(() => {
    if (cuentaSeleccionadaId && modoVista === 'detalle') {
      obtenerPorId(cuentaSeleccionadaId);
    }
  }, [cuentaSeleccionadaId, modoVista]);

  // Función para cargar cuentas con filtros
  const cargarCuentas = () => {
    const params = {};
    if (filtroActivo !== undefined) {
      params.activo = filtroActivo;
    }
    obtenerTodas(params);
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Crear nueva cuenta
  const handleCrear = async (e) => {
    e.preventDefault();
    try {
      await crear(formulario);
      resetFormulario();
      setMostrarFormulario(false);
      cargarCuentas();
    } catch (error) {
      console.error('Error al crear cuenta:', error);
    }
  };

  // Actualizar cuenta existente
  const handleActualizar = async (e) => {
    e.preventDefault();
    try {
      await actualizar(cuentaSeleccionadaId, formulario);
      resetFormulario();
      setMostrarFormulario(false);
      setModoEdicion(false);
      cargarCuentas();
      if (modoVista === 'detalle') {
        obtenerPorId(cuentaSeleccionadaId);
      }
    } catch (error) {
      console.error('Error al actualizar cuenta:', error);
    }
  };

  // Eliminar cuenta
  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta cuenta?')) {
      try {
        await eliminar(id);
        cargarCuentas();
        if (cuentaSeleccionadaId === id) {
          setCuentaSeleccionadaId(null);
          setModoVista('lista');
        }
      } catch (error) {
        console.error('Error al eliminar cuenta:', error);
      }
    }
  };

  // Preparar formulario para edición
  const prepararEdicion = (cuentaData) => {
    setFormulario({
      nombre: cuentaData.nombre,
      tipo: cuentaData.tipo,
      color: cuentaData.color || '#3B82F6',
      orden: cuentaData.orden || 0,
      activo: cuentaData.activo
    });
    setModoEdicion(true);
    setMostrarFormulario(true);
  };

  // Resetear formulario
  const resetFormulario = () => {
    setFormulario({
      nombre: '',
      tipo: 'CORRIENTE',
      color: '#3B82F6',
      montoInicial: 0,
      orden: 0
    });
    setModoEdicion(false);
  };

  // Ver detalle de cuenta
  const verDetalle = (id) => {
    setCuentaSeleccionadaId(id);
    setModoVista('detalle');
    resetCuenta(); // Limpiar datos anteriores
  };

  // Volver a lista
  const volverALista = () => {
    setModoVista('lista');
    setCuentaSeleccionadaId(null);
    resetCuenta();
  };

  // Cambiar filtro de activo
  const cambiarFiltroActivo = (valor) => {
    setFiltroActivo(valor === 'todas' ? undefined : valor === 'activas');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Gestión de Cuentas</h1>

      {/* Controles principales */}
      <div className="flex gap-3 mb-6 justify-center">
        <button 
          className="btn btn-primary gap-2"
          onClick={() => setModoVista('lista')}
        >
          <FaList /> Lista
        </button>
        <button 
          className="btn btn-secondary gap-2"
          onClick={() => setModoVista('resumen')}
        >
          <FaChartPie /> Resumen
        </button>
        <button 
          className="btn btn-success gap-2"
          onClick={() => {
            setMostrarFormulario(true);
            resetFormulario();
          }}
        >
          <FaPlus /> Nueva Cuenta
        </button>
      </div>

      {/* Filtros */}
      {modoVista === 'lista' && (
        <div className="card bg-base-200 shadow-md p-4 mb-6">
          <label className="label">
            <span className="label-text font-semibold">Filtrar por estado:</span>
          </label>
          <select 
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => cambiarFiltroActivo(e.target.value)}
          >
            <option value="todas">Todas</option>
            <option value="activas">Activas</option>
            <option value="inactivas">Inactivas</option>
          </select>
        </div>
      )}

      {/* Formulario Crear/Editar */}
      {mostrarFormulario && (
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">
              {modoEdicion ? 'Editar Cuenta' : 'Nueva Cuenta'}
            </h2>
            <form onSubmit={modoEdicion ? handleActualizar : handleCrear}>
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text">Nombre:</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={handleInputChange}
                  required
                  minLength={2}
                  maxLength={100}
                  className="input input-bordered w-full"
                  placeholder="Ingrese el nombre de la cuenta"
                />
              </div>

              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text">Tipo:</span>
                </label>
                <select
                  name="tipo"
                  value={formulario.tipo}
                  onChange={handleInputChange}
                  required
                  className="select select-bordered w-full"
                >
                  <option value="CORRIENTE">CORRIENTE</option>
                  <option value="AHORROS">AHORROS</option>
                  <option value="CREDITO">CREDITO</option>
                  <option value="EFECTIVO">EFECTIVO</option>
                  <option value="INVERSION">INVERSION</option>
                </select>
              </div>

              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text">Color:</span>
                </label>
                <input
                  type="color"
                  name="color"
                  value={formulario.color}
                  onChange={handleInputChange}
                  className="input input-bordered w-full h-12"
                />
              </div>

              {!modoEdicion && (
                <div className="form-control w-full mb-4">
                  <label className="label">
                    <span className="label-text">Monto Inicial:</span>
                  </label>
                  <input
                    type="number"
                    name="montoInicial"
                    value={formulario.montoInicial}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="input input-bordered w-full"
                    placeholder="0.00"
                  />
                </div>
              )}

              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text">Orden:</span>
                </label>
                <input
                  type="number"
                  name="orden"
                  value={formulario.orden}
                  onChange={handleInputChange}
                  min="0"
                  className="input input-bordered w-full"
                />
              </div>

              {modoEdicion && (
                <div className="form-control mb-4">
                  <label className="label cursor-pointer justify-start gap-3">
                    <input
                      type="checkbox"
                      name="activo"
                      checked={formulario.activo}
                      onChange={(e) => setFormulario(prev => ({
                        ...prev,
                        activo: e.target.checked
                      }))}
                      className="checkbox checkbox-primary"
                    />
                    <span className="label-text">Activo</span>
                  </label>
                </div>
              )}

              <div className="card-actions justify-end gap-2 mt-6">
                <button 
                  type="submit" 
                  disabled={creando || actualizando}
                  className="btn btn-primary"
                >
                  {creando || actualizando ? 'Guardando...' : modoEdicion ? 'Actualizar' : 'Crear'}
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setMostrarFormulario(false);
                    resetFormulario();
                  }}
                  className="btn btn-ghost"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Vista Lista */}
      {modoVista === 'lista' && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Mis Cuentas</h2>
            {cargandoCuentas ? (
              <div className="flex justify-center py-8">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : cuentas?.datos?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Orden</th>
                      <th>Color</th>
                      <th>Nombre</th>
                      <th>Tipo</th>
                      <th>Saldo Actual</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cuentas.datos.map(cuenta => (
                      <tr key={cuenta.id}>
                        <td>{cuenta.orden}</td>
                        <td>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: cuenta.color,
                            borderRadius: '4px'
                          }} />
                        </td>
                        <td className="font-semibold">{cuenta.nombre}</td>
                        <td>
                          <span className="badge badge-outline">{cuenta.tipo}</span>
                        </td>
                        <td className="font-mono">Q{parseFloat(cuenta.saldoActual).toFixed(2)}</td>
                        <td>
                          <span className={`badge ${cuenta.activo ? 'badge-success' : 'badge-error'}`}>
                            {cuenta.activo ? 'Activa' : 'Inactiva'}
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button 
                              className="btn btn-info btn-sm gap-1"
                              onClick={() => verDetalle(cuenta.id)}
                            >
                              <FaEye /> Ver
                            </button>
                            <button 
                              className="btn btn-warning btn-sm gap-1"
                              onClick={() => {
                                setCuentaSeleccionadaId(cuenta.id);
                                prepararEdicion(cuenta);
                              }}
                            >
                              <FaEdit /> Editar
                            </button>
                            <button 
                              className="btn btn-error btn-sm gap-1"
                              onClick={() => handleEliminar(cuenta.id)}
                              disabled={eliminando}
                            >
                              <FaTrash /> Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="alert alert-info">
                <span>No hay cuentas disponibles</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Vista Resumen */}
      {modoVista === 'resumen' && (
        <div>
          <h2 className="text-3xl font-bold mb-6">Resumen de Cuentas</h2>
          {cargandoResumen ? (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : resumen?.datos ? (
            <div>
              <div className="card bg-base-100 shadow-xl mb-6">
                <div className="card-body">
                  <h3 className="card-title text-xl mb-4">Estadísticas Generales</h3>
                  <div className="stats stats-vertical lg:stats-horizontal shadow">
                    <div className="stat">
                      <div className="stat-title">Total de Cuentas</div>
                      <div className="stat-value">{resumen.datos.resumen.totalCuentas}</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title">Saldo Total</div>
                      <div className="stat-value text-primary">Q{parseFloat(resumen.datos.resumen.saldoTotal).toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl mb-6">
                <div className="card-body">
                  <h3 className="card-title text-xl mb-4">Resumen por Tipo</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(resumen.datos.resumen.porTipo).map(([tipo, datos]) => (
                      <div key={tipo} className="card bg-base-200 shadow">
                        <div className="card-body">
                          <h4 className="card-title text-lg">{tipo}</h4>
                          <p><span className="font-semibold">Cantidad:</span> {datos.cantidad}</p>
                          <p><span className="font-semibold">Saldo:</span> <span className="font-mono">Q{parseFloat(datos.saldo).toFixed(2)}</span></p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-xl mb-4">Detalle de Cuentas</h3>
                  <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Tipo</th>
                          <th>Saldo Actual</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resumen.datos.cuentas.map(cuenta => (
                          <tr key={cuenta.id}>
                            <td className="font-semibold">{cuenta.nombre}</td>
                            <td>
                              <span className="badge badge-outline">{cuenta.tipo}</span>
                            </td>
                            <td className="font-mono">Q{parseFloat(cuenta.saldoActual).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="alert alert-warning">
              <span>No hay datos de resumen</span>
            </div>
          )}
        </div>
      )}

      {/* Vista Detalle */}
      {modoVista === 'detalle' && (
        <div>
          <button 
            className="btn btn-ghost gap-2 mb-4"
            onClick={volverALista}
          >
            <FaArrowLeft /> Volver a Lista
          </button>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Detalle de Cuenta</h2>
              {cargandoCuenta ? (
                <div className="flex justify-center py-8">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : cuenta?.datos ? (
                <div>
                  <div className="flex items-start gap-6 mb-6">
                    <div style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: cuenta.datos.color,
                      borderRadius: '8px'
                    }} />
                    <div>
                      <h3 className="text-3xl font-bold">{cuenta.datos.nombre}</h3>
                      <span className="badge badge-outline mt-2">{cuenta.datos.tipo}</span>
                    </div>
                  </div>

                  <div className="divider"></div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-base-200 p-4 rounded-lg">
                      <p className="text-sm opacity-70">ID</p>
                      <p className="font-mono">{cuenta.datos.id}</p>
                    </div>
                    <div className="bg-base-200 p-4 rounded-lg">
                      <p className="text-sm opacity-70">Monto Inicial</p>
                      <p className="text-xl font-mono">Q{parseFloat(cuenta.datos.montoInicial).toFixed(2)}</p>
                    </div>
                    <div className="bg-base-200 p-4 rounded-lg">
                      <p className="text-sm opacity-70">Saldo Actual</p>
                      <p className="text-xl font-mono text-primary font-bold">Q{parseFloat(cuenta.datos.saldoActual).toFixed(2)}</p>
                    </div>
                    <div className="bg-base-200 p-4 rounded-lg">
                      <p className="text-sm opacity-70">Orden</p>
                      <p className="text-xl">{cuenta.datos.orden}</p>
                    </div>
                    <div className="bg-base-200 p-4 rounded-lg">
                      <p className="text-sm opacity-70">Estado</p>
                      <span className={`badge ${cuenta.datos.activo ? 'badge-success' : 'badge-error'} badge-lg`}>
                        {cuenta.datos.activo ? 'Activa' : 'Inactiva'}
                      </span>
                    </div>
                    <div className="bg-base-200 p-4 rounded-lg">
                      <p className="text-sm opacity-70">Creado</p>
                      <p className="text-sm">{new Date(cuenta.datos.creadoEn).toLocaleString()}</p>
                    </div>
                    <div className="bg-base-200 p-4 rounded-lg col-span-1 md:col-span-2">
                      <p className="text-sm opacity-70">Última Actualización</p>
                      <p className="text-sm">{new Date(cuenta.datos.actualizadoEn).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="card-actions justify-end gap-2">
                    <button 
                      className="btn btn-warning gap-2"
                      onClick={() => prepararEdicion(cuenta.datos)}
                    >
                      <FaEdit /> Editar
                    </button>
                    <button 
                      className="btn btn-error gap-2"
                      onClick={() => handleEliminar(cuenta.datos.id)}
                    >
                      <FaTrash /> Eliminar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="alert alert-error">
                  <span>Cuenta no encontrada</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cuentas;