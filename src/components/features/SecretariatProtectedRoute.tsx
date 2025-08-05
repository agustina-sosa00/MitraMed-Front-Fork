import { Navigate, Outlet } from "react-router-dom";
// import Cookies from "js-cookie";

export const SecretariatProtectedRoute = () => {
  const accessToken = true;
  // const accessToken = Cookies.get("accessSecretariat");

  const userRol = "secretariat";
  if (!accessToken || userRol !== "secretariat") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
