import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  obtenerDoctoresDatosEmail,
  enviarEmailRecordatorio,
  obtenerTurnosDoctoresDia,
} from "../service/envioEmailService";
import EnvioEmailView from "../EnvioEmailView";
import dayjs from "dayjs";
import "dayjs/locale/es";

export default function EnvioEmailProfView() {
  const mañana = new Date();
  mañana.setDate(mañana.getDate() + 1);

  const [diaSeleccionado, setDiaSeleccionado] = useState(
    dayjs().add(1, "day").format("YYYY-MM-DD"),
  );

  const { data: turnosProfesionales } = useQuery({
    queryKey: ["turnos-profesional", diaSeleccionado],
    queryFn: () => obtenerTurnosDoctoresDia(diaSeleccionado),
    enabled: !!diaSeleccionado,
    // refetchInterval: 10000, // cada 10 segundos
  });

  const { data: datosEmailProfesionales } = useQuery({
    queryKey: ["data-emails", diaSeleccionado],
    queryFn: () => obtenerDoctoresDatosEmail(diaSeleccionado),
    enabled: !!diaSeleccionado,
    // refetchInterval: 10000, // cada 10 segundos
  });

  // Mutación para enviar emails
  const enviarEmail = useMutation({
    mutationFn: ({ fecha, body }: { fecha: string; body: any }) =>
      enviarEmailRecordatorio(fecha, body),
    onError: (error) => {
      alert("Error al enviar emails");
      console.error(error);
    },
    onSuccess: (data) => {
      alert("¡Emails enviados!");
      console.log(data);
    },
  });

  // const fechaFormateada = dayjs(diaSeleccionado).locale("es").format("dddd D [de] MMMM [de] YYYY");
  // console.log("Fecha seleccionada:", fechaFormateada);

  const datosTurnos = turnosProfesionales?.data.datos || [];
  const datosEmail = datosEmailProfesionales?.data.doctores || [];
  const ultimoProceso = datosEmailProfesionales?.data.proceso?.obtiene_ultimoprocesomov;

  console.log(datosTurnos);
  console.log(datosEmail);

  function handleEnviarEmails() {
    enviarEmail.mutate({ fecha: diaSeleccionado, body: datosTurnos });
  }

  return (
    <>
      <EnvioEmailView
        destinatario="Profesionales"
        datosParaTabla={datosEmail}
        handleEnviarEmails={handleEnviarEmails}
        ultimoProceso={ultimoProceso}
        diaSeleccionado={diaSeleccionado}
        setDiaSeleccionado={setDiaSeleccionado}
      />
    </>
  );
}
