import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeView from './views/HomeView';
import MisTurnos from './views/MisTurnos';
import Profile from './views/Profile';
import PortalView from './views/PortalView';
import Layout from './layouts/Layout';
import Turnos from './views/Turnos';
import ProtectedRoute from './components/ProtectedRoute';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortalView />} index />
        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/inicio" element={<HomeView />} index />
            <Route path="/turnos" element={<Turnos />} />
            <Route path="/mis-turnos" element={<MisTurnos />} />
            <Route path="/mi-perfil" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
