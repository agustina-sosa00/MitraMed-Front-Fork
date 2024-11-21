import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Layout() {
  return (
    <>
      <Header />

      <div className="h-full my-20">
        <Outlet />
      </div>

      <Footer />

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} hideProgressBar={true} />
    </>
  );
}
