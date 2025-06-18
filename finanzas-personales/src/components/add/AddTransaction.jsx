import { useState } from 'react';
import { useUI } from '../../context/UIContext';

const AddTransaction = () => {
  const { showAlert, startLoading, stopLoading } = useUI();

  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);

  const categories = [
    'Alimentación', 'Transporte', 'Salud', 'Educación', 'Entretenimiento', 'Otros'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !category) {
      showAlert('error', 'Debes ingresar un monto y seleccionar una categoría');
      return;
    }

    try {
      startLoading();

      // Simulación de envío de datos
      await new Promise((res) => setTimeout(res, 1000));

      // Aquí iría la lógica real para enviar datos
      console.log({
        type,
        amount: parseFloat(amount),
        description,
        category,
        date
      });

      showAlert('success', 'Transacción registrada con éxito');

      // Limpiar el formulario
      setAmount('');
      setDescription('');
      setCategory('');
      setDate(new Date().toISOString().split('T')[0]);
    } catch {
      showAlert('error', 'Ocurrió un error al guardar');
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Agregar Transacción</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tipo de transacción */}
        <div className="join w-full">
          <button
            type="button"
            className={`join-item btn w-1/2 ${type === 'expense' ? 'btn-error' : 'btn-outline'}`}
            onClick={() => setType('expense')}
          >
            Gasto
          </button>
          <button
            type="button"
            className={`join-item btn w-1/2 ${type === 'income' ? 'btn-success' : 'btn-outline'}`}
            onClick={() => setType('income')}
          >
            Ingreso
          </button>
        </div>

        {/* Monto */}
        <input
          type="number"
          className="input input-bordered w-full"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        {/* Categoría */}
        <select
          className="select select-bordered w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>Selecciona una categoría</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Fecha */}
        <input
          type="date"
          className="input input-bordered w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Descripción */}
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* Botón */}
        <button className="btn btn-primary w-full" type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;