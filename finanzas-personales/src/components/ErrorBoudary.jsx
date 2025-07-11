// ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    console.log('Error capturado en ErrorBoundary:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error capturado:', error, errorInfo);
    // Aquí podrías enviar el error a un servicio como Sentry
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <h2 className="card-title text-error justify-center">
                ¡Oops! Algo salió mal
              </h2>
              <p className="text-base-content/70">
                Ha ocurrido un error inesperado. Por favor, recarga la página.
              </p>
              <div className="card-actions justify-center">
                <button 
                  className="btn btn-primary"
                  onClick={() => window.location.reload()}
                >
                  Recargar página
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;