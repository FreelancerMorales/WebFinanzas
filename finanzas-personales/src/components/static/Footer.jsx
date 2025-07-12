import { GiDrippingHoney } from "react-icons/gi";

const Footer = () => {
  return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-6">
              <GiDrippingHoney className="text-3xl text-amber-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                HoneyMoney
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              © {new Date().getFullYear()} HoneyMoney — Cuidando tus finanzas con la dulzura de la miel 🐝
            </p>
            <p className="text-gray-500">
              Desarrollado con 💛 por <span className="text-amber-400 font-medium">CircuitoSapiens</span>
            </p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
