import { FaChartPie, FaPiggyBank, FaCalendarAlt, FaGoogle } from "react-icons/fa";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";
import Header from "../../components/static/Header";
import Footer from "../../components/static/Footer";

const Landing = () => {
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
    <div>
      <Header />

      {/* Hero principal */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4 py-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-fade-in">
          🐝 Tu vida financiera bajo control
        </h1>
        <p className="text-lg sm:text-xl mb-6 max-w-xl">
          Registra tus gastos, analiza tus ingresos y alcanza tus metas financieras con <strong>HoneyMoney</strong>.
        </p>
        
        <button
          className="btn btn-warning btn-wide gap-2 text-base hover:scale-105 transition-transform"
          onClick={handleLoginClick}
        >
          <FaGoogle className="text-lg" />
          Iniciar sesión con Google
        </button>
      </section>

      {/* Características */}
      <section className="py-16 px-6 bg-base-100 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">¿Por qué usar HoneyMoney?</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              icon: <FaChartPie className="text-4xl mx-auto mb-4 text-primary" />,
              title: "Gráficos y análisis",
              desc: "Visualiza tu evolución financiera con reportes claros y filtros inteligentes."
            },
            {
              icon: <FaPiggyBank className="text-4xl mx-auto mb-4 text-primary" />,
              title: "Metas de ahorro",
              desc: "Define objetivos financieros y sigue tu progreso mes a mes."
            },
            {
              icon: <FaCalendarAlt className="text-4xl mx-auto mb-4 text-primary" />,
              title: "Control diario",
              desc: "Registra tus ingresos y gastos día a día sin complicaciones."
            }
          ].map(({ icon, title, desc }, i) => (
            <div key={i} className="card bg-base-200 shadow-md p-6 hover:shadow-lg transition-shadow">
              {icon}
              <h3 className="font-bold text-xl mb-2">{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;