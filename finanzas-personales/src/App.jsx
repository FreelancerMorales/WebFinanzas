import { BrowserRouter } from 'react-router-dom';
import ModalConfirm from './components/ModalConfirm';
import RouteLoader from './components/RouteLoader';
import { AuthProvider } from './context/AuthContext';
import { UIProvider } from './context/UIContext';
import AppRouter from './router/AppRouter';
import Loader from './components/static/Loader';
import Alert from './components/Alert';

function App() {
  return (
    <UIProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRouter />
          <Alert />
          <ModalConfirm />
          <Loader />
          <RouteLoader />
        </BrowserRouter>
      </AuthProvider>
    </UIProvider>
  );
}

export default App;