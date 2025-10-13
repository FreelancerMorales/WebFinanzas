import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCuentas } from '../../hooks/useCuentas';

import { FaChartPie, FaWallet, FaCalendarAlt, FaFilter } from 'react-icons/fa';

const DashHome = () => {
  const { user } = useAuth();
  const { cuentas, obtenerTodas } = useCuentas();

  console.log(cuentas);
  
  useEffect(() => {
  obtenerTodas({ activo: true }); // Con filtro
  // o
  obtenerTodas(); // Sin filtro
}, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bienvenido, {user?.nombre || 'Usuario'}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-base-300 shadow rounded-lg p-4 flex items-center">
          <FaWallet className="text-3xl text-blue-500 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Total Cuentas</p>
            <p className="text-xl font-semibold">{/* Total cuentas aquí */}</p>
          </div>
        </div>
        <div className="bg-base-300 shadow rounded-lg p-4 flex items-center">
          <FaChartPie className="text-3xl text-green-500 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Total Transacciones</p>
            <p className="text-xl font-semibold">{/* Total transacciones aquí */}</p>
          </div>
        </div>
        <div className="bg-base-300 shadow rounded-lg p-4 flex items-center">
          <FaCalendarAlt className="text-3xl text-purple-500 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Transacciones este mes</p>
            <p className="text-xl font-semibold">{/* Transacciones mes aquí */}</p>
          </div>
        </div>
        <div className="bg-base-300 shadow rounded-lg p-4 flex items-center">
          <FaFilter className="text-3xl text-red-500 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Filtros Activos</p>
            <p className="text-xl font-semibold">{/* Filtros aquí */}</p>
          </div>
        </div>
      </div>
      <div className="bg-base-300 shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Resumen Financiero</h2>
        {/* Aquí puedes agregar gráficos o tablas para mostrar el resumen financiero */}
      </div>
    </div>
  );

};

export default DashHome;