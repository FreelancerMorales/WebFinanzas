import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user } = useAuth();

  if (user) return null;

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl normal-case">HoneyMoney</Link>
      </div>
      <div className="flex gap-2">
        <Link to="/login" className="btn btn-ghost">Iniciar sesión</Link>
        <Link to="/register" className="btn btn-primary">Crear cuenta</Link>
      </div>
    </div>
  );
};

export default Header;
