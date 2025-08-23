import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useUsuario } from "../hooks/useUsuarios";
import { useUI } from "./UIContext";

const AuthContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const {
    autenticar,
    obtenerPerfil,
    desactivar,
    reactivar
  } = useUsuario();

  const { showAlert, startLoading, stopLoading } = useUI();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- LOGIN CON GOOGLE ---
  const login = useCallback(async (googleToken) => {
    startLoading();
    try {
      // Establecer el token en localStorage ANTES de la llamada
      // porque el interceptor lo necesita para el header Authorization
      localStorage.setItem("token", googleToken);

      // Llamar al endpoint de autenticación
      const response = await autenticar();
      
      // La respuesta contiene los datos del usuario
      const usuario = response.datos;
      
      localStorage.setItem("user", JSON.stringify(usuario));
      setUser(usuario);

      showAlert("success", "Inicio de sesión exitoso 🎉");
      return usuario;
    } catch (err) {
      console.error("Error al autenticar:", err);
      showAlert("error", "Error al iniciar sesión");
      logout();
      throw err;
    } finally {
      stopLoading();
    }
  }, [autenticar, showAlert, startLoading, stopLoading]);

  // --- LOGOUT ---
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  // --- VERIFICAR SESIÓN ---
  const verificarSesion = useCallback(async () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    if (!token) {
      setLoading(false);
      return;
    }

    console.log("Token de Google:", token);

    // Si tenemos usuario almacenado, usarlo inicialmente
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.warn("Error al parsear usuario almacenado:", err);
        localStorage.removeItem("user");
      }
    }

    try {
      // Verificar que el token siga siendo válido obteniendo el perfil
      const usuario = await obtenerPerfil();
      setUser(usuario.datos);
      localStorage.setItem("user", JSON.stringify(usuario.datos));
    } catch (err) {
      console.warn("⚠️ Token inválido o expirado:", err);
      showAlert("warning", "Tu sesión ha expirado. Inicia sesión nuevamente.");
      logout();
    } finally {
      setLoading(false);
    }
  }, [obtenerPerfil, showAlert, logout]);

  // --- DESACTIVAR CUENTA ---
  const desactivarCuenta = useCallback(async () => {
    try {
      await desactivar();
      // Actualizar el estado local del usuario
      const usuarioActualizado = { ...user, activo: false };
      setUser(usuarioActualizado);
      localStorage.setItem("user", JSON.stringify(usuarioActualizado));
      showAlert("success", "Cuenta desactivada exitosamente");
    } catch (err) {
      console.error("Error al desactivar cuenta:", err);
      showAlert("error", "Error al desactivar la cuenta");
    }
  }, [desactivar, user, showAlert]);

  // --- REACTIVAR CUENTA ---
  const reactivarCuenta = useCallback(async () => {
    try {
      await reactivar();
      // Actualizar el estado local del usuario
      const usuarioActualizado = { ...user, activo: true };
      setUser(usuarioActualizado);
      localStorage.setItem("user", JSON.stringify(usuarioActualizado));
      showAlert("success", "Cuenta reactivada exitosamente");
    } catch (err) {
      console.error("Error al reactivar cuenta:", err);
      showAlert("error", "Error al reactivar la cuenta");
    }
  }, [reactivar, user, showAlert]);

  // Verificar sesión al montar el componente
  useEffect(() => {
    verificarSesion();
  }, [verificarSesion]);

  const contextValue = {
    user,
    setUser,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    desactivarCuenta,
    reactivarCuenta
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};