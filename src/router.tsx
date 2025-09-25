import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

// PORTAL
import PortalView from "./views/auth/views/portal/PortalView";
import PoliticasDePrivacidadView from "./views/auth/views/politicas/PoliticasDePrivacidadView";
import TerminosYCondicionesView from "./views/auth/views/terminos/TerminosYCondicionesView";
import Vista404 from "./views/app/profesional/vista404/Vista404";
// PACIENTES
import PacienteProtectedRoute from "./views/_components/features/PacienteProtectedRoute";
import PacienteLayout from "./views/app/_components/layouts/PacienteLayout";
import HomePacientesView from "./views/app/paciente/inicio/HomePacientesView";
import TurnosPacientesView from "./views/app/paciente/turnosPaciente/TurnosPacientesView";
import MisTurnosPacientesView from "./views/app/paciente/misTurnos/MisTurnosPacientesView";
import ConfigPacientesView from "./views/app/paciente/config/ConfigPacientesView";
// PROFESIONALES
import ProfessionalProtectedRoute from "./views/app/_components/features/ProfessionalProtectedRoute";
import ProfessionalLayout from "./views/app/profesional/_components/ProfessionalLayout";
import HomeProfesionalView from "./views/app/profesional/inicio/HomeProfesionalView";
import TurnosGeneralesView from "./views/app/profesional/turnos/turnosGenerales/TurnosGeneralesView";
import TurnosProfesionalView from "./views/app/profesional/turnos/turnosProfesional/TurnosProfesionalView";
import HistorialClinicoView from "./views/app/profesional/hc/HistorialClinicoView";
import OdontogramView from "./views/app/profesional/odontograma/OdontogramaView";
import InformeTurnosView from "./views/app/profesional/informes/informeTurnos/InformeTurnosView";
import UsuariosProfesionalesView from "./views/app/profesional/usuarios/UsuariosProfesionalesView";
import ConfiguracionView from "./views/app/profesional/configuracion/ConfiguracionView";
import EnvioEmailPacView from "./views/app/profesional/procesos/email/emailPac/EnvioEmailPacView";
import EnvioEmailProfView from "./views/app/profesional/procesos/email/emailProf/EnvioEmailProfView";

interface RouterProps {
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Router({ loader, setLoader }: RouterProps) {
  // Para control inline de /dashboard/turnos-profesional
  const [env, setEnv] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setEnv(localStorage.getItem("_env"));
    }
  }, []);
  // const idProfesional = Cookies.get("idProfesional");

  return (
    <BrowserRouter>
      <Routes>
        {/* Portal */}
        <Route path="/" element={<PortalView loader={loader} setLoader={setLoader} />} index />
        <Route path="/privacy-policy" element={<PoliticasDePrivacidadView />} />
        <Route path="/terms-of-service" element={<TerminosYCondicionesView />} />

        {/* Rutas protegidas */}
        <Route element={<PacienteProtectedRoute />}>
          <Route element={<PacienteLayout setLoader={setLoader} />}>
            <Route path="/inicio" element={<HomePacientesView />} index />
            <Route path="/turnos" element={<TurnosPacientesView />} />
            <Route path="/mis-turnos" element={<MisTurnosPacientesView />} />
            <Route path="/configuracion" element={<ConfigPacientesView />} />
          </Route>
        </Route>

        {
          //region dashboard profesional
        }
        <Route element={<ProfessionalProtectedRoute />}>
          <Route element={<ProfessionalLayout setLoader={setLoader} />}>
            <Route path="/dashboard/inicio" element={<HomeProfesionalView />} />
            <Route
              path="/dashboard/turnos"
              element={env === "des" ? <TurnosGeneralesView /> : <Vista404 />}
            />
            <Route path="/dashboard/turnos-profesional" element={<TurnosProfesionalView />} />
            <Route path="/dashboard/historia-clinica" element={<HistorialClinicoView />} />
            <Route path="/dashboard/odontograma" element={<OdontogramView />} />
            <Route path="/dashboard/informe-turnos" element={<InformeTurnosView />} />
            <Route path="/dashboard/procesos/envio-email-prof" element={<EnvioEmailProfView />} />
            <Route path="/dashboard/procesos/envio-email-pac" element={<EnvioEmailPacView />} />
            <Route path="/dashboard/usuarios" element={<UsuariosProfesionalesView />} />
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
