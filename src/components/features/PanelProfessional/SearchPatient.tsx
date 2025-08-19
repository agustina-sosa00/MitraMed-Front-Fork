import React, { useEffect, useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { RiSave3Line } from "react-icons/ri";
import { Button } from "@/components/ui/Button";
import { SearchPatientProps } from "@/types/index";

export const SearchPatient: React.FC<SearchPatientProps> = ({
  handleFindPatient,
  editOdontogram,
  handleSave,
  setEditOdontogram,
  odontogram,
  data,
  setStateModal,
  state,
  setState,
  setShowData,
  handleCancel,
}) => {
  // region states y variables
  const [autoFocusInput, setAutoFocusInput] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [loader, setLoader] = useState(false);
  const [errorState, setErrorState] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [styleDisabled, setStyleDisabled] = useState(false);

  const hasValidPatient = Boolean(data?.dni);
  const canEdit = hasValidPatient && !isEditing && !loader && !errorState;
  //region useEffects
  useEffect(() => {
    setAutoFocusInput(true);
  }, []);

  // region functions
  function handleOnChangeDni(e: React.ChangeEvent<HTMLInputElement>) {
    setState(e.target.value);
    setErrorState("");
  }

  function handleSearchPatient() {
    if (state.length === 0) {
      setErrorState("Debe ingresar un DNI");
      inputRef.current?.focus();
    } else if (!/^\d+$/.test(state)) {
      setErrorState("El DNI debe ser numérico y sin punto. Ej: 12345678");
      inputRef.current?.focus();
    } else {
      setLoader(true);
      setTimeout(() => {
        setIsEditing(false);
        handleFindPatient(state);
        setLoader(false);
      }, 2000);
      setStyleDisabled(true);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (state.length === 0) {
      setErrorState("Debe ingresar un DNI");
    } else if (e.key === "Enter") {
      handleSearchPatient();
    } else if (e.key === "Escape") {
      setState("");
    }
  }

  function handleEditInput() {
    setIsEditing(true);
    setShowData && setShowData(false);
  }

  function handleCancelButton() {
    handleCancel && handleCancel();
    setIsEditing(false);
    setShowData && setShowData(true);
  }

  return (
    <div className="flex flex-col w-full pb-3">
      <div className="flex justify-between w-full h-12 ">
        {!isEditing ? (
          <>
            {state.length > 0 && (
              <div
                className={`flex  py-1 h-14 justify-between gap-1   w-2/3     items-center `}
              >
                <div className="flex items-center gap-1">
                  <label className="text-sm font-bold capitalize text-blue">
                    Ingresar DNI:
                  </label>
                  <div
                    className={`h-8 px-2 py-1 font-bold border  border-gray-300 rounded w-32 bg-lightGray focus:outline-none  ${
                      styleDisabled ? "bg-gray-200 text-gray-400 " : "text-blue"
                    }`}
                  >
                    {state}
                  </div>
                  <button
                    type="button"
                    onClick={handleEditInput}
                    className="flex items-center justify-center h-8 px-2 py-1 text-red-500 transition-all duration-300 border border-gray-300 rounded bg-lightGray hover:bg-gray-200"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div
            className={`flex py-1 h-14 justify-start gap-1 w-2/3  items-center `}
          >
            <div className="flex items-center gap-1">
              {" "}
              <label className="text-sm font-bold capitalize text-blue">
                Ingresar DNI:
              </label>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  name="dni"
                  value={state}
                  onChange={handleOnChangeDni}
                  className={`h-8 px-2 py-1 font-bold border rounded w-32  bg-lightGray  focus:outline-none text-blue ${
                    errorState ? "border-red-500" : "border-gray-300"
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
            </div>

            {errorState && (
              <p className="text-xs font-bold text-red-500 w-72">
                {errorState}
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-end w-1/3">
          {odontogram ? (
            <Button
              label="agregar consulta"
              icon={<IoMdAdd />}
              disabledButton={!canEdit}
              handle={() => setStateModal && setStateModal(true)}
            />
          ) : (
            <div className="flex items-center justify-end w-auto h-16 gap-2 px-2 py-1">
              {editOdontogram ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center justify-center h-8 gap-1 px-2 py-1 text-white capitalize rounded bg-green hover:bg-greenHover"
                  >
                    <RiSave3Line />
                    guardar
                  </button>
                  <button
                    onClick={handleCancelButton}
                    className="flex items-center justify-center h-8 gap-1 px-2 py-1 text-white capitalize bg-red-500 rounded hover:bg-red-600"
                  >
                    <MdCancel /> cancelar
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditOdontogram && setEditOdontogram(true)}
                  disabled={!canEdit}
                  className={`h-8 px-2 py-1 flex items-center gap-1 justify-center text-white capitalize rounded w-48   ${
                    !canEdit
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green hover:bg-greenHover"
                  }`}
                >
                  <FaPencil /> editar odontograma
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {/* ------------------------------------------------------------------------------------- */}
      {/* ------------------------------------------------------------------------------------- */}
      {/* ------------------------------------------------------------------------------------- */}
      {/* ------------------------------------------------------------------------------------- */}
      {/* ------------------------------------------------------------------------------------- */}
      <div className="flex flex-col w-full gap-1 ">
        <div className="flex justify-center w-full gap-2">
          <div className="flex flex-col w-1/2 text-blue">
            <p className="text-sm font-bold">Nombre: </p>
            <p className="w-full h-8 px-2 py-1 text-sm border border-gray-300 rounded bg-lightGray">
              {data?.nombre || "-"}
            </p>
          </div>
          <div className="flex flex-col w-1/2 text-blue">
            <p className="text-sm font-bold">Apellido: </p>
            <p className="w-full h-8 px-2 py-1 text-sm border border-gray-300 rounded bg-lightGray">
              {data?.apellido || "-"}
            </p>
          </div>
          <div className="flex flex-col w-1/2 text-blue">
            <p className="text-sm font-bold">DNI: </p>
            <p className="w-full h-8 px-2 py-1 text-sm border border-gray-300 rounded bg-lightGray">
              {data?.dni || "-"}
            </p>
          </div>
        </div>

        <div className="flex justify-center w-full gap-2">
          <div className="flex flex-col w-1/2 text-blue">
            <p className="text-sm font-bold">Edad: </p>
            <p className="w-full h-8 px-2 py-1 text-sm border border-gray-300 rounded bg-lightGray">
              {data?.edad || "-"}
            </p>
          </div>
          <div className="flex flex-col w-1/2 text-blue">
            <p className="text-sm font-bold">Fecha de Nacimiento: </p>
            <p className="w-full h-8 px-2 py-1 text-sm border border-gray-300 rounded bg-lightGray">
              {data?.fnacim || "-"}
            </p>
          </div>
          <div className="flex flex-col w-1/2 text-blue">
            <p className="text-sm font-bold">Obra Social</p>
            <p className="w-full h-8 px-2 py-1 text-sm border border-gray-300 rounded bg-lightGray">
              {data?.idosocial !== 0 ? data?.nosocial : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
