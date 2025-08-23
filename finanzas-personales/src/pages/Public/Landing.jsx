import { FaChartPie, FaPiggyBank, FaCalendarAlt, FaGoogle, FaShieldAlt, FaMobile, FaLightbulb, FaArrowRight, FaCheck, FaStar } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";
import Header from "../../components/static/Header";
import Footer from "../../components/static/Footer";
import { GiDrippingHoney, GiHoneycomb } from "react-icons/gi";

const Landing = () => {
  const { login } = useAuth();
  const { showAlert } = useUI();
  const googleButtonRef = useRef(null);

  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
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

  const features = [
    {
      icon: <FaChartPie className="text-4xl text-amber-500" />,
      title: "Análisis Inteligente",
      description: "Visualiza tus patrones de gasto con gráficos interactivos y obtén insights personalizados sobre tu salud financiera."
    },
    {
      icon: <FaPiggyBank className="text-4xl text-amber-500" />,
      title: "Metas Dulces",
      description: "Define objetivos financieros realistas y sigue tu progreso. Cada meta alcanzada es una gota más de miel en tu colmena."
    },
    {
      icon: <FaCalendarAlt className="text-4xl text-amber-500" />,
      title: "Seguimiento Diario",
      description: "Registra gastos e ingresos en segundos. Nuestra interfaz intuitiva hace que el control financiero sea pan comido."
    },
    {
      icon: <FaShieldAlt className="text-4xl text-amber-500" />,
      title: "Seguridad Total",
      description: "Tus datos están protegidos con encriptación de nivel bancario. Tu privacidad es nuestra prioridad."
    },
    {
      icon: <FaMobile className="text-4xl text-amber-500" />,
      title: "Acceso Universal",
      description: "Disponible en todos tus dispositivos. Sincronización automática para que tengas tu información siempre contigo."
    },
    {
      icon: <FaLightbulb className="text-4xl text-amber-500" />,
      title: "Consejos Inteligentes",
      description: "Recibe recomendaciones personalizadas basadas en tus hábitos de gasto para optimizar tu economía."
    }
  ];

  const benefits = [
    "Control total de tus finanzas en tiempo real",
    "Reduce gastos innecesarios hasta un 30%",
    "Alcanza tus metas de ahorro más rápido",
    "Toma decisiones financieras informadas",
    "Elimina el estrés por el dinero"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-800 dark:text-white">
      <Header />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden opacity-50">
          <div className="absolute top-20 left-10 w-20 h-20 bg-amber-200 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-200 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-amber-300 rounded-full opacity-15 animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-60 right-10 w-12 h-12 bg-yellow-300 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Honeycomb decoration */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <GiHoneycomb className="text-8xl text-amber-400 opacity-20 animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <GiDrippingHoney className="text-5xl text-amber-600 animate-pulse" />
                  {/* Futuro Logo */}
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent leading-tight">
              HoneyMoney
              <br />
              <span className="text-3xl md:text-5xl">Tu Colmena Financiera</span>
            </h1>

            <p className="text-xl md:text-2xl dark:text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Endulza tu futuro financiero con <strong className="text-amber-600">HoneyMoney</strong>. 
              La plataforma que transforma el manejo de dinero en una experiencia tan dulce como la miel.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {/* Google Login Button */}
              <div ref={googleButtonRef} className="flex justify-center mb-6"> </div>
              
              <div id="googleSignIn" className="flex justify-center mb-6"></div>

              <div className="flex items-center gap-2 text-gray-600">
                <FaCheck className="text-green-500" />
                <span>Sin costo, sin compromisos</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[
                { number: "100%", label: "Gratuito" },
                { number: "24/7", label: "Disponible" },
                { number: "⭐⭐⭐⭐⭐", label: "Calificación" },
                { number: "🔒", label: "Seguro" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-amber-600">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        id="benefits"
        data-animate
        className={`py-20 bg-white transition-all duration-1000 ${isVisible.benefits ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
              ¿Por qué elegir HoneyMoney?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Únete a miles de usuarios que ya transformaron su relación con el dinero
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaCheck className="text-white text-sm" />
                  </div>
                  <p className="text-lg text-gray-700 group-hover:text-amber-600 transition-colors">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-3xl p-8 shadow-2xl">
                <div className="text-center">
                  <div className="text-6xl mb-4">🐝</div>
                  <h3 className="text-2xl font-bold text-amber-700 mb-4">
                    ¡Comienza hoy mismo!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Miles de usuarios ya están ahorrando más y gastando mejor con HoneyMoney
                  </p>
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    "La mejor app para controlar mis finanzas"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features"
        data-animate
        className={`py-20 bg-gradient-to-br from-amber-50 to-yellow-50 transition-all duration-1000 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Características que te encantarán
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Herramientas poderosas diseñadas para hacer tu vida financiera más simple y efectiva
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-amber-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-yellow-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para endulzar tus finanzas?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Únete a la colmena de usuarios inteligentes que ya controlan su dinero con HoneyMoney
            </p>
            <button
              onClick={() => login()}
              className="btn btn-lg bg-white text-amber-600 hover:bg-amber-50 border-none gap-3 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <FaGoogle className="text-xl group-hover:animate-pulse" />
              Comenzar Ahora - Es Gratis
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};


export default Landing;