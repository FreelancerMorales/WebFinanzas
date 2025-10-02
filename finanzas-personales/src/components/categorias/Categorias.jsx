import { useState, useEffect } from 'react';
import { useCategorias } from '../../hooks/useCategorias';
import { 
  FaList, 
  FaSitemap, 
  FaUser, 
  FaEye, 
  FaPowerOff, 
  FaSync, 
  FaPlus,
  FaSearch,
  FaTimes,
  FaPalette,
  FaExchangeAlt
} from 'react-icons/fa';

const Categorias = () => {
  const {
    // Categorías Base
    categoriasBase,
    loadingBase,
    obtenerCategoriasBase,

    // Categorías Jerárquicas
    categoriasJerarquicas,
    loadingJerarquicas,
    obtenerCategoriasJerarquicas,

    // Categorías de Usuario
    categoriasUsuario,
    loadingUsuario,
    obtenerCategoriasUsuario,

    // Categoría de Usuario por ID
    categoriaUsuario,
    loadingCategoriaUsuario,
    obtenerCategoriaUsuarioPorId,

    // Asignar Categoría
    loadingAsignar,
    asignarCategoriaAUsuario,

    // Desactivar/Reactivar
    loadingDesactivar,
    desactivarCategoriaUsuario,
    loadingReactivar,
    reactivarCategoriaUsuario,

    // Auxiliares
    iconos,
    loadingIconos,
    obtenerIconos,
    colores,
    loadingColores,
    obtenerColores,
    tiposMovimiento,
    loadingTiposMovimiento,
    obtenerTiposMovimiento,
  } = useCategorias();

  // Estados locales
  const [vistaActual, setVistaActual] = useState('base'); // base | jerarquicas | usuario
  const [tipoMovimientoFiltro, setTipoMovimientoFiltro] = useState(null);
  const [categoriaIconoFiltro, setCategoriaIconoFiltro] = useState('');
  const [categoriaSeleccionadaId, setCategoriaSeleccionadaId] = useState(null);
  const [nuevaAsignacion, setNuevaAsignacion] = useState({
    categoriaBaseId: '',
    tipoMovimientoId: ''
  });

  // Cargar tipos de movimiento al iniciar
  useEffect(() => {
    obtenerTiposMovimiento();
    obtenerColores();
  }, [obtenerTiposMovimiento, obtenerColores]);

  // Cargar categorías según vista actual
  useEffect(() => {
    if (vistaActual === 'base') {
      obtenerCategoriasBase(tipoMovimientoFiltro);
    } else if (vistaActual === 'jerarquicas') {
      obtenerCategoriasJerarquicas(tipoMovimientoFiltro);
    } else if (vistaActual === 'usuario') {
      obtenerCategoriasUsuario(tipoMovimientoFiltro);
    }
  }, [vistaActual, tipoMovimientoFiltro, obtenerCategoriasBase, obtenerCategoriasJerarquicas, obtenerCategoriasUsuario]);

  // Handlers
  const handleCambiarVista = (vista) => {
    setVistaActual(vista);
    setCategoriaSeleccionadaId(null);
  };

  const handleFiltrarPorTipo = (tipoId) => {
    setTipoMovimientoFiltro(tipoId === 'todos' ? null : parseInt(tipoId));
  };

  const handleAsignarCategoria = async (e) => {
    e.preventDefault();
    try {
      await asignarCategoriaAUsuario(
        parseInt(nuevaAsignacion.categoriaBaseId),
        parseInt(nuevaAsignacion.tipoMovimientoId)
      );
      setNuevaAsignacion({ categoriaBaseId: '', tipoMovimientoId: '' });
      // Recargar categorías del usuario
      obtenerCategoriasUsuario(tipoMovimientoFiltro);
    } catch (error) {
      console.error('Error al asignar categoría:', error);
    }
  };

  const handleDesactivarCategoria = async (id) => {
    try {
      await desactivarCategoriaUsuario(id);
      obtenerCategoriasUsuario(tipoMovimientoFiltro);
    } catch (error) {
      console.error('Error al desactivar categoría:', error);
    }
  };

  const handleReactivarCategoria = async (id) => {
    try {
      await reactivarCategoriaUsuario(id);
      obtenerCategoriasUsuario(tipoMovimientoFiltro);
    } catch (error) {
      console.error('Error al reactivar categoría:', error);
    }
  };

  const handleVerDetalle = async (id) => {
    setCategoriaSeleccionadaId(id);
    await obtenerCategoriaUsuarioPorId(id);
  };

  const handleBuscarIconos = () => {
    obtenerIconos(categoriaIconoFiltro || null);
  };

  // Renderizado de categorías base
  const renderCategoriasBase = () => {
    if (loadingBase) return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="ml-4">Cargando categorías base...</p>
      </div>
    );
    if (!categoriasBase?.datos) return (
      <div className="alert alert-info">
        <span>No hay categorías base</span>
      </div>
    );

    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">
            <FaList className="mr-2" />
            Categorías Base ({categoriasBase.datos.length})
          </h3>
          <ul className="card bg-base-200 rounded-box ">
            {categoriasBase.datos.map((cat) => (
              <li key={cat.id} className="mb-4 border-l-2" style={{ borderColor: cat.color?.hex || 'white' }}>
                <div className="flex flex-col items-start pl-4">
                  <div className="flex items-center gap-2">
                    <strong>{cat.nombre}</strong>
                    {cat.icon && <span className="text-lg">{cat.icono.codigo}</span>}
                    <span className={`badge ${cat.tipomovimiento?.id == 1 || cat.tipomovimiento?.id == 3 ? 'badge-success' : 'badge-error' }`}>{cat.tipomovimiento?.nombre}</span>
                    <span className="badge badge-ghost">Nivel: {cat.nivel}</span>
                  </div>
                  {cat.descripcion && <p className="text-sm mt-2 opacity-70">{cat.descripcion}</p>}

                  {/* Subcategorías */}
                  {cat.other_categoriabase && cat.other_categoriabase.length > 0 && (
                    <ul className="card bg-base-300 rounded-box mt-2 w-full">
                      {cat.other_categoriabase.map((sub) => (
                        <li key={sub.id}>
                          <div className="flex items-center gap-2">
                            {sub.nombre}
                            {sub.icono && <span className="text-lg">{sub.icono.codigo}</span>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  // Renderizado de categorías jerárquicas
  const renderCategoriasJerarquicas = () => {
    if (loadingJerarquicas) return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="ml-4">Cargando categorías jerárquicas...</p>
      </div>
    );
    if (!categoriasJerarquicas?.datos) return (
      <div className="alert alert-info">
        <span>No hay categorías jerárquicas</span>
      </div>
    );

    const renderCategoria = (cat) => (
      <li key={cat.id} className="mb-2 pl-4 my-2 border-l-2" style={{ borderColor: cat.color?.hex || 'white' }}>
        {console.log(`mb-2 pl-4 border-[${cat.color?.hex}] border-l-2`)}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <strong>{cat.nombre}</strong>
            <span className={`text-lg text-amber-400 ${cat.icono.codigo}`}></span>
            <span className={`badge ${cat.tipomovimiento?.id == 1 ? 'badge-success' : 'badge-error' }`}>{cat.tipomovimiento?.nombre}</span>
          </div>

          {cat.subcategorias && cat.subcategorias.length > 0 && (
            <ul className="menu bg-base-300 rounded-box mt-2 w-full">
              {cat.subcategorias.map((sub) => renderCategoria(sub))}
            </ul>
          )}
        </div>
      </li>
    );

    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">
            <FaSitemap className="mr-2" />
            Categorías Jerárquicas ({categoriasJerarquicas.datos.length})
          </h3>
          <ul className="menu bg-base-200 rounded-box">
            {categoriasJerarquicas.datos.map((cat) => renderCategoria(cat))}
          </ul>
        </div>
      </div>
    );
  };

  // Renderizado de categorías de usuario
  const renderCategoriasUsuario = () => {
    if (loadingUsuario) return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="ml-4">Cargando categorías de usuario...</p>
      </div>
    );
    if (!categoriasUsuario?.datos) return (
      <div className="alert alert-info">
        <span>No hay categorías de usuario</span>
      </div>
    );

    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">
            <FaUser className="mr-2" />
            Mis Categorías ({categoriasUsuario.datos.length})
          </h3>
          <ul className="menu bg-base-200 rounded-box">
            {categoriasUsuario.datos.map((cat) => (
              <li key={cat.id} className={`mb-2 pl-4 my-2 border-l-2`} style={{ borderColor: cat.categoriabase?.color?.hex || 'white' }}>
                <div className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-2">
                    <strong>{cat.categoriabase?.nombre}</strong>
                    {cat.categoriabase?.icono && <span className="text-lg">{cat.categoriabase.icono.codigo}</span>}
                    <span className={`badge ${cat.tipomovimiento?.id == 1 || cat.tipomovimiento?.id == 3 ? 'badge-success' : 'badge-error' }`}>{cat.tipomovimiento?.nombre}</span>
                    <span className={`badge ${cat.activo ? 'badge-success' : 'badge-error'}`}>
                      {cat.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      className="btn btn-sm btn-info gap-2" 
                      onClick={() => handleVerDetalle(cat.id)} 
                      disabled={loadingCategoriaUsuario}
                    >
                      <FaEye />
                      Ver Detalle
                    </button>

                    {cat.activo ? (
                      <button 
                        className="btn btn-sm btn-warning gap-2"
                        onClick={() => handleDesactivarCategoria(cat.id)} 
                        disabled={loadingDesactivar}
                      >
                        <FaPowerOff />
                        Desactivar
                      </button>
                    ) : (
                      <button 
                        className="btn btn-sm btn-success gap-2"
                        onClick={() => handleReactivarCategoria(cat.id)} 
                        disabled={loadingReactivar}
                      >
                        <FaSync />
                        Reactivar
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  // Renderizado de detalle de categoría
  const renderDetalleCategoria = () => {
    if (!categoriaSeleccionadaId) return null;
    if (loadingCategoriaUsuario) return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="ml-4">Cargando detalle...</p>
      </div>
    );
    if (!categoriaUsuario?.datos) return (
      <div className="alert alert-error">
        <span>No se encontró la categoría</span>
      </div>
    );

    const cat = categoriaUsuario.datos;

    return (
      <div className="card bg-base-100 shadow-xl mt-4">
        <div className="card-body">
          <h4 className="card-title">Detalle de Categoría</h4>
          <div className="space-y-2">
            <p><strong>ID:</strong> {cat.id}</p>
            <p><strong>Nombre:</strong> {cat.categoriabase?.nombre}</p>
            <p><strong>Descripción:</strong> {cat.categoriabase?.descripcion}</p>
            <p><strong>Tipo:</strong> {cat.tipomovimiento?.nombre}</p>
            <p>
              <strong>Estado:</strong> 
              <span className={`badge ml-2 ${cat.activo ? 'badge-success' : 'badge-error'}`}>
                {cat.activo ? 'Activo' : 'Inactivo'}
              </span>
            </p>
            <p>
              <strong>Icono:</strong> 
              <span className="text-lg ml-2">{cat.categoriabase?.icono?.codigo}</span>
              <span className="ml-2">{cat.categoriabase?.icono?.nombre}</span>
            </p>
            <p>
              <strong>Color:</strong> 
              <span style={{ color: cat.categoriabase?.color?.hex }} className="ml-2">
                {cat.categoriabase?.color?.nombre} ({cat.categoriabase?.color?.hex})
              </span>
            </p>
          </div>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-sm gap-2" onClick={() => setCategoriaSeleccionadaId(null)}>
              <FaTimes />
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Renderizado de formulario de asignación
  const renderFormularioAsignacion = () => {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">
            <FaPlus className="mr-2" />
            Asignar Nueva Categoría
          </h3>
          <form onSubmit={handleAsignarCategoria} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Categoría Base:</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={nuevaAsignacion.categoriaBaseId}
                onChange={(e) => setNuevaAsignacion({
                  ...nuevaAsignacion,
                  categoriaBaseId: e.target.value
                })}
                required
              >
                <option value="">Seleccionar categoría</option>
                {categoriasBase?.datos?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icono?.codigo} {cat.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Tipo de Movimiento:</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={nuevaAsignacion.tipoMovimientoId}
                onChange={(e) => setNuevaAsignacion({
                  ...nuevaAsignacion,
                  tipoMovimientoId: e.target.value
                })}
                required
              >
                <option value="">Seleccionar tipo</option>
                {tiposMovimiento?.datos?.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-full gap-2" disabled={loadingAsignar}>
              {loadingAsignar ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Asignando...
                  {/* Logs */
                  console.log(`Asignando categoría base ID ${nuevaAsignacion.categoriaBaseId} con tipo movimiento ID ${nuevaAsignacion.tipoMovimientoId}`)
                  }
                </>
              ) : (
                <>
                  <FaPlus />
                  Asignar Categoría
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  };

  // Renderizado de iconos
  const renderIconos = () => {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">Iconos Disponibles</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Filtrar por categoría (ej: comida)"
              className="input input-bordered flex-1"
              value={categoriaIconoFiltro}
              onChange={(e) => setCategoriaIconoFiltro(e.target.value)}
            />
            <button className="btn btn-primary gap-2" onClick={handleBuscarIconos} disabled={loadingIconos}>
              <FaSearch />
              Buscar
            </button>
          </div>

          {loadingIconos ? (
            <div className="flex justify-center items-center p-8">
              <span className="loading loading-spinner loading-lg"></span>
              <p className="ml-4">Cargando iconos...</p>
            </div>
          ) : iconos?.datos ? (
            <div>
              <p className="text-sm opacity-70 mb-2">Total: {iconos.datos.length} iconos</p>
              <ul className="menu bg-base-200 rounded-box max-h-96 overflow-y-auto">
                {iconos.datos.map((icono) => (
                  <li key={icono.id}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{icono.codigo}</span>
                      <span>{icono.nombre}</span>
                      <span className="badge badge-ghost">{icono.categoria}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="alert">
              <span>Haz clic en buscar para ver los iconos</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Renderizado de colores
  const renderColores = () => {
    if (loadingColores) return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="ml-4">Cargando colores...</p>
      </div>
    );
    if (!colores?.datos) return null;

    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">
            <FaPalette className="mr-2" />
            Colores Disponibles
          </h3>
          <ul className="menu bg-base-200 rounded-box">
            {colores.datos.map((color) => (
              <li key={color.id}>
                <div className="flex items-center gap-2">
                  <span 
                    style={{ backgroundColor: color.hex }} 
                    className="w-5 h-5 rounded border border-base-300"
                  ></span>
                  <span>{color.nombre}</span>
                  <span className="badge badge-ghost">{color.hex}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };


  // Renderizado de tipos de movimiento
  const renderTiposMovimiento = () => {
    if (loadingTiposMovimiento) return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="ml-4">Cargando tipos...</p>
      </div>
    );
    if (!tiposMovimiento?.datos) return null;

    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">
            <FaExchangeAlt className="mr-2" />
            Tipos de Movimiento
          </h3>
          <ul className="menu bg-base-200 rounded-box">
            {tiposMovimiento.datos.map((tipo) => (
              <li key={tipo.id}>
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-2">
                    <strong>{tipo.nombre}</strong>
                    {tipo.descripcion && <span className="text-sm opacity-70">{tipo.descripcion}</span>}
                    <span className={`badge ${tipo.transferencia ? 'badge-accent' : 'badge-ghost'}`}>
                      {tipo.transferencia ? 'Es transferencia' : 'No es transferencia'}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-4xl font-bold text-center mb-8">Sistema de Categorías</h1>
  
      {/* Selector de Vista */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Vistas Disponibles</h2>
          <div className="flex gap-2 flex-wrap">
            <button 
              className="btn btn-outline gap-2" 
              onClick={() => handleCambiarVista('base')}
            >
              <FaList />
              Categorías Base
            </button>
            <button 
              className="btn btn-outline gap-2" 
              onClick={() => handleCambiarVista('jerarquicas')}
            >
              <FaSitemap />
              Categorías Jerárquicas
            </button>
            <button 
              className="btn btn-outline gap-2" 
              onClick={() => handleCambiarVista('usuario')}
            >
              <FaUser />
              Mis Categorías
            </button>
          </div>
        </div>
      </div>
  
      {/* Filtro por Tipo de Movimiento */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Filtrar por Tipo</h2>
          <select 
            className="select select-bordered w-full max-w-xs" 
            onChange={(e) => handleFiltrarPorTipo(e.target.value)}
          >
            <option value="todos">Todos</option>
            {tiposMovimiento?.datos?.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
          
      <div className="divider"></div>
          
      {/* Contenido según vista actual */}
      {vistaActual === 'base' && renderCategoriasBase()}
      {vistaActual === 'jerarquicas' && renderCategoriasJerarquicas()}
      {vistaActual === 'usuario' && (
        <>
          {renderCategoriasUsuario()}
          {renderDetalleCategoria()}
        </>
      )}
  
      <div className="divider"></div>
    
      {/* Formulario de Asignación */}
      {renderFormularioAsignacion()}
    
      <div className="divider"></div>
    
      {/* Sección de Auxiliares */}
      <h2 className="text-3xl font-bold text-center mb-4">Recursos Auxiliares</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {renderIconos()}
        {renderColores()}
        {renderTiposMovimiento()}
      </div>
    </div>
  );
};

export default Categorias;