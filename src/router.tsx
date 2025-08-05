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
import { Professional } from "./views/dashboardProfessional/Professional";
import { ProfessionalProtectedRoute } from "./components/features/ProfessionalProtectedRoute";
import { ProfessionalLayout } from "./layouts/ProfessionalLayout";
import { TableSchedules } from "./views/dashboardProfessional/TableSchedules";
import { NotFound } from "./views/NotFound";
import { Odontogram } from "./views/dashboardProfessional/Odontogram/Odontogram";
import { SecretariatProtectedRoute } from "./components/features/SecretariatProtectedRoute";
import { SecretariatLayout } from "./layouts/SecretariatLayout";
import { Secretariat } from "./views/dashboardSecretariat/Secretariat";
import Turnos from "./views/dashboard/Turnos";
import { MedicalHistory } from "./views/dashboardProfessional/MedicalHistory";
import { DetailHistoryMedical } from "./views/dashboardProfessional/DetailHistoryMedical";
import { TableGral } from "./views/dashboardSecretariat/TableGral";
import { Metrics } from "./views/dashboardProfessional/Metrics";
interface RouterProps {
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Router({ loader, setLoader }: RouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<PortalView loader={loader} setLoader={setLoader} />}
          index
        />
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
        {/* Rutas protegidas PROFESIONAL */}
        <Route element={<ProfessionalProtectedRoute />}>
          <Route element={<ProfessionalLayout setLoader={setLoader} />}>
            <Route path="/profesionales/inicio" element={<Professional />} />
            <Route path="/profesionales/turnos" element={<TableSchedules />} />
            <Route
              path="/profesionales/historial"
              element={<MedicalHistory />}
            />
            <Route path="/profesionales/odontograma" element={<Odontogram />} />
            <Route path="/profesionales/metricas" element={<Metrics />} />
          </Route>
          <Route
            path="/profesionales/historial/:id"
            element={<DetailHistoryMedical />}
          />
        </Route>

        <Route element={<SecretariatProtectedRoute />}>
          <Route element={<SecretariatLayout setLoader={setLoader} />}>
            <Route path="/secretaria/inicio" element={<Secretariat />} />
            <Route path="/secretaria/turnos" element={<TurnosSecretariat />} />
            <Route path="/secretaria/tabla-general" element={<TableGral />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
