import { useState } from "react";
import { TablaDefault } from "@/frontend-resourses/components";
import Swal from "sweetalert2";
import SearchByDateCard from "../../../_components/features/SearchByDateCard";
import ClipLoader from "react-spinners/ClipLoader";
import TitleView from "@/views/app/_components/features/TitleView";
// import { useMutation } from "@tanstack/react-query";
// import { obtenerTurnosDoctoresDia } from "./service";
// import { useState } from "react";
// import { formatDate } from "@/utils/index";
// import { useQuery } from "@tanstack/react-query";

// type TurnosDoctoresDiaResponse = {
//   data: any;
// };

type EnvioEmailProps = {
  // title: string;
  destinatario?: string;
  datosParaTabla: any[];
  ultimoProceso?: any;
  handleEnviarEmails?(): void;
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
    [];
    // datosConId = [
    //   destinatario === "Profesionales"
    //     ? { id: null, ndoctor: "No hay Turnos en la Fecha Seleccionada", email: "" }
    //     : { id: null, npaciente: "No hay Turnos en la Fecha Seleccionada", email: "" },
    // ];
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

  const hayDatos = Array.isArray(datosParaTabla) && datosParaTabla.length > 0;

  const [loading, setLoading] = useState(false);

  async function handleProcesar() {
    const datosValidos =
      Array.isArray(datosParaTabla) && datosParaTabla.length > 0 ? datosParaTabla : [];

    const hayEmail = datosValidos.some((row) => row.email && row.email.trim() !== "");
    if (!hayEmail) {
      Swal.fire({
        icon: "warning",
        text: "No se encontraron emails registrados para procesar",
        confirmButtonText: "OK",
        confirmButtonColor: "#518915",
        timer: 1500,
      });
      return;
    }

    setLoading(true);
    try {
      await Promise.all([
        handleEnviarEmails ? Promise.resolve(handleEnviarEmails()) : Promise.resolve(),
        new Promise((res) => setTimeout(res, 1500)),
      ]);
      Swal.fire({
        icon: "success",
        title: "Envíos realizados con éxito",
        confirmButtonText: "OK",
        confirmButtonColor: "#518915",
      });
    } finally {
      setLoading(false);
    }
  }
  //region return
  return (
    <>
      <TitleView title={`Turnos ${destinatario}`} />
      <div className="flex flex-col items-start justify-between w-full px-6 py-3 bg-white border border-gray-200 rounded-lg shadow md:flex-row">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-primaryBlue">Recordatorio de turnos</h2>
          <p className="max-w-2xl mb-0 text-gray-700">
            Este proceso automatiza el envío masivo de emails a {destinatario}, informando los
            turnos programados para mañana.
          </p>
        </div>

        <div className="self-end flex-shrink-0 mt-4 md:mt-0 md:ml-8 md:self-center">
          <button
            className={
              `px-6 py-2 rounded font-semibold shadow transition-all duration-200 text-lg flex items-center gap-2 ` +
              (hayDatos && !loading
                ? "bg-primaryGreen text-white hover:bg-greenHover"
                : "bg-gray-300 text-gray-400 cursor-default opacity-80")
            }
            type="button"
            onClick={handleProcesar}
            disabled={!hayDatos || loading}
          >
            {loading && <ClipLoader color="#2563eb" size={20} speedMultiplier={0.8} />}
            {loading ? "Procesando..." : "Procesar"}
          </button>
        </div>
      </div>

      <div className="flex items-end w-full my-2">
        <SearchByDateCard
          presenteManana={true}
          diaSeleccionado={diaSeleccionado}
          setDiaSeleccionado={setDiaSeleccionado}
        />

        <div
          className="flex items-center h-10 gap-2 px-4 rounded-lg bg-blue-50 border border-blue-300 shadow-sm text-blue-900 font-semibold text-sm mb-2.5"
          // title="Fecha y hora del último envío de emails"
        >
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          <span>
            Último proceso:
            <span className="ml-2 font-mono text-blue-800">
              {ultimoProceso ? ultimoProceso : "-"}
            </span>
          </span>
        </div>
      </div>

      <div className="flex justify-start w-full px-5 overflow-y-auto lg:overflow-visible ">
        <TablaDefault props={propsTabla} />
      </div>
    </>
  );
}
