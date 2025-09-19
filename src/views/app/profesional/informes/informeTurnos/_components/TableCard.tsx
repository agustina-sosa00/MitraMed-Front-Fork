import { useEffect } from "react";
import { PriceInput, TablaDefault } from "@/frontend-resourses/components";
import { calculadorDeEdad } from "../utils/calculadorDeEdad";
import { useInformeTurnosStore } from "../store/informeTurnosStore";
import dayjs from "dayjs";

export default function TableCard() {
  const {
    informeTurnosData,
    filtroTipo,
    filtroValue,
    filteredRows,
    setFilteredRows,
    hasSearched,
    setTotals,
    totals,
  } = useInformeTurnosStore();

  const columns = [
    {
      key: "fecha",
      label: "Fecha",
      minWidth: "70",
      maxWidth: "70",
      resaltar: true,
      renderCell: (item: any) => (
        <span className="!text-[11px]">
          {item.fecha ? dayjs(item.fecha).format("DD/MM/YYYY") : ""}
        </span>
      ),
    },
    {
      key: "hora_ini",
      label: "Hora",
      minWidth: "60",
      maxWidth: "80",
      renderCell: (item: any) => <span className="!text-[11px]">{item.hora_ini}</span>,
    },
    {
      key: "dni",
      label: "DNI",
      minWidth: "70",
      maxWidth: "70",
      renderCell: (item: any) => <span className="!text-[11px]">{item.dni}</span>,
    },
    {
      key: "edad",
      label: "Edad",
      minWidth: "50",
      maxWidth: "60",
      renderCell: (item: any) => (
        <span className="!text-[11px]">{calculadorDeEdad({ age: item.fnacim })}</span>
      ),
    },
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
    {
      key: "nespecialidad",
      label: "Especialidad",
      minWidth: "150",
      maxWidth: "150",
      renderCell: (item: any) => <span className="!text-[11px]">{item.nespecialidad}</span>,
    },
    {
      key: "ndoctor",
      label: "Profesional",
      minWidth: "180",
      maxWidth: "180",
      renderCell: (item: any) => <span className="!text-[11px]">{item.ndoctor}</span>,
    },
    {
      key: "nosocial",
      label: "Obra Social",
      minWidth: "120",
      maxWidth: "120",
      renderCell: (item: any) => <span className="!text-[11px]">{item.nosocial}</span>,
    },
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

  const datosFooter: { [key: string]: any } = {
    fecha: totals.totalRegistros,
    importe: totals.totalImportes,
  };

  const datosParaTabla =
    hasSearched && Array.isArray(informeTurnosData?.data) && informeTurnosData.data.length > 0
      ? informeTurnosData.data.map((item, idx) => ({ id: idx + 1, ...item }))
      : [];

  const propsTabla = {
    datosParaTabla,
    objectColumns: columns,
    objectFooter: {
      footer: true,
      footerHeight: "h-6",
      datosFooter: datosFooter,
    },
    objectStyles: {
      heightContainer: "300px",
      addHeaderColor: "#022539",
      withScrollbar: true,
      columnasNumber: [3, 9],
    },
    sinDatos: hasSearched,
    selectFn: true,
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

  return (
    <div className="border px-2 pt-2 pb-3 rounded bg-slate-100">
      <TablaDefault props={propsTabla} />
    </div>
  );
}
