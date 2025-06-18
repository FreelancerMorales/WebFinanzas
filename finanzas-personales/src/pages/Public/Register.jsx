const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Nombre" className="input input-bordered" />
          <input type="email" placeholder="Correo" className="input input-bordered" />
          <input type="password" placeholder="Contraseña" className="input input-bordered" />
          <button className="btn btn-success">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Register;