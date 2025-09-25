import { ContainView } from "../../_components/features/ContainView";
// import { useMutation } from "@tanstack/react-query";
import { obtenerTurnosDoctoresDia } from "./service";
import SearchCard from "../turnos/_components/SearchCard";
import { useState } from "react";
import { formatDate } from "@/utils/index";
import { TablaDefault } from "@/frontend-resourses/components";
import { useQuery } from "@tanstack/react-query";
// import DataGrid from "./_components/DataGrid";

type TurnosDoctoresDiaResponse = {
  data: any;
};

export default function EnvioEmailView() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [diaSeleccionado, setDiaSeleccionado] = useState(formatDate(tomorrow));
  // const [turnos, setTurnos] = useState([]);

  // const mutationTurnos = useMutation<TurnosDoctoresDiaResponse, Error, string>({
  //   mutationFn: (fecha: string) => obtenerTurnosDoctoresDia(fecha),
  //   onError: (error) => {
  //     alert("Error al obtener turnos");
  //     console.error(error);
  //   },
  //   onSuccess: (data) => {
  //     mutationEnviar.mutate({ fecha: fechaStr, body: data.data });
  //   },
  // });

  // const mutationEnviar = useMutation({
  //   mutationFn: ({ fecha, body }: { fecha: string; body: any }) =>
  //     enviarEmailRecordatorio(fecha, body),
  //   onError: (error) => {
  //     alert("Error al enviar emails");
  //     console.error(error);
  //   },
  //   onSuccess: (data) => {
  //     alert("¡Emails enviados!");
  //     console.log(data);
  //   },
  // });

  // useQuery para obtener turnos del día seleccionado
  const { data: turnosProfesional } = useQuery<TurnosDoctoresDiaResponse, Error>({
    queryKey: ["turnos-profesional", diaSeleccionado],
    queryFn: () => obtenerTurnosDoctoresDia(diaSeleccionado),
    enabled: !!diaSeleccionado,
    refetchInterval: 10000, // cada 10 segundos
  });

  // Extraer ndoctor y email de los datos para email
  let datosParaEmail: { id: number; ndoctor: string; email: string }[] = [];
  if (Array.isArray(turnosProfesional?.data?.datos) && turnosProfesional.data.datos.length > 0) {
    datosParaEmail = turnosProfesional.data.datos.map((doctor: any, idx: number) => ({
      id: idx + 1,
      ndoctor: doctor.ndoctor,
      email: doctor.email,
    }));
  } else {
    datosParaEmail = [{ id: 0, ndoctor: "No hay datos para la fecha seleccionada", email: "" }];
  }

  const columns = [
    // ID
    {
      key: "id",
      label: "ID",
      minWidth: "37",
      maxWidth: "37",
    },
    // NDOCTOR
    {
      key: "ndoctor",
      label: "Profesional",
      minWidth: "230",
      maxWidth: "230",
    },
    // EMAIL
    {
      key: "email",
      label: "Email",
      minWidth: "180",
      maxWidth: "320",
    },
  ];

  // const propsDataGrid = {
  //   data: datosParaEmail,
  //   columnas: columns,
  // };

  const propsTabla = {
    datosParaTabla: datosParaEmail,
    objectColumns: columns,
    objectStyles: {
      heightContainer: "327px",
      withScrollbar: true,
      addHeaderColor: "#022539",
      viewport1440: {
        widthContainer1440px: "1100px",
        heightContainer1440px: "500px",
      },
      viewport1536: {
        widthContainer1536px: "1200px",
        heightContainer1536px: "590px",
      },
      viewport1920: {
        widthContainer1920px: "1400px",
        heightContainer1920px: "600px",
      },
    },
    selectFn: true,
  };

  // function handleProcesar() {
  //   // mutationTurnos.mutate(fechaStr);
  //   console.log("");
  // }

  return (
    <ContainView title="Envío de Emails">
      <div className="flex w-full mt-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200 w-full flex flex-col md:flex-row items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-primaryBlue mb-2">Recordatorio de turnos</h2>
            <p className="text-gray-700 mb-0 max-w-2xl">
              Este proceso automatiza el envío masivo de emails a los doctores, informando los
              turnos programados para mañana.
            </p>
          </div>
          <div className="mt-4 md:mt-0 md:ml-8 flex-shrink-0 self-end md:self-center">
            <button
              className="px-6 py-2 rounded bg-primaryGreen text-white font-semibold shadow hover:bg-greenHover transition-all duration-200 text-lg"
              type="button"
              // disabled={mutationTurnos.isPending || mutationEnviar.isPending}
              //
            >
              {/*
              {mutationTurnos.isPending
                ? "Obteniendo turnos..."
                : mutationEnviar.isPending
                  ? "Enviando emails..."
                  : "Procesar"}
              */}
              Procesar
            </button>
          </div>
        </div>
      </div>

      <div className="flex w-full ">
        <SearchCard diaSeleccionado={diaSeleccionado} setDiaSeleccionado={setDiaSeleccionado} />
      </div>

      <div className="flex justify-start w-full px-5 overflow-y-auto lg:overflow-visible ">
        <TablaDefault props={propsTabla} />
      </div>
      {/* <DataGrid props={propsDataGrid} /> */}
    </ContainView>
  );
}
