import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/app/paciente/inicio/HomeView";
import { PortalView } from "./views/auth/PortalView";
// import Cookies from "js-cookie";
import TurnosProfView from "./views/app/profesional/turnos/TurnosProfView";
import OdontogramView from "./views/app/profesional/odontograma/OdontogramaView";
import { Layout } from "./views/app/components/layouts/Layout";
import { ProfessionalLayout } from "./views/app/components/layouts/ProfessionalLayout";
import InformeTurnosView from "./views/app/profesional/informes/informeTurnos/InformeTurnosView";
import { DashboardProfesionalView } from "./views/app/profesional/inicio/DashboardProfesionalView";
import ConfiguracionView from "./views/app/profesional/configuracion/ConfiguracionView";
import Vista404 from "./views/app/profesional/vista404/Vista404";
import TerminosYCondiciones from "./views/auth/TerminosYCondiciones";
import PoliticasDePrivacidad from "./views/auth/PoliticasDePrivacidad";
import Turnos from "./views/app/paciente/turnos/Turnos";
import MisTurnos from "./views/app/paciente/misTurnos/MisTurnos";
import ConfigView from "./views/app/paciente/config/ConfigView";
import TurnosProfesionalesView from "./views/app/profesional/turnosProfesionales/TurnosProfesionalesView";
import { ProfessionalProtectedRoute } from "./views/app/components/features/ProfessionalProtectedRoute";
import ProtectedRoute from "./views/components/features/ProtectedRoute";
import HistorialClinicoView from "./views/app/profesional/hc/HistorialClinicoView";
import UsuariosProfView from "./views/app/profesional/abm-usuarios/UsuariosProfView";

interface RouterProps {
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Router({ loader, setLoader }: RouterProps) {
  // const idProfesional = Cookies.get("idProfesional");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortalView loader={loader} setLoader={setLoader} />} index />
        <Route path="/privacy-policy" element={<PoliticasDePrivacidad />} />
        <Route path="/terms-of-service" element={<TerminosYCondiciones />} />
        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout setLoader={setLoader} />}>
            <Route path="/inicio" element={<HomeView />} index />
            <Route path="/turnos" element={<Turnos />} />
            <Route path="/mis-turnos" element={<MisTurnos />} />
            <Route path="/configuracion" element={<ConfigView />} />
          </Route>
        </Route>

        {
          //region dashboard profesional
        }
        <Route element={<ProfessionalProtectedRoute />}>
          <Route element={<ProfessionalLayout setLoader={setLoader} />}>
            <Route path="/dashboard/inicio" element={<DashboardProfesionalView />} />
            <Route path="/dashboard/turnos" element={<TurnosProfView />} />
            <Route path="/dashboard/historial" element={<HistorialClinicoView />} />
            <Route path="/dashboard/odontograma" element={<OdontogramView />} />

            <Route path="/dashboard/turnos-generales" element={<TurnosProfesionalesView />} />
            <Route path="/dashboard/informe-turnos" element={<InformeTurnosView />} />
            <Route path="/dashboard/abm-usuarios" element={<UsuariosProfView />} />
            <Route path="/dashboard/configuracion" element={<ConfiguracionView />} />
            {/* {idProfesional && (
            )} */}
          </Route>
        </Route>

        <Route path="*" element={<Vista404 />} />
      </Routes>
    </BrowserRouter>
  );
}
