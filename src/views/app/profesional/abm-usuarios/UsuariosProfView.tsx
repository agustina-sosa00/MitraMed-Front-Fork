import { ContainView } from "../../_components/features/ContainView";
import UsuariosProfCard from "./components/UsuariosProfCard";

export default function UsuariosProfView() {
  return (
    <ContainView
      title="ABM Usuarios"
      padding="py-3 2xl:py-20 px-10"
      gapChildren="gap-1"
      sizeTitle="text-3xl 2xl:text-4xl"
    >
      <UsuariosProfCard />
    </ContainView>
  );
}
