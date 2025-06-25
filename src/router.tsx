import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/dashboard/HomeView";
import MisTurnos from "./views/dashboard/MisTurnos";
import PortalView from "./views/auth/PortalView";
import Layout from "./layouts/Layout";
import Turnos from "./views/dashboard/Turnos";
import ProtectedRoute from "./components/features/ProtectedRoute";
import ConfigView from "./views/dashboard/ConfigView";
import PrivacyPolicy from "./views/PrivacyPolicy";
import TermsOfService from "./views/TermsOfService";
import { Professional } from "./views/dashboardProfessional/Professional";
import { ProfessionalProtectedRoute } from "./components/features/ProfessionalProtectedRoute";
import ProfessionalLayout from "./layouts/ProfessionalLayout";
import { TableSchedules } from "./views/dashboardProfessional/TableSchedules";
import { NotFound } from "./views/NotFound";
// import { UploadStudy } from "./views/dashboardProfessional/UploadStudy";
// import { Odontogram } from "./views/dashboardProfessional/Odontogram/Odontogram";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortalView />} index />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/inicio" element={<HomeView />} index />
            <Route path="/turnos" element={<Turnos />} />
            <Route path="/mis-turnos" element={<MisTurnos />} />
            <Route path="/configuracion" element={<ConfigView />} />
          </Route>
        </Route>
        {/* Rutas protegidas PROFESIONAL */}
        <Route element={<ProfessionalProtectedRoute />}>
          <Route element={<ProfessionalLayout />}>
            <Route path="/profesionales/inicio" element={<Professional />} />
            <Route path="/profesionales/turnos" element={<TableSchedules />} />
            {/* <Route
              path="/profesionales/subir-estudio"
              element={<UploadStudy />}
              /> */}
            {/* <Route path="/profesionales/odontograma" element={<Odontogram />} /> */}
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
