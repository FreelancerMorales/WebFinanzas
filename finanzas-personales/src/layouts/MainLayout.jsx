import Footer from '../components/static/Footer';
import Navbar from '../components/static/Navbar';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="p-4 w-fit m-auto">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;