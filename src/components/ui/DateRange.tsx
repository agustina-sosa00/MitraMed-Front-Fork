import { ConfigProvider, DatePicker } from "antd";
import esES from "antd/locale/es_ES";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";
import type { RangePickerProps } from "antd/es/date-picker";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
// import { FaTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { close } from "@/frontend-resourses/assets/icons";

export function DateRangePickerPresetsExample({
  state,
  setState,
  handleSearch,
  loader,
  setLoader,
  disabledButtonTrash,
}) {
  const [range, setRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [isProcessed, setIsProcessed] = useState(false); // Nuevo estado

  dayjs.locale("es");
  const { RangePicker } = DatePicker;

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

  const onRangeChange: RangePickerProps["onChange"] = (dates, dateStrings) => {
    setRange(dates);
    const [from, to] = dateStrings;
    setState(dates ? { from, to } : { from: "", to: "" });
  };

  function handleLimpiar() {
    setRange(null);
    setState({ from: "", to: "" });
    setIsProcessed(false);
  }

  async function handleBuscar() {
    setLoader(true);
    await handleSearch();
    setIsProcessed(true);
  }

  return (
    <div className="flex w-full gap-3">
      {" "}
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
          value={range}
          format="DD/MM/YYYY"
          presets={rangePresets}
          onChange={onRangeChange}
          placeholder={["Desde", "Hasta"]}
          className="border-2 rounded border-gray-300 hover:border-greenFocus  text-blue  placeholder:text-blue [&.ant-picker-focused]:!border-green
          [&.ant-picker-focused]:!shadow-[0_0_0_2px_rgba(22,163,74,0.25)]  [&_.ant-picker-input>input]:text-blue [&_.ant-picker-input>input::placeholder]:text-gray-600"
        />
      </ConfigProvider>
      {/* <ActionButton icon={<FaMagnifyingGlass className="!text-white" />} text="Procesar" /> */}
      <div className="flex gap-2 items-end">
        <Button
          label="Procesar"
          loader={loader}
          handle={() => handleBuscar()}
          classButton="w-38 flex justify-center text-xs h-6"
          icon={<FaMagnifyingGlass className="" />}
          disabledButton={!state.from || !state.to || isProcessed}
        />

        <Button
          classButton={` text-white text-xs h-6  ${
            disabledButtonTrash
              ? "cursor-not-allowed pointer-events-none"
              : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
          } `}
          padding="2"
          handle={handleLimpiar}
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
  );
}
