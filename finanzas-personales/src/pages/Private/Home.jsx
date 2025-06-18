import { useUI } from "../../context/UIContext";

const Home = () => {
  const { showAlert } = useUI();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">My HoneyData</h1>
      <button
        className="btn btn-primary mt-4"
        onClick={() => showAlert('error', '¡Bienvenido a My HoneyData!')}
        >jpsñ</button>
    </div>
  );
};

export default Home;