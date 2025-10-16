import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProfessionalProtectedRoute() {
  const tusuario = localStorage.getItem("_tu");
  const { pathname } = useLocation();
  const urlRedireccion = "/dashboard/inicio";

  const bloqueoPorRol: Record<string, RegExp[]> = {
    "1": [
      /^\/dashboard\/turnos(\/|$)/,
      /^\/dashboard\/informe-turnos(\/|$)/,
      /^\/dashboard\/usuarios(\/|$)/,
      /^\/dashboard\/configuracion(\/|$)/,
      /^\/dashboard\/procesos\/envio-email-prof(\/|$)/,
      /^\/dashboard\/procesos\/envio-email-pac(\/|$)/,
    ],
    "2": [
      /^\/dashboard\/turnos-profesional(\/|$)/,
      /^\/dashboard\/historia-clinica(\/|$)/,
      /^\/dashboard\/informe-turnos(\/|$)/,
      /^\/dashboard\/usuarios(\/|$)/,
      /^\/dashboard\/configuracion(\/|$)/,
    ],
    "3": [
      /^\/dashboard\/turnos(\/|$)/,
      /^\/dashboard\/informe-turnos(\/|$)/,
      /^\/dashboard\/usuarios(\/|$)/,
      /^\/dashboard\/configuracion(\/|$)/,
      /^\/dashboard\/procesos\/envio-email-prof(\/|$)/,
      /^\/dashboard\/procesos\/envio-email-pac(\/|$)/,
    ],
    "4": [/^\/dashboard\/configuracion(\/|$)/],
  };

  if (!tusuario) return <Navigate to="/" replace />;

  //si la ruta actual esta en el array de bloqueos, devuelve true
  const blocked = (bloqueoPorRol[tusuario] ?? []).some((rx) => rx.test(pathname));

  if (blocked) return <Navigate to={urlRedireccion} replace />;

  return <Outlet />;
}
