import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useUI } from '../context/UIContext';

const RouteLoader = () => {
  const location = useLocation();
  const { startLoading, stopLoading } = useUI();
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== previousPath.current) {
      startLoading();
      previousPath.current = location.pathname;

      // Simula carga real breve
      const timeout = setTimeout(() => stopLoading(), 500);
      return () => clearTimeout(timeout);
    }
  }, [location]);

  return null;
};

export default RouteLoader;
