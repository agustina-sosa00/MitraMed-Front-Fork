import TableCard from "./_components/TableCard";
import GraficosCard from "./_components/GraficosCard";
import HeaderCard from "./_components/HeaderCard";
import TitleView from "@/views/app/_components/features/TitleView";

export default function InformeTurnosView() {
  return (
    <>
      <TitleView title="informe de turnos" />
      {/* Buscador */}
      <HeaderCard />

      {/* Tabla */}
      <TableCard />

      {/* Graficos */}
      <GraficosCard />
    </>
  );
}
