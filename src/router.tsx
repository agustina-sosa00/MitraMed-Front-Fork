import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/dashboard/HomeView";
import MisTurnos from "./views/dashboard/MisTurnos";
import { PortalView } from "./views/auth/PortalView";
import { Layout } from "./layouts/Layout";
import { TurnosSecretariat } from "./views/dashboardSecretariat/TurnosSecretariat";
import ProtectedRoute from "./components/features/ProtectedRoute";
import ConfigView from "./views/dashboard/ConfigView";
import PrivacyPolicy from "./views/PrivacyPolicy";
import TermsOfService from "./views/TermsOfService";
import { Dashboard } from "./views/dashboardProfessional/Professional";
import { ProfessionalProtectedRoute } from "./components/features/ProfessionalProtectedRoute";
import { ProfessionalLayout } from "./layouts/ProfessionalLayout";
import { NotFound } from "./views/NotFound";
import Turnos from "./views/dashboard/Turnos";
import { DetailHistoryMedical } from "./views/dashboardProfessional/DetailHistoryMedical";
import Cookies from "js-cookie";
import Settings from "./views/dashboardProfessional/Settings";
import InformeTurnosView from "./views/dashboardProfessional/InformeTurnosView";
import TurnosProfView from "./views/dashboardProfessional/TurnosProfView";
import MedicalHistoryView from "./views/dashboardProfessional/MedicalHistoryView";
import OdontogramView from "./views/dashboardProfessional/Odontogram/OdontogramView";

interface RouterProps {
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Router({ loader, setLoader }: RouterProps) {
  const idProfesional = Cookies.get("idProfesional");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortalView loader={loader} setLoader={setLoader} />} index />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
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
            <Route path="/dashboard/inicio" element={<Dashboard />} />
            <Route path="/dashboard/turnos" element={<TurnosProfView />} />
            <Route path="/dashboard/historial" element={<MedicalHistoryView />} />
            <Route path="/dashboard/odontograma" element={<OdontogramView />} />

            <Route path="/dashboard/turnos-generales" element={<TurnosSecretariat />} />
            <Route path="/dashboard/informe-turnos" element={<InformeTurnosView />} />
            {idProfesional && <Route path="/dashboard/configuracion" element={<Settings />} />}
          </Route>
          <Route path="/dashboard/historial/:id" element={<DetailHistoryMedical />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
