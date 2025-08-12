import { Navigate, Outlet } from "react-router-dom";

import Cookies from "js-cookie";

export const SecretariatProtectedRoute = () => {
  const hasToken = Cookies.get("accessSecretariat") === "true";
  if (!hasToken) return <Navigate to="/" replace />;

  return <Outlet />;
};
