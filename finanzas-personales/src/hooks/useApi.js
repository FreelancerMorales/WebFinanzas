import { useState, useEffect, useCallback } from 'react';
import { useUI } from '../context/UIContext';

export const useApi = (apiFunction, options = {}) => {
  const { 
    autoExecute = false, 
    dependencies = [], 
    showErrorAlert = true,
    showSuccessAlert = false,
    successMessage = 'Operación exitosa'
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showAlert } = useUI();

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      setData(result);
      
      if (showSuccessAlert) {
        showAlert('success', successMessage);
      }
      
      return result;
    } catch (err) {
      setError(err);
      
      if (showErrorAlert) {
        showAlert('error', err.message);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, showAlert, showErrorAlert, showSuccessAlert, successMessage]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (autoExecute) {
      execute();
    }
  }, [execute, autoExecute, ...dependencies]);

  return { 
    data, 
    loading, 
    error, 
    execute, 
    reset 
  };
};