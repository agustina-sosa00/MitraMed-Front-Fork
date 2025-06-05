import React from "react";
interface IProp {
  especialidad?: string;
  doctor?: string;
  fecha?: string;
  dia?: string;
  hora?: string;
  textButton?: string;
  handle?: (id: number | undefined) => void;
  id?: number;
}
export const Card = ({
  especialidad,
  doctor,
  fecha,
  dia,
  hora,
  textButton,
  handle,
  id,
}: IProp) => {
  return (
    <div className="flex flex-col justify-between bg-white rounded w-[250px] min-h-52  ">
      <div className="px-6 py-5 ">
        <div className="flex items-center justify-center w-full text-left">
          <div className="flex flex-col w-full gap-1 ">
            <h2 className="text-sm font-medium tracking-tighter text-blue">
              <span className="font-semibold">Especialidad: </span>
              {especialidad}
            </h2>
            <p className="text-sm text-gray-500 ">
              <span className="font-semibold">Doctor: </span> {doctor}
            </p>
            <p className="text-sm text-gray-500 ">
              <span className="font-semibold">Fecha: </span>
              {fecha}
            </p>
            <p className="text-sm text-gray-500 ">
              <span className="font-semibold">Día: </span>
              {dia}
            </p>
            <p className="text-sm text-gray-500 ">
              <span className="font-semibold">Hora: </span>
              {hora}
            </p>
          </div>
        </div>
      </div>
      {textButton && (
        <div className="flex justify-end w-full px-6 mb-3 ">
          <button
            onClick={() => handle?.(id)}
            className="px-4 py-1 text-sm text-white transition duration-200 bg-red-500 rounded hover:bg-red-600"
          >
            {textButton}
          </button>
        </div>
      )}
    </div>
  );
};
