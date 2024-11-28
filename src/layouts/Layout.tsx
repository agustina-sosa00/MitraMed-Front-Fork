import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/components/Footer';
import Cookies from 'js-cookie';
import Header from '@/components/Header';
import NewPasswordModal from '@/components/modals/auth/NewPasswordModal';

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    if (!accessToken || !refreshToken) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <Header />

      <div className="h-full my-10">
        <Outlet />
      </div>

      <Footer />

      <NewPasswordModal />

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} hideProgressBar={true} />
    </>
  );
}
