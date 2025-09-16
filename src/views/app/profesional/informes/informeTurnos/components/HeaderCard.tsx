import { useEffect, useState, useRef } from "react";
import { Button } from "@/views/components/Button";
import { ConfigProvider, DatePicker } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useInformeTurnosStore } from "../store/informeTurnosStore";
import { useMemo } from "react";
import { close } from "@/frontend-resourses/assets/icons";
import dayjs, { Dayjs } from "dayjs";
import esES from "antd/locale/es_ES";
import "dayjs/locale/es";
import { useMutation } from "@tanstack/react-query";
import { obtenerInformeTurnos } from "../service/InformeTurnosService";
import Swal from "sweetalert2";
import { PriceInput } from "@/frontend-resourses/components";
import RadioInput from "@/frontend-resourses/components/Inputs/RadioInput";

type DateRangePickerProps = {
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HeaderCard({ loader, setLoader }: DateRangePickerProps) {
  dayjs.locale("es");

  const {
    informeTurnosData,
    selectedDates,
    setSelectedDates,
    setInformeTurnosData,
    clearInformeTurnosData,
    filtroTipo,
    setFiltroTipo,
    filtroValue,
    setFiltroValue,
    hasSearched,
    setHasSearched,
  } = useInformeTurnosStore();

  // Inicializar el rango a partir de selectedDates si ya tiene valores
  const initialRange: [Dayjs | null, Dayjs | null] | null =
    selectedDates.from && selectedDates.to
      ? [dayjs(selectedDates.from, "DD/MM/YYYY"), dayjs(selectedDates.to, "DD/MM/YYYY")]
      : null;

  const [range, setRange] = useState<[Dayjs | null, Dayjs | null] | null>(initialRange);

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

  const radioOptions = [
    { value: "nespecialidad", label: "Especialidad" },
    { value: "ndoctor", label: "Profesional" },
    { value: "nosocial", label: "Obra Social" },
  ];

  // Calcular totales sobre la data original
  const { totalObraSocial, totalParticulares, totalTotal } = useMemo(() => {
    const data = Array.isArray(informeTurnosData?.data) ? informeTurnosData.data : [];
    let totalObraSocial = 0;
    let totalParticulares = 0;
    data.forEach((item) => {
      if (item.nosocial && String(item.nosocial).trim() !== "") {
        totalObraSocial += Number(item.importe) || 0;
      } else {
        totalParticulares += Number(item.importe) || 0;
      }
    });
    return {
      totalObraSocial,
      totalParticulares,
      totalTotal: totalObraSocial + totalParticulares,
    };
  }, [informeTurnosData]);

  const totalesData = [
    {
      label: "Obra Social:",
      value: totalObraSocial,
      border: false,
    },
    {
      label: "Particulares:",
      value: totalParticulares,
      border: false,
    },
    {
      label: "Total:",
      value: totalTotal,
      border: true,
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

  function onRangeChange(
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string],
  ) {
    setRange(dates);
    const [from, to] = dateStrings;
    const selected = dates ? { from, to } : { from: "", to: "" };
    setSelectedDates(selected);
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

    if (rangePickerRef.current && typeof rangePickerRef.current.focus === "function") {
      setTimeout(() => {
        rangePickerRef.current.focus();
      }, 50);
    }
  }

  return (
    <div className="flex w-full mb-1 border rounded p-2 bg-slate-100">
      {/* Date Picker y Filtro */}
      <div className="flex flex-col">
        {/* Date Picker */}
        <div className="flex gap-3 border rounded p-2 bg-white">
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
              className={`h-7 border-2 rounded border-gray-300 hover:border-greenFocus text-blue placeholder:text-blue
                [&.ant-picker-focused]:!border-green
                [&.ant-picker-focused]:!shadow-[0_0_0_2px_rgba(22,163,74,0.25)]
                [&_.ant-picker-input>input]:text-blue
                [&_.ant-picker-input>input::placeholder]:text-gray-600
                ${hasSearched ? "bg-[#f5f6fa] !text-gray-700 !font-bold [&_.ant-picker-input>input]:!text-emerald-500" : ""}
              `}
              disabled={hasSearched}
              style={hasSearched ? { background: "#f5f6fa", color: "#222", opacity: 1 } : {}}
              inputReadOnly={hasSearched}
            />
          </ConfigProvider>

          {/* Botones Procesar y Cancelar */}
          <div className="flex items-end gap-2">
            <Button
              label="Procesar"
              loader={loader}
              handle={handleSearch}
              classButton="w-38 flex justify-center text-xs h-6"
              icon={<FaMagnifyingGlass className="" />}
              disabledButton={!selectedDates.from || !selectedDates.to || hasSearched}
            />

            <Button
              classButton={` text-white text-xs h-6  ${
                disabledButtonTrash
                  ? "cursor-not-allowed pointer-events-none"
                  : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
              } `}
              padding="2"
              handle={handleClean}
              icon={
                <img
                  src={close}
                  alt="Cerrar"
                  className={`w-3 h-3 ${disabledButtonTrash ? "grayscale opacity-40" : ""}`}
                />
              }
              custom={true}
              disabledButton={disabledButtonTrash}
            />
          </div>
        </div>

        {/* Filtro */}

        <div className="flex flex-col max-w-md gap-2 mt-2  px-4 py-2 border rounded bg-white">
          <label
            htmlFor="filtro"
            className={`text-sm font-medium transition-colors duration-200 ${!hasSearched ? "text-gray-400" : "text-gray-700"}`}
          >
            Filtrar por:
          </label>

          {/* Radio Inputs */}
          <div className="flex gap-3 mb-0.5">
            {radioOptions.map((opt) => (
              <RadioInput
                key={opt.value}
                checked={filtroTipo === opt.value}
                onChange={() => setFiltroTipo(opt.value)}
                label={opt.label}
                inputClassName="accent-green-600"
                labelClassName={`text-xs ${!hasSearched ? "cursor-default" : "cursor-pointer"}`}
                disabled={!hasSearched}
              />
            ))}
          </div>

          <input
            id="filtro"
            type="text"
            ref={filtroInputRef}
            className="h-6 w-90 px-2  py-1 text-sm border border-gray-300 rounded "
            value={filtroValue}
            onChange={(e) => setFiltroValue(e.target.value)}
            disabled={!hasSearched}
          />
        </div>
      </div>

      {/* Totales */}
      <div className="flex flex-1 items-end justify-center ">
        <div className="flex flex-col w-96 px-8 py-2 gap-3 rounded border border-gray-200 bg-white">
          {totalesData.map((item, _idx) => (
            <div
              key={item.label}
              className={`flex justify-between ${item.border ? " border-t border-gray-300 pt-3 mt-2" : ""}`}
            >
              <span
                className={
                  `min-w-28 font-semibold tracking-wider ` +
                  (hasSearched ? "text-slate-600 " : "text-gray-500 opacity-60 cursor-not-allowed")
                }
              >
                {item.label}
              </span>
              <PriceInput
                value={item.value}
                disabled
                addInputClassName={`w-36 text-xl text-red-600 !font-bold !border-0 !p-0 !h-6 !bg-transparent`}
                withPrefix={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
