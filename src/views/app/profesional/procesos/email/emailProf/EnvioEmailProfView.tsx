import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  obtenerDoctoresDatosEmail,
  enviarEmailRecordatorio,
  obtenerTurnosDoctoresDia,
  // grabarProcesoService,
} from "../service/envioEmailService";
import EnvioEmailView from "../EnvioEmailView";
import dayjs from "dayjs";
import "dayjs/locale/es";
// import { getLocalStorageParams } from "@/utils/index";

export default function EnvioEmailProfView() {
  const mañana = new Date();
  mañana.setDate(mañana.getDate() + 1);
  // const fechaHoy = dayjs().format("YYYY-MM-DD");
  // const tproceso = 1; // Email recordatorio

  // const { idProfesional } = getLocalStorageParams();

  const [diaSeleccionado, setDiaSeleccionado] = useState(
    dayjs().add(1, "day").format("YYYY-MM-DD"),
  );

  const { data: turnosProfesionales } = useQuery({
    queryKey: ["turnos-profesional", diaSeleccionado],
    queryFn: () => obtenerTurnosDoctoresDia(diaSeleccionado),
    enabled: !!diaSeleccionado,
    refetchInterval: 10000, // cada 10 segundos
  });

  const { data: datosEmailProfesionales } = useQuery({
    queryKey: ["data-emails", diaSeleccionado],
    queryFn: () => obtenerDoctoresDatosEmail(diaSeleccionado),
    enabled: !!diaSeleccionado,
    refetchInterval: 10000, // cada 10 segundos
  });

  // const grabarProceso = useMutation({
  //   mutationFn: grabarProcesoService,
  //   onError: (error) => {
  //     console.error(error);
  //   },
  //   onSuccess: () => {
  //     // console.log(data);
  //   },
  // });

  const enviarEmail = useMutation({
    mutationFn: ({ fecha, body }: { fecha: string; body: any }) =>
      enviarEmailRecordatorio(fecha, body),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      console.log(data);
      // grabarProceso.mutate({ fecha: fechaHoy, tproceso, idProfesional });
    },
  });

  const datosTurnos = Array.isArray(turnosProfesionales?.data) ? turnosProfesionales.data : [];

  const datosEmail = datosEmailProfesionales?.data.doctores || [];
  const ultimoProceso = datosEmailProfesionales?.data.proceso?.obtiene_ultimoprocesomov;

  const datosEmailConTurnos = datosEmail.map((doctor) => ({
    ...doctor,
    info: datosTurnos.filter((turno) => turno.iddoctor === doctor.iddoctor),
  }));

  // console.log(datosEmailConTurnos);

  // console.log(datosEmail);

  // console.log(datosTurnos);
  // console.log(turnosProfesionales.data);
  // console.log(datosConTurnos);

  function handleEnviarEmails() {
    enviarEmail.mutate({ fecha: diaSeleccionado, body: datosEmailConTurnos });
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
