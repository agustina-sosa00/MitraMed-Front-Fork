import React, { useEffect, useState } from "react";
import { HiArrowSmLeft } from "react-icons/hi";

interface IProp {
  state: string;
  setState: (ag: string) => void;
  handle: (num: number) => void;
  styles?: string;
  subStyles?: string;
}
export const FilterTableSchedules = ({
  state,
  setState,
  handle,
  styles,
  subStyles,
}: IProp) => {
  const [dayColor, setDayColor] = useState<string>("");
  const [nameDay, setNameDay] = useState("");
  const newDay = new Date();
  const day = `${newDay.toISOString().split("T")[0]}`;
  useEffect(() => {
    setDayColor(
      day < state
        ? "text-red-500"
        : day == state
        ? "text-green"
        : "text-yellow-500"
    );
    const selectedDay = new Date(state + "T12:00:00");
    const options = { weekday: "long" } as const;

    const name = selectedDay.toLocaleDateString("es-AR", options);

    setNameDay(name);
  }, [day, state]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState && setState(e.target.value);
  };
  return (
    <div className={`${styles ? styles : "w-full  "}`}>
      <div
        className={` w-full gap-1 py-2   ${
          subStyles
            ? subStyles
            : "flex items-end justify-center lg:justify-start"
        }`}
      >
        <label className="text-sm font-medium text-blue">
          Filtrar por dia:
        </label>
        <button
          onClick={() => handle(-1)}
          className="p-1 transition-all duration-200 border border-gray-300 rounded text-blue bg-lightGray hover:bg-gray-300"
        >
          <HiArrowSmLeft className="text-2xl lg:text-3xl" />
        </button>
        <div className="flex flex-col items-center">
          <p className={`capitalize lg:text-lg font-bold ${dayColor}`}>
            <span className="text-sm font-medium text-blue">Día: </span>{" "}
            {nameDay}
          </p>
          <input
            required
            placeholder=""
            type="date"
            className={`px-2 py-1 lg:text-lg font-bold border border-gray-300 rounded  bg-lightGray ${dayColor}`}
            name="day"
            value={state}
            onChange={handleOnChange}
          />
        </div>

        <button
          onClick={() => handle(1)}
          className="p-1 transition-all duration-200 border border-gray-300 rounded text-blue bg-lightGray hover:bg-gray-300"
        >
          {" "}
          <HiArrowSmLeft className="text-2xl rotate-180 lg:text-3xl " />
        </button>
      </div>
    </div>
  );
};
