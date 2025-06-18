import { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [alert, setAlert] = useState(null); // { type: 'success' | 'error', message: string }
  const [modal, setModal] = useState(null); // { title, description, onConfirm }

  const [loading, setLoading] = useState(false); // true | false
  // loading: true when an async operation is in progress, false when done

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  const showAlert = (type, message) => setAlert({ type, message });
  const clearAlert = () => setAlert(null);

  const showModal = (modalProps) => setModal(modalProps);
  const closeModal = () => setModal(null);

  return (
    <UIContext.Provider value={{
      alert, showAlert, clearAlert,
      modal, showModal, closeModal,
      loading, startLoading, stopLoading
    }}>
      {children}
    </UIContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUI = () => useContext(UIContext);