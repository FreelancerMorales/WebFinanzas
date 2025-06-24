import { BrowserRouter } from 'react-router-dom';
import ModalConfirm from './components/ModalConfirm';
import RouteLoader from './components/RouteLoader';
import { useAuth } from './context/AuthContext'; 
import AppRouter from './router/AppRouter';
import Loader from './components/static/Loader';
import Alert from './components/Alert';

function App() {
  const { loading } = useAuth();

  if (loading) {
    console.log("Cargando...");
    return null; // no renderiza nada durante la carga inicial
  }

  return (
    <BrowserRouter>
      <AppRouter />
      <Alert />
      <ModalConfirm />
      <Loader />
      <RouteLoader />
    </BrowserRouter>
  );
}

export default App;