import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export default function PacienteProtectedRoute() {
  const accessToken = Cookies.get("accessToken");

  if (!accessToken) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
