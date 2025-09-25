import { ContainView } from "../../../_components/features/ContainView";
// import { useMutation } from "@tanstack/react-query";
// import { obtenerTurnosDoctoresDia } from "./service";
import SearchByDateCard from "../../../_components/features/SearchByDateCard";
// import { useState } from "react";
// import { formatDate } from "@/utils/index";
import { TablaDefault } from "@/frontend-resourses/components";
// import { useQuery } from "@tanstack/react-query";

// type TurnosDoctoresDiaResponse = {
//   data: any;
// };

type EnvioEmailProps = {
  // title: string;
  destinatario?: string;
  datosParaTabla: any[];
  ultimoProceso: any;
  handleEnviarEmails(): void;
  diaSeleccionado: string;
  setDiaSeleccionado: React.Dispatch<React.SetStateAction<string | string>>;
};

export default function EnvioEmailView({
  destinatario,
  datosParaTabla,
  ultimoProceso,
  diaSeleccionado,
  handleEnviarEmails,
  setDiaSeleccionado,
}: EnvioEmailProps) {
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
      key: `${destinatario === "Profesionales" ? "ndoctor" : "npaciente"}`,
      label: `${destinatario}`,
      minWidth: "300",
      maxWidth: "300",
    },
    // EMAIL
    {
      key: "email",
      label: "Email",
      minWidth: "180",
      maxWidth: "320",
    },
  ];

  let datosConId: any[] = [];
  if (Array.isArray(datosParaTabla) && datosParaTabla.length > 0) {
    datosConId = datosParaTabla.map((row, idx) => ({ id: row.id ?? idx + 1, ...row }));
  } else {
    datosConId = [
      destinatario === "Profesionales"
        ? { id: null, ndoctor: "No hay Turnos en la Fecha Seleccionada", email: "" }
        : { id: null, npaciente: "No hay Turnos en la Fecha Seleccionada", email: "" },
    ];
  }

  const propsTabla = {
    datosParaTabla: datosConId,
    objectColumns: columns,
    objectStyles: {
      widthContainer1440px: "600px",
      heightContainer: "327px",
      withScrollbar: true,
      addHeaderColor: "#022539",
    },
    // selectFn: true,
  };

  return (
    <ContainView title={`Turnos ${destinatario}`}>
      <div className="bg-white rounded-lg shadow px-6 py-3 border border-gray-200 w-full flex flex-col md:flex-row items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primaryBlue mb-2">Recordatorio de turnos</h2>
          <p className="text-gray-700 mb-0 max-w-2xl">
            Este proceso automatiza el envío masivo de emails a {destinatario}, informando los
            turnos programados para mañana.
          </p>
        </div>

        <div className="mt-4 md:mt-0 md:ml-8 flex-shrink-0 self-end md:self-center">
          <button
            className="px-6 py-2 rounded bg-primaryGreen text-white font-semibold shadow hover:bg-greenHover transition-all duration-200 text-lg"
            type="button"
            onClick={handleEnviarEmails}
          >
            Procesar
          </button>
        </div>
      </div>

      <div className="flex w-full my-2 items-end">
        <SearchByDateCard
          presenteManana={true}
          diaSeleccionado={diaSeleccionado}
          setDiaSeleccionado={setDiaSeleccionado}
        />

        <div
          className="flex items-center h-10 gap-2 px-4 rounded-lg bg-blue-50 border border-blue-300 shadow-sm text-blue-900 font-semibold text-sm mb-2.5"
          // title="Fecha y hora del último envío de emails"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span>
            Último proceso:
            <span className="ml-2 font-mono text-blue-800">
              {ultimoProceso ? ultimoProceso : "Sin registros"}
            </span>
          </span>
        </div>
      </div>

      <div className="flex justify-start w-full px-5 overflow-y-auto lg:overflow-visible ">
        <TablaDefault props={propsTabla} />
      </div>
      {/* <DataGrid props={propsDataGrid} /> */}
    </ContainView>
  );
}
