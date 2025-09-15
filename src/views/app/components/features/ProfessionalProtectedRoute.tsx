import { Navigate, Outlet, useLocation } from "react-router-dom";

const bloqueoPorRol: Record<string, RegExp[]> = {
  "2": [/^\/dashboard\/turnos(\/|$)/, /^\/dashboard\/historial(\/|$)/],
  "1": [/^\/dashboard\/turnos-generales(\/|$)/, /^\/dashboard\/informe-turnos(\/|$)/],
  "3": [/^\/dashboard\/turnos-generales(\/|$)/, /^\/dashboard\/informe-turnos(\/|$)/],

  "4": [],
}; //este es un array de bloqueos para ciertas rutas

const redireccion = "/dashboard/inicio"; //ruta de redireccion en caso de no tener acceso

export const ProfessionalProtectedRoute = () => {
  const tusuario = localStorage.getItem("mtm-tusuario") ?? "";
  const { pathname } = useLocation();

  if (!tusuario) return <Navigate to="/" replace />; //si no hay tusuario, redirige al inicio

  const blocked = (bloqueoPorRol[tusuario] ?? []).some((rx) => rx.test(pathname)); //si la ruta actual esta en el array de bloqueos, devuelve true
  if (blocked) return <Navigate to={redireccion} replace />; //si blocked es true redirige al inicio

  return <Outlet />;
};
