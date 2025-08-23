import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaCheck, FaGoogle, FaShieldAlt } from "react-icons/fa";
import { GiDrippingHoney, GiHoneycomb } from "react-icons/gi";
import { useAuth } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";

const LoginGoogle = () => {
  const { loading, login } = useAuth();
  const { showAlert } = useUI();
  const googleButtonRef = useRef(null);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const handleCredentialResponse = async (response) => {
    const token = response.credential;
    if (!token) {
      showAlert("error", "No se pudo obtener el token de Google");
      return;
    }

    try {
      await login(token);
    } catch (err) {
      showAlert("error", "Error al iniciar sesión con Google");
      console.log("Error en login:", err);
      
    }
  };

  useEffect(() => {
    if (window.google && googleButtonRef.current) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        ux_mode: "popup",
      });

      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        text: "continue_with", // o "signin_with"
        shape: "pill",
        logo_alignment: "left",
        width: "100%",
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-amber-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-amber-300 rounded-full opacity-15 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-60 right-10 w-12 h-12 bg-yellow-300 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Back to Home Button */}
      <button onClick={() => window.location.href = '/'} className="absolute top-4 left-4 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-full p-2 shadow-md transition-all duration-300 z-20" title="Volver al inicio" aria-label="Volver al inicio">
        <FaArrowLeft />
      </button>

      {/* Main Content */}
      <div className={`relative z-10 w-full max-w-md transition-all duration-1000 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <GiHoneycomb className="text-6xl text-amber-400 opacity-30 animate-spin" style={{ animationDuration: '15s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <GiDrippingHoney className="text-3xl text-amber-600 animate-pulse" />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
            ¡Bienvenido de vuelta!
          </h1>
          <p className="text-gray-600">
            Accede a tu colmena financiera
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm border border-amber-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Iniciar Sesión</h2>
            <p className="text-gray-600">
              Usa tu cuenta de Google para acceder de forma segura
            </p>
          </div>

          {/* Google Login Button */}
          <div
            ref={googleButtonRef}
            className="flex justify-center mb-6"
          />

          {/* Security Features */}
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl">
              <FaShieldAlt className="text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-amber-800 mb-1">Seguridad Garantizada</h3>
                <p className="text-sm text-amber-700">
                  Utilizamos autenticación OAuth 2.0 para proteger tu información
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <FaCheck className="text-green-500 flex-shrink-0" />
                <span>Datos encriptados</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FaCheck className="text-green-500 flex-shrink-0" />
                <span>Sin passwords</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FaCheck className="text-green-500 flex-shrink-0" />
                <span>Acceso rápido</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FaCheck className="text-green-500 flex-shrink-0" />
                <span>100% gratuito</span>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 leading-relaxed">
              Al continuar, aceptas nuestros términos de servicio y política de privacidad. 
              Tu información está segura con nosotros.
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-amber-100">
            <h3 className="font-semibold text-amber-800 mb-2">
              ¿Primera vez en HoneyMoney?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              No te preocupes, el proceso es muy sencillo. Solo necesitas tu cuenta de Google 
              para comenzar a disfrutar de todas las funciones.
            </p>
            <div className="flex justify-center">
              <div className="text-2xl">🐝✨</div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
            <div className="animate-spin text-4xl text-amber-500 mb-4">🐝</div>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Preparando tu colmena...
            </p>
            <p className="text-gray-600">
              Esto solo tomará unos segundos
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginGoogle;