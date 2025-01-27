import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/components/ui/Footer';
import Cookies from 'js-cookie';
import Header from '@/components/ui/Header';
import NewPasswordModal from '@/components/features/modals/NewPasswordModal';
import WhatsApp from '@/components/features/WhatsApp';

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
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow my-10">
        <Outlet />
      </div>

      <WhatsApp />

      <Footer />

      <NewPasswordModal />

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} hideProgressBar={true} />
    </div>
  );
}
