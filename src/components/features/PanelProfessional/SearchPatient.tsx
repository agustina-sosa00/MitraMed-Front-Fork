import React, { useEffect, useState } from "react";
import { FaPencil, FaMagnifyingGlass } from "react-icons/fa6";
import { Button } from "@/components/ui/Button";
import { SearchPatientProps } from "@/types/index";

export const SearchPatient: React.FC<SearchPatientProps> = ({
  handleFindPatient,
  viewImg,
  odontogram,
  labelSearch,
  data,
  noHc,
  setStateModal,
  state,
  setState,
}) => {
  const [autoFocusInput, setAutoFocusInput] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [loader, setLoader] = useState(false);

  const handleOnChangeDni = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const handleSearchPatient = () => {
    setLoader(true);
    setTimeout(() => {
      setIsEditing(false);
      handleFindPatient(state);
      setLoader(false);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchPatient();
    } else if (e.key === "Escape") {
      setState("");
    }
  };

  useEffect(() => {
    setAutoFocusInput(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!isEditing ? (
        <>
          {state.length > 0 && (
            <div
              className={`flex  py-1 min-h-16 justify-between gap-1 w-full items-end `}
            >
              <div className="flex items-center gap-1">
                <label className="text-sm font-medium text-blue">
                  {labelSearch}:{" "}
                </label>
                <div className="h-8 px-2 py-1 font-bold border border-gray-300 rounded w-28 bg-lightGray focus:outline-none text-blue">
                  {state}
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center justify-center h-8 px-2 py-1 transition-all duration-300 border border-gray-300 rounded bg-lightGray text-greenHover hover:bg-gray-200"
                >
                  <FaPencil />
                </button>
              </div>

              {/* Datos del paciente */}
              <div className="flex flex-col flex-[1] gap-1 p-1">
                <div className="flex justify-center w-full gap-1">
                  <div className="flex flex-col w-1/2 text-blue">
                    <p className="text-sm font-bold">Nombre: </p>
                    <p className="w-full h-8 px-2 py-1 text-sm border border-gray-300 rounded bg-lightGray">
                      {data?.nombre || "no encontrado"}
                    </p>
                  </div>
                  <div className="flex flex-col w-1/2 text-blue">
                    <p className="text-sm font-bold">Apellido: </p>
                    <p className="w-full h-8 px-2 py-1 text-sm border border-gray-300 rounded bg-lightGray">
                      {data?.apellido || "no encontrado"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center w-full gap-1">
                  <div className="flex flex-col w-1/2 text-blue">
                    <p className="text-sm font-bold">DNI: </p>
                    <p className="w-full h-8 px-2 py-1 text-sm border border-gray-300 rounded bg-lightGray">
                      {data?.dni || "no encontrado"}
                    </p>
                  </div>
                  <div className="flex flex-col w-1/2 text-blue">
                    <p className="text-sm font-bold">Fecha de Nacimiento: </p>
                    <p className="w-full h-8 px-2 py-1 text-sm border border-gray-300 rounded bg-lightGray">
                      {data?.fnacim || "no encontrado"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center w-full gap-1">
                  <div className="flex flex-col w-1/2 text-blue">
                    <p className="text-sm font-bold">Edad: </p>
                    <p className="w-full h-8 px-2 py-1 text-sm border border-gray-300 rounded bg-lightGray">
                      {data?.edad || "no encontrado"}
                    </p>
                  </div>
                  <div className="flex flex-col w-1/2 text-blue">
                    <p className="text-sm font-bold">Obra Social</p>
                    <p className="w-full h-8 px-2 py-1 text-sm border border-gray-300 rounded bg-lightGray">
                      {data?.idosocial !== 0 ? data?.nosocial : "No posee"}
                    </p>
                  </div>
                </div>
              </div>

              {odontogram && (
                <Button
                  label="agregar consulta"
                  handle={() => setStateModal && setStateModal(true)}
                />
              )}
            </div>
          )}
        </>
      ) : (
        <div
          className={`flex py-1 h-16 justify-start gap-1 w-full ${
            viewImg ? "items-center" : "items-center"
          }`}
        >
          <label className="text-sm font-medium uppercase text-blue">
            {labelSearch}:{" "}
          </label>
          <div className="relative">
            <input
              type="text"
              name="dni"
              value={state}
              onChange={handleOnChangeDni}
              className={`h-8 px-2 py-1 font-bold border rounded w-28  bg-lightGray  focus:outline-none text-blue ${
                noHc ? "border-red-500" : "border-gray-300"
              } ${autoFocusInput ? "focus:border-green border-2" : ""} `}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>

          <button
            type="button"
            onClick={handleSearchPatient}
            className="flex items-center justify-center w-8 h-8 px-2 py-1 transition-all duration-300 border border-gray-300 rounded bg-lightGray text-greenHover hover:bg-gray-200"
          >
            {loader ? (
              <svg
                className="w-8 h-8 circle-loader animate-spin"
                viewBox="25 25 50 50"
              >
                <circle
                  r="20"
                  cy="50"
                  cx="50"
                  className="circleNormal"
                ></circle>
              </svg>
            ) : (
              <FaMagnifyingGlass />
            )}
          </button>

          {noHc && (
            <p className="text-xs font-bold text-red-500 w-72">
              Debe ingresar un número de historia clínica
            </p>
          )}
        </div>
      )}
    </>
  );
};
