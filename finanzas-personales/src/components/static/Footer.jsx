const Footer = () => {
  return (
    <footer className="footer footer-center p-6 bg-base-300 text-base-content text-sm">
      <div className="flex flex-col items-center space-y-1">
        <p className="font-semibold">
          © {new Date().getFullYear()} <span className="text-warning">HoneyMoney</span> — Cuidando tus finanzas 🐝
        </p>
        <p>Desarrollado con 💛 por <span className="font-medium">CircuitoSapiens</span></p>
      </div>
    </footer>
  );
};

export default Footer;
