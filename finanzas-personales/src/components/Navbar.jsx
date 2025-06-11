import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link to="/home" className="btn btn-ghost text-xl">HoneyMoney</Link>
      </div>
      <div className="flex-none gap-2">
        <Link to="/home" className="btn btn-ghost">Inicio</Link>
        <Link to="/work" className="btn btn-ghost">Trabajo</Link>
        <button onClick={logout} className="btn btn-outline btn-error">Salir</button>
      </div>
    </div>
  );
};

export default Navbar;