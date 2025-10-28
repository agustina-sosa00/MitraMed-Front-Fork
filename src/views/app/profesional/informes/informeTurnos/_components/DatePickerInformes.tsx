import { ConfigProvider, DatePicker } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useInformeTurnosStore } from "../store/informeTurnosStore";
import esES from "antd/locale/es_ES";
import { ActionButton } from "@/frontend-resourses/components";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useProfesionalStore } from "../../../_store/ProfesionalStore";
import { useMutation } from "@tanstack/react-query";
import { obtenerInformeTurnos } from "../service/InformeTurnosService";
import Swal from "sweetalert2";
export default function DatePickerInformes() {
  //region store global
  const loader = useProfesionalStore((state) => state.loader);
  const setLoader = useProfesionalStore((state) => state.setLoader);
  const setLoaderKey = useProfesionalStore((state) => state.setLoaderKey);

  //region store informe turnos
  const setFilteredRows = useInformeTurnosStore((state) => state.setFilteredRows);
  const informeTurnosData = useInformeTurnosStore((state) => state.informeTurnosData);
  const setInformeTurnosData = useInformeTurnosStore((state) => state.setInformeTurnosData);
  const selectedDates = useInformeTurnosStore((state) => state.selectedDates);
  const setSelectedDates = useInformeTurnosStore((state) => state.setSelectedDates);
  const hasSearched = useInformeTurnosStore((state) => state.hasSearched);
  const setHasSearched = useInformeTurnosStore((state) => state.setHasSearched);
  const clearInformeTurnosData = useInformeTurnosStore((state) => state.clearInformeTurnosData);

  const { RangePicker } = DatePicker;
  const rangePickerRef = useRef<any>(null);
  const filtroInputRef = useRef<HTMLInputElement>(null);

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
  const initialRange: [Dayjs | null, Dayjs | null] | null =
    selectedDates.from && selectedDates.to
      ? [dayjs(selectedDates.from, "DD/MM/YYYY"), dayjs(selectedDates.to, "DD/MM/YYYY")]
      : null;
  const [range, setRange] = useState<[Dayjs | null, Dayjs | null] | null>(initialRange);

  // El botón de limpiar solo debe estar habilitado cuando hay datos y hasSearched es true, y no está cargando
  const disabledButtonTrash = !(hasSearched && informeTurnosData?.data?.length > 0) || loader;

  //region mutate
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

  //region useEffect
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
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hasSearched]);

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

  //region function
  function handleSearch() {
    setLoader(true);
    setLoaderKey("datepicker-informes");
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

  function onRangeChange(
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string],
  ) {
    setRange(dates);
    const [from, to] = dateStrings;
    const selected = dates ? { from, to } : { from: "", to: "" };
    setSelectedDates(selected);
  }

  //region return
  return (
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
          loaderKey="datepicker-informes"
          colorLoader="#fffff"
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
  );
}
