import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UIProvider } from './context/UIContext';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoudary';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <UIProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </UIProvider>
    </GoogleOAuthProvider>
  </ErrorBoundary>
);