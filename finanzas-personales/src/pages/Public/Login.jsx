import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";

function LoginGoogle() {
  const { loginGoogle } = useAuth();

  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    await loginGoogle(token);
  };

  const handleError = () => {
    console.log("Error al iniciar sesión con Google");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="bg-base-100 p-8 rounded-xl shadow-md text-center max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-4">Inicia sesión con Google</h1>
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        <p className="mt-4 text-xs text-gray-500">Tu información está segura con nosotros.</p>
      </div>
    </div>
  );
}

export default LoginGoogle;

// const Login = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-base-200">
//       <div className="card w-96 bg-base-100 shadow-xl p-6">
//         <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
//         <form className="flex flex-col gap-4">
//           <input type="email" placeholder="Correo" className="input input-bordered" />
//           <input type="password" placeholder="Contraseña" className="input input-bordered" />
//           <button className="btn btn-primary">Entrar</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;