import Footer from '../components/static/Footer';
import Navbar from '../components/static/Navbar';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="p-4 w-fit m-auto sm:w-10/12 lg:w-8/12">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;