// src/pages/StyleGuide.jsx
export default function StyleGuide() {
  return (
    <div className="p-6 space-y-8">
      {/* Títulos */}
      <section>
        <h1 className="text-4xl font-bold text-primary">Encabezados</h1>
        <h2 className="text-3xl font-semibold text-secondary">Subtítulo</h2>
        <h3 className="text-xl font-medium text-base-content">Título Sección</h3>
      </section>

      {/* Botones */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Botones</h2>
        <div className="flex flex-wrap gap-3">
          <button className="btn btn-primary">Principal</button>
          <button className="btn btn-secondary">Secundario</button>
          <button className="btn btn-accent">Accento</button>
          <button className="btn btn-outline">Outline</button>
          <button className="btn btn-ghost">Ghost</button>
        </div>
      </section>

      {/* Inputs */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Campos de texto</h2>
        <div className="form-control w-full max-w-xs space-y-2">
          <label className="label">
            <span className="label-text">Etiqueta</span>
          </label>
          <input
            type="text"
            placeholder="Escribe algo..."
            className="input input-bordered w-full"
          />
        </div>
      </section>

      {/* Tarjetas */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Tarjetas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Tarjeta ejemplo</h2>
              <p>Texto descriptivo o información relevante.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Acción</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alertas */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Alertas</h2>
        <div className="space-y-2">
          <div className="alert alert-info">
            <span>Información general</span>
          </div>
          <div className="alert alert-success">
            <span>Operación exitosa</span>
          </div>
          <div className="alert alert-warning">
            <span>Advertencia</span>
          </div>
          <div className="alert alert-error">
            <span>Error o fallo</span>
          </div>
        </div>
      </section>
    </div>
  );
}
