import { useState } from "react";
import { Tooth } from "./Tooth";
import { ModalSelectFaceTooth } from "./ModalSelectFaceTooth";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { SearchPatient } from "@/components/features/PanelProfessional/SearchPatient";
export const Odontogram = () => {
  const idProfesional = Cookies.get("idProfesional");

  const [contextMenu, setContextMenu] = useState<number | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [toothSelect, setToothSelect] = useState<number>(0);
  const [teethState, setTeethState] = useState<{
    [key: number]: {
      tratamientos: {
        action: string;
        tratamiento: string;
        cara: string;
      }[];
    };
  }>({});
  const [infoUser, setInfoUser] = useState<boolean>(false);
  const [editOdontogram, setEditOdontogram] = useState<boolean>(false);
  const handleShowMenu = () => setContextMenu(null);
  const handleMenu = () => setOpenMenu(true);
  const handleCloseMenu = () => setOpenMenu(false);

  const clearTooth = (toothNumber: number) => {
    Swal.fire({
      title: `¿Desea vaciar los tratamientos en este diente n° ${toothNumber}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setTeethState((prev) => ({
          ...prev,
          [toothNumber]: {
            tratamientos: [],
          },
        }));
      }
    });
  };

  const renderTeeth = (start: number, count: number, position: string) =>
    Array.from({ length: count }).map((_, i) => {
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
            data={teethState[toothNumber]?.tratamientos || []}
            clearTooth={() => clearTooth(toothNumber)}
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

  const handleFindPatient = () => {
    setInfoUser(!infoUser);
  };

  const handleEditOdontogram = () => {
    setEditOdontogram(!editOdontogram);
  };
  const handleSave = () => {
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
  };
  const handleCancelEdit = () => {
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
  };

  return (
    <div
      className="flex flex-col w-full h-screen gap-5 px-5 py-20"
      onClick={handleShowMenu}
    >
      <div className="flex flex-col w-full px-16">
        <h1 className="text-2xl font-medium uppercase lg:text-4xl text-green">
          odontograma
        </h1>
        {idProfesional !== "3" && (
          <div className="flex items-end justify-between w-full h-20 gap-1 py-1 ">
            <SearchPatient
              data={[{ label: "paciente", value: "agustina sosa" }]}
              labelSearch="DNI"
              showData={infoUser}
              handleFindPatient={handleFindPatient}
              viewImg={true}
            />
            {infoUser && (
              <div className="flex justify-end h-8 gap-2 px-2 w-72">
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
                    className="flex items-center justify-center h-8 gap-2 px-2 py-1 text-white capitalize transition-all duration-300 rounded bg-green hover:bg-greenHover"
                  >
                    editar odontograma
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Dientes adultos */}
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

      {/* Dientes niños */}
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
    </div>
  );
};
