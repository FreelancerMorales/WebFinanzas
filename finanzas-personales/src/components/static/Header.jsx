import { Link } from 'react-router-dom';
import { GiDrippingHoney } from 'react-icons/gi';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { FaGoogle } from 'react-icons/fa';

const Header = () => {
  const { loginGoogle } = useAuth();
  const { showAlert } = useUI();

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        ux_mode: 'popup',
      });
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    const token = response.credential;
    if (!token) {
      showAlert("error", "No se pudo obtener el token de Google");
      return;
    }
    await loginGoogle(token);
  };

  const handleLoginClick = () => {
    if (window.google) {
      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          showAlert("error", "No se pudo mostrar el diálogo de Google.");
        }
      });
    } else {
      showAlert("error", "Google API no está disponible.");
    }
  };

  return (
      <header className="navbar dark:text-white dark:bg-neutral backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Logo */}
        <div className="navbar-start">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative">
              <GiDrippingHoney className="text-3xl text-amber-500" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-bounce"></span>
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent">
              HoneyMoney
            </span>
          </Link>
        </div>

        {/* Espaciador central o más adelante nav-links */}
        <div className="navbar-center hidden">
          {/* Puedes agregar enlaces aquí más adelante */}
        </div>

        {/* Botón login */}
        <div className="navbar-end">
          <button
            onClick={handleLoginClick}
            className="btn btn-sm sm:btn-md btn-outline btn-warning gap-2 hover:scale-105 transition-all duration-300"
          >
            <FaGoogle />
            <span className="hidden sm:inline">Iniciar Sesión</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;