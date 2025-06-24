const Footer = () => {
  return (
    <footer className="footer footer-center p-6 bg-base-300 text-base-content text-sm">
      <div>
        <p>© {new Date().getFullYear()} <strong>HoneyMoney</strong> — Cuidando tus finanzas 🐝</p>
        <p>Desarrollado con 💛 por CircuitoSapiens</p>
      </div>
    </footer>
  );
};

export default Footer;
