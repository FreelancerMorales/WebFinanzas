import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="navbar bg-base-100 shadow-md px-4 justify-center">
      <Link to="/" className="btn btn-ghost text-xl normal-case">HoneyMoney</Link>
    </div>
  );
};

export default Header;
