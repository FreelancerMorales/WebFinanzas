import { useState, useEffect } from 'react';
import { useCuentas } from '../../hooks/useCuentas';
import { useTransacciones } from '../../hooks/useTransacciones';
import { useTiposMovimiento } from '../../hooks/useTiposMovimiento';
import { useAuth } from '../../context/AuthContext';

import { FaChartPie, FaWallet, FaCalendarAlt, FaFilter } from 'react-icons/fa';

const DashHome = () => {
  const { user } = useAuth();
  const { cuentas, loading: loadingCuentas } = useCuentas();
  const { estadisticas, cargarEstadisticas, loading: loadingEstadisticas } = useTransacciones();
  const { tiposMovimiento } = useTiposMovimiento();

  const [filtroEstadisticas, setFiltroEstadisticas] = useState({
    fechaInicio: '',
    fechaFin: ''
  });

  useEffect(() => {
    // Cargar estadísticas del mes actual por defecto
    const hoy = new Date();
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const finMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

    const filtros = {
      fechaInicio: inicioMes.toISOString().split('T')[0],
      fechaFin: finMes.toISOString().split('T')[0]
    };

    setFiltroEstadisticas(filtros);
    cargarEstadisticas(filtros);
  }, []);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    const nuevoFiltro = { ...filtroEstadisticas, [name]: value };
    setFiltroEstadisticas(nuevoFiltro);
  };

  const aplicarFiltros = () => {
    cargarEstadisticas(filtroEstadisticas);
  };

  const calcularSaldoTotal = () => {
    return cuentas.reduce((total, cuenta) => total + (cuenta.montoInicial || 0), 0);
  };

  const obtenerNombreTipoMovimiento = (id) => {
    const tipo = tiposMovimiento.find(t => t.id === id);
    return tipo ? tipo.nombre : 'Desconocido';
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <FaChartPie className="text-primary" />
        Dashboard Financiero
      </h1>
  
      {user && (
        <div className="text-lg">
          <h2 className="font-semibold">Bienvenido, <span className="text-primary">{user.nombre}</span></h2>
        </div>
      )}
  
      {/* Filtros de fecha */}
      <div className="card bg-base-100 shadow p-4 space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <FaFilter />
          Filtros de Período
        </h3>
        <div className="flex flex-col md:flex-row items-start gap-4">
          <label className="form-control w-full md:w-1/3">
            <span className="label-text">Fecha Inicio</span>
            <input
              type="date"
              name="fechaInicio"
              value={filtroEstadisticas.fechaInicio}
              onChange={handleFiltroChange}
              className="input input-bordered"
            />
          </label>
          <label className="form-control w-full md:w-1/3">
            <span className="label-text">Fecha Fin</span>
            <input
              type="date"
              name="fechaFin"
              value={filtroEstadisticas.fechaFin}
              onChange={handleFiltroChange}
              className="input input-bordered"
            />
          </label>
          <button onClick={aplicarFiltros} className="btn btn-primary mt-2 md:mt-6">
            Aplicar Filtros
          </button>
        </div>
      </div>
    
      {/* Resumen de Cuentas */}
      <div className="card bg-base-100 shadow p-4 space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <FaWallet />
          Resumen de Cuentas
        </h3>
        {loadingCuentas ? (
          <p className="text-info">Cargando cuentas...</p>
        ) : (
          <div>
            <p>Total de cuentas: <span className="font-semibold">{cuentas.length}</span></p>
            <p>Saldo total: <span className="font-bold text-success">${calcularSaldoTotal().toFixed(2)}</span></p>
            <div className="mt-2 space-y-2">
              <h4 className="font-medium">Detalle por cuenta:</h4>
              {cuentas.map(cuenta => (
                <div key={cuenta.id} className="flex justify-between bg-base-200 p-2 rounded">
                  <span>{cuenta.nombre}</span>
                  <span className="text-sm text-right">
                    ${ (cuenta.montoInicial || 0).toFixed(2) } <span className="text-xs text-gray-500">({cuenta.tipo})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Estadísticas de Transacciones */}
      <div className="card bg-base-100 shadow p-4 space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <FaCalendarAlt />
          Estadísticas del Período
        </h3>
        {loadingEstadisticas ? (
          <p className="text-info">Cargando estadísticas...</p>
        ) : estadisticas ? (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Resumen General</h4>
              <p>Total de transacciones: {estadisticas.totalTransacciones || 0}</p>
              <p>Monto total: <span className="text-success font-bold">${(estadisticas.montoTotal || 0).toFixed(2)}</span></p>
            </div>
        
            {estadisticas.porTipoMovimiento && (
              <div>
                <h4 className="font-medium">Por Tipo de Movimiento</h4>
                {Object.entries(estadisticas.porTipoMovimiento).map(([tipoId, datos]) => (
                  <div key={tipoId} className="border-l-4 border-primary pl-4 my-2">
                    <strong>{obtenerNombreTipoMovimiento(parseInt(tipoId))}</strong>
                    <p>Transacciones: {datos.cantidad}</p>
                    <p>Monto: ${datos.monto.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}
  
            {estadisticas.porCategoria && (
              <div>
                <h4 className="font-medium">Por Categoría</h4>
                {Object.entries(estadisticas.porCategoria).map(([categoriaId, datos]) => (
                  <div key={categoriaId} className="border-l-4 border-secondary pl-4 my-2">
                    <strong>Categoría {categoriaId}</strong>
                    <p>Transacciones: {datos.cantidad}</p>
                    <p>Monto: ${datos.monto.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}
  
            {estadisticas.porCuenta && (
              <div>
                <h4 className="font-medium">Por Cuenta</h4>
                {Object.entries(estadisticas.porCuenta).map(([cuentaId, datos]) => {
                  const cuenta = cuentas.find(c => c.id === parseInt(cuentaId));
                  return (
                    <div key={cuentaId} className="border-l-4 border-accent pl-4 my-2">
                      <strong>{cuenta ? cuenta.nombre : `Cuenta ${cuentaId}`}</strong>
                      <p>Transacciones: {datos.cantidad}</p>
                      <p>Monto: ${datos.monto.toFixed(2)}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <p className="text-warning">No hay datos disponibles para el período seleccionado</p>
        )}
    </div>
  </div>
);

};

export default DashHome;