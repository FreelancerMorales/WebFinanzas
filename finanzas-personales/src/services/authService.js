import axios from "axios";

const API_URL = "http://localhost:3001/usuarios";

export const loginConGoogle = async (token) => {
  const res = await axios.post(
    API_URL,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.datos;
};

export const obtenerUsuarioAutenticado = async (token) => {
  const res = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.datos;
};
