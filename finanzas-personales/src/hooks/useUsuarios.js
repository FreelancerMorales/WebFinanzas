// useUsuarios.js
import { useState, useEffect } from 'react';
import { usuarioService } from '../services/usuarioService';
import { useUI } from '../context/UIContext';

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useUI();

  // Cargar usuario autenticado
  const cargarUsuarioAutenticado = async () => {
    try {
      setLoading(true);
      const result = await usuarioService.obtenerUsuarioAutenticado();
      setUsuarioActual(result.data || null);
      return result;
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Cargar todos los usuarios (solo admin)
  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const result = await usuarioService.obtenerUsuarios();
      setUsuarios(result.data || []);
      return result;
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar usuario
  const actualizarUsuario = async (id, datos) => {
    try {
      const result = await usuarioService.actualizarUsuario(id, datos);
      
      // Si es el usuario actual, actualizar el estado
      if (usuarioActual && usuarioActual.id === id) {
        setUsuarioActual(result.data);
      }
      
      // Si tenemos lista de usuarios, actualizarla
      if (usuarios.length > 0) {
        await cargarUsuarios();
      }
      
      showAlert('success', 'Usuario actualizado exitosamente');
      return result;
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    }
  };

  // Eliminar usuario (solo admin)
  const eliminarUsuario = async (id) => {
    try {
      await usuarioService.eliminarUsuario(id);
      await cargarUsuarios();
      showAlert('success', 'Usuario eliminado exitosamente');
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    }
  };

  // Reactivar usuario (solo admin)
  const reactivarUsuario = async (id) => {
    try {
      await usuarioService.reactivarUsuario(id);
      await cargarUsuarios();
      showAlert('success', 'Usuario reactivado exitosamente');
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    }
  };

  // Cargar usuario autenticado al montar el hook
  useEffect(() => {
    cargarUsuarioAutenticado();
  }, []);

  return {
    usuarios,
    usuarioActual,
    loading,
    cargarUsuarioAutenticado,
    cargarUsuarios,
    actualizarUsuario,
    eliminarUsuario,
    reactivarUsuario
  };
};