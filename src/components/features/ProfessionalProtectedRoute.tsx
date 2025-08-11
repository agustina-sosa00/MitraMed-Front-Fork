import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export const ProfessionalProtectedRoute = () => {
  const hasToken = Cookies.get("accessProfessional") === "true";

  if (!hasToken) return <Navigate to="/" replace />;
  return <Outlet />;
};
