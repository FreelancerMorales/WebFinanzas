import { useState } from 'react';
import { useCuentas } from '../../hooks/useCuentas';
import { useUI } from '../../context/UIContext';
import { FaPlusCircle, FaEdit, FaTrashAlt, FaWallet } from "react-icons/fa";

const GestionCuentas = () => {
  const { cuentas, loading, crearCuenta, actualizarCuenta, eliminarCuenta } = useCuentas();
  const { showModal } = useUI();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cuentaEditando, setCuentaEditando] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre: '',
    tipo: '',
    color: '#000000',
    montoInicial: 0
  });

  const limpiarFormulario = () => {
    setFormulario({
      nombre: '',
      tipo: '',
      color: '#000000',
      montoInicial: 0
    });
    setCuentaEditando(null);
    setMostrarFormulario(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: name === 'montoInicial' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (cuentaEditando) {
        await actualizarCuenta(cuentaEditando.id, formulario);
      } else {
        await crearCuenta(formulario);
      }
      limpiarFormulario();
    } catch (error) {
      console.error('Error al guardar cuenta:', error);
    }
  };

  const handleEditar = (cuenta) => {
    setCuentaEditando(cuenta);
    setFormulario({
      nombre: cuenta.nombre,
      tipo: cuenta.tipo,
      color: cuenta.color || '#000000',
      montoInicial: cuenta.montoInicial || 0
    });
    setMostrarFormulario(true);
  };

  const handleEliminar = (cuenta) => {
    showModal({
      title: 'Confirmar eliminación',
      description: `¿Está seguro de que desea eliminar la cuenta "${cuenta.nombre}"?`,
      onConfirm: async () => {
        try {
          await eliminarCuenta(cuenta.id);
        } catch (error) {
          console.error('Error al eliminar cuenta:', error);
        }
      }
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <FaWallet className="text-primary" />
        Gestión de Cuentas
      </h1>

      <div>
        <button
          onClick={() => setMostrarFormulario(true)}
          disabled={loading}
          className="btn btn-primary btn-sm flex items-center gap-2"
        >
          <FaPlusCircle /> Nueva Cuenta
        </button>
      </div>

      {/* Formulario */}
      {mostrarFormulario && (
        <div className="card bg-base-100 shadow p-6 space-y-4 mt-4">
          <h2 className="text-xl font-semibold">
            {cuentaEditando ? "Editar Cuenta" : "Nueva Cuenta"}
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
              <label className="label font-semibold">Tipo:</label>
              <select
                name="tipo"
                value={formulario.tipo}
                onChange={handleInputChange}
                required
                className="select select-bordered"
              >
                <option value="">Seleccione un tipo</option>
                <option value="ahorro">Ahorro</option>
                <option value="corriente">Corriente</option>
                <option value="inversion">Inversión</option>
                <option value="Bancaria">Bancaria</option>
                <option value="credito">Crédito</option>
                <option value="efectivo">Efectivo</option>
              </select>
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
              <label className="label font-semibold">Monto Inicial:</label>
              <input
                type="number"
                name="montoInicial"
                value={formulario.montoInicial}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="input input-bordered"
              />
            </div>

            <div className="flex gap-4 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-success"
              >
                {cuentaEditando ? "Actualizar" : "Crear"}
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

      {/* Lista de Cuentas */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Mis Cuentas</h2>
        {loading ? (
          <p className="text-info">Cargando cuentas...</p>
        ) : cuentas.length === 0 ? (
          <p className="text-warning">No hay cuentas registradas</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Color</th>
                  <th>Saldo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cuentas.map((cuenta) => (
                  <tr key={cuenta.id}>
                    <td>{cuenta.nombre}</td>
                    <td className="capitalize">{cuenta.tipo}</td>
                    <td>
                      <div
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: cuenta.color }}
                      />
                    </td>
                    <td>${(cuenta.montoInicial || 0).toFixed(2)}</td>
                    <td className="flex gap-2">
                      <button
                        onClick={() => handleEditar(cuenta)}
                        className="btn btn-sm btn-outline btn-info"
                      >
                        <FaEdit className="mr-1" /> Editar
                      </button>
                      <button
                        onClick={() => handleEliminar(cuenta)}
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
        )}
      </div>
    </div>
  );

};

export default GestionCuentas;