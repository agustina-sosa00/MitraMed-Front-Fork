import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Tooth } from "./Tooth";
import { ModalSelectFaceTooth } from "./ModalSelectFaceTooth";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { ApiFila, TeethState } from "@/types/index";
import { SearchPatient } from "@/components/features/PanelProfessional/SearchPatient";
import { ContainView } from "@/components/features/PanelProfessional/ContainView";
import getOdontogram from "@/services/odontogramServices";
import buildTeethState from "@/utils/buildTeethState";

export default function Odontogram() {
  // region cookies
  const idProfesional = Cookies.get("idProfesional");

  //region estados locales
  const [contextMenu, setContextMenu] = useState<number | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [toothSelect, setToothSelect] = useState<number>(0);
  const [teethState, setTeethState] = useState<TeethState>({});
  const [infoUser, setInfoUser] = useState({
    code: 0,
    data: {
      odontograma: [] as ApiFila[],
      paciente: {},
    },
    message: "",
    status: false,
  });
  const [showButtons, setShowButtons] = useState<boolean>(false);
  const [editOdontogram, setEditOdontogram] = useState<boolean>(false);

  // region useMutate
  const { mutate: mutateFindPatient } = useMutation({
    mutationFn: getOdontogram,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data: typeof infoUser) => {
      setInfoUser(data);
      const filas = (data?.data?.odontograma || []) as ApiFila[];
      const next = buildTeethState(filas);
      setTeethState(next);
    },
  });

  //region funciones
  function handleShowMenu() {
    setContextMenu(null);
  }

  function handleMenu() {
    setOpenMenu(true);
  }

  function handleCloseMenu() {
    setOpenMenu(false);
  }

  function clearTooth(toothNumber: number) {
    Swal.fire({
      title: `¿Desea vaciar los tratamientos en este diente n° ${toothNumber}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      confirmButtonColor: "#518915",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        setTeethState((prev) => ({
          ...prev,
          [toothNumber]: { tratamientos: [] },
        }));
      }
    });
  }

  // Mantengo tu renderTeeth y la prop "position" para no tocar Tooth todavía
  function renderTeeth(start: number, count: number, position: string) {
    return Array.from({ length: count }).map((_, i) => {
      const toothNumber = start + i;
      return (
        <div key={toothNumber} className="flex flex-col items-center">
          <p className="text-xs text-[#6e6d6d]">{toothNumber}</p>
          <Tooth
            toothNumber={toothNumber}
            isActive={editOdontogram && contextMenu === toothNumber}
            setState={setContextMenu}
            position={position}
            handle={handleMenu}
            toothSelectState={toothSelect}
            setToothSelectState={setToothSelect}
            // CHANGED: usa el estado normalizado que armamos con el backend
            data={teethState[toothNumber]?.tratamientos || []}
            clearTooth={() => clearTooth(toothNumber)}
            // Mantengo tu update (acciones del modal siguen igual)
            updateTooth={(newData) =>
              setTeethState((prev) => {
                const current = prev[toothNumber]?.tratamientos || [];
                return {
                  ...prev,
                  [toothNumber]: {
                    tratamientos: [
                      ...current,
                      {
                        action: newData.action!,
                        tratamiento: newData.tratamiento!,
                        cara: newData.cara!,
                      },
                    ],
                  },
                };
              })
            }
          />
        </div>
      );
    });
  }

  function handleFindPatient(arg: string) {
    setShowButtons(!showButtons);
    mutateFindPatient({ dni: arg });
  }

  function handleEditOdontogram() {
    setEditOdontogram(!editOdontogram);
  }

  function handleSave() {
    Swal.fire({
      title: "¿Desea guardar los cambios?",
      icon: "question",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonColor: "#518915",
    }).then((result) => {
      if (result.isConfirmed) {
        setEditOdontogram(false);
      }
    });
  }

  function handleCancelEdit() {
    Swal.fire({
      title: "¿Desea cancelar?",
      text: "Los cambios no se guardaran",
      icon: "question",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonColor: "#518915",
    }).then((result) => {
      if (result.isConfirmed) {
        setEditOdontogram(false);
      }
    });
  }

  // #region return
  return (
    <ContainView title="Odontograma" onClick={handleShowMenu}>
      {idProfesional !== "3" && (
        <div className="flex items-end justify-between w-full gap-1 py-1 min-h-20 ">
          <SearchPatient
            data={infoUser.data.paciente}
            labelSearch="DNI"
            showData={showButtons}
            handleFindPatient={handleFindPatient}
            viewImg={true}
            odontogram={false}
          />
          {showButtons && (
            <div className="flex items-center justify-end w-auto h-16 gap-2 px-2 py-1">
              {editOdontogram ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center justify-center h-8 gap-2 px-2 py-1 text-white capitalize transition-all duration-300 rounded bg-green hover:bg-greenHover"
                  >
                    guardar
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center justify-center h-8 gap-2 px-2 py-1 text-white capitalize transition-all duration-300 bg-red-500 rounded hover:bg-red-600"
                  >
                    cancelar
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEditOdontogram}
                  className="flex items-center justify-center h-8 gap-2 px-2 py-1 text-white capitalize transition-all duration-300 rounded w-44 bg-green hover:bg-greenHover"
                >
                  editar odontograma
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Adultos */}
      <div className="flex flex-wrap w-full h-1/2">
        <div className="flex flex-row-reverse items-end justify-start w-1/2 gap-1 p-2 border-b border-r border-black h-1/2 ">
          {renderTeeth(11, 8, "arriba-izquierda")}
        </div>
        <div className="flex items-end justify-start w-1/2 gap-1 p-2 border-b border-l border-black h-1/2 ">
          {renderTeeth(21, 8, "arriba-derecha")}
        </div>
        <div className="flex flex-row-reverse items-start justify-start w-1/2 gap-1 p-2 border-t border-r border-black h-1/2 ">
          {renderTeeth(41, 8, "abajo-izquierda")}
        </div>
        <div className="flex items-start justify-start w-1/2 gap-1 p-2 border-t border-l border-black h-1/2 ">
          {renderTeeth(31, 8, "abajo-derecha")}
        </div>
      </div>

      {/* Niños */}
      <div className="flex flex-wrap w-full h-1/2">
        <div className="flex flex-row-reverse items-end justify-start w-1/2 gap-1 p-2 border-b border-r border-black h-1/2 ">
          {renderTeeth(51, 5, "arriba-izquierda-niño")}
        </div>
        <div className="flex items-end justify-start w-1/2 gap-1 p-2 border-b border-l border-black h-1/2 ">
          {renderTeeth(61, 5, "arriba-derecha-niño")}
        </div>
        <div className="flex flex-row-reverse items-start justify-start w-1/2 gap-1 p-2 border-t border-r border-black h-1/2 ">
          {renderTeeth(81, 5, "abajo-izquierda-niño")}
        </div>
        <div className="flex items-start justify-start w-1/2 gap-1 p-2 border-t border-l border-black h-1/2 ">
          {renderTeeth(71, 5, "abajo-derecha-niño")}
        </div>
      </div>

      {/* Modal de selección de cara y acción */}
      {openMenu && (
        <ModalSelectFaceTooth
          show={openMenu}
          onClose={handleCloseMenu}
          setFace={(cara) =>
            setTeethState((prev) => {
              const current = prev[toothSelect]?.tratamientos || [];
              const last = current[current.length - 1] || {};
              return {
                ...prev,
                [toothSelect]: {
                  tratamientos: [...current.slice(0, -1), { ...last, cara }],
                },
              };
            })
          }
          action={
            teethState[toothSelect]?.tratamientos?.slice(-1)[0]?.action || ""
          }
          setAction={(action) =>
            setTeethState((prev) => {
              const current = prev[toothSelect]?.tratamientos || [];
              const last = current[current.length - 1] || {};
              return {
                ...prev,
                [toothSelect]: {
                  tratamientos: [...current.slice(0, -1), { ...last, action }],
                },
              };
            })
          }
        />
      )}
    </ContainView>
  );
}
