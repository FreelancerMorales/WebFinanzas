import { Link } from 'react-router-dom';
import { GiDrippingHoney } from 'react-icons/gi';

const Header = () => {
  return (
    <div className="navbar bg-base-100 shadow-md px-4 justify-between">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold btn btn-ghost normal-case">
        <GiDrippingHoney className="text-2xl text-warning" />
        HoneyMoney
      </Link>
    </div>
  );
};

export default Header;
