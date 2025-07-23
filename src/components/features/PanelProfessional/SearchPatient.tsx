import React, { useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";

export interface IObjetcPatient {
  label: string;
  value: string;
}

interface SearchPatientProps {
  handleFindPatient: () => void;
  viewImg: boolean;
  showData: boolean;
  labelSearch: string;
  data: IObjetcPatient[];
}
export const SearchPatient: React.FC<SearchPatientProps> = ({
  handleFindPatient,
  viewImg,
  showData,
  labelSearch,
  data,
}) => {
  const [dni, setDni] = useState<string>("");

  const handleOnChangeDni = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDni(e.target.value);
  };

  return (
    <>
      {showData ? (
        <div
          className={`flex  py-1 h-16 justify-start gap-1 w-full ${
            viewImg ? "items-end" : "items-center"
          } `}
        >
          <label className="text-sm font-medium text-blue">
            {labelSearch}:{" "}
          </label>
          <div className="h-8 px-2 py-1 font-bold border border-gray-300 rounded w-28 bg-lightGray focus:outline-none text-blue">
            {dni}
          </div>
          <button
            type="button"
            onClick={handleFindPatient}
            className="flex items-center justify-center h-8 px-2 py-1 transition-all duration-300 border border-gray-300 rounded bg-lightGray text-greenHover hover:bg-gray-200"
          >
            <FaPencil />
          </button>
          <div className="flex items-end justify-end gap-3 px-3">
            {data.map((item) => (
              <h3 className="text-sm capitalize text-blue ">
                {item.label}:{" "}
                <span className="text-base font-medium capitalize ">
                  {item.value}
                </span>
              </h3>
            ))}

            {/* datos para mostrar de historial medico opcionales */}
            {viewImg && (
              <img
                src="/user.jpg"
                alt="user"
                className="w-16 h-16 border border-gray-300 rounded-full"
              />
            )}
          </div>
        </div>
      ) : (
        <div
          className={`flex  py-1 h-16 justify-start gap-1 w-full ${
            viewImg ? "items-end" : "items-center"
          } `}
        >
          <label className="text-sm font-medium text-blue">
            {labelSearch}:{" "}
          </label>
          <input
            type="text"
            name="dni"
            value={dni}
            placeholder="11222333"
            onChange={handleOnChangeDni}
            className="h-8 px-2 py-1 font-bold border border-gray-300 rounded w-28 bg-lightGray focus:outline-none text-blue"
          />
          <button
            type="button"
            onClick={handleFindPatient}
            className="flex items-center justify-center h-8 px-2 py-1 transition-all duration-300 border border-gray-300 rounded bg-lightGray text-greenHover hover:bg-gray-200"
          >
            <FaMagnifyingGlass />
          </button>
        </div>
      )}
    </>
  );
};
