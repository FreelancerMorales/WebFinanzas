import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Private/Home';
import NotFound from '../pages/Public/NotFound';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../context/AuthContext';
import Add from '../pages/Private/Add';
import History from '../pages/Private/History';
import Report from '../pages/Private/Report';
import Goals from '../pages/Private/Goals';
import Settings from '../pages/Private/Settings';
import Landing from '../pages/Public/Landing';
import LoginGoogle from '../pages/Public/Login';
import Cuentas from '../pages/Private/Cuentas';
import Categorias from '../pages/Private/Categorias';
import Tags from '../pages/Private/Tags';
import StyleGuide from '../pages/styleguide';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center p-4">{console.log("usuario: ", user)}Cargando...</div>;

  return user ? <MainLayout>{children}</MainLayout> : <Navigate to="/" />;
};


const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center p-4">Cargando...</div>;

  return !user ? children : <Navigate to="/home" />;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><LoginGoogle /></PublicRoute>} />
      <Route path="/style" element={<PrivateRoute><StyleGuide /></PrivateRoute>}/>

      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/tags" element={<PrivateRoute><Tags /></PrivateRoute>} />
      <Route path="/cuentas" element={<PrivateRoute><Cuentas /></PrivateRoute>} />
      <Route path="/categorias" element={<PrivateRoute><Categorias /></PrivateRoute>} />
      <Route path="/add" element={<PrivateRoute><Add /></PrivateRoute>} />
      <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
      <Route path="/report" element={<PrivateRoute><Report /></PrivateRoute>} />
      <Route path="/goals" element={<PrivateRoute><Goals /></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;