import React, { useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { RiSave3Line } from "react-icons/ri";
import { Button } from "@/components/ui/Button";
import { SearchPatientProps } from "@/types/index";
import Swal from "sweetalert2";

export const SearchPatient: React.FC<SearchPatientProps> = ({
  handleFindPatient,
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
  changes,
}) => {
  // region states y variables
  const [isEditing, setIsEditing] = useState(true);
  const [loader, setLoader] = useState(false);
  const [errorState, setErrorState] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [styleDisabled, setStyleDisabled] = useState(false);

  const hasValidPatient = Boolean(data?.dni);
  const canEdit = hasValidPatient && !isEditing && !loader && !errorState;

  //region useEffects

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
    handleDeletePatient && handleDeletePatient();
    setIsEditing(true);
  }

  function handleCancelButton() {
    if (!changes) {
      handleCancel && handleCancel();
      setIsEditing(false);
    } else {
      Swal.fire({
        title: "¿Desea cancelar la edición?",
        icon: "warning",
        text: "Los cambios no serán guardados",
        showCancelButton: true,
        confirmButtonColor: "#518915",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      })
        .then((result) => {
          if (result.isConfirmed) {
            handleCancel && handleCancel();
            setIsEditing(false);
          }
        })
        .catch((error) => {
          console.error("Error al mostrar la alerta:", error);
        });
    }
  }

  //region return
  return (
    <div className="flex flex-col w-full gap-1 ">
      <div className="flex items-center justify-between w-full h-10 ">
        {!isEditing ? (
          <>
            {state.length > 0 && (
              <div
                className={`flex  py-1 h-14 justify-between gap-1   w-2/3     items-center `}
              >
                <div className="flex items-center gap-1">
                  <label className="text-sm font-bold capitalize text-green">
                    Ingresar DNI:
                  </label>
                  <div className="flex w-56 ">
                    <div
                      className={`h-8 px-2 py-1 flex items-center gap-2 font-bold border  border-gray-300 rounded w-full bg-lightGray focus:outline-none  ${
                        styleDisabled
                          ? "bg-gray-200 text-gray-400 "
                          : "text-blue"
                      }`}
                    >
                      <FaMagnifyingGlass className="w-3 h-3" />
                      {state}
                    </div>
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
              <label className="text-sm font-bold capitalize text-green">
                Ingresar DNI:
              </label>
              <div className="flex w-56 bg-gray-200 border border-gray-300 rounded focus-within:border-green focus-within:ring-1 focus-within:ring-green">
                <button
                  type="button"
                  onClick={handleSearchPatient}
                  className="flex items-center justify-center px-2 py-1 transition-all duration-300 rounded-l w-7 text-greenHover "
                >
                  {loader ? (
                    <svg
                      className="w-8 circle-loader animate-spin"
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
                <input
                  ref={inputRef}
                  type="text"
                  name="dni"
                  value={state}
                  onChange={handleOnChangeDni}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className={`h-8 px-2 py-1 w-full bg-gray-200 font-bold rounded 
                focus:outline-none text-blue
                ${errorState && "border-red-500"}`}
                />
              </div>
            </div>

            {errorState && (
              <p className="text-xs font-bold text-red-500 w-72">
                {errorState}
              </p>
            )}
          </div>
        )}
      </div>

      {
        //region data user
      }
      {!data?.nombre ? (
        <div className="w-full h-20 bg-gray-200 rounded"></div>
      ) : (
        <div className="flex items-center justify-center w-full h-20 gap-1 bg-white border rounded border-green">
          <div className="flex items-center justify-end w-40 h-full">
            <FaUserCircle className="w-full h-16 text-greenHover" />
          </div>
          <div className="flex flex-col items-center justify-center w-full h-20 gap-1 ">
            <div className="flex justify-start w-full gap-2">
              <h1 className="text-2xl font-semibold text-blue">
                {data?.nombre} {data?.apellido}
              </h1>
              {/* <div className="flex justify-center w-1/2 text-blue">
              <p className="text-sm ">Nombre: </p>
              <p className="w-full h-8 px-2 text-sm font-bold">
                {data?.nombre}
              </p>
            </div>
            <div className="flex justify-center w-1/2 text-blue">
              <p className="text-sm ">Apellido: </p>
              <p className="w-full h-8 px-2 text-sm font-bold">
                {data?.apellido}
              </p>
            </div> */}
            </div>

            <div className="flex justify-start w-full gap-10">
              <div className="flex justify-center text-blue">
                <p className="text-sm ">DNI: </p>
                <p className="h-8 px-2 text-sm font-bold w-">{data?.dni}</p>
              </div>
              <div className="flex justify-center text-blue">
                <p className="text-sm ">Edad: </p>
                <p className="h-8 px-2 text-sm font-bold w-">{data?.edad}</p>
              </div>
              <div className="flex justify-center text-blue">
                <p className="text-sm text-nowrap">Fecha de Nacimiento: </p>
                <p className="w-full h-8 px-2 text-sm font-bold">
                  {data?.fnacim}
                </p>
              </div>
              <div className="flex justify-center text-blue">
                <p className="text-sm text-nowrap">Obra Social:</p>
                <p className="w-full h-8 px-2 text-sm font-bold">
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
      <div className="flex items-center justify-end w-full h-10 ">
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
                <FaRegEdit /> editar odontograma
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
