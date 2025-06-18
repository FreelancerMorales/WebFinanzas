import { useUI } from '../context/UIContext';

const ModalConfirm = () => {
  const { modal, closeModal } = useUI();

  if (!modal) return null;

  const handleConfirm = () => {
    modal.onConfirm?.();
    closeModal();
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{modal.title || '¿Estás seguro?'}</h3>
        <p className="py-4">{modal.description || 'Esta acción no se puede deshacer.'}</p>
        <div className="modal-action">
          <button onClick={handleConfirm} className="btn btn-error">Confirmar</button>
          <button onClick={closeModal} className="btn">Cancelar</button>
        </div>
      </div>
    </dialog>
  );
};

export default ModalConfirm;
// This component uses the UIContext to manage modal state.
// It displays a confirmation dialog with a title, description, and confirm/cancel buttons.


/*

import { useUI } from '../../context/UIContext';

  const { showAlert } = useUI();
  const { showModal } = useUI();

        <button onClick=
      {() =>
        showModal({
          title: '¿Eliminar movimiento?',
          description: 'Esto borrará el registro permanentemente.',
          onConfirm: () => {
            showAlert('success', 'Movimiento eliminado correctamente.');
            console.log('Movimiento eliminado');
          },
          closeModal: () => {
            showAlert('error', 'Eliminación cancelada.');
            console.log('Eliminación cancelada');
          }
        })
      }
        className="btn btn-error m-4"
      >
        Eliminar movimiento
      </button>
*/