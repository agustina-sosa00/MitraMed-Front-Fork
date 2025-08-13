import { Button } from "@/components/ui/Button";
import { useMedicalHistoryContext } from "../../../context/MedicalHistoryContext";
import React, { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { SearchPatientProps } from "../../../mock/arrayTableProfessional";
import { useLocation } from "react-router-dom";

export const SearchPatient: React.FC<SearchPatientProps> = ({
  handleFindPatient,
  viewImg,
  odontogram,
  labelSearch,
  data,
  noHc,
  setHc,
  setStateModal,
  inputRef,
  errorMessage,
}) => {
  console.log(errorMessage);
  const location = useLocation();
  const { numHistory, setNumHistory } = useMedicalHistoryContext();
  const isDisabled = !numHistory.trim();
  const [isEditing, setIsEditing] = useState(true);
  const handleOnChangeDni = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumHistory(e.target.value);
  };
  const [loader, setLoader] = useState(false);
  const errorText =
    errorMessage?.trim() ||
    (noHc ? "Error inesperado. Intente mas tarde." : "");
  const showError = !!errorText;
  const handleSearchPatient = () => {
    if (numHistory.length > 0) {
      setLoader(true);
      setTimeout(() => {
        setIsEditing(false);
        handleFindPatient(numHistory);
        setLoader(false);
      }, 2000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && numHistory.length > 0) {
      handleSearchPatient();
    } else if (e.key === "Escape") {
      setNumHistory("");
    }
  };

  useEffect(() => {
    if (!location.pathname.startsWith("/profesionales/historial")) {
      setNumHistory("");
    }
  }, []);
  useEffect(() => {
    if (errorMessage || noHc) {
      setIsEditing(true);
      requestAnimationFrame(() => {
        const el = inputRef?.current;
        if (!el) return;
        el.focus({ preventScroll: true });
        const len = el.value.length;
        el.setSelectionRange(len, len);
      });
    }
  }, [errorMessage, noHc, inputRef]);
  useEffect(() => {
    if (isEditing) {
      setHc && setHc(false);
      requestAnimationFrame(() => {
        const el = inputRef?.current;
        if (!el) return;
        el.focus({ preventScroll: true });
        const len = el.value.length;
        el.setSelectionRange(len, len);
      });
    }
  }, [isEditing, inputRef]);
  function handleOnMouseDown(e) {
    if (isDisabled) {
      e.preventDefault();
      inputRef?.current?.focus();
    }
  }
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (isDisabled || loader) {
      e.preventDefault();
      inputRef?.current?.focus({ preventScroll: true });
      return;
    }
    handleSearchPatient();
  }

  function handlePointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    if (isDisabled) {
      e.preventDefault(); // cubre touch
      inputRef?.current?.focus({ preventScroll: true });
    }
  }

  function handleEditing() {
    setIsEditing(true);
  }

  return (
    <>
      {!isEditing ? (
        <>
          {numHistory.length > 0 && (
            <div
              className={`flex  py-1 min-h-16 justify-between gap-1 w-full items-end `}
            >
              <div className="flex items-center gap-1">
                <label className="text-sm font-medium text-blue">
                  {labelSearch}:{" "}
                </label>
                <div className="h-8 px-2 py-1 font-bold border border-gray-300 rounded w-28 bg-lightGray focus:outline-none text-blue">
                  {numHistory}
                </div>
                <button
                  type="button"
                  onClick={handleEditing}
                  className="flex items-center justify-center h-8 px-2 py-1 transition-all duration-300 border border-gray-300 rounded bg-lightGray text-greenHover hover:bg-gray-200"
                >
                  <FaPencil />
                </button>
              </div>
              {noHc || errorMessage ? null : (
                <div className="flex flex-col flex-[1] gap-1 p-1  ">
                  <div className="flex justify-center w-full gap-1 ">
                    <div className="flex flex-col w-1/2 text-blue ">
                      <p className="text-sm font-bold">Nombre: </p>
                      <p className="w-full h-8 px-2 py-1 text-sm border border-gray-300 rounded bg-lightGray">
                        {data.nombre}
                      </p>
                    </div>
                    <div className="flex flex-col w-1/2 text-blue ">
                      <p className="text-sm font-bold">Apellido: </p>
                      <p className="w-full h-8 px-2 py-1 text-sm border border-gray-300 rounded bg-lightGray">
                        {data.apellido}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center w-full gap-1 ">
                    <div className="flex flex-col w-1/2 text-blue ">
                      <p className="text-sm font-bold">DNI: </p>
                      <p className="w-full h-8 px-2 py-1 text-sm border border-gray-300 rounded bg-lightGray">
                        {data.dni}
                      </p>
                    </div>
                    <div className="flex flex-col w-1/2 text-blue ">
                      <p className="text-sm font-bold">Fecha de Nacimiento: </p>
                      <p className="w-full h-8 px-2 py-1 text-sm border border-gray-300 rounded bg-lightGray">
                        {data.fnacim}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center w-full gap-1 ">
                    <div className="flex flex-col w-1/2 text-blue ">
                      <p className="text-sm font-bold">Edad: </p>
                      <p className="w-full h-8 px-2 py-1 text-sm border border-gray-300 rounded bg-lightGray">
                        {data.edad}
                      </p>
                    </div>
                    <div className="flex flex-col w-1/2 text-blue ">
                      <p className="text-sm font-bold">Obra Social</p>
                      <p className="w-full h-8 px-2 py-1 text-sm border border-gray-300 rounded bg-lightGray">
                        {data.idosocial !== 0 ? data.nosocial : "No posee"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* datos para mostrar de historial medico opcionales */}

              {odontogram && !errorMessage && (
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
          className={`flex  py-1 h-16 justify-start gap-1 w-full ${
            viewImg ? "items-center" : "items-center"
          } `}
        >
          <label className="text-sm font-medium text-blue">
            {labelSearch}:{" "}
          </label>
          <div className="relative ">
            <input
              type="text"
              name="dni"
              value={numHistory}
              ref={inputRef}
              onChange={handleOnChangeDni}
              className={`h-8 px-2 py-1 font-bold border  rounded w-28 bg-lightGray focus:outline-none text-blue focus:border-green  ${
                showError ? "border-red-500" : "border-gray-300 "
              } `}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </div>

          <button
            type="button"
            onClick={handleClick}
            onMouseDown={(e) => handleOnMouseDown(e)}
            onPointerDown={handlePointerDown}
            aria-disabled={isDisabled}
            className={`flex items-center justify-center w-8 h-8 px-2 py-1 border rounded border-gray-300 bg-lightGray
              ${
                isDisabled
                  ? "text-gray-400 cursor-not-allowed"
                  : "transition-all duration-300    text-greenHover hover:bg-gray-200"
              }`}
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
          {showError && (
            <p className="text-xs font-bold text-red-500 w-72">{errorText}</p>
          )}
        </div>
      )}
    </>
  );
};
