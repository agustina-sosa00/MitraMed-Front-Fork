import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export default function PacienteProtectedRoute() {
  const accessToken = Cookies.get("accessToken");

  // Si no hay token, redirige a la página de inicio de sesión
  if (!accessToken) {
    return <Navigate to="/" />;
  }

  return <Outlet />; // Permite el acceso a la ruta protegida
}
