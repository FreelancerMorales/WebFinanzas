import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-base-100 text-center">
      <h1 className="text-5xl font-bold text-error mb-4">404</h1>
      <p className="text-lg mb-6">Lo sentimos, la página que buscas no fue encontrada.</p>
      <Link to="/" className="btn btn-outline btn-error">
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;