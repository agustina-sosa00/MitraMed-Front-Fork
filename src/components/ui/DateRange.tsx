import { ConfigProvider, DatePicker } from "antd";
import esES from "antd/locale/es_ES";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";
import type { RangePickerProps } from "antd/es/date-picker";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FaTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

export function DateRangePickerPresetsExample() {
  const [range, setRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [state, setState] = useState({
    from: "",
    to: "",
  });
  const [loader, setLoader] = useState(false);
  console.log("state", state);
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

  const handleBorrar = () => {
    setRange(null);
    setState({ from: "", to: "" });
  };

  const handleBuscar = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      console.log("desde", state.from, "hasta", state.to);
    }, 2000);
  };

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
      <Button
        label="buscar"
        loader={loader}
        handle={() => handleBuscar()}
        classButton="w-28 flex justify-center"
        icon={<FaMagnifyingGlass className="!text-white" />}
        disabledButton={!state.from || !state.to}
      />
      <Button
        label="borrar"
        classButton={` text-white ${
          !state.from || !state.to
            ? "!bg-gray-400 !cursor-not-allowed !pointer-events-none"
            : "bg-red-500 hover:bg-red-600"
        } `}
        handle={handleBorrar}
        icon={<FaTrashAlt />}
      />
    </div>
  );
}
