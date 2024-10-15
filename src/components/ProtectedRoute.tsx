import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const authToken = localStorage.getItem('authToken');

  // Si no hay token, redirige a la página de inicio de sesión
  if (!authToken) {
    return <Navigate to="/" />;
  }

  return <Outlet />; // Permite el acceso a la ruta protegida
}
