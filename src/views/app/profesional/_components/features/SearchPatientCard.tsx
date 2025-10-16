import { useEffect, useRef } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
// import { BuscadorDePacientesProps } from "@/views/app/profesional/types/index";
import { ActionButton } from "@/frontend-resourses/components";
import { IoClose } from "react-icons/io5";

type Paciente = {
  nombre: string;
  apellido: string;
  dni: string;
  fnacim: string;
  edad: string;
  idosocial: number;
  nosocial: string | null;
  idplan: number;
  nplan: string | null;
};

interface SearchPatientCardProps {
  data: Partial<Paciente>;
  dniInput: string;
  setDniInput: (arg: string) => void;
  onSearch: (arg: string) => void;
  showData?: boolean;
  setShowData?: (arg: boolean) => void;
  setStateModal?: (arg: boolean) => void;
  odontogram?: boolean;
  editOdontogram?: boolean;
  handleCancel?: () => void;
  handleCleanPatient?: () => void;
  errorState?: string;
  setErrorState?: (arg: string) => void;
  hasConfirmed?: boolean;
  loading?: boolean;
  setPreviewOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchPatientCard({
  data,
  dniInput,
  setDniInput,
  onSearch,
  editOdontogram,
  handleCleanPatient,
  handleCancel,
  errorState,
  setErrorState,
  hasConfirmed,
  loading,
  // odontogram,
}: SearchPatientCardProps) {
  // console.log(padre);

  // region states y variables
  const isEditing = !hasConfirmed;
  const inputRef = useRef<HTMLInputElement>(null);

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
    setDniInput(e.target.value);
    setErrorState?.("");
  }

  function handleSearchPatient() {
    if (dniInput.length === 0) {
      setErrorState?.("Debe ingresar un DNI");
      inputRef.current?.focus();
      return;
    }
    if (!/^\d+$/.test(dniInput)) {
      setErrorState?.("El DNI debe ser numérico y sin punto. Ej: 12345678");
      inputRef.current?.focus();
      return;
    }

    onSearch?.(dniInput);
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
      handleCleanPatient?.();
      inputRef.current?.focus();
    }
  }

  //region return
  return (
    <div className="flex flex-col w-full gap-2 ">
      {/* div + boton // input + boton */}
      <div className="flex items-center justify-between w-full h-10 ">
        <div className={`flex py-1 h-14 justify-start gap-1 w-2/3 items-center`}>
          <div className="flex items-end gap-1">
            <label className="text-base font-bold text-primaryGreen">Ingresar DNI:</label>
            <div className="flex gap-1 w-36 ">
              {hasConfirmed && dniInput.length > 0 ? (
                <>
                  <div
                    className={`px-1 text-base h-8 flex items-center font-bold border border-gray-300 rounded w-full bg-lightGray focus:outline-none text-primaryBlue`}
                  >
                    {dniInput}
                  </div>
                  <ActionButton
                    onClick={handleEditInput}
                    disabled={editOdontogram}
                    icon={<IoClose />}
                    addClassName="h-8 p-2 !rounded"
                    color="customGray"
                    customColorText="red-500"
                  />
                </>
              ) : (
                <>
                  <input
                    ref={inputRef}
                    type="text"
                    name="dni"
                    value={dniInput}
                    onChange={handleOnChangeDni}
                    onKeyDown={handleKeyDown}
                    autoFocus={!hasConfirmed}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                    maxLength={8}
                    className={`h-8 px-2 py-1 w-full bg-gray-200 font-bold rounded 
                      focus:outline-none text-primaryBlue focus-within:border-primaryGreen focus-within:ring-1 focus-within:ring-primaryGreen
                      ${errorState && "border-red-500"}`}
                    autoComplete="off"
                  />
                  <ActionButton
                    onClick={handleSearchPatient}
                    loader={loading}
                    icon={<FaMagnifyingGlass />}
                    color="customGray"
                    customColorText="primaryGreen"
                    addClassName="h-8 p-2 !rounded transition-all duration-300"
                  />
                </>
              )}
            </div>
          </div>
          {errorState && errorState?.length > 0 && (
            <p className="text-xs font-bold text-red-500 ">{errorState}</p>
          )}
        </div>
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

      {/* {!odontogram ? (
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
            ) : !(
                tusuarioStorage === "3" ||
                tusuarioStorage === "4" ||
                tusuarioStorage === "5"
              ) ? null : (
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
      ) : null} */}
    </div>
  );
}
