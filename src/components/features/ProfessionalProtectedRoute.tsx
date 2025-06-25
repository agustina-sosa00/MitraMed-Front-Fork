import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export const ProfessionalProtectedRoute = () => {
  const accessToken = Cookies.get("accessProfessional");
  const userRol = "profesional";
  if (!accessToken || userRol !== "profesional") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
