import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Íconos
import { FaHome, FaPlusCircle, FaHistory, FaChartPie, FaBullseye, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const navLinks = [
    { to: '/home', label: 'Inicio', icon: <FaHome /> },
    { to: '/add', label: 'Agregar', icon: <FaPlusCircle /> },
    { to: '/history', label: 'Historial', icon: <FaHistory /> },
    { to: '/report', label: 'Reportes', icon: <FaChartPie /> },
    { to: '/goals', label: 'Metas', icon: <FaBullseye /> },
    { to: '/categorias', label: 'Categorías', icon: <FaPlusCircle /> },
    { to: '/cuentas', label: 'Cuentas', icon: <FaPlusCircle /> },
    { to: '/settings', label: 'Config.', icon: <FaCog /> },
  ];

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/home" className="btn btn-ghost text-xl normal-case">HoneyMoney</Link>
      </div>

      {/* Desktop Nav */}
      <div className="hidden lg:flex gap-2">
        {navLinks.map(({ to, label, icon }) => (
          <Link key={to} to={to} className="btn btn-ghost gap-1">
            {icon}
            <span className="hidden md:inline">{label}</span>
          </Link>
        ))}
        <button onClick={logout} className="btn btn-outline btn-error gap-1">
          <FaSignOutAlt />
          <span className="hidden md:inline">Salir</span>
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div className="dropdown dropdown-end lg:hidden">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          {navLinks.map(({ to, label, icon }) => (
            <li key={to}>
              <Link to={to} className="flex items-center gap-2">
                {icon} {label}
              </Link>
            </li>
          ))}
          <li>
            <button onClick={logout} className="btn btn-outline btn-error mt-2 flex items-center gap-2">
              <FaSignOutAlt /> Salir
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;