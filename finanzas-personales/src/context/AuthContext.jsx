import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Crear contexto
const AuthContext = createContext();

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);

// Componente proveedor
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // para rutas privadas

  // const token = localStorage.getItem("token");

  const loginGoogle = async (token) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/usuarios",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
    } catch (err) {
      console.error("Error en loginGoogle:", err);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const verificarSesion = async () => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      console.log("🔒 No hay token en localStorage");
      setLoading(false);
      return;
    }

    console.log("🔐 Token encontrado:", storedToken);

    try {
      const res = await axios.get("http://localhost:3001/usuarios/me", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (res.data) {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        console.log("✅ Sesión válida:", res.data);
      } else {
        console.warn("⚠️ No se recibió usuario válido. Cerrando sesión.");
        logout();
      }
    } catch (err) {
      console.error("❌ Error al verificar sesión:", err);
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