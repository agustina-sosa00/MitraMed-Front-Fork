import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export const ProfessionalProtectedRoute = () => {
  const isUsuario = Cookies.get("idUsuario");

  if (!isUsuario) return <Navigate to="/" replace />;

  return <Outlet />;
};
