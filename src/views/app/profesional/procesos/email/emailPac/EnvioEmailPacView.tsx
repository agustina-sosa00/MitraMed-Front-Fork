import { useState } from "react";
import EnvioEmailView from "../EnvioEmailView";
import dayjs from "dayjs";

export default function EnvioEmailPacView() {
  const mañana = new Date();
  mañana.setDate(mañana.getDate() + 1);

  const [diaSeleccionado, setDiaSeleccionado] = useState(
    dayjs().add(1, "day").format("YYYY-MM-DD"),
  );

  return (
    <>
      <EnvioEmailView
        destinatario="Pacientes"
        datosParaTabla={[]}
        diaSeleccionado={diaSeleccionado}
        setDiaSeleccionado={setDiaSeleccionado}
      />
    </>
  );
}
