import { BrowserRouter } from 'react-router-dom';
import ModalConfirm from './components/ModalConfirm';
import RouteLoader from './components/RouteLoader';
import { UIProvider } from './context/UIContext';
import { useAuth } from './context/AuthContext'; 
import AppRouter from './router/AppRouter';
import Loader from './components/static/Loader';
import Alert from './components/Alert';

function App() {
  const { loading } = useAuth();

  if (loading) 
    {
      return console.log("Cargando...")
    }

  return (
    <UIProvider>
      <BrowserRouter>
        <AppRouter />
        <Alert />
        <ModalConfirm />
        <Loader />
        <RouteLoader />
      </BrowserRouter>
    </UIProvider>
  );
}

export default App;