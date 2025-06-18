import { BrowserRouter } from 'react-router-dom';
import Alert from './components/Alert';
import Loader from './components/Loader';
import ModalConfirm from './components/ModalConfirm';
import RouteLoader from './components/RouteLoader';
import { AuthProvider } from './context/AuthContext';
import { UIProvider } from './context/UIContext';
import AppRouter from './router/AppRouter';

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