import { useState, useEffect } from 'react';
import { useTransacciones } from '../../hooks/useTransacciones';
import { useCuentas } from '../../hooks/useCuentas';
import { useCategorias } from '../../hooks/useCategorias';
import { useTipoPago } from '../../hooks/useTipoPago';
import { useEtiquetas } from '../../hooks/useEtiquetas';
import { format, formatISO, parseISO } from 'date-fns';

import { 
  FiPlus, FiEdit2, FiTrash2, FiEye, FiFilter, FiRefreshCw, 
  FiChevronLeft, FiChevronRight, FiCalendar, FiDollarSign,
  FiTrendingUp, FiTrendingDown, FiTag, FiX, FiCheck,
  FiSearch, FiBarChart, FiCreditCard
} from 'react-icons/fi';

import { 
  FaArrowLeft, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaFileAlt, 
  FaCreditCard, 
  FaTag, 
  FaPlus, 
  FaTimes,
  FaCheckCircle,
  FaTimesCircle,
  FaChartBar
} from 'react-icons/fa';

const Transacciones = () => {

  const { cuentas, obtenerTodas: obtenerTodasCuentas } = useCuentas();
  const { categoriasUsuario, obtenerCategoriasUsuario, tiposMovimiento, obtenerTiposMovimiento } = useCategorias();
  const { tiposPago, obtenerTiposPago } = useTipoPago();
  const { etiquetas, obtenerTodas: obtenerTodasEtiquetas } = useEtiquetas();

  useEffect(() => {
    obtenerTodasCuentas({ activo: true }); // Con filtro
    obtenerTiposMovimiento();
    obtenerCategoriasUsuario();
    obtenerTiposPago();
    obtenerTodasEtiquetas();
  }, []);

  const listaCuentas = cuentas?.datos || [];
  const listaTiposMovimiento = tiposMovimiento?.datos || [];
  const listaCategoriasUsuario = categoriasUsuario?.datos || [];
  const listaTiposPago = tiposPago || [];
  const listaEtiquetas = etiquetas?.datos || [];

  console.log(listaEtiquetas);
  

  const {
    // Datos
    transacciones,
    transaccion,
    resumen,
    transaccionesPorCuenta,

    // Estados de carga
    cargandoTransacciones,
    cargandoTransaccion,
    creandoTransaccion,
    actualizandoTransaccion,
    eliminandoTransaccion,
    cargandoResumen,
    cargandoPorCuenta,
    confirmandoTransaccion,
    desconfirmandoTransaccion,
    agregandoEtiquetas,
    removiendoEtiquetas,

    // Métodos
    crear,
    obtenerTodas,
    obtenerPorId,
    actualizar,
    eliminar,
    obtenerResumen,
    obtenerPorCuenta,
    confirmar,
    desconfirmar,
    agregarEtiquetas,
    removerEtiquetas
  } = useTransacciones();

  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // Estados locales para formularios y filtros
  const [vistaActual, setVistaActual] = useState('lista'); // 'lista', 'crear', 'editar', 'detalle', 'resumen'
  const [transaccionSeleccionada, setTransaccionSeleccionada] = useState(null);
  const [filtros, setFiltros] = useState({
    limite: 50,
    pagina: 1,
    fechaInicio: '',
    fechaFin: '',
    cuentaId: '',
    tipoMovimientoId: '',
    confirmada: 'true'
  });
  const [datosFormulario, setDatosFormulario] = useState({
    monto: '',
    descripcion: '',
    fecha: new Date().toISOString(),
    cuentaId: '',
    tipoMovimientoId: '',
    tipoPagoId: '',
    usuarioCategoriaId: '',
    confirmada: true,
    notas: ''
  });
  const [filtrosResumen, setFiltrosResumen] = useState({
    fechaInicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    fechaFin: new Date().toISOString().split('T')[0]
  });
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState([]);

  // Cargar transacciones al montar el componente
  useEffect(() => {
    obtenerTodas(filtros);
  }, []);

  // Manejar cambios en formulario
  const manejarCambioFormulario = (campo, valor) => {
    setDatosFormulario(prev => ({ ...prev, [campo]: valor }));
  };

  // Manejar cambios en filtros
  const manejarCambioFiltro = (campo, valor) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  // Aplicar filtros
  const aplicarFiltros = () => {
    obtenerTodas(filtros);
  };

  // Limpiar filtros
  const limpiarFiltros = () => {
    const filtrosLimpios = {
      limite: 50,
      pagina: 1,
      fechaInicio: '',
      fechaFin: '',
      cuentaId: '',
      tipoMovimientoId: '',
      confirmada: 'true'
    };
    setFiltros(filtrosLimpios);
    obtenerTodas(filtrosLimpios);
  };

  // Crear nueva transacción
  const manejarCrear = async () => {
    try {
      await crear(datosFormulario);
      setVistaActual('lista');
      limpiarFormulario();
      obtenerTodas(filtros); // Refrescar lista
    } catch (error) {
      console.error('Error al crear transacción:', error);
    }
  };

  // Actualizar transacción
  const manejarActualizar = async () => {
    try {
      await actualizar(transaccionSeleccionada.id, datosFormulario);
      setVistaActual('lista');
      limpiarFormulario();
      obtenerTodas(filtros); // Refrescar lista
    } catch (error) {
      console.error('Error al actualizar transacción:', error);
    }
  };

  // Eliminar transacción
  const manejarEliminar = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta transacción?')) {
      try {
        await eliminar(id);
        obtenerTodas(filtros); // Refrescar lista
      } catch (error) {
        console.error('Error al eliminar transacción:', error);
      }
    }
  };

  // Ver detalle de transacción
  const verDetalle = async (id) => {
    try {
      await obtenerPorId(id);
      setVistaActual('detalle');
    } catch (error) {
      console.error('Error al obtener transacción:', error);
    }
  };

  // Editar transacción
  const editarTransaccion = (transaccionData) => {
    setTransaccionSeleccionada(transaccionData);
    setDatosFormulario({
      monto: transaccionData.monto,
      descripcion: transaccionData.descripcion || '',
      fecha: transaccionData.fecha,
      cuentaId: transaccionData.cuenta.id,
      tipoMovimientoId: transaccionData.tipomovimiento.id,
      tipoPagoId: transaccionData.tipopago?.id || '',
      usuarioCategoriaId: transaccionData.usuariocategoria.id,
      confirmada: transaccionData.confirmada,
      notas: transaccionData.notas || ''
    });
    setVistaActual('editar');
  };

  // Confirmar/Desconfirmar transacción
  const manejarCambioConfirmacion = async (id, confirmar) => {
    try {
      if (confirmar) {
        await confirmar(id);
      } else {
        await desconfirmar(id);
      }
      obtenerTodas(filtros); // Refrescar lista
    } catch (error) {
      console.error('Error al cambiar confirmación:', error);
    }
  };

  // Obtener resumen
  const manejarObtenerResumen = () => {
    if (filtrosResumen.fechaInicio && filtrosResumen.fechaFin) {
      obtenerResumen(filtrosResumen.fechaInicio, filtrosResumen.fechaFin);
      setVistaActual('resumen');
    }
  };

  // Obtener por cuenta
  const manejarObtenerPorCuenta = (cuentaId) => {
    obtenerPorCuenta(cuentaId, { limite: 20, pagina: 1 });
  };

  // Manejar etiquetas
  const manejarAgregarEtiquetas = async (transaccionId) => {
    if (etiquetasSeleccionadas.length > 0) {
      try {
        await agregarEtiquetas(transaccionId, etiquetasSeleccionadas);
        obtenerTodas(filtros); // Refrescar lista
        obtenerPorId(transaccionId) //Refrescar Unidad
        setEtiquetasSeleccionadas([]);
      } catch (error) {
        console.error('Error al agregar etiquetas:', error);
      }
    }
  };

  const manejarRemoverEtiquetas = async (transaccionId, etiquetaIds) => {
    try {
      await removerEtiquetas(transaccionId, etiquetaIds);
      obtenerTodas(filtros); // Refrescar lista
      obtenerPorId(transaccionId); //Refrescar Unidad
    } catch (error) {
      console.error('Error al remover etiquetas:', error);
    }
  };

  // Limpiar formulario
  const limpiarFormulario = () => {
    setDatosFormulario({
      monto: '',
      descripcion: '',
      fecha: new Date().toISOString(),
      cuentaId: '',
      tipoMovimientoId: '',
      tipoPagoId: '',
      usuarioCategoriaId: '',
      confirmada: true,
      notas: ''
    });
    setTransaccionSeleccionada(null);
  };

  // Renderizado de vista de lista
  const renderLista = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <FiCreditCard className="text-2xl text-primary" />
          <h1 className="text-3xl font-bold text-base-content">Transacciones</h1>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => setVistaActual('crear')}
          >
            <FiPlus className="w-4 h-4" />
            Nueva
          </button>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setVistaActual('resumen')}
          >
            <FiBarChart className="w-4 h-4" />
            Resumen
          </button>
          <button 
            className="btn btn-ghost btn-sm"
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
          >
            <FiFilter className="w-4 h-4" />
            Filtros
          </button>
        </div>
      </div>

      {/* Filtros */}
      {mostrarFiltros && (
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h3 className="card-title text-lg mb-4">
              <FiSearch className="w-5 h-5" />
              Filtros de Búsqueda
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Límite</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered input-sm"
                  placeholder="50"
                  value={filtros.limite}
                  onChange={(e) => manejarCambioFiltro('limite', parseInt(e.target.value) || '')}
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Página</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered input-sm"
                  placeholder="1"
                  value={filtros.pagina}
                  onChange={(e) => manejarCambioFiltro('pagina', parseInt(e.target.value) || '')}
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Fecha inicio</span>
                </label>
                <input
                  type="datetime-local"
                  className="input input-bordered input-sm"
                  value={filtros.fechaInicio}
                  onChange={(e) => manejarCambioFiltro('fechaInicio', e.target.value)}
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Fecha fin</span>
                </label>
                <input
                  type="datetime-local"
                  className="input input-bordered input-sm"
                  value={filtros.fechaFin}
                  onChange={(e) => manejarCambioFiltro('fechaFin', e.target.value)}
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Cuenta</span>
                </label>
                <select 
                  className="select select-bordered w-full mt-2"
                  value={filtros.cuentaId}
                  onChange={(e) => manejarCambioFiltro('cuentaId', e.target.value)}
                >
                  <option value="">Todas las cuentas</option>
                  {listaCuentas.map(cuenta => (
                    <option key={cuenta.id} value={cuenta.id}>
                      {cuenta.nombre} ({cuenta.tipo})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tipo Movimiento</span>
                </label>
                <select
                  className="select select-bordered w-full mt-2"
                  value={filtros.tipoMovimientoId}
                  onChange={(e) => manejarCambioFiltro('tipoMovimientoId', e.target.value)}
                >
                  <option value="">Todos los tipos</option>
                  {listaTiposMovimiento.map(tipo => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Estado</span>
                </label>
                <select
                  className="select select-bordered select-sm"
                  value={filtros.confirmada}
                  onChange={(e) => manejarCambioFiltro('confirmada', e.target.value === '' ? '' : e.target.value === 'true')}
                >
                  <option value="true">Confirmadas</option>
                  <option value="false">No confirmadas</option>
                </select>
              </div>
              
              <div className="form-control justify-end">
                <div className="flex gap-2">
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={aplicarFiltros}
                  >
                    <FiSearch className="w-4 h-4" />
                    Buscar
                  </button>
                  <button 
                    className="btn btn-ghost btn-sm"
                    onClick={limpiarFiltros}
                  >
                    <FiRefreshCw className="w-4 h-4" />
                    Limpiar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {cargandoTransacciones && (
        <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}
      
      {/* Lista de transacciones */}
      {transacciones?.datos?.transacciones && (
        <div className="space-y-4">
          {/* Stats */}
          <div className="stats stats-horizontal shadow bg-base-200 w-full">
            <div className="stat">
              <div className="stat-title">Total</div>
              <div className="stat-value text-primary">{transacciones.datos.total}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Página</div>
              <div className="stat-value text-secondary">{transacciones.datos.pagina}</div>
              <div className="stat-desc">de {transacciones.datos.totalPaginas}</div>
            </div>
          </div>
          
          {/* Tabla para desktop */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <table className="table table-zebra bg-base-100">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Monto</th>
                    <th>Descripción</th>
                    <th>Fecha</th>
                    <th>Cuenta</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {transacciones.datos.transacciones.map(txn => (
                    <tr key={txn.id} className="hover">
                      <td className="font-mono text-sm">{txn.id}</td>
                      <td>
                        <div className="flex items-center gap-1">
                          <FiDollarSign className="w-4 h-4 text-success" />
                          <span className="font-semibold">{txn.monto}</span>
                        </div>
                      </td>
                      <td className="max-w-xs truncate">{txn.descripcion}</td>
                      <td className="text-sm">{new Date(txn.fecha).toLocaleDateString()}</td>
                      <td>
                        <div className="badge badge-outline">{txn.cuenta?.nombre}</div>
                      </td>
                      <td>
                        <div className={`badge ${txn.tipomovimiento?.nombre === 'Ingreso' ? 'badge-success' : 'badge-error'}`}>
                          {txn.tipomovimiento?.nombre === 'Ingreso' ? <FiTrendingUp className="w-3 h-3 mr-1" /> : <FiTrendingDown className="w-3 h-3 mr-1" />}
                          {txn.tipomovimiento?.nombre}
                        </div>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-success checkbox-sm"
                          checked={txn.confirmada}
                          onChange={(e) => manejarCambioConfirmacion(txn.id, e.target.checked)}
                          disabled={confirmandoTransaccion || desconfirmandoTransaccion}
                        />
                      </td>
                      <td>
                        <div className="flex gap-1">
                          <button 
                            className="btn btn-ghost btn-xs"
                            onClick={() => verDetalle(txn.id)}
                            title="Ver detalle"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button 
                            className="btn btn-ghost btn-xs"
                            onClick={() => editarTransaccion(txn)}
                            title="Editar"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button 
                            className="btn btn-ghost btn-xs text-error"
                            onClick={() => manejarEliminar(txn.id)}
                            disabled={eliminandoTransaccion}
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
          </div>

          {/* Cards para mobile */}
          <div className="lg:hidden space-y-3">
            {transacciones.datos.transacciones.map(txn => (
              <div key={txn.id} className="card bg-base-100 shadow-sm border">
                <div className="card-body p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FiDollarSign className="w-5 h-5 text-success" />
                        <span className="text-xl font-bold">{txn.monto}</span>
                        <div className={`badge badge-sm ${txn.tipomovimiento?.nombre === 'Ingreso' ? 'badge-success' : 'badge-error'}`}>
                          {txn.tipomovimiento?.nombre}
                        </div>
                      </div>
                      
                      <p className="text-sm text-base-content/70 mb-1">{txn.descripcion}</p>
                      <p className="text-xs text-base-content/50">{new Date(txn.fecha).toLocaleDateString()}</p>
                      <div className="badge badge-outline badge-sm mt-1">{txn.cuenta?.nombre}</div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-success checkbox-sm"
                        checked={txn.confirmada}
                        onChange={(e) => manejarCambioConfirmacion(txn.id, e.target.checked)}
                      />
                      
                      <div className="flex gap-1">
                        <button className="btn btn-ghost btn-xs" onClick={() => verDetalle(txn.id)}>
                          <FiEye className="w-4 h-4" />
                        </button>
                        <button className="btn btn-ghost btn-xs" onClick={() => editarTransaccion(txn)}>
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button className="btn btn-ghost btn-xs text-error" onClick={() => manejarEliminar(txn.id)}>
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación */}
          <div className="flex justify-center">
            <div className="join">
              <button 
                className="join-item btn btn-sm"
                onClick={() => {
                  if (filtros.pagina > 1) {
                    manejarCambioFiltro('pagina', filtros.pagina - 1);
                    aplicarFiltros();
                  }
                }}
                disabled={filtros.pagina <= 1}
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>
              <button className="join-item btn btn-sm btn-active">
                {filtros.pagina}
              </button>
              <button 
                className="join-item btn btn-sm"
                onClick={() => {
                  if (filtros.pagina < transacciones.datos.totalPaginas) {
                    manejarCambioFiltro('pagina', filtros.pagina + 1);
                    aplicarFiltros();
                  }
                }}
                disabled={filtros.pagina >= transacciones.datos.totalPaginas}
              >
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Renderizado de formulario (crear/editar)
  const renderFormulario = () => (
    <div className="max-w-2xl mx-auto">
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex items-center justify-between mb-6">
            <h2 className="card-title text-2xl">
              {vistaActual === 'crear' ? (
                <>
                  <FiPlus className="w-6 h-6 text-primary" />
                  Nueva Transacción
                </>
              ) : (
                <>
                  <FiEdit2 className="w-6 h-6 text-secondary" />
                  Editar Transacción
                </>
              )}
            </h2>
            <button 
              className="btn btn-ghost btn-sm"
              onClick={() => { setVistaActual('lista'); limpiarFormulario(); }}
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
          
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Monto *</span>
                </label>
                <label className="input-group">
                  <span><FiDollarSign className="w-4 h-4" /></span>
                  <input
                    type="number"
                    step="0.01"
                    className="input input-bordered flex-1"
                    placeholder="0.00"
                    value={datosFormulario.monto}
                    onChange={(e) => manejarCambioFormulario('monto', e.target.value)}
                    required
                  />
                </label>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Fecha y Hora</span>
                </label>
                <label className="input-group">
                  <span><FiCalendar className="w-4 h-4" /></span>
                  <input
                    type="datetime-local"
                    className="input input-bordered flex-1"
                    // MOSTRAR: Convertir de ISO a formato datetime-local (sin zona horaria)
                    value={
                      datosFormulario.fecha 
                        ? format(new Date(datosFormulario.fecha), "yyyy-MM-dd'T'HH:mm")
                        : ''
                    }
                    // GUARDAR: Convertir de datetime-local a Date object
                    onChange={(e) => {
                      const fechaLocal = new Date(e.target.value);
                      // Guardar como Date object en el estado
                      manejarCambioFormulario('fecha', fechaLocal);
                    }}
                  />
                </label>
              </div>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Descripción</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Descripción de la transacción"
                value={datosFormulario.descripcion}
                onChange={(e) => manejarCambioFormulario('descripcion', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Cuenta *</span>
                </label>
                <select
                  id="cuentaId"
                  name="cuentaId"
                  value={datosFormulario.cuentaId}
                  onChange={(e) => manejarCambioFormulario('cuentaId', parseInt(e.target.value) || '')}
                  required
                  className="select select-bordered w-full mt-2"
                >
                  <option value="">-- Seleccione una cuenta --</option>
                  {listaCuentas.map((cuenta) => (
                    <option key={cuenta.id} value={cuenta.id}>
                      {cuenta.nombre} - {cuenta.tipoCuenta} 
                      {cuenta.saldo && ` (${cuenta.moneda} ${cuenta.saldo})`}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tipo Movimiento *</span>
                </label>
                {/* Cambio a Select */}
                <select
                  id="tipoMovimientoId"
                  name="tipoMovimientoId"
                  value={datosFormulario.tipoMovimientoId}
                  onChange={(e) => manejarCambioFormulario('tipoMovimientoId', parseInt(e.target.value) || '')}
                  required
                  className="select select-bordered w-full mt-2"
                >
                  <option value="">-- Seleccione un tipo de movimiento --</option>
                  {listaTiposMovimiento.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tipo Pago</span>
                </label>
                <select
                  id="tipoPagoId"
                  name="tipoPagoId"
                  value={datosFormulario.tipoPagoId}
                  onChange={(e) => manejarCambioFormulario('tipoPagoId', parseInt(e.target.value) || '')}
                  className="select select-bordered w-full mt-2"
                >
                  <option value="">-- Seleccione un tipo de pago --</option>
                  {listaTiposPago.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Categoría *</span>
              </label>
              <select
                id="usuarioCategoriaId"
                name="usuarioCategoriaId"
                value={datosFormulario.usuarioCategoriaId}
                onChange={(e) => manejarCambioFormulario('usuarioCategoriaId', parseInt(e.target.value) || '')}
                required
                className="select select-bordered w-full mt-2"
              >
                <option value="">-- Seleccione una categoría --</option>
                {listaCategoriasUsuario.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.categoriabase.nombre}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-success"
                  checked={datosFormulario.confirmada}
                  onChange={(e) => manejarCambioFormulario('confirmada', e.target.checked)}
                />
                <span className="label-text">Transacción confirmada</span>
              </label>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Notas</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Notas adicionales..."
                value={datosFormulario.notas}
                onChange={(e) => manejarCambioFormulario('notas', e.target.value)}
              />
            </div>
            
            <div className="card-actions justify-end pt-4">
              <button 
                className="btn btn-ghost"
                onClick={() => { setVistaActual('lista'); limpiarFormulario(); }}
              >
                Cancelar
              </button>
              <button 
                className={`btn ${vistaActual === 'crear' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={vistaActual === 'crear' ? manejarCrear : manejarActualizar}
                disabled={creandoTransaccion || actualizandoTransaccion}
              >
                {(creandoTransaccion || actualizandoTransaccion) && (
                  <span className="loading loading-spinner loading-sm"></span>
                )}
                <FiCheck className="w-4 h-4" />
                {vistaActual === 'crear' ? 'Crear' : 'Actualizar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // Renderizado de detalle
  const renderDetalle = () => (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-6">
              <FaFileAlt className="text-2xl text-primary" />
              <h2 className="card-title text-2xl">Detalle de Transacción</h2>
            </div>
            
            {cargandoTransaccion && (
              <div className="flex justify-center items-center py-8">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            )}
            
            {transaccion?.datos && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">ID</span>
                    </label>
                    <div className="input input-bordered bg-base-200 flex items-center">
                      {transaccion.datos.id}
                    </div>
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold flex items-center gap-2">
                        <FaMoneyBillWave /> Monto
                      </span>
                    </label>
                    <div className="input input-bordered bg-base-200 flex items-center">
                      {transaccion.datos.monto}
                    </div>
                  </div>
                  
                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text font-semibold">Descripción</span>
                    </label>
                    <div className="textarea textarea-bordered bg-base-200 min-h-[60px] flex items-center">
                      {transaccion.datos.descripcion}
                    </div>
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold flex items-center gap-2">
                        <FaCalendarAlt /> Fecha
                      </span>
                    </label>
                    <div className="input input-bordered bg-base-200 flex items-center">
                      {new Date(transaccion.datos.fecha).toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Cuenta</span>
                    </label>
                    <div className="input input-bordered bg-base-200 flex items-center">
                      {transaccion.datos.cuenta?.nombre}
                    </div>
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Tipo Movimiento</span>
                    </label>
                    <div className="input input-bordered bg-base-200 flex items-center">
                      {transaccion.datos.tipomovimiento?.nombre}
                    </div>
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold flex items-center gap-2">
                        <FaCreditCard /> Tipo Pago
                      </span>
                    </label>
                    <div className="input input-bordered bg-base-200 flex items-center">
                      {transaccion.datos.tipopago?.nombre || 'N/A'}
                    </div>
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Categoría</span>
                    </label>
                    <div className="input input-bordered bg-base-200 flex items-center">
                      {transaccion.datos.usuariocategoria?.categoriabase?.nombre}
                    </div>
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Confirmada</span>
                    </label>
                    <div className="input input-bordered bg-base-200 flex items-center gap-2">
                      {transaccion.datos.confirmada ? (
                        <>
                          <FaCheckCircle className="text-success" />
                          <span>Sí</span>
                        </>
                      ) : (
                        <>
                          <FaTimesCircle className="text-error" />
                          <span>No</span>
                        </>
                      )}
                    </div>
                  </div>
                    
                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text font-semibold">Notas</span>
                    </label>
                    <div className="textarea textarea-bordered bg-base-200 min-h-[80px] flex items-start pt-3">
                      {transaccion.datos.notas || 'N/A'}
                    </div>
                  </div>
                </div>
                    
                {/* Etiquetas */}
                <div className="divider"></div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FaTag className="text-primary" />
                    Etiquetas
                  </h3>
                    
                  <div className="flex flex-wrap gap-2 mb-4">
                    {transaccion.datos.etiquetaontransaccion?.map(item => (
                      <div key={item.etiqueta.id} className="badge badge-primary badge-lg gap-2">
                        <FaTag />
                        {item.etiqueta.nombre}
                        <button 
                          className="btn btn-ghost btn-xs hover:btn-error"
                          onClick={() => manejarRemoverEtiquetas(transaccion.datos.id, [item.etiqueta.id])}
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Agregar etiquetas */}
                  <div className="card bg-base-200">
                    <div className="card-body p-4">
                      <h4 className="font-medium mb-3">Agregar Etiquetas</h4>
                      <div className="flex gap-2">
                        <select
                          id="etiquetaId"
                          name="etiquetaId"
                          value={etiquetasSeleccionadas[0] || ''}
                          onChange={(e) => {
                            const id = parseInt(e.target.value) || '';
                            setEtiquetasSeleccionadas(id ? [id] : []);
                          }}
                          className="select select-bordered w-full mt-2"
                        >
                          <option value="">-- Seleccione una etiqueta --</option>
                          {listaEtiquetas.map((etiqueta) => (
                            <option key={etiqueta.id} value={etiqueta.id}
                            disabled={agregandoEtiquetas || removiendoEtiquetas}
                            >
                              {etiqueta.nombre} 
                            </option>
                          ))}
                        </select>
                        <button 
                          className="btn btn-primary"
                          onClick={() => manejarAgregarEtiquetas(transaccion.datos.id)}
                        >
                          <FaPlus />
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="card-actions justify-start mt-6">
              <button 
                className="btn btn-ghost gap-2"
                onClick={() => setVistaActual('lista')}
              >
                <FaArrowLeft />
                Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Renderizado de resumen
  const renderResumen = () => (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-6">
              <FaChartBar className="text-2xl text-primary" />
              <h2 className="card-title text-2xl">Resumen de Transacciones</h2>
            </div>
            
            <div className="card bg-base-200 mb-6">
              <div className="card-body p-4">
                <h3 className="font-medium mb-4">Filtros de Fecha</h3>
                <div className="flex gap-4 flex-wrap">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Fecha Inicio</span>
                    </label>
                    <input
                      type="date"
                      className="input input-bordered"
                      value={filtrosResumen.fechaInicio}
                      onChange={(e) => setFiltrosResumen(prev => ({ ...prev, fechaInicio: e.target.value }))}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Fecha Fin</span>
                    </label>
                    <input
                      type="date"
                      className="input input-bordered"
                      value={filtrosResumen.fechaFin}
                      onChange={(e) => setFiltrosResumen(prev => ({ ...prev, fechaFin: e.target.value }))}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text opacity-0">Action</span>
                    </label>
                    <button 
                      className="btn btn-primary"
                      onClick={manejarObtenerResumen}
                    >
                      <FaChartBar />
                      Obtener Resumen
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {cargandoResumen && (
              <div className="flex justify-center items-center py-8">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            )}
            
            {resumen?.datos && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {resumen.datos.map(item => (
                  <div key={item.tipoMovimiento.id} className="card bg-base-200 border border-base-300">
                    <div className="card-body">
                      <h3 className="card-title text-lg flex items-center gap-2">
                        <FaMoneyBillWave className="text-primary" />
                        {item.tipoMovimiento.nombre}
                      </h3>
                      <div className="space-y-2">
                        <div className="stat">
                          <div className="stat-title">Total Monto</div>
                          <div className="stat-value text-2xl text-primary">{item.totalMonto}</div>
                        </div>
                        <div className="stat">
                          <div className="stat-title">Total Transacciones</div>
                          <div className="stat-value text-xl text-secondary">{item.totalTransacciones}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="card-actions justify-start">
              <button 
                className="btn btn-ghost gap-2"
                onClick={() => setVistaActual('lista')}
              >
                <FaArrowLeft />
                Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Renderizado principal
  return (
    <div>
      {vistaActual === 'lista' && renderLista()}
      {(vistaActual === 'crear' || vistaActual === 'editar') && renderFormulario()}
      {vistaActual === 'detalle' && renderDetalle()}
      {vistaActual === 'resumen' && renderResumen()}
    </div>
  );
};

export default Transacciones;