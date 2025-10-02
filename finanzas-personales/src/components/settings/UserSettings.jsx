import { useState, useEffect } from 'react';
import { useUsuario } from '../../hooks/useUsuarios';
import { useAuth } from '../../context/AuthContext';

import { 
  FaUser, 
  FaEdit, 
  FaChartBar, 
  FaTags, 
  FaToggleOn, 
  FaToggleOff,
  FaWallet,
  FaCalendarAlt,
  FaEnvelope,
  FaImage,
  FaSave,
  FaSync,
  FaBan,
  FaPlay,
  FaHive
} from 'react-icons/fa';

const UserSettings = () => {
  const { user } = useAuth();
  const {
    // Perfil
    perfil,
    perfilLoading,
    perfilError,
    obtenerPerfil,
    
    // Actualizar perfil
    // eslint-disable-next-line no-unused-vars
    perfilActualizado,
    actualizandoPerfil,
    errorActualizacion,
    actualizarPerfil,
    
    // Resumen/Dashboard
    resumen,
    resumenLoading,
    resumenError,
    obtenerResumen,
    
    // Categorías
    categoriasInicializadas,
    inicializandoCategorias,
    errorCategorias,
    inicializarCategorias,
    
    // Estadísticas
    estadisticas,
    estadisticasLoading,
    estadisticasError,
    obtenerEstadisticas,
    
    // Gestión de cuenta
    cuentaDesactivada,
    desactivando,
    errorDesactivacion,
    desactivar,
    
    cuentaReactivada,
    reactivando,
    errorReactivacion,
    reactivar
  } = useUsuario();

  // Estados locales para formularios
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    foto: ''
  });
  
  const [estadisticasForm, setEstadisticasForm] = useState({
    fechaInicio: '',
    fechaFin: ''
  });

  // Cargar perfil al montar componente
  useEffect(() => {
    handleObtenerPerfil();
    handleObtenerResumen();
  }, []);

  // Actualizar form cuando se carga el perfil
  useEffect(() => {
    if (perfil?.datos) {
      setFormData({
        nombre: perfil.datos.nombre || '',
        correo: perfil.datos.correo || '',
        foto: perfil.datos.foto || ''
      });
    }
  }, [perfil]);

  // Handlers para operaciones
  const handleObtenerPerfil = async () => {
    try {
      await obtenerPerfil();
    } catch (error) {
      console.error('Error al obtener perfil:', error);
    }
  };

  const handleActualizarPerfil = async (e) => {
    e.preventDefault();
    try {
      await actualizarPerfil(formData);
      // Recargar perfil después de actualizar
      await obtenerPerfil();
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
    }
  };

  const handleObtenerResumen = async () => {
    try {
      await obtenerResumen();
    } catch (error) {
      console.error('Error al obtener resumen:', error);
    }
  };

  const handleInicializarCategorias = async () => {
    try {
      await inicializarCategorias();
    } catch (error) {
      console.error('Error al inicializar categorías:', error);
    }
  };

  const handleObtenerEstadisticas = async (e) => {
    e.preventDefault();
    if (!estadisticasForm.fechaInicio || !estadisticasForm.fechaFin) return;
    
    try {
      await obtenerEstadisticas(estadisticasForm.fechaInicio, estadisticasForm.fechaFin);
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
    }
  };

  const handleDesactivar = async () => {
    if (window.confirm('¿Estás seguro de que quieres desactivar tu cuenta?')) {
      try {
        await desactivar();
      } catch (error) {
        console.error('Error al desactivar cuenta:', error);
      }
    }
  };

  const handleReactivar = async () => {
    try {
      await reactivar();
    } catch (error) {
      console.error('Error al reactivar cuenta:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEstadisticasInputChange = (e) => {
    const { name, value } = e.target;
    setEstadisticasForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r rounded-2xl p-6 mb-6 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-base-100 rounded-full">
              <FaHive className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Configuración de Usuario</h1>
              <p className="text-white">Administra tu colmena financiera</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Información Básica */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body">
                <div className="flex items-center gap-2 mb-4">
                  <FaUser className="text-white" />
                  <h2 className="card-title text-base">Información Básica</h2>
                  {perfilLoading && <span className="loading loading-spinner loading-sm text-white"></span>}
                </div>

                {perfilError ? (
                  <div className="alert alert-error">
                    <span>Error: {perfilError.message}</span>
                  </div>
                ) : perfil ? (
                  <div className="space-y-4">
                    {/* Avatar y datos básicos */}
                    <div className="flex items-center gap-4 p-4 bg-base-100 rounded-lg">
                      <div className="avatar">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br flex items-center justify-center">
                          {perfil.datos?.foto ? (
                            <img src={perfil.datos.foto} alt="Perfil" className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <FaUser className="text-2xl text-white" />
                          )}
                          { console.log("foto: ", perfil.datos?.foto)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{perfil.datos?.nombre}</h3>
                        <p className="text-sm opacity-70 flex items-center gap-1">
                          <FaEnvelope className="text-xs" />
                          {perfil.datos?.correo}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className={`badge ${perfil.datos?.activo ? 'badge-success' : 'badge-error'}`}>
                            {perfil.datos?.activo ? 'Activo' : 'Inactivo'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Información adicional */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="stat bg-base-100 rounded-lg">
                        <div className="stat-title text-base">Miembro desde</div>
                        <div className="stat-value text-sm">
                          {new Date(perfil.datos?.creadoEn).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="stat bg-base-100 rounded-lg">
                        <div className="stat-title text-base">Última actualización</div>
                        <div className="stat-value text-sm">
                          {new Date(perfil.datos?.actualizadoEn).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <button 
                      className="btn btn-outline btn-warning gap-2" 
                      onClick={handleObtenerPerfil}
                    >
                      <FaSync />
                      Cargar Perfil
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Resumen Financiero */}
          <div>
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body">
                <div className="flex items-center gap-2 mb-4">
                  <FaWallet className="text-white" />
                  <h2 className="card-title text-base">Resumen</h2>
                </div>

                {resumenLoading ? (
                  <div className="text-center py-4">
                    <span className="loading loading-spinner loading-md text-white"></span>
                  </div>
                ) : resumenError ? (
                  <div className="alert alert-error">
                    <span>Error: {resumenError.message}</span>
                  </div>
                ) : resumen ? (
                  <div className="space-y-3">
                    <div className="stat bg-gradient-to-br text-white rounded-lg">
                      <div className="stat-title text-white">Balance Total</div>
                      <div className="stat-value text-lg">
                        ${resumen.datos?.balanceTotal?.toLocaleString() || 0}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Cuentas activas</span>
                        <span className="font-semibold">{resumen.datos?.cuentas?.length || 0}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Transacciones recientes</span>
                        <span className="font-semibold">{resumen.datos?.transaccionesRecientes?.length || 0}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Proyecciones pendientes</span>
                        <span className="font-semibold">{resumen.datos?.proyeccionesPendientes?.length || 0}</span>
                      </div>
                    </div>
                  </div>
                ) : null}

                <button 
                  className="btn btn-outline btn-warning btn-sm gap-2 mt-4" 
                  onClick={handleObtenerResumen} 
                  disabled={resumenLoading}
                >
                  <FaSync className={resumenLoading ? 'animate-spin' : ''} />
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de Actualización */}
        <div className="card bg-base-100 shadow-xl border border-base-200 mt-6">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <FaEdit className="text-white" />
              <h2 className="card-title text-base">Actualizar Perfil</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Nombre completo</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="input input-bordered input-warning"
                    placeholder="Tu nombre completo"
                    required
                    minLength="2"
                    maxLength="100"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Correo electrónico</span>
                  </label>
                  <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    className="input input-bordered input-warning"
                    placeholder="tu@email.com"
                    required
                    maxLength="150"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-1">
                    <FaImage className="text-xs" />
                    Foto de perfil (URL)
                  </span>
                </label>
                <input
                  type="url"
                  name="foto"
                  value={formData.foto}
                  onChange={handleInputChange}
                  className="input input-bordered input-warning"
                  placeholder="https://..."
                  maxLength="500"
                />
              </div>

              {errorActualizacion && (
                <div className="alert alert-error">
                  <span>Error: {errorActualizacion.message}</span>
                </div>
              )}

              <div className="card-actions justify-end">
                <button 
                  onClick={handleActualizarPerfil} 
                  className="btn btn-warning gap-2"
                  disabled={actualizandoPerfil}
                >
                  {actualizandoPerfil ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <FaSave />
                  )}
                  {actualizandoPerfil ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mt-6">
          {/* Categorías */}
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-4">
                <FaTags className="text-white" />
                <h2 className="card-title text-base">Categorías</h2>
              </div>

              <div className="space-y-4">
                <p className="text-sm opacity-70">
                  Inicializa las categorías básicas para organizar tus finanzas
                </p>

                <button 
                  className="btn btn-outline btn-warning gap-2 w-full"
                  onClick={handleInicializarCategorias} 
                  disabled={inicializandoCategorias}
                >
                  {inicializandoCategorias ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <FaTags />
                  )}
                  {inicializandoCategorias ? 'Inicializando...' : 'Inicializar Categorías'}
                </button>

                {categoriasInicializadas && (
                  <div className="alert alert-success">
                    <span>¡Categorías inicializadas correctamente!</span>
                  </div>
                )}

                {errorCategorias && (
                  <div className="alert alert-error">
                    <span>Error: {errorCategorias.message}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-4">
                <FaChartBar className="text-white" />
                <h2 className="card-title text-base">Estadísticas</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-sm">Fecha inicio</span>
                    </label>
                    <input
                      type="date"
                      name="fechaInicio"
                      value={estadisticasForm.fechaInicio}
                      onChange={handleEstadisticasInputChange}
                      className="input input-bordered input-warning input-sm"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-sm">Fecha fin</span>
                    </label>
                    <input
                      type="date"
                      name="fechaFin"
                      value={estadisticasForm.fechaFin}
                      onChange={handleEstadisticasInputChange}
                      className="input input-bordered input-warning input-sm"
                      required
                    />
                  </div>
                </div>

                <button 
                  onClick={handleObtenerEstadisticas} 
                  className="btn btn-outline btn-warning btn-sm gap-2 w-full"
                  disabled={estadisticasLoading}
                >
                  {estadisticasLoading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <FaChartBar />
                  )}
                  {estadisticasLoading ? 'Generando...' : 'Generar Estadísticas'}
                </button>

                {estadisticasError && (
                  <div className="alert alert-error">
                    <span>Error: {estadisticasError.errors[0].msg}</span>
                  </div>
                )}

                {console.log(estadisticas)}

                {estadisticas && estadisticas.datos && (
                  <div className="bg-base-100 rounded-lg p-4">
                    <h4 className="font-semibold text-base mb-4">📊 Estadísticas del período</h4>
                
                    {/* Resumen principal */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                        <p className="text-sm text-green-400">Ingresos</p>
                        <p className="text-lg font-bold text-green-300">
                          Q{estadisticas.datos.ingresos?.total || 0}
                        </p>
                        <p className="text-xs text-gray-400">
                          {estadisticas.datos.ingresos?.cantidad || 0} movimientos
                        </p>
                      </div>
                
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                        <p className="text-sm text-red-400">Egresos</p>
                        <p className="text-lg font-bold text-red-300">
                          Q{estadisticas.datos.egresos?.total || 0}
                        </p>
                        <p className="text-xs text-gray-400">
                          {estadisticas.datos.egresos?.cantidad || 0} movimientos
                        </p>
                      </div>
                
                      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                        <p className="text-sm text-blue-400">Balance</p>
                        <p className={`text-lg font-bold ${estadisticas.datos.balance >= 0 ? "text-green-300" : "text-red-300"}`}>
                          Q{estadisticas.datos.balance || 0}
                        </p>
                      </div>
                
                      <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                        <p className="text-sm text-yellow-400">Total Transacciones</p>
                        <p className="text-lg font-bold text-yellow-300">
                          {estadisticas.datos.totalTransacciones || 0}
                        </p>
                      </div>
                    </div>
                
                    {/* Categorías más usadas */}
                    <div>
                      <h5 className="font-semibold text-sm mb-2">🏷 Categorías más usadas</h5>
                      {estadisticas.datos.categoriasMasUsadas?.length > 0 ? (
                        <ul className="space-y-2">
                          {estadisticas.datos.categoriasMasUsadas.map((cat, i) => (
                            <li
                              key={i}
                              className="flex items-center justify-between p-2 bg-base-200 rounded-lg"
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: cat.categoria?.color?.hex }}
                                ></span>
                                <span className="font-medium">{cat.categoria?.nombre}</span>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-semibold">Q{cat._sum?.monto || 0}</p>
                                <p className="text-xs text-gray-400">
                                  {cat._count?.id || 0} transacciones
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-gray-500">No hay categorías registradas en este período.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Gestión de Cuenta */}
        <div className="card bg-base-100 shadow-xl border border-base-100 mt-6">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-red-800 rounded-full">
                <FaBan className="text-base" />
              </div>
              <h2 className="card-title text-base">Gestión de Cuenta</h2>
            </div>

            <div className="space-y-4">
              <div className="alert alert-warning">
                <span className="text-sm">
                  {user?.activo 
                    ? 'Al desactivar tu cuenta, perderás acceso temporal a todos los servicios.'
                    : 'Tu cuenta está desactivada. Puedes reactivarla en cualquier momento.'
                  }
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Estado de la cuenta</p>
                  <p className="text-sm opacity-70">
                    {user?.activo ? 'Cuenta activa' : 'Cuenta desactivada'}
                  </p>
                </div>

                {user?.activo ? (
                  <button 
                    className="btn btn-error gap-2"
                    onClick={handleDesactivar} 
                    disabled={desactivando}
                  >
                    {desactivando ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <FaBan />
                    )}
                    {desactivando ? 'Desactivando...' : 'Desactivar Cuenta'}
                  </button>
                ) : (
                  <button 
                    className="btn btn-success gap-2"
                    onClick={handleReactivar} 
                    disabled={reactivando}
                  >
                    {reactivando ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <FaPlay />
                    )}
                    {reactivando ? 'Reactivando...' : 'Reactivar Cuenta'}
                  </button>
                )}
              </div>

              {errorDesactivacion && (
                <div className="alert alert-error">
                  <span>Error: {errorDesactivacion.message}</span>
                </div>
              )}

              {errorReactivacion && (
                <div className="alert alert-error">
                  <span>Error: {errorReactivacion.message}</span>
                </div>
              )}

              {cuentaDesactivada && (
                <div className="alert alert-success">
                  <span>Cuenta desactivada exitosamente</span>
                </div>
              )}

              {cuentaReactivada && (
                <div className="alert alert-success">
                  <span>Cuenta reactivada exitosamente</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;