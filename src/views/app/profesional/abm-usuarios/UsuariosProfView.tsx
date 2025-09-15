import { ContainView } from "../../components/features/ContainView";
import UsuariosProfCard from "./components/UsuariosProfCard";

export default function UsuariosProfView() {
  return (
    <ContainView title="ABM Usuarios" padding="py-10">
      <UsuariosProfCard />
    </ContainView>
  );
}
