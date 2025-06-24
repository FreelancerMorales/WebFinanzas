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
      <section className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
        <h1 className="text-4xl font-bold mb-4">🐝 Tu vida financiera bajo control</h1>
        <p className="text-lg mb-6 max-w-xl">
          Registra tus gastos, analiza tus ingresos y alcanza tus metas financieras con HoneyMoney.
        </p>

        <button
          className="btn btn-warning btn-wide gap-2 text-base"
          onClick={handleLoginClick}
        >
          <FaGoogle className="text-lg" />
          Iniciar sesión con Google
        </button>
      </section>

      {/* Características */}
      <section className="py-12 px-6 bg-base-100 text-center">
        <h2 className="text-3xl font-bold mb-8">¿Por qué usar HoneyMoney?</h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="card bg-base-200 shadow-md p-6">
            <FaChartPie className="text-4xl mx-auto mb-4 text-primary" />
            <h3 className="font-bold text-xl mb-2">Gráficos y análisis</h3>
            <p>Visualiza tu evolución financiera con reportes claros y filtros inteligentes.</p>
          </div>
          <div className="card bg-base-200 shadow-md p-6">
            <FaPiggyBank className="text-4xl mx-auto mb-4 text-primary" />
            <h3 className="font-bold text-xl mb-2">Metas de ahorro</h3>
            <p>Define objetivos financieros y sigue tu progreso mes a mes.</p>
          </div>
          <div className="card bg-base-200 shadow-md p-6">
            <FaCalendarAlt className="text-4xl mx-auto mb-4 text-primary" />
            <h3 className="font-bold text-xl mb-2">Control diario</h3>
            <p>Registra tus ingresos y gastos día a día sin complicaciones.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;