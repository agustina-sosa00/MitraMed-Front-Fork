import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { useEffect, useState, useRef } from "react";
import excelIcon from "@/frontend-resourses/assets/icons/excel.png";
import { ConfigProvider, DatePicker } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useInformeTurnosStore } from "../store/informeTurnosStore";
import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { obtenerInformeTurnos } from "../service/InformeTurnosService";
import { PriceInput } from "@/frontend-resourses/components";
import { FaFilter } from "react-icons/fa";
import ActionButton from "@/frontend-resourses/components/Buttons/ActionButton";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";
import esES from "antd/locale/es_ES";
import Swal from "sweetalert2";

import ModalFiltro1 from "@/frontend-resourses/components/Modales/ModalFiltro1";
import { IoClose } from "react-icons/io5";

type DateRangePickerProps = {
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HeaderCard({ loader, setLoader }: DateRangePickerProps) {
  const {
    informeTurnosData,
    tableColumns,
    filteredRows,
    setFilteredRows,
    selectedDates,
    setSelectedDates,
    setInformeTurnosData,
    clearInformeTurnosData,
    hasSearched,
    setHasSearched,
    especialidadesSeleccionadas,
    profesionalesSeleccionados,
    obrasSocialesSeleccionadas,
    setEspecialidadesSeleccionadas,
    setProfesionalesSeleccionados,
    setObrasSocialesSeleccionadas,
  } = useInformeTurnosStore();

  // Colores personalizados para los botones del modal
  const customColor = "#518915";
  const customColorHover = "#417a11";

  const initialRange: [Dayjs | null, Dayjs | null] | null =
    selectedDates.from && selectedDates.to
      ? [dayjs(selectedDates.from, "DD/MM/YYYY"), dayjs(selectedDates.to, "DD/MM/YYYY")]
      : null;

  const [range, setRange] = useState<[Dayjs | null, Dayjs | null] | null>(initialRange);

  // Estados para el modal de filtro
  const [showModalFiltro, setShowModalFiltro] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [dataModal, setDataModal] = useState<any[]>([]);
  const [tipoFiltroActivo, setTipoFiltroActivo] = useState<string>("");

  const { RangePicker } = DatePicker;
  const rangePickerRef = useRef<any>(null);
  const filtroInputRef = useRef<HTMLInputElement>(null);

  // El botón de limpiar solo debe estar habilitado cuando hay datos y hasSearched es true, y no está cargando
  const disabledButtonTrash = !(hasSearched && informeTurnosData?.data?.length > 0) || loader;

  const rangePresets: RangePickerProps["presets"] = [
    { label: "Ayer", value: [dayjs().add(-1, "d"), dayjs().add(-1, "d")] },
    { label: "Últimos 7 días", value: [dayjs().add(-7, "d"), dayjs()] },
    { label: "Últimos 15 días", value: [dayjs().add(-15, "d"), dayjs()] },
    { label: "Últimos 30 días", value: [dayjs().add(-30, "d"), dayjs()] },
    { label: "Este mes", value: [dayjs().startOf("month"), dayjs()] },
    {
      label: "Mes pasado",
      value: [
        dayjs().subtract(1, "month").startOf("month"),
        dayjs().subtract(1, "month").endOf("month"),
      ],
    },
    { label: "Este año", value: [dayjs().startOf("year"), dayjs()] },
    {
      label: "Año pasado",
      value: [
        dayjs().subtract(1, "year").startOf("year"),
        dayjs().subtract(1, "year").endOf("year"),
      ],
    },
  ];

  const filtroButtons = [
    { key: "especialidades", label: "Especialidades", campo: "especialidades" },
    { key: "doctores", label: "Profesionales", campo: "doctores" },
    { key: "obrasSociales", label: "Obras Sociales", campo: "obrasSociales" },
  ];

  const especialidades = useMemo(() => {
    if (!informeTurnosData?.data) return [];

    const especialidadesUnicas = Array.from(
      new Set(
        informeTurnosData.data
          .map((item) => item.nespecialidad)
          .filter(
            (especialidad) =>
              especialidad !== null && especialidad !== undefined && especialidad !== "",
          ),
      ),
    );

    return especialidadesUnicas.sort(); // Ordenar alfabéticamente
  }, [informeTurnosData]);

  const obrasSociales = useMemo(() => {
    if (!informeTurnosData?.data) return [];

    // Agrupa por idosocial y toma el primer nosocial válido
    const mapa = new Map();
    informeTurnosData.data.forEach((item) => {
      if (item.idosocial !== null && item.idosocial !== undefined && item.idosocial !== "") {
        if (!mapa.has(item.idosocial)) {
          mapa.set(item.idosocial, item.nosocial || String(item.idosocial));
        }
      }
    });

    // Si hay particulares, agregalos
    const hayParticulares = informeTurnosData.data.some((item) => item.idosocial === 0);
    if (hayParticulares) {
      mapa.set(0, "PARTICULAR");
    }

    // Devuelve array de objetos { value, name }
    return Array.from(mapa.entries()).map(([value, name]) => ({
      value: value.toString(),
      name,
    }));
  }, [informeTurnosData]);

  const profesionales = useMemo(() => {
    if (!informeTurnosData?.data) return [];

    const profesionalesUnicos = Array.from(
      new Set(
        informeTurnosData.data
          .map((item) => item.ndoctor)
          .filter(
            (profesional) =>
              profesional !== null && profesional !== undefined && profesional !== "",
          ),
      ),
    );

    return profesionalesUnicos.sort(); // Ordenar alfabéticamente
  }, [informeTurnosData]);

  const { totalImporte, countObraSocial, countParticulares, countTotal } = useMemo(() => {
    if (!hasSearched) {
      return {
        totalObraSocial: 0,
        totalParticulares: 0,
        totalImporte: 0,
        countObraSocial: 0,
        countParticulares: 0,
        countTotal: 0,
      };
    }
    const data = Array.isArray(filteredRows) ? filteredRows : [];
    let totalObraSocial = 0;
    let totalParticulares = 0;
    let countObraSocial = 0;
    let countParticulares = 0;
    data.forEach((item) => {
      if (item.nosocial && String(item.nosocial).trim() !== "") {
        totalObraSocial += Number(item.importe) || 0;
        countObraSocial++;
      } else {
        totalParticulares += Number(item.importe) || 0;
        countParticulares++;
      }
    });
    return {
      totalObraSocial,
      totalParticulares,
      totalImporte: totalObraSocial + totalParticulares,
      countObraSocial,
      countParticulares,
      countTotal: countObraSocial + countParticulares,
    };
  }, [filteredRows, hasSearched]);

  const totalesData = [
    {
      label: "Obra Social:",
      value: countObraSocial,
      border: false,
      isImporte: false,
    },
    {
      label: "Particulares:",
      value: countParticulares,
      border: false,
      isImporte: false,
    },
    {
      label: "Total Consultas:",
      value: countTotal,
      border: true,
      isImporte: false,
    },
    {
      label: "Total Importe:",
      value: totalImporte,
      border: true,
      isImporte: true,
    },
  ];

  const { mutate: mutateInforme } = useMutation({
    mutationFn: obtenerInformeTurnos,
    onError: (error) => {
      setLoader(false);
      throw new Error(`${error}`);
    },
    onSuccess: (data) => {
      setLoader(false);
      if (data.data.length === 0) {
        setHasSearched(false);
        Swal.fire({
          icon: "info",
          text: "No Hay Movimientos en el Período Seleccionado",
          confirmButtonText: "Aceptar",
        });
      } else {
        setHasSearched(true);
        setInformeTurnosData(data);
        // Focus the filter input after successful search
        setTimeout(() => {
          if (filtroInputRef.current) {
            filtroInputRef.current.focus();
          }
        }, 50);
      }
    },
  });

  useEffect(() => {
    if (rangePickerRef.current) {
      setTimeout(() => {
        if (rangePickerRef.current && typeof rangePickerRef.current.focus === "function") {
          rangePickerRef.current.focus();
        }
      }, 100);
    }
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && hasSearched) {
        handleClean();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hasSearched]);

  useEffect(() => {
    if (selectedDates.from && selectedDates.to) {
      setRange([dayjs(selectedDates.from, "DD/MM/YYYY"), dayjs(selectedDates.to, "DD/MM/YYYY")]);
    } else {
      setRange(null);
    }
  }, [selectedDates]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && hasSearched) {
        handleClean();
      }
      if (e.key === "Enter" && !hasSearched && selectedDates.from && selectedDates.to) {
        handleSearch();
        setTimeout(() => {
          if (filtroInputRef.current) {
            filtroInputRef.current.focus();
          }
        }, 100);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hasSearched, selectedDates]);

  // useEffect para inicializar todos los filtros con todos los datos seleccionados
  useEffect(() => {
    if (!hasSearched) return;
    if (informeTurnosData?.data && informeTurnosData.data.length > 0) {
      // Inicializar especialidades con todas seleccionadas
      const especialidadesFormateadas = especialidades.map((nombre, index) => {
        const registro = informeTurnosData.data.find((item) => item.nespecialidad === nombre);
        return {
          id: index.toString(),
          name: nombre,
          value: registro?.idespecialidad?.toString() || "",
        };
      });

      // Inicializar profesionales con todos seleccionados
      const profesionalesFormateados = profesionales.map((nombre, index) => {
        const registro = informeTurnosData.data.find((item) => item.ndoctor === nombre);
        return {
          id: index.toString(),
          name: nombre,
          value: registro?.iddoctor?.toString() || "",
        };
      });

      // Inicializar obras sociales con todas seleccionadas
      const obrasSocialesFormateadas = obrasSociales.map((os, index) => ({
        id: index.toString(),
        name: os.name,
        value: os.value,
      }));

      setEspecialidadesSeleccionadas(especialidadesFormateadas);
      setProfesionalesSeleccionados(profesionalesFormateados);
      setObrasSocialesSeleccionadas(obrasSocialesFormateadas);
    }
  }, [informeTurnosData, especialidades, profesionales, obrasSociales, hasSearched]);

  // useEffect para sincronizacion cruzada segun filtros elegidos
  useEffect(() => {
    if (!informeTurnosData?.data || !hasSearched) return;

    // Filtrar la data según los filtros activos
    const dataFiltrada = informeTurnosData.data.filter((item) => {
      const especialidadValida =
        especialidadesSeleccionadas.length === 0 ||
        especialidadesSeleccionadas.some((esp) => esp.value === item.idespecialidad?.toString());
      const profesionalValido =
        profesionalesSeleccionados.length === 0 ||
        profesionalesSeleccionados.some((prof) => prof.value === item.iddoctor?.toString());
      const obraSocialValida =
        obrasSocialesSeleccionadas.length === 0 ||
        obrasSocialesSeleccionadas.some((os) => os.value === item.idosocial?.toString());
      return especialidadValida && profesionalValido && obraSocialValida;
    });

    // Calcular los ids válidos en la data filtrada
    const especialidadesValidas = Array.from(
      new Set(dataFiltrada.map((item) => item.idespecialidad?.toString())),
    );
    const doctoresValidos = Array.from(
      new Set(dataFiltrada.map((item) => item.iddoctor?.toString())),
    );
    const obrasSocialesValidas = Array.from(
      new Set(dataFiltrada.map((item) => item.idosocial?.toString())),
    );

    // Solo actualizar si hay cambios reales para evitar bucles infinitos
    const nuevasEspecialidades = especialidadesSeleccionadas.filter((e) =>
      especialidadesValidas.includes(e.value),
    );
    const nuevosProfesionales = profesionalesSeleccionados.filter((d) =>
      doctoresValidos.includes(d.value),
    );
    const nuevasObrasSociales = obrasSocialesSeleccionadas.filter((o) =>
      obrasSocialesValidas.includes(o.value),
    );

    const arraysIguales = (a, b) =>
      a.length === b.length && a.every((v, i) => v.value === b[i].value);

    if (!arraysIguales(nuevasEspecialidades, especialidadesSeleccionadas)) {
      setEspecialidadesSeleccionadas(nuevasEspecialidades);
    }
    if (!arraysIguales(nuevosProfesionales, profesionalesSeleccionados)) {
      setProfesionalesSeleccionados(nuevosProfesionales);
    }
    if (!arraysIguales(nuevasObrasSociales, obrasSocialesSeleccionadas)) {
      setObrasSocialesSeleccionadas(nuevasObrasSociales);
    }
  }, [
    especialidadesSeleccionadas,
    profesionalesSeleccionados,
    obrasSocialesSeleccionadas,
    informeTurnosData,
    hasSearched,
    setEspecialidadesSeleccionadas,
    setProfesionalesSeleccionados,
    setObrasSocialesSeleccionadas,
  ]);

  // Limpiar filteredRows al montar si no hay búsqueda activa
  useEffect(() => {
    if (!hasSearched && filteredRows.length > 0) {
      setFilteredRows([]);
    }
  }, []);

  function onRangeChange(
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string],
  ) {
    setRange(dates);
    const [from, to] = dateStrings;
    const selected = dates ? { from, to } : { from: "", to: "" };
    setSelectedDates(selected);
  }

  function getDatosFiltro(tipo: string) {
    switch (tipo) {
      case "especialidades":
        return especialidades;
      case "doctores":
        return profesionales;
      case "obrasSociales":
        return obrasSociales;
      default:
        return [];
    }
  }

  function getSetter(tipo: string) {
    switch (tipo) {
      case "especialidades":
        return setEspecialidadesSeleccionadas;
      case "doctores":
        return setProfesionalesSeleccionados;
      case "obrasSociales":
        return setObrasSocialesSeleccionadas;
      default:
        return () => {};
    }
  }

  // Función para obtener los items seleccionados según el tipo de filtro
  function getItemsSeleccionados(tipo: string) {
    switch (tipo) {
      case "especialidades":
        return especialidadesSeleccionadas;
      case "doctores":
        return profesionalesSeleccionados;
      case "obrasSociales":
        return obrasSocialesSeleccionadas;
      default:
        return [];
    }
  }

  function handleOpenModal(tipoFiltro: string, labelFiltro: string) {
    if (tipoFiltro === "obrasSociales") {
      const datosFormateados = obrasSociales.map((os, index) => ({
        id: index.toString(),
        name: os.name,
        value: os.value,
      }));
      setDataModal(datosFormateados);
      setModalTitle(`${labelFiltro}`);
      setTipoFiltroActivo(tipoFiltro);
      setShowModalFiltro(true);
      return;
    }

    // Para especialidades y doctores, mantener la lógica anterior
    const datos = getDatosFiltro(tipoFiltro);
    const datosFormateados = datos.map((nombre, index) => {
      let idCorrespondiente = "";
      if (informeTurnosData?.data) {
        const registro = informeTurnosData.data.find((item) => {
          switch (tipoFiltro) {
            case "especialidades":
              return item.nespecialidad === nombre;
            case "doctores":
              return item.ndoctor === nombre;
            default:
              return false;
          }
        });
        if (registro) {
          switch (tipoFiltro) {
            case "especialidades":
              idCorrespondiente = registro.idespecialidad?.toString() || "";
              break;
            case "doctores":
              idCorrespondiente = registro.iddoctor?.toString() || "";
              break;
          }
        }
      }
      return {
        id: index.toString(),
        name: nombre,
        value: idCorrespondiente,
      };
    });
    setDataModal(datosFormateados);
    setModalTitle(`${labelFiltro}`);
    setTipoFiltroActivo(tipoFiltro);
    setShowModalFiltro(true);
  }

  function handleSearch() {
    setLoader(true);
    mutateInforme({
      fini: selectedDates?.from.split("/").reverse().join("-"),
      ffin: selectedDates?.to.split("/").reverse().join("-"),
    });
  }

  function handleClean() {
    setRange(null);
    clearInformeTurnosData();
    setHasSearched(false);
    setLoader(false);
    setSelectedDates({ from: "", to: "" });
    setFilteredRows([]); // Limpiar también los datos filtrados para que los totales se vacíen

    if (rangePickerRef.current && typeof rangePickerRef.current.focus === "function") {
      setTimeout(() => {
        rangePickerRef.current.focus();
      }, 50);
    }
  }

  function handleExportExcel() {
    let exportColumns = [...tableColumns];
    if (!exportColumns.some((col) => col.key === "idturno")) {
      exportColumns = [{ key: "idturno", label: "ID Turno" }, ...exportColumns];
    }

    const data = filteredRows.map((row) => {
      const obj: Record<string, any> = {};
      exportColumns.forEach((col) => {
        obj[col.label || col.key] = row[col.key];
      });
      return obj;
    });

    const worksheet = XLSX.utils.json_to_sheet(data);

    // Ajustar anchos de columna automáticamente
    const colWidths = exportColumns.map((col) => {
      const header = col.label || col.key;
      const maxLen = Math.max(
        header.length,
        ...data.map((row) => (row[header] ? String(row[header]).length : 0)),
      );
      return { wch: maxLen + 2 };
    });
    worksheet["!cols"] = colWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja1");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "informeTurnos.xlsx");
  }

  //region return
  return (
    <div className="flex justify-between w-full p-2 mb-1 border rounded bg-slate-100">
      {/* Date Picker y Filtro */}
      <div className="flex flex-col justify-between">
        {/* Date Picker */}
        <div className="flex gap-3 p-2 bg-white border rounded">
          <ConfigProvider
            locale={esES}
            theme={{
              token: {
                colorPrimary: "#518915",
                controlOutline: "rgba(22,163,74,.25)",
              },
            }}
          >
            <RangePicker
              ref={rangePickerRef}
              value={range}
              format="DD/MM/YYYY"
              presets={rangePresets}
              onChange={onRangeChange}
              placeholder={["Desde", "Hasta"]}
              className={`h-7 border-2 rounded border-gray-300 hover:border-greenFocus text-primaryBlue placeholder:text-primaryBlue
                [&.ant-picker-focused]:!border-primaryGreen
                [&.ant-picker-focused]:!shadow-[0_0_0_2px_rgba(22,163,74,0.25)]
                [&_.ant-picker-input>input]:text-primaryBlue
                [&_.ant-picker-input>input::placeholder]:text-gray-600
                ${hasSearched ? "bg-[#f5f6fa] !text-gray-700 !font-bold [&_.ant-picker-input>input]:!text-emerald-500" : ""}
              `}
              disabled={hasSearched}
              style={{
                width: 260,
                ...(hasSearched ? { background: "#f5f6fa", color: "#222", opacity: 1 } : {}),
              }}
              inputReadOnly={hasSearched}
            />
          </ConfigProvider>

          {/* Botones Procesar y Cancelar */}
          <div className="flex items-end gap-2">
            <ActionButton
              text="Procesar"
              loader={loader}
              onClick={handleSearch}
              addClassName="w-28 flex justify-center text-xs h-7 "
              icon={<FaMagnifyingGlass className="" />}
              disabled={!selectedDates.from || !selectedDates.to || hasSearched}
              color="green-mtm"
            />

            <ActionButton
              icon={<IoClose />}
              addClassName="h-7"
              color="customGray"
              customColorText={"red-500"}
              disabled={disabledButtonTrash}
              onClick={handleClean}
            />
          </div>
        </div>

        {/* Filtro */}
        <div className="flex max-w-lg gap-2 px-4 py-2 mt-2 bg-white border rounded">
          {/* Botones de Filtro */}
          {filtroButtons.map((filtro) => (
            <ActionButton
              key={filtro.key}
              onClick={() => handleOpenModal(filtro.key, filtro.label)}
              disabled={!hasSearched}
              custom={true}
              customColor={customColor}
              customColorHover={customColorHover}
              size="sm"
              addClassName={`px-3 py-2 text-sm border ${hasSearched ? "text-white" : "text-slate-400"}`}
              icon={<FaFilter size={10} />}
              text={filtro.label}
            />
          ))}
        </div>
      </div>

      {/* Totales */}
      <div className="flex items-end justify-center flex-1 ">
        <div className="flex gap-2 px-4 py-2 bg-white border border-gray-200 rounded">
          {/* Columna de totales de consultas */}
          <div className="flex flex-col gap-3 pr-6 ">
            {totalesData
              .filter((item) => !item.isImporte)
              .map((item, _idx) => (
                <div
                  key={item.label}
                  className={`flex justify-between items-center ${item.border ? " border-t border-gray-300 pt-3 mt-2" : ""}`}
                >
                  <span
                    className={
                      `min-w-36 font-semibold tracking-wider text-lg ` +
                      (hasSearched ? "text-slate-700 " : "text-gray-400 opacity-80 cursor-default")
                    }
                  >
                    {item.label}
                  </span>
                  <span
                    className={
                      `w-16 text-xl font-bold text-right select-text ` +
                      (hasSearched ? "text-sky-600" : "text-gray-400 opacity-80")
                    }
                  >
                    {item.value}
                  </span>
                </div>
              ))}
          </div>

          {/* Columna de importe */}
          <div className="flex flex-col ">
            {totalesData
              .filter((item) => item.isImporte)
              .map((item, _idx) => (
                <div
                  key={item.label}
                  className={`flex flex-col h-full justify-between items-center gap-y-4 border-l border-gray-200`}
                >
                  <span
                    className={
                      ` font-bold tracking-wider text-lg  ` +
                      (hasSearched ? "text-slate-700 " : "text-gray-400 opacity-80 cursor-default")
                    }
                  >
                    {item.label}
                  </span>
                  <PriceInput
                    value={hasSearched ? item.value : 0}
                    disabled
                    addInputClassName={
                      `max-w-52 text-xl !font-bold !border-0 !p-0 !h-6 !bg-transparent ` +
                      (hasSearched ? "text-red-600" : "text-gray-500 opacity-60 cursor-default")
                    }
                    withPrefix={true}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Botón Exportar */}
      <div className="">
        <ActionButton
          disabled={!hasSearched}
          onClick={handleExportExcel}
          icon={
            <img
              src={excelIcon}
              alt="Excel"
              className={`w-4 h-4 ${hasSearched ? "" : "grayscale opacity-50"}`}
            />
          }
          text="Exportar"
          color="blue-mtm"
          addClassName="!rounded w-28"
        />
        {/* <button
          className={`ml-4 px-3 py-1 rounded text-sm font-semibold shadow flex items-center gap-2 ${
            hasSearched
              ? "bg-gray-500 text-white hover:bg-gray-600 cursor-pointer transition"
              : "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
          }`}
          type="button"
          onClick={handleExportExcel}
          disabled={!hasSearched}
        >
          <img
            src={excelIcon}
            alt="Excel"
            className={`w-5 h-5 ${hasSearched ? "" : "grayscale opacity-50"}`}
          />
          Exportar
        </button> */}
      </div>

      {/* Modal de Filtro */}
      <ModalFiltro1
        datos={dataModal}
        showModal={showModalFiltro}
        setShowModal={setShowModalFiltro}
        itemsDisponibles={dataModal}
        setItemsDisponibles={setDataModal}
        itemsSeleccionados={getItemsSeleccionados(tipoFiltroActivo)}
        setItemsSeleccionados={getSetter(tipoFiltroActivo)}
        title={modalTitle}
        renderItem={(item) => <span className="text-sm">{item.name || item.value}</span>}
        customColor={customColor}
        customColorHover={customColorHover}
        // iconReact={<FaFilter />}
        disabled={!hasSearched}
      />
    </div>
  );
}
