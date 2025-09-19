import { useEffect, useRef } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RiCloseLargeFill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { RiSave3Line } from "react-icons/ri";
import { Button } from "@/views/_components/Button";
import { BuscadorDePacientesProps } from "@/views/app/profesional/types/index";
import React from "react";
import Swal from "sweetalert2";

export default function BuscadorDePacientes({
  onSearch,
  editOdontogram,
  handleSave,
  setEditOdontogram,
  odontogram,
  data,
  handleDeletePatient,
  setStateModal,
  state,
  setState,
  handleCancel,
  errorState,
  setErrorState,
  changes,
  isActive,
  hasConfirmed,
  loading,
}: BuscadorDePacientesProps) {
  // region states y variables
  const isOdontologo = localStorage.getItem("mtm-tusuario");
  const isEditing = !hasConfirmed;
  const inputRef = useRef<HTMLInputElement>(null);
  const hasValidPatient = Boolean(data?.dni);
  const canEdit = hasValidPatient && !isEditing && !loading && !errorState;

  //region useEffects
  useEffect(() => {
    if (!hasConfirmed) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [hasConfirmed]);

  // region functions
  function handleOnChangeDni(e: React.ChangeEvent<HTMLInputElement>) {
    setState(e.target.value);
    setErrorState?.("");
  }

  function handleSearchPatient() {
    if (state.length === 0) {
      setErrorState?.("Debe ingresar un DNI");
      inputRef.current?.focus();
      return;
    }
    if (!/^\d+$/.test(state)) {
      setErrorState?.("El DNI debe ser numérico y sin punto. Ej: 12345678");
      inputRef.current?.focus();
      return;
    }

    onSearch?.(state);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearchPatient();
    } else if (e.key === "Escape") {
      handleCancel?.();
    }
  }

  function handleEditInput() {
    if (!editOdontogram) {
      handleDeletePatient?.();
      inputRef.current?.focus();
    }
  }

  function handleCancelButton() {
    if (!changes) {
      handleCancel?.();
    } else {
      Swal.fire({
        title: "Existen Cambios sin Guardar",
        icon: "warning",
        text: "¿Desea Salir?",
        showCancelButton: true,
        confirmButtonColor: "#518915",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          handleCancel?.();
        }
      });
    }
  }

  //region return
  return (
    <div className="flex flex-col w-full gap-2 ">
      <div className="flex items-center justify-between w-full h-10 ">
        {hasConfirmed ? (
          <>
            {state.length > 0 && (
              <div className={`flex  py-1 h-14 justify-between gap-1   w-2/3     items-center `}>
                <div className="flex items-center justify-start gap-2">
                  <label className="text-base font-bold text-primaryGreen">Ingresar DNI:</label>

                  <div className="flex gap-1 w-36">
                    <div
                      className={` px-1 text-base flex items-center font-bold border  border-gray-300  rounded w-full bg-lightGray focus:outline-none  ${
                        !hasConfirmed ? "bg-gray-200 text-gray-400 " : "text-primaryBlue"
                      }`}
                    >
                      {state}
                    </div>
                    <button
                      type="button"
                      onClick={handleEditInput}
                      disabled={editOdontogram}
                      className={`h-8 px-2 py-1 border rounded bg-lightGray
                    ${
                      editOdontogram
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-red-500 hover:bg-gray-200"
                    }`}
                    >
                      <RiCloseLargeFill className="text-xl " />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className={`flex py-1 h-14 justify-start gap-1 w-2/3  items-center `}>
            <div className="flex items-end gap-1">
              {" "}
              <label className="text-base font-bold text-primaryGreen">Ingresar DNI:</label>
              <div className="flex gap-1 w-36 ">
                <input
                  ref={inputRef}
                  type="text"
                  name="dni"
                  value={state}
                  onChange={handleOnChangeDni}
                  onKeyDown={handleKeyDown}
                  autoFocus={!hasConfirmed}
                  readOnly={!isEditing}
                  disabled={!isEditing}
                  className={`h-8 px-2 py-1 w-full bg-gray-200 font-bold rounded 
                focus:outline-none text-primaryBlue focus-within:border-primaryGreen focus-within:ring-1 focus-within:ring-primaryGreen
                ${errorState && "border-red-500"}`}
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={handleSearchPatient}
                  className="flex items-center justify-center w-8 h-8 px-2 py-1 transition-all duration-300 bg-gray-200 border border-gray-300 rounded text-greenHover hover:text-white hover:bg-greenHover hover:border-primaryGreen "
                >
                  {loading ? (
                    <svg className="w-8 circle-loader animate-spin" viewBox="25 25 50 50">
                      <circle r="20" cy="50" cx="50" className="circleNormal"></circle>
                    </svg>
                  ) : (
                    <FaMagnifyingGlass className="text-xl " />
                  )}
                </button>
              </div>
            </div>

            {errorState && errorState?.length > 0 && (
              <p className="text-xs font-bold text-red-500 ">{errorState}</p>
            )}
          </div>
        )}
      </div>

      {
        //region data user
      }
      {!hasConfirmed ? (
        <div className="w-full h-24 bg-gray-200 rounded"></div>
      ) : (
        <div className="flex items-center justify-center w-full h-24 gap-1 bg-white border rounded border-primaryGreen">
          <div className="flex items-center justify-end h-full w-36">
            <FaUserCircle className="w-full h-16 text-greenHover" />
          </div>
          <div className="flex flex-col items-center justify-center w-full h-20 gap-1 ">
            <div className="flex justify-start w-full gap-2">
              <h1 className="text-2xl font-semibold text-primaryBlue">
                {data?.nombre} {data?.apellido}
              </h1>
            </div>

            <div className="flex justify-start w-full gap-10">
              <div className="flex items-center justify-center text-primaryBlue">
                <p className="text-sm ">DNI: </p>
                <p className="px-2 text-lg font-bold ">{data?.dni}</p>
              </div>
              <div className="flex items-center justify-center text-primaryBlue">
                <p className="text-sm ">Edad: </p>
                <p className="px-2 text-lg font-bold ">{data?.edad}</p>
              </div>
              <div className="flex items-center justify-center text-primaryBlue">
                <p className="text-sm text-nowrap">Fecha de Nacimiento: </p>
                <p className="w-full px-2 text-lg font-bold">
                  {data?.fnacim
                    ? new Date(data.fnacim).toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : ""}
                </p>
              </div>
              <div className="flex items-center justify-center text-primaryBlue">
                <p className="text-sm text-nowrap">Obra Social:</p>
                <p className="w-full px-2 text-lg font-bold">
                  {data?.idosocial !== 0 && data?.nosocial}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {
        //region botones
      }
      {odontogram ? (
        <div className="flex items-center justify-end w-full h-10 ">
          <Button
            label="agregar registro"
            icon={<IoMdAdd />}
            disabledButton={!canEdit}
            handle={() => setStateModal && setStateModal(true)}
          />{" "}
        </div>
      ) : null}
      {!odontogram ? (
        <div className="w-full">
          <div className="absolute bottom-0 right-0 flex items-center gap-2 p-2 ">
            {editOdontogram ? (
              <div className="flex flex-col gap-2">
                <button
                  disabled={isActive || !changes}
                  onClick={handleSave}
                  className={`flex items-center justify-center w-32 h-8 gap-1 px-2 py-1 text-white capitalize rounded  ${
                    isActive || !changes
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primaryGreen hover:bg-greenHover"
                  } `}
                >
                  <RiSave3Line />
                  guardar
                </button>
                <button
                  disabled={isActive}
                  onClick={handleCancelButton}
                  className="flex items-center justify-center w-32 h-8 gap-1 px-2 py-1 text-white capitalize bg-red-500 rounded hover:bg-red-600"
                >
                  <MdCancel /> cancelar
                </button>
              </div>
            ) : isOdontologo !== "3" ? null : (
              <button
                disabled={!canEdit}
                onClick={() => setEditOdontogram && setEditOdontogram(true)}
                className={`h-8 px-2 py-1 flex items-center gap-1 justify-center text-white capitalize rounded w-32   ${
                  !canEdit
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primaryGreen hover:bg-greenHover"
                }`}
              >
                <FaRegEdit /> editar
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
