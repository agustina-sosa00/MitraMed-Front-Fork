import { useEffect, useState } from "react";
import { ContainView } from "@/views/app/components/features/ContainView";
import TableCard from "./components/TableCard";
import { useInformeTurnosStore } from "./store/informeTurnosStore";
import MetricasCard from "./components/MetricasCard";
import HeaderCard from "./components/HeaderCard";

export default function InformeTurnosView() {
  const { informeTurnosData, setHasSearched } = useInformeTurnosStore();

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (informeTurnosData?.data?.length) {
      setHasSearched(true);
    }
  }, []);

  return (
    <ContainView title="informe de turnos" padding="mt-2 px-4" classContainer="">
      {/* Buscador */}
      <HeaderCard loader={loader} setLoader={setLoader} />

      {/* Tabla */}
      <TableCard />

      {/* Graficos */}
      <MetricasCard />
    </ContainView>
  );
}
