import { useEffect, useState } from "react";
import { useInformeTurnosStore } from "./store/informeTurnosStore";
import TableCard from "./_components/TableCard";
import GraficosCard from "./_components/GraficosCard";
import HeaderCard from "./_components/HeaderCard";
import TitleView from "@/views/app/_components/features/TitleView";

export default function InformeTurnosView() {
  const { informeTurnosData, setHasSearched } = useInformeTurnosStore();

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (informeTurnosData?.data?.length) {
      setHasSearched(true);
    }
  }, []);

  return (
    <>
      <TitleView title="informe de turnos" />
      {/* Buscador */}
      <HeaderCard loader={loader} setLoader={setLoader} />

      {/* Tabla */}
      <TableCard />

      {/* Graficos */}
      <GraficosCard />
    </>
  );
}
