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