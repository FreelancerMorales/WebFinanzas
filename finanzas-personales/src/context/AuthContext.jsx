import { createContext, useContext, useState, useEffect } from "react";
import { loginConGoogle, obtenerUsuarioAutenticado } from "../services/authService";
import { useUI } from "./UIContext";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { showAlert } = useUI();

  const loginGoogle = async (token) => {
    try {
      const usuario = await loginConGoogle(token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(usuario));
      setUser(usuario);
      showAlert("success", "Inicio de sesión exitoso 🐝");
    } catch (err) {
      console.error("Error en loginGoogle:", err);
      showAlert("error", err?.response?.data?.error?.mensaje || "Error al iniciar sesión");
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);

    // Revoca sesión de Google para evitar login automático
    if (window.google && window.google.accounts && user?.correo) {
      window.google.accounts.id.revoke(user.correo, () => {
        console.log("🔓 Sesión de Google cerrada.");
      });
    }
  };

  const verificarSesion = async () => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      console.log("🔒 No hay token en localStorage");
      setLoading(false);
      return;
    }

    try {
      const usuario = await obtenerUsuarioAutenticado(storedToken);
      setUser(usuario);
      localStorage.setItem("user", JSON.stringify(usuario));
      console.log("✅ Sesión válida:", usuario);
      console.log("Token:", storedToken);
    } catch (err) {
      console.error("❌ Error al verificar sesión:", err);
      showAlert("error", "La sesión ha expirado. Por favor inicia sesión nuevamente.");
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verificarSesion();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginGoogle, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};