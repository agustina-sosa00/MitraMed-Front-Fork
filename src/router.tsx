import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeView from './views/HomeView';
import MyShifts from './views/MyShifts';
import Profile from './views/Profile';
import PortalView from './views/PortalView';
import Layout from './layouts/Layout';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PortalView />} index />
          <Route path="/inicio" element={<HomeView />} index />
          <Route path="/mis-turnos" element={<MyShifts />} />
          <Route path="/mi-perfil" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
