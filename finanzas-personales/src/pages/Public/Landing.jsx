import { Link } from 'react-router-dom';
import { FaChartPie, FaPiggyBank, FaCalendarAlt } from 'react-icons/fa';
import Header from '../../components/Header';

const Landing = () => {
  return (
    <div>
      <Header />

      {/* Hero principal */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
        <h1 className="text-4xl font-bold mb-4">🐝 Tu vida financiera bajo control</h1>
        <p className="text-lg mb-6 max-w-xl">
          Registra tus gastos, analiza tus ingresos y alcanza tus metas financieras con HoneyMoney.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/register" className="btn btn-primary btn-wide">Crear cuenta gratis</Link>
          <Link to="/login" className="btn btn-outline btn-wide">Ya tengo cuenta</Link>
        </div>
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

      {/* Footer simple (opcional) */}
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <p>© {new Date().getFullYear()} HoneyMoney — Cuidando tus finanzas 🐝</p>
      </footer>
    </div>
  );
};

export default Landing;