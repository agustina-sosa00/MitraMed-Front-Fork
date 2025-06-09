import { Navigate, Outlet } from "react-router-dom";
// import Cookies from "js-cookie";

export const ProfessionalProtectedRoute = () => {
  //   const accessToken = Cookies.get("accessToken");
  //   const userRol = Cookies.get("rol");
  const accessToken = true;
  const userRol = "profesional";
  if (!accessToken || userRol !== "profesional") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
