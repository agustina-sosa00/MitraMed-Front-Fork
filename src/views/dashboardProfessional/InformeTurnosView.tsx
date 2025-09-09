import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ContainView } from "@/components/features/PanelProfessional/ContainView";
import { calculateToAge } from "../../utils/calculateToAge";
// import { Metrics } from "./Metrics";
import dayjs from "dayjs";
import DateRangePicker from "@/components/ui/DateRangePicker";
import { PriceInput, TablaDefault } from "@/frontend-resourses/components";
import Swal from "sweetalert2";
import { useShiftReportStore } from "../../store/shiftReportStore";
import { obtenerInformeTurnos } from "@/services/InformeTurnosService";

// interface ShiftRow {
//   id: number;
//   idturno: number;
//   fecha: string;
//   iddoctor: number;
//   idespecialidad: number;
//   iddia: number;
//   idhorario: number;
//   ndoctor: string;
//   nespecialidad: string;
//   hora_ini: string;
//   hora_fin: string;
//   idusuario: number | null;
//   idpaciente: number;
//   apellido: string;
//   nombre: string;
//   dni: string;
//   fnacim: string;
//   idmovim: number;
//   secuencia: number;
//   idlibro: string;
//   idlibronc: string | null;
//   idosocial: number;
//   idplan: number;
//   nosocial: string | null;
//   tfactura: number;
//   estado_f: number;
//   importe: string | null;
//   obs: string | null;
//   // Si tienes más campos, agrégalos aquí
// }

export default function InformeTurnosView() {
  const {
    shiftReportData,
    clearShiftReportData,
    setShiftReportData,
    setSelectedDates,
    selectedDates = { from: "", to: "" },
  } = useShiftReportStore();

  const [state, setState] = useState({
    from: "",
    to: "",
  });
  // const [dataShifts, setDataShifts] = useState({
  //   data: [] as ShiftRow[],
  // });

  const [loader, setLoader] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false); // Nuevo estado

  const [hasSearched, setHasSearched] = useState(false);
  const disabledButtonTrash = hasSearched && shiftReportData?.data?.length > 0 && !loader;
  const totalRegistros = shiftReportData?.data?.length || 0;
  const totalImportes = (shiftReportData?.data || [])
    .map((item) => Number(item.importe) || 0)
    .reduce((acc, curr) => acc + curr, 0);

  const columns = [
    // Fecha
    {
      key: "fecha",
      label: "Fecha",
      minWidth: "70",
      maxWidth: "70",
      resaltar: true,
      renderCell: (item) => (
        <span className="!text-[11px]">
          {item.fecha ? dayjs(item.fecha).format("DD/MM/YYYY") : ""}
        </span>
      ),
    },
    // Hora Inicial
    {
      key: "hora_ini",
      label: "Hora",
      minWidth: "60",
      maxWidth: "80",
      renderCell: (item) => <span className="!text-[11px]">{item.hora_ini}</span>,
    },
    // DNI
    {
      key: "dni",
      label: "DNI",
      minWidth: "70",
      maxWidth: "70",
      renderCell: (item) => <span className="!text-[11px]">{item.dni}</span>,
    },
    // Edad
    {
      key: "edad",
      label: "Edad",
      minWidth: "50",
      maxWidth: "60",
      renderCell: (item) => (
        <span className="!text-[11px]">{calculateToAge({ age: item.fnacim })}</span>
      ),
    },
    // Paciente
    {
      key: "paciente",
      label: "Paciente",
      minWidth: "200",
      maxWidth: "260",
      renderCell: (item) => (
        <span className="!text-[11px] !uppercase">
          {item.apellido}, {item.nombre}
        </span>
      ),
    },
    // Especialidad
    {
      key: "nespecialidad",
      label: "Especialidad",
      minWidth: "150",
      maxWidth: "150",
      renderCell: (item) => <span className="!text-[11px]">{item.nespecialidad}</span>,
    },
    // Profesional
    {
      key: "ndoctor",
      label: "Profesional",
      minWidth: "180",
      maxWidth: "180",
      renderCell: (item) => <span className="!text-[11px]">{item.ndoctor}</span>,
    },
    // Obra Social
    {
      key: "nosocial",
      label: "Obra Social",
      minWidth: "120",
      maxWidth: "120",
      renderCell: (item) => <span className="!text-[11px]">{item.nosocial}</span>,
    },
    // Importe
    {
      key: "importe",
      label: "$ Importe",
      minWidth: "100",
      maxWidth: "100",
      resaltar: true,
      renderCell: (item) => (
        <PriceInput
          value={item.importe}
          addInputClassName={`w-20 h-4 text-xs font-bold bg-transparent border-0`}
          disabled
          withPrefix={false}
        />
      ),
    },
    // Web
    {
      key: "",
      label: "",
      minWidth: "50",
      maxWidth: "50",
      renderCell: (item) => {
        if (item.idusuario) {
          return <span className="!text-[11px]">Web</span>;
        }
        return null;
      },
    },
  ];

  const datosFooter: { [key: string]: any } = {
    fecha: totalRegistros,
    importe: totalImportes,
  };

  const propsTabla = {
    datosParaTabla: hasSearched ? shiftReportData?.data || [] : [],
    objectColumns: columns,
    objectFooter: {
      footer: true,
      footerHeight: "h-6",
      datosFooter: datosFooter,
    },
    objectStyles: {
      heightContainer: "400px",
      addHeaderColor: "#022539",
      withScrollbar: true,
      // containerClass: "border border-gray-300 rounded-t-lg ",
      // withBorder: false,
      columnasNumber: [3, 9],
    },
  };

  const { mutate: mutateDataShifts } = useMutation({
    mutationFn: obtenerInformeTurnos,
    onError: (error) => {
      setLoader(false);
      setIsProcessed(false);

      throw new Error(`${error}`);
    },
    onSuccess: (data) => {
      setTimeout(() => {
        setLoader(false);
        // setDataShifts(data);
        setHasSearched(true);

        if (data.data.length === 0) {
          setIsProcessed(false);
          setHasSearched(false);
          Swal.fire({
            icon: "info",
            text: "No Hay Movimientos en el Período Seleccionado",
            confirmButtonText: "Aceptar",
          });
        } else {
          setIsProcessed(true);
          setShiftReportData(data);
        }
      }, 800);
    },
  });

  useEffect(() => {
    if (shiftReportData?.data?.length) {
      setHasSearched(true);
      setIsProcessed(true);
    }
  }, []);

  // useEffect(() => {
  //   setHasSearched(false);
  // }, [state.from, state.to]);

  function handleOnSearch() {
    setIsProcessed(true);
    setLoader(true);
    mutateDataShifts({
      fini: state?.from.split("/").reverse().join("-"),
      ffin: state?.to.split("/").reverse().join("-"),
    });
  }

  function handleClean() {
    clearShiftReportData();
    setHasSearched(false);
    // setDataShifts({ data: [] });
    setIsProcessed(false);
    setLoader(false);
    setState({ from: "", to: "" });
  }

  return (
    <ContainView title="informe de turnos" padding="py-3 px-4" classContainer="">
      {/* Buscador */}
      <div className="flex w-full gap-3 py-5">
        <DateRangePicker
          state={state}
          setState={setState}
          handleSearch={handleOnSearch}
          handleClean={handleClean}
          loader={loader}
          setLoader={setLoader}
          disabledButtonTrash={!disabledButtonTrash}
          isProcessed={isProcessed}
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
          hasSearched={hasSearched}
        />
      </div>

      {/* Tabla */}
      <div className="w-full ">
        <TablaDefault props={propsTabla} />
      </div>

      {/* <Metrics /> */}
    </ContainView>
  );
}
