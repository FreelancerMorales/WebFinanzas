import { useState, useEffect } from 'react';
import { useReportes } from '../../hooks/useReportes';

import { 
  FaWallet, 
  FaChartLine, 
  FaTags, 
  FaCalendarAlt, 
  FaBalanceScale,
  FaArrowUp,
  FaArrowDown,
  FaMoneyBillWave,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';

import { 
  FaFileAlt, 
  FaCalendarWeek, 
  FaDatabase,
  FaPiggyBank,
  FaChartPie,
  FaTrashAlt,
  FaFilter,
  FaPercentage,
  FaHashtag
} from 'react-icons/fa';

const Reportes = () => {
  const [fechaInicio, setFechaInicio] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [fechaFin, setFechaFin] = useState(new Date());
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('mes-actual');

  const formatFecha = (fechaISO) => {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(new Date(fechaISO));
  };

  const {
    // Datos
    resumenGeneral,
    gastosPorCategoria,
    ingresosPorCategoria,
    movimientosPorCuenta,
    tendenciaMensual,
    analisisEtiquetas,
    comparativaPeriodos,
    estadoCuentas,
    topTransacciones,

    // Loading states
    loadingResumen,
    loadingGastos,
    loadingIngresos,
    loadingMovimientos,
    loadingTendencia,
    loadingEtiquetas,
    loadingComparativa,
    loadingEstado,
    loadingTop,
    isLoadingAnyReport,

    // Funciones
    obtenerResumenGeneral,
    obtenerGastosPorCategoria,
    obtenerIngresosPorCategoria,
    obtenerMovimientosPorCuenta,
    obtenerTendenciaMensual,
    obtenerAnalisisEtiquetas,
    obtenerComparativaPeriodos,
    obtenerTopTransacciones,
    obtenerReporteMensual,
    obtenerReporteAnual,
    compararMeses,
    resetTodosLosReportes
  } = useReportes();

  // Manejar cambio de período
  const handlePeriodoChange = (periodo) => {
    setPeriodoSeleccionado(periodo);
    const hoy = new Date();
    
    switch (periodo) {
      case 'mes-actual':
        setFechaInicio(new Date(hoy.getFullYear(), hoy.getMonth(), 1));
        setFechaFin(new Date());
        break;
      case 'mes-anterior':
        const mesAnterior = hoy.getMonth() === 0 ? 11 : hoy.getMonth() - 1;
        const añoAnterior = hoy.getMonth() === 0 ? hoy.getFullYear() - 1 : hoy.getFullYear();
        setFechaInicio(new Date(añoAnterior, mesAnterior, 1));
        setFechaFin(new Date(añoAnterior, mesAnterior + 1, 0));
        break;
      case 'ano-actual':
        setFechaInicio(new Date(hoy.getFullYear(), 0, 1));
        setFechaFin(new Date());
        break;
    }
  };

  // Cargar reportes cuando cambien las fechas
  useEffect(() => {
    if (fechaInicio && fechaFin) {
      cargarReportesBasicos();
    }
  }, [fechaInicio, fechaFin]);

  const cargarReportesBasicos = async () => {
    try {
      await Promise.all([
        obtenerResumenGeneral(fechaInicio, fechaFin),
        obtenerGastosPorCategoria(fechaInicio, fechaFin),
        obtenerIngresosPorCategoria(fechaInicio, fechaFin),
        obtenerMovimientosPorCuenta(fechaInicio, fechaFin),
        obtenerTopTransacciones(fechaInicio, fechaFin, 5, 2) // Top 5 gastos
      ]);
    } catch (error) {
      console.error('Error al cargar reportes básicos:', error);
    }
  };

  const cargarTendenciaMensual = async () => {
    try {
      // Para tendencia mensual, usar un rango más amplio
      const inicioTendencia = new Date(fechaFin.getFullYear() - 1, fechaFin.getMonth(), 1);
      await obtenerTendenciaMensual(inicioTendencia, fechaFin);
    } catch (error) {
      console.error('Error al cargar tendencia mensual:', error);
    }
  };

  const cargarAnalisisEtiquetas = async () => {
    try {
      await obtenerAnalisisEtiquetas(fechaInicio, fechaFin);
    } catch (error) {
      console.error('Error al cargar análisis de etiquetas:', error);
    }
  };

  const cargarComparativa = async () => {
    try {
      const hoy = new Date();
      const mesActual = hoy.getMonth() + 1;
      const añoActual = hoy.getFullYear();
      const mesAnterior = mesActual === 1 ? 12 : mesActual - 1;
      const añoAnterior = mesActual === 1 ? añoActual - 1 : añoActual;
      
      await compararMeses(mesAnterior, añoAnterior, mesActual, añoActual);
    } catch (error) {
      console.error('Error al cargar comparativa:', error);
    }
  };

  return (
    <div>
<div className="min-h-screen bg-base-100 p-6">
  <div className="max-w-7xl mx-auto">
    
    <div className="hero bg-base-200 rounded-lg mb-8">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-primary">
            <FaFileAlt className="inline mr-3" />
            Reportes Financieros
          </h1>
        </div>
      </div>
    </div>

    {/* Control de Período */}
    <div className="card bg-base-200 shadow-xl mb-6">
      <div className="card-body">
        <h3 className="card-title text-xl mb-4">
          <FaCalendarWeek className="text-accent" />
          Período de Consulta
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Período Predefinido</span>
            </label>
            <select 
              className="select select-bordered" 
              value={periodoSeleccionado} 
              onChange={(e) => handlePeriodoChange(e.target.value)}
            >
              <option value="mes-actual">Mes Actual</option>
              <option value="mes-anterior">Mes Anterior</option>
              <option value="ano-actual">Año Actual</option>
            </select>
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Fecha Inicio</span>
            </label>
            <input 
              type="date" 
              className="input input-bordered"
              value={fechaInicio.toISOString().split('T')[0]} 
              onChange={(e) => setFechaInicio(new Date(e.target.value))}
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Fecha Fin</span>
            </label>
            <input 
              type="date" 
              className="input input-bordered"
              value={fechaFin.toISOString().split('T')[0]} 
              onChange={(e) => setFechaFin(new Date(e.target.value))}
            />
          </div>
          
          <div className="flex gap-2">
            <button className="btn btn-error btn-sm" onClick={resetTodosLosReportes}>
              <FaTrashAlt />
              Limpiar Reportes
            </button>
          </div>
        </div>
        
        <div className="divider"></div>
        
        <div className="flex items-center justify-center">
          {isLoadingAnyReport ? (
            <div className="flex items-center text-warning">
              <FaSpinner className="animate-spin mr-2" />
              <span>Cargando reportes...</span>
            </div>
          ) : (
            <div className="flex items-center text-success">
              <FaDatabase className="mr-2" />
              <span>Reportes listos</span>
            </div>
          )}
        </div>
      </div>
    </div>
        
    {/* Estado de Cuentas */}
    <div className="card bg-base-200 shadow-xl mb-6">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">
          <FaPiggyBank className="text-success" />
          Estado Actual de Cuentas
        </h2>
        {loadingEstado ? (
          <div className="flex items-center justify-center py-8">
            <FaSpinner className="animate-spin text-success mr-2" />
            <span className="text-base-content/70">Cargando estado de cuentas...</span>
          </div>
        ) : estadoCuentas ? (
          <div>
            <div className="stat bg-primary text-primary-content rounded-lg mb-6">
              <div className="stat-figure text-primary-content/50">
                <FaMoneyBillWave className="text-3xl" />
              </div>
              <div className="stat-title text-primary-content/80">Total Patrimonio</div>
              <div className="stat-value">Q{estadoCuentas.totalPatrimonio?.toFixed(2) || '0.00'}</div>
            </div>
            
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <FaWallet className="mr-2 text-info" />
              Detalle de Cuentas:
            </h4>
            <div className="grid gap-4">
              {estadoCuentas.cuentas?.map(cuenta => (
                <div key={cuenta.id} className="bg-base-300 rounded-lg p-4 border-l-4" 
                     style={{ borderLeftColor: cuenta.color }}>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-lg">{cuenta.nombre}</h5>
                    <div className="flex items-center gap-2">
                      <span className="badge badge-outline">{cuenta.tipo}</span>
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: cuenta.color }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="stat">
                      <div className="stat-title text-sm">Saldo Actual</div>
                      <div className="stat-value text-xl">Q{cuenta.saldoActual}</div>
                    </div>
                    <div className="stat">
                      <div className="stat-figure text-info">
                        <FaPercentage />
                      </div>
                      <div className="stat-title text-sm">Porcentaje</div>
                      <div className="stat-value text-lg">{cuenta.porcentaje.toFixed(2)}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="alert alert-info">
            <FaPiggyBank />
            <span>No hay datos de cuentas</span>
          </div>
        )}
      </div>
    </div>
      
    {/* Resumen General */}
    <div className="card bg-base-200 shadow-xl mb-6">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">
          <FaChartPie className="text-info" />
          Resumen General
        </h2>
        {loadingResumen ? (
          <div className="flex items-center justify-center py-8">
            <FaSpinner className="animate-spin text-info mr-2" />
            <span className="text-base-content/70">Cargando resumen...</span>
          </div>
        ) : resumenGeneral ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="stat bg-success text-success-content rounded-lg">
              <div className="stat-figure text-success-content/50">
                <FaArrowUp className="text-2xl" />
              </div>
              <div className="stat-title text-success-content/80">Total Ingresos</div>
              <div className="stat-value">Q{resumenGeneral.totalIngresos || '0.00'}</div>
              <div className="stat-desc text-success-content/70">{resumenGeneral.cantidadIngresos || 0} transacciones</div>
            </div>
            {
              console.log("resumenGeneral: ", resumenGeneral)
            }
        
            <div className="stat bg-error text-error-content rounded-lg">
              <div className="stat-figure text-error-content/50">
                <FaArrowDown className="text-2xl" />
              </div>
              <div className="stat-title text-error-content/80">Total Gastos</div>
              <div className="stat-value">Q{resumenGeneral.totalGastos || '0.00'}</div>
              <div className="stat-desc text-error-content/70">{resumenGeneral.cantidadGastos || 0} transacciones</div>
            </div>
        
            <div className="stat bg-info text-info-content rounded-lg">
              <div className="stat-figure text-info-content/50">
                <FaMoneyBillWave className="text-2xl" />
              </div>
              <div className="stat-title text-info-content/80">Balance Neto</div>
              <div className="stat-value">Q{resumenGeneral.balance?.toFixed(2) || '0.00'}</div>
              <div className="stat-desc text-info-content/70">
                <FaHashtag className="inline mr-1" />
                {resumenGeneral.totalTransacciones || 0} total
              </div>
            </div>
          </div>
        ) : (
          <div className="alert alert-info">
            <FaChartPie />
            <span>No hay datos de resumen</span>
          </div>
        )}
      </div>
    </div>
      
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gastos por Categoría */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">
            <FaArrowDown className="text-error" />
            Gastos por Categoría
          </h2>
          {loadingGastos ? (
            <div className="flex items-center justify-center py-8">
              <FaSpinner className="animate-spin text-error mr-2" />
              <span className="text-base-content/70">Cargando gastos...</span>
            </div>
          ) : gastosPorCategoria?.length > 0 ? (
            <div className="space-y-3">
              {gastosPorCategoria.map(item => (
                <div key={item.categoria.id} className="bg-base-300 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.categoria.icono?.codigo}</span>
                      <h5 className="font-semibold">{item.categoria.nombre}</h5>
                    </div>
                    <div className="w-3 h-3 rounded-full" 
                         style={{ backgroundColor: item.categoria.color?.hex }}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="stat">
                      <div className="stat-title text-xs">Monto Total</div>
                      <div className="stat-value text-error text-lg">Q{item.totalMonto}</div>
                    </div>
                    <div className="badge badge-error badge-outline h-auto text-center">
                      {item.cantidad} transacciones
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info">
              <FaArrowDown />
              <span>No hay gastos por categoría</span>
            </div>
          )}
        </div>
      </div>
        
      {/* Ingresos por Categoría */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">
            <FaArrowUp className="text-success" />
            Ingresos por Categoría
          </h2>
          {loadingIngresos ? (
            <div className="flex items-center justify-center py-8">
              <FaSpinner className="animate-spin text-success mr-2" />
              <span className="text-base-content/70">Cargando ingresos...</span>
            </div>
            ) : ingresosPorCategoria?.length > 0 ? (
            <div className="space-y-3">
              {ingresosPorCategoria.map(item => (
                <div key={item.categoria.id} className="bg-base-300 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.categoria.icono?.codigo}</span>
                      <h5 className="font-semibold">{item.categoria.nombre}</h5>
                    </div>
                    <div className="w-3 h-3 rounded-full" 
                         style={{ backgroundColor: item.categoria.color?.hex }}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="stat">
                      <div className="stat-title text-xs">Monto Total</div>
                      <div className="stat-value text-success text-lg">Q{item.totalMonto?.toFixed(2)}</div>
                    </div>
                    <div className="badge badge-success badge-outline h-auto text-center">
                      {item.cantidad} transacciones
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info">
              <FaArrowUp />
              <span>No hay ingresos por categoría</span>
            </div>
          )}
        </div>
      </div>
    </div>
        
  </div>
</div>

      {/* Movimientos por Cuenta */}
      <div className="card bg-base-200 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">
            <FaWallet className="text-primary" />
            Movimientos por Cuenta
          </h2>
          {loadingMovimientos ? (
            <div className="flex items-center justify-center py-8">
              <FaSpinner className="animate-spin text-primary mr-2" />
              <span className="text-base-content/70">Cargando movimientos...</span>
            </div>
          ) : movimientosPorCuenta?.length > 0 ? (
            <div className="grid gap-4">
              {movimientosPorCuenta.map(item => (
                <div key={item.cuenta.id} className="bg-base-300 rounded-lg p-4 border-l-4" 
                     style={{ borderLeftColor: item.cuenta.color }}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg text-base-content">{item.cuenta.nombre}</h3>
                    <span className="badge badge-outline">{item.cuenta.tipo}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div className="flex items-center">
                      <FaArrowUp className="text-success mr-1" />
                      <span>Ingresos: <span className="font-semibold text-success">Q{item.ingresos?.toFixed(2)}</span></span>
                    </div>
                    <div className="flex items-center">
                      <FaArrowDown className="text-error mr-1" />
                      <span>Gastos: <span className="font-semibold text-error">Q{item.gastos?.toFixed(2)}</span></span>
                    </div>
                    <div className="flex items-center">
                      <FaBalanceScale className="text-info mr-1" />
                      <span>Balance: <span className="font-semibold">Q{item.balance?.toFixed(2)}</span> ({item.cantidad} transacciones)</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-3 h-3 rounded-full inline-block mr-2" style={{ backgroundColor: item.cuenta.color }}></div>
                    <span className="text-xs text-base-content/70">{item.cuenta.color}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info">
              <FaMoneyBillWave />
              <span>No hay movimientos por cuenta</span>
            </div>
          )}
        </div>
      </div>
        
      {/* Top Transacciones */}
      <div className="card bg-base-200 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">
            <FaChartLine className="text-warning" />
            Top 5 Gastos
          </h2>
          {loadingTop ? (
            <div className="flex items-center justify-center py-8">
              <FaSpinner className="animate-spin text-warning mr-2" />
              <span className="text-base-content/70">Cargando top transacciones...</span>
            </div>
          ) : topTransacciones?.length > 0 ? (
            <div className="space-y-4">
              {topTransacciones.map((transaccion, index) => (
                <div key={transaccion.id} className="bg-base-300 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <div className="badge badge-error badge-lg mr-3">#{index + 1}</div>
                      <div>
                        <h3 className="font-bold text-lg text-error">Q{transaccion.monto}</h3>
                        <p className="text-base-content">{transaccion.descripcion}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {transaccion.confirmada ? (
                        <FaCheckCircle className="text-success" />
                      ) : (
                        <FaTimesCircle className="text-error" />
                      )}
                    </div>
                  </div>
                  <div className="divider my-2"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-base-content/70">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1" />
                      <span>Fecha: {new Date(transaccion.fecha).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <FaWallet className="mr-1" />
                      <span>Cuenta: {transaccion.cuenta?.nombre}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">Categoría: {transaccion.usuariocategoria?.categoriabase?.nombre}</span>
                      <span>{transaccion.usuariocategoria?.categoriabase?.icono?.codigo}</span>
                    </div>
                    <div className="flex items-center">
                      <span>Confirmada: </span>
                      <span className={transaccion.confirmada ? 'text-success font-semibold ml-1' : 'text-error font-semibold ml-1'}>
                        {transaccion.confirmada ? 'Sí' : 'No'}
                      </span>
                    </div>
                  </div>
                  {transaccion.etiquetaontransaccion?.length > 0 && (
                    <div className="mt-2">
                      <div className="flex items-center flex-wrap gap-1">
                        <FaTags className="text-info mr-1" />
                        {transaccion.etiquetaontransaccion.map(et => (
                          <span key={et.etiqueta.nombre} className="badge badge-info badge-sm">
                            {et.etiqueta.nombre}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info">
              <FaChartLine />
              <span>No hay top transacciones</span>
            </div>
          )}
        </div>
      </div>
        
      {/* Tendencia Mensual */}
      <div className="card bg-base-200 shadow-xl mb-6">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h2 className="card-title text-2xl">
              <FaCalendarAlt className="text-secondary" />
              Tendencia Mensual
            </h2>
            <button className="btn btn-secondary btn-sm" onClick={cargarTendenciaMensual}>
              <FaChartLine className="mr-1" />
              Cargar Tendencia (Último año)
            </button>
          </div>
          {loadingTendencia ? (
            <div className="flex items-center justify-center py-8">
              <FaSpinner className="animate-spin text-secondary mr-2" />
              <span className="text-base-content/70">Cargando tendencia...</span>
            </div>
          ) : tendenciaMensual?.length > 0 ? (
            <div className="grid gap-4">
              {tendenciaMensual.map(mes => (
                <div key={mes.periodo} className="bg-base-300 rounded-lg p-4">
                  <h3 className="font-bold text-lg text-secondary mb-2">{mes.periodo}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="stat bg-base-100 rounded-lg">
                      <div className="stat-figure text-success">
                        <FaArrowUp className="text-2xl" />
                      </div>
                      <div className="stat-title">Ingresos</div>
                      <div className="stat-value text-success">Q{mes.ingresos?.toFixed(2)}</div>
                    </div>
                    <div className="stat bg-base-100 rounded-lg">
                      <div className="stat-figure text-error">
                        <FaArrowDown className="text-2xl" />
                      </div>
                      <div className="stat-title">Gastos</div>
                      <div className="stat-value text-error">Q{mes.gastos?.toFixed(2)}</div>
                    </div>
                    <div className="stat bg-base-100 rounded-lg">
                      <div className="stat-figure text-info">
                        <FaBalanceScale className="text-2xl" />
                      </div>
                      <div className="stat-title">Balance</div>
                      <div className="stat-value">Q{mes.balance?.toFixed(2)}</div>
                      <div className="stat-desc">{mes.transacciones} transacciones</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info">
              <FaCalendarAlt />
              <span>No hay datos de tendencia</span>
            </div>
          )}
        </div>
      </div>

      {/* Obtener Reporte Mensual */}

        
      {/* Análisis de Etiquetas */}
      <div className="card bg-base-200 shadow-xl mb-6">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h2 className="card-title text-2xl">
              <FaTags className="text-accent" />
              Análisis de Etiquetas
            </h2>
            <button className="btn btn-accent btn-sm" onClick={cargarAnalisisEtiquetas}>
              <FaTags className="mr-1" />
              Cargar Análisis de Etiquetas
            </button>
          </div>
          {loadingEtiquetas ? (
            <div className="flex items-center justify-center py-8">
              <FaSpinner className="animate-spin text-accent mr-2" />
              <span className="text-base-content/70">Cargando análisis...</span>
            </div>
          ) : analisisEtiquetas?.length > 0 ? (
            <div className="grid gap-4">
              {analisisEtiquetas.map(item => (
                <div key={item.etiqueta.id} className="bg-base-300 rounded-lg p-4 border-l-4"
                     style={{ borderLeftColor: item.etiqueta.color }}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg text-base-content">{item.etiqueta.nombre}</h3>
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.etiqueta.color }}></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="stat bg-base-100 rounded-lg p-3">
                      <div className="stat-title text-sm">Total</div>
                      <div className="stat-value text-lg">Q{item.totalMonto?.toFixed(2)}</div>
                      <div className="stat-desc">{item.cantidad} transacciones</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-base-100 rounded-lg p-2 text-center">
                        <div className="text-success font-semibold">Q{item.ingresos?.toFixed(2)}</div>
                        <div className="text-xs text-base-content/70">Ingresos</div>
                      </div>
                      <div className="bg-base-100 rounded-lg p-2 text-center">
                        <div className="text-error font-semibold">Q{item.gastos?.toFixed(2)}</div>
                        <div className="text-xs text-base-content/70">Gastos</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info">
              <FaTags />
              <span>No hay análisis de etiquetas</span>
            </div>
          )}
        </div>
      </div>
        
      {/* Comparativa de Períodos */}
      <div className="card bg-base-200 shadow-xl mb-6">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h2 className="card-title text-2xl">
              <FaBalanceScale className="text-info" />
              Comparativa de Períodos
            </h2>
            <button className="btn btn-info btn-sm" onClick={cargarComparativa}>
              <FaCalendarAlt className="mr-1" />
              Comparar Mes Actual vs Anterior
            </button>
          </div>
          {loadingComparativa ? (
            <div className="flex items-center justify-center py-8">
              <FaSpinner className="animate-spin text-info mr-2" />
              <span className="text-base-content/70">Cargando comparativa...</span>
            </div>
          ) : comparativaPeriodos ? (
            <div className="grid gap-6">
              {/* Período 1 */}
              <div className="bg-base-300 rounded-lg p-4">
                <h4 className="font-bold text-lg mb-4 text-primary">
                  Período 1 ({formatFecha(comparativaPeriodos.periodo1?.fechaInicio)} - {formatFecha(comparativaPeriodos.periodo1?.fechaFin)})
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="stat bg-base-100 rounded-lg">
                    <div className="stat-figure text-success">
                      <FaArrowUp />
                    </div>
                    <div className="stat-title text-xs">Ingresos</div>
                    <div className="stat-value text-lg text-success">Q{comparativaPeriodos.periodo1?.totalIngresos}</div>
                  </div>
                  <div className="stat bg-base-100 rounded-lg">
                    <div className="stat-figure text-error">
                      <FaArrowDown />
                    </div>
                    <div className="stat-title text-xs">Gastos</div>
                    <div className="stat-value text-lg text-error">Q{comparativaPeriodos.periodo1?.totalGastos}</div>
                  </div>
                  <div className="stat bg-base-100 rounded-lg">
                    <div className="stat-figure text-info">
                      <FaBalanceScale />
                    </div>
                    <div className="stat-title text-xs">Balance</div>
                    <div className="stat-value text-lg">Q{comparativaPeriodos.periodo1?.balance?.toFixed(2)}</div>
                  </div>
                  <div className="stat bg-base-100 rounded-lg">
                    <div className="stat-figure text-warning">
                      <FaMoneyBillWave />
                    </div>
                    <div className="stat-title text-xs">Transacciones</div>
                    <div className="stat-value text-lg">{comparativaPeriodos.periodo1?.totalTransacciones}</div>
                  </div>
                </div>
              </div>
          
              {/* Período 2 */}
              <div className="bg-base-300 rounded-lg p-4">
                <h4 className="font-bold text-lg mb-4 text-secondary">
                  Período 2 ({formatFecha(comparativaPeriodos.periodo2?.fechaInicio)} - {formatFecha(comparativaPeriodos.periodo2?.fechaFin)})
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="stat bg-base-100 rounded-lg">
                    <div className="stat-figure text-success">
                      <FaArrowUp />
                    </div>
                    <div className="stat-title text-xs">Ingresos</div>
                    <div className="stat-value text-lg text-success">Q{comparativaPeriodos.periodo2?.totalIngresos}</div>
                  </div>
                  <div className="stat bg-base-100 rounded-lg">
                    <div className="stat-figure text-error">
                      <FaArrowDown />
                    </div>
                    <div className="stat-title text-xs">Gastos</div>
                    <div className="stat-value text-lg text-error">Q{comparativaPeriodos.periodo2?.totalGastos}</div>
                  </div>
                  <div className="stat bg-base-100 rounded-lg">
                    <div className="stat-figure text-info">
                      <FaBalanceScale />
                    </div>
                    <div className="stat-title text-xs">Balance</div>
                    <div className="stat-value text-lg">Q{comparativaPeriodos.periodo2?.balance?.toFixed(2)}</div>
                  </div>
                  <div className="stat bg-base-100 rounded-lg">
                    <div className="stat-figure text-warning">
                      <FaMoneyBillWave />
                    </div>
                    <div className="stat-title text-xs">Transacciones</div>
                    <div className="stat-value text-lg">{comparativaPeriodos.periodo2?.totalTransacciones}</div>
                  </div>
                </div>
              </div>
          
              {/* Diferencias */}
              <div className="bg-base-300 rounded-lg p-4 border-2 border-accent">
                <h4 className="font-bold text-lg mb-4 text-accent">
                  <FaBalanceScale className="inline mr-2" />
                  Diferencias
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="stat bg-base-100 rounded-lg grid-cols-subgrid gap-2 sm:grid-cols-2">
                    <div className="stat-title text-xs">Ingresos</div>
                    <div className={`stat-value text-lg ${comparativaPeriodos.diferencias?.ingresos >= 0 ? 'text-success' : 'text-error'}`}>
                      {comparativaPeriodos.diferencias?.ingresos >= 0 ? '+' : '0'}Q{comparativaPeriodos.diferencias?.ingresos?.toFixed(2)}
                    </div>
                    <span className='ml-1 text-sm text-base-content/70 col-2 self-center-safe'>
                      {(comparativaPeriodos.periodo1?.totalIngresos) ? ` (${((Math.abs(comparativaPeriodos.diferencias?.ingresos) / comparativaPeriodos.periodo1.totalIngresos) * 100).toFixed(2)}%)` : '0%'}
                    </span>
                  </div>
                  <div className="stat bg-base-100 rounded-lg grid-cols-subgrid gap-2 sm:grid-cols-2">
                    <div className="stat-title text-xs">Gastos</div>
                    <div className={`stat-value text-lg ${comparativaPeriodos.diferencias?.gastos >= 0 ? 'text-error' : 'text-success'}`}>
                      {comparativaPeriodos.diferencias?.gastos >= 0 ? '+' : '0'}Q{comparativaPeriodos.diferencias?.gastos?.toFixed(2)}
                    </div>
                    <span className='ml-1 text-sm text-base-content/70 col-2 self-center-safe'>
                      {(comparativaPeriodos.periodo1?.totalGastos) ? ` (${((Math.abs(comparativaPeriodos.diferencias?.gastos) / comparativaPeriodos.periodo1.totalGastos) * 100).toFixed(2)}%)` : '0%'}
                    </span>
                  </div>
                  <div className="stat bg-base-100 rounded-lg grid-cols-subgrid gap-2 sm:grid-cols-2">
                    <div className="stat-title text-xs">Balance</div>
                    <div className={`stat-value text-lg ${comparativaPeriodos.diferencias?.balance >= 0 ? 'text-success' : 'text-error'}`}>
                      {comparativaPeriodos.diferencias?.balance >= 0 ? '+' : '0'}Q{comparativaPeriodos.diferencias?.balance?.toFixed(2)}
                    </div>
                    <span className='ml-1 text-sm text-base-content/70 col-2 self-center-safe'>
                        {(comparativaPeriodos.periodo1?.balance) ? ` (${((Math.abs(comparativaPeriodos.diferencias?.balance) / Math.abs(comparativaPeriodos.periodo1.balance)) * 100).toFixed(2)}%)` : '0%'}
                    </span>
                  </div>
                  <div className="stat bg-base-100 rounded-lg grid-cols-subgrid gap-2 sm:grid-cols-2">
                    <div className="stat-title text-xs">Transacciones</div>
                    <div className={`stat-value text-lg ${comparativaPeriodos.diferencias?.transacciones >= 0 ? 'text-info' : 'text-warning'}`}>
                      {comparativaPeriodos.diferencias?.transacciones >= 0 ? '+' : '0'}{comparativaPeriodos.diferencias?.transacciones}
                    </div>
                    <span className='ml-1 text-sm text-base-content/70 col-2 self-center-safe'>
                        {(comparativaPeriodos.periodo1?.totalTransacciones) ? ` (${((Math.abs(comparativaPeriodos.diferencias?.transacciones) / comparativaPeriodos.periodo1.totalTransacciones) * 100).toFixed(2)}%)` : '0%'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="alert alert-info">
              <FaBalanceScale />
              <span>No hay datos de comparativa</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reportes;