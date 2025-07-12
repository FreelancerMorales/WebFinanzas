import { GiHoneypot, GiDrippingHoney, GiBee, GiHoneycomb } from "react-icons/gi";
import { FaHome, FaSearch, FaExclamationTriangle } from "react-icons/fa";
import { useState, useEffect } from "react";

const NotFound = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const suggestions = [
    {
      icon: <FaHome className="text-warning" />,
      title: "Ir al Inicio",
      description: "Vuelve a la página principal",
      action: () => window.location.href = "/"
    },
    {
      icon: <FaSearch className="text-info" />,
      title: "Buscar",
      description: "Explora nuestras funcionalidades",
      action: () => window.location.href = "/"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 opacity-10">
          <GiHoneycomb className="text-8xl text-yellow-400 animate-pulse" />
        </div>
        <div className="absolute top-32 right-20 opacity-15">
          <GiBee className="text-6xl text-amber-500 animate-bounce" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-10">
          <GiHoneypot className="text-7xl text-orange-400" />
        </div>
        <div className="absolute bottom-32 right-10 opacity-20">
          <GiDrippingHoney className="text-5xl text-yellow-500 animate-pulse" />
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-5">
          <GiHoneycomb className="text-9xl text-orange-300" />
        </div>
        <div className="absolute top-1/3 right-1/4 opacity-8">
          <GiBee className="text-4xl text-yellow-400 animate-bounce" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Error Icon and Animation */}
          <div className="relative mb-8">
            <div className="relative inline-block">
              <GiHoneypot className="text-8xl text-warning animate-bounce" />
              <div className="absolute -top-4 -right-4">
                <FaExclamationTriangle className="text-3xl text-red-500 animate-pulse" />
              </div>
              <div className="absolute -bottom-2 -left-4">
                <GiBee className="text-4xl text-amber-500 animate-bounce" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h1 className="text-8xl font-bold text-transparent bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text mb-4">
              404
            </h1>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              ¡Ups! Página no encontrada
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              Parece que esta página se perdió en el panal 🐝
            </p>
            <p className="text-gray-500">
              No te preocupes, las abejas trabajadoras te ayudarán a encontrar lo que buscas
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => window.location.href = "/"}
              className="btn btn-warning btn-lg px-8 py-4 text-base font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 gap-3"
            >
              <FaHome className="text-xl" />
              Volver al Inicio
            </button>
            <button
              onClick={() => window.history.back()}
              className="btn btn-outline btn-lg px-8 py-4 text-base font-semibold border-2 hover:scale-105 transition-all duration-300"
            >
              Página Anterior
            </button>
          </div>

          {/* Suggestions */}
          <div className="grid md:grid-cols-2 gap-6 max-w-lg mx-auto">
            {suggestions.map(({ icon, title, description, action }, index) => (
              <div 
                key={index}
                onClick={action}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-100 hover:border-yellow-300 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
    </div>
  </div>
);
}
export default NotFound;