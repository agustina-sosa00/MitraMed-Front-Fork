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

  const enviarEmail = useMutation({
    mutationFn: ({ fecha, body }: { fecha: string; body: any }) =>
      enviarEmailRecordatorio(fecha, body),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const datosTurnos = turnosProfesionales?.data.datos || [];
  const datosEmail = datosEmailProfesionales?.data.doctores || [];
  const ultimoProceso = datosEmailProfesionales?.data.proceso?.obtiene_ultimoprocesomov;

  const datosCompletos = datosTurnos.map((doctor) => {
    const emailObj = datosEmail.find((e) => e.iddoctor === doctor.iddoctor);
    return {
      ...doctor,
      email: emailObj ? emailObj.email : "",
    };
  });

  const datosConEmail = Array.isArray(datosCompletos)
    ? datosCompletos.filter((row) => row.email && row.email.trim() !== "")
    : [];

  function handleEnviarEmails() {
    enviarEmail.mutate({ fecha: diaSeleccionado, body: datosConEmail });
  }

  return (
    <>
      <EnvioEmailView
        destinatario="Profesionales"
        datosParaTabla={datosCompletos}
        handleEnviarEmails={handleEnviarEmails}
        ultimoProceso={ultimoProceso}
        diaSeleccionado={diaSeleccionado}
        setDiaSeleccionado={setDiaSeleccionado}
      />
    </>
  );
}
