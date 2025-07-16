import { useState, useEffect } from 'react';
import { useUsuarios } from '../../hooks/useUsuarios';
import { useUI } from '../../context/UIContext';

const UserSettings = () => {
  const { usuarioActual, loading, actualizarUsuario, cargarUsuarioAutenticado } = useUsuarios();
  const { showAlert } = useUI();
  
  const [formData, setFormData] = useState({
    nombre: '',
    foto: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (usuarioActual) {
      setFormData({
        nombre: usuarioActual.nombre || '',
        foto: usuarioActual.foto || ''
      });
    }
  }, [usuarioActual]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    
    if (!formData.nombre.trim()) {
      showAlert('error', 'El nombre es requerido');
      return;
    }

    try {
      setSaving(true);
      await actualizarUsuario(usuarioActual.id, formData);
      setIsEditing(false);
      await cargarUsuarioAutenticado();
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      nombre: usuarioActual?.nombre || '',
      foto: usuarioActual?.foto || ''
    });
    setIsEditing(false);
  };

  const handleAvatarChange = (avatarUrl) => {
    setFormData(prev => ({
      ...prev,
      foto: avatarUrl
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!usuarioActual) {

    console.error('No se pudo cargar el usuario actual');
    showAlert('error', 'Error al cargar datos del usuario');

    return (
      <div className="alert alert-error">
        <span>Error al cargar datos del usuario</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Ajustes de Usuario
          </h2>

          <div className="space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img 
                    src={formData.foto || '/default-avatar.png'} 
                    alt="Avatar"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.nombre)}&background=random&color=fff&size=96`;
                    }}
                  />
                </div>
              </div>
              
              {isEditing && (
                <div className="space-y-2">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">URL de la foto</span>
                    </label>
                    <input
                      type="url"
                      name="foto"
                      value={formData.foto}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="https://ejemplo.com/mi-foto.jpg"
                    />
                  </div>
                  
                  <div className="divider text-sm">o elige un avatar</div>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[
                      'https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff&size=96',
                      'https://ui-avatars.com/api/?name=User&background=ef4444&color=fff&size=96',
                      'https://ui-avatars.com/api/?name=User&background=10b981&color=fff&size=96',
                      'https://ui-avatars.com/api/?name=User&background=f59e0b&color=fff&size=96',
                      'https://ui-avatars.com/api/?name=User&background=8b5cf6&color=fff&size=96',
                      'https://ui-avatars.com/api/?name=User&background=ec4899&color=fff&size=96'
                    ].map((avatarUrl, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleAvatarChange(avatarUrl)}
                        className={`avatar btn btn-ghost p-1 ${formData.foto === avatarUrl ? 'ring ring-primary' : ''}`}
                      >
                        <div className="w-12 rounded-full">
                          <img src={avatarUrl} alt={`Avatar ${index + 1}`} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Info Section */}
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nombre completo</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  disabled={!isEditing}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Correo electrónico</span>
                </label>
                <input
                  type="email"
                  value={usuarioActual.correo}
                  className="input input-bordered w-full"
                  disabled
                />
                <label className="label">
                  <span className="label-text-alt">El correo no se puede modificar</span>
                </label>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Fecha de registro</span>
                </label>
                <input
                  type="text"
                  value={new Date(usuarioActual.creadoEn).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  className="input input-bordered w-full"
                  disabled
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Estado</span>
                </label>
                <div className="flex items-center space-x-2">
                  <div className={`badge ${usuarioActual.activo ? 'badge-success' : 'badge-error'}`}>
                    {usuarioActual.activo ? 'Activo' : 'Inactivo'}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="card-actions justify-end space-x-2">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar Perfil
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-ghost"
                    disabled={saving}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Guardar Cambios
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Settings Card */}
      <div className="card bg-base-100 shadow-xl mt-6">
        <div className="card-body">
          <h3 className="card-title text-lg mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Configuración Adicional
          </h3>
          
          <div className="space-y-4">
            <div className="alert alert-info">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-bold">Información</h4>
                <div className="text-sm">
                  Los cambios en tu perfil se aplicarán inmediatamente.
                  Tu correo electrónico no puede ser modificado por seguridad.
                </div>
              </div>
            </div>

            <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
              <div className="stat">
                <div className="stat-title">Usuario ID</div>
                <div className="stat-value text-sm">{usuarioActual.id}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Último acceso</div>
                <div className="stat-value text-sm">Ahora</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;