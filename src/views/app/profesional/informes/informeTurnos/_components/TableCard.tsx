import { useEffect } from "react";
import { PriceInput, TablaDefault } from "@/frontend-resourses/components";
import { calculadorDeEdad } from "../utils/calculadorDeEdad";
import { useInformeTurnosStore } from "../store/informeTurnosStore";
import dayjs from "dayjs";
import { generarFilasVacias } from "@/utils/tableUtils";

export default function TableCard() {
  const {
    informeTurnosData,
    filtroTipo,
    filtroValue,
    filteredRows,
    setFilteredRows,
    hasSearched,
    setTotals,
    especialidadesSeleccionadas,
    profesionalesSeleccionados,
    obrasSocialesSeleccionadas,
  } = useInformeTurnosStore();

  const columns = [
    {
      key: " ",
      label: "",
      minWidth: "0",
      maxWidth: "0",
      renderCell: () => null,
    },
    // FECHA
    {
      key: "fecha",
      label: "Fecha",
      minWidth: "75",
      maxWidth: "75",
      resaltar: true,
      renderCell: (item: any) => (
        <span className="!text-[11px]">
          {item.fecha ? dayjs(item.fecha).format("DD/MM/YYYY") : ""}
        </span>
      ),
    },
    // HORA
    {
      key: "hora_ini",
      label: "Hora",
      minWidth: "55",
      maxWidth: "55",
      renderCell: (item: any) => <span className="!text-[11px]">{item.hora_ini}</span>,
    },
    // DNI
    {
      key: "dni",
      label: "DNI",
      minWidth: "55",
      maxWidth: "70",
      renderCell: (item: any) => <span className="!text-[11px]">{item.dni}</span>,
    },
    // EDAD
    {
      key: "edad",
      label: "Edad",
      minWidth: "35",
      maxWidth: "60",
      renderCell: (item: any) => (
        <span className="!text-[11px]">{calculadorDeEdad({ age: item.fnacim })}</span>
      ),
    },
    // PACIENTE
    {
      key: "paciente",
      label: "Paciente",
      minWidth: "200",
      maxWidth: "260",
      renderCell: (item: any) => (
        <span className="!text-[11px] !uppercase">
          {item.apellido ? item.apellido : ""}
          {item.apellido && item.nombre ? ", " : ""}
          {item.nombre ? item.nombre : ""}
        </span>
      ),
    },
    // ESPECIALIDAD
    {
      key: "nespecialidad",
      label: "Especialidad",
      minWidth: "150",
      maxWidth: "150",
      renderCell: (item: any) => <span className="!text-[11px]">{item.nespecialidad}</span>,
    },
    // PROFESIONAL
    {
      key: "ndoctor",
      label: "Profesional",
      minWidth: "180",
      maxWidth: "180",
      renderCell: (item: any) => <span className="!text-[11px]">{item.ndoctor}</span>,
    },
    // OBRA SOCIAL
    {
      key: "nosocial",
      label: "Obra Social",
      minWidth: "120",
      maxWidth: "120",
      renderCell: (item: any) => <span className="!text-[11px]">{item.nosocial}</span>,
    },
    // $ IMPORTE
    {
      key: "importe",
      label: "$ Importe",
      minWidth: "100",
      maxWidth: "100",
      resaltar: true,
      renderCell: (item: any) => (
        <PriceInput
          value={item.importe}
          addInputClassName={`w-20 h-4 text-xs font-bold bg-transparent border-0`}
          disabled
          withPrefix={false}
        />
      ),
    },
    // TIPO TURNO
    {
      key: "",
      label: "",
      minWidth: "50",
      maxWidth: "50",
      renderCell: (item: any) => {
        if (item.idusuario) {
          return <span className="!text-[11px]">Web</span>;
        }
        return null;
      },
    },
  ];

  // const datosFooter: { [key: string]: any } = {
  //   fecha: totals.totalRegistros,
  //   importe: totals.totalImportes,
  // };

  const datosFiltrados =
    hasSearched && Array.isArray(informeTurnosData?.data) && informeTurnosData.data.length > 0
      ? filtrarDatosTabla(informeTurnosData.data)
      : [];

  // Ordenar por fecha ascendente
  const datosFiltradosOrdenados = [...datosFiltrados].sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime(),
  );

  let datosParaTabla = datosFiltradosOrdenados.map((item, idx) => ({ id: idx + 1, ...item }));
  if (datosParaTabla.length === 0) {
    datosParaTabla = generarFilasVacias(13, columns);
  }

  const propsTabla = {
    datosParaTabla,
    objectColumns: columns,
    // objectFooter: {
    //   footer: false,
    //   footerHeight: "h-6",
    //   datosFooter: datosFooter,
    // },
    objectStyles: {
      heightContainer: "310px",
      addHeaderColor: "#022539",
      withScrollbar: true,
      columnasNumber: [3, 9],
    },
    sinDatos: hasSearched,
    selectFn: hasSearched,
    filtro: true,
    filtroKeys: [filtroTipo],
    filtroValue: filtroValue,
    callbackFilter: (filas) => {
      // Solo actualizo si cambian las filas (por id y longitud)
      // para evitar bucle infinito
      const prev = filteredRows;
      const sameLength = prev.length === filas.length;
      const sameIds = sameLength && prev.every((row, idx) => row.id === filas[idx].id);
      if (!sameLength || !sameIds) {
        setFilteredRows(filas);
      }
    },
  };

  useEffect(() => {
    const totalRegistros = filteredRows.length;
    const totalImportes = filteredRows
      .map((item) => Number(item.importe) || 0)
      .reduce((acc, curr) => acc + curr, 0);
    setTotals({ totalRegistros, totalImportes });
  }, [filteredRows, setTotals]);

  function filtrarDatosTabla(datos: any[]) {
    if (!datos || datos.length === 0) return [];

    const excluidos: any[] = [];
    const filtrados = datos.filter((item) => {
      // ...existing code...
      const especialidadValida =
        especialidadesSeleccionadas.length === 0 ||
        especialidadesSeleccionadas.some((esp) => esp.value === item.idespecialidad?.toString());
      const profesionalValido =
        profesionalesSeleccionados.length === 0 ||
        profesionalesSeleccionados.some((prof) => prof.value === item.iddoctor?.toString());
      const obraSocialValida =
        obrasSocialesSeleccionadas.length === 0 ||
        obrasSocialesSeleccionadas.some((os) => os.value === item.idosocial?.toString());

      const pasa = especialidadValida && profesionalValido && obraSocialValida;
      if (!pasa) excluidos.push(item);
      return pasa;
    });

    // console.log("Registros excluidos:", excluidos);

    return filtrados;
  }

  return (
    <div className="border px-2 pt-2 pb-3 rounded bg-slate-100">
      <TablaDefault props={propsTabla} />
    </div>
  );
}
