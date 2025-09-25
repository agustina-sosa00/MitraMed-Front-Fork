// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { obtenerTurnosDoctoresDia } from "../service/envioEmailService";
// import EnvioEmailView from "../EnvioEmailView";
// import dayjs from "dayjs";

export default function EnvioEmailPacView() {
  const mañana = new Date();
  mañana.setDate(mañana.getDate() + 1);

  // const [diaSeleccionado, setDiaSeleccionado] = useState(
  //   dayjs().add(1, "day").format("YYYY-MM-DD"),
  // );

  // const { data: turnosPacientes } = useQuery({
  //   queryKey: ["turnos-profesional", diaSeleccionado],
  //   queryFn: () => obtenerTurnosDoctoresDia(diaSeleccionado),
  //   enabled: !!diaSeleccionado,
  //   refetchInterval: 10000, // cada 10 segundos
  // });

  return (
    <>
      <div className="">Pacientes</div>
      {/* <EnvioEmailView
        destinatario="Pacientes"
        datosParaTabla={[]}
        diaSeleccionado={diaSeleccionado}
        setDiaSeleccionado={setDiaSeleccionado}
      /> */}
    </>
  );
}
