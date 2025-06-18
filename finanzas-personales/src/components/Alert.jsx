import { useUI } from '../context/UIContext';
import { useEffect } from 'react';

const Alert = () => {
  const { alert, clearAlert } = useUI();

  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(clearAlert, 3000);
      return () => clearTimeout(timeout);
    }
  }, [alert, clearAlert]);

  if (!alert) return null;

  return (
    <div className="toast toast-down toast-end z-50">
      <div className={`alert ${alert.type === 'error' ? 'alert-error' : 'alert-success'}`}>
        <span>{alert.message}</span>
      </div>
    </div>
  );
};

export default Alert;