import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  ID_CARA_BY_NAME,
  isEqualTeeth,
  sinProvisoriosDeTratamientosConCara,
} from "./utils/odontogram.lookups";
import { getLocalStorageParams } from "@/utils/index";
import { OutletContext } from "@/views/app/profesional/types/types";
import ModalSeleccionDeCara from "./components/ModalSeleccionDeCara";
import Swal from "sweetalert2";
import TitleView from "../../_components/features/TitleView";
import { useOdontogramaStore } from "./store/OdontogramaStore";
import DienteCard from "./components/DienteCard";
import BotonesDeAcciones from "./components/BotonesDeAcciones";
import BusquedaPacienteCard from "./components/BusquedaPacienteCard";

export default function OdontogramView() {
  const { setDisabledButtonSidebar } = useOutletContext<OutletContext>();
  // const queryClient = useQueryClient();
  const originalData = useOdontogramaStore((state) => state.originalData);
  const teethIdsState = useOdontogramaStore((state) => state.teethIdsState);
  const setTeethIdsState = useOdontogramaStore((state) => state.setTeethIdsState);
  const contextMenu = useOdontogramaStore((state) => state.contextMenu);
  const setContextMenu = useOdontogramaStore((state) => state.setContextMenu);
  const toothSelect = useOdontogramaStore((state) => state.toothSelect);
  const editOdontograma = useOdontogramaStore((state) => state.editOdontograma);
  const setEditOdontograma = useOdontogramaStore((state) => state.setEditOdontograma);
  const teethChanged = useOdontogramaStore((state) => state.teethChanged);
  const setTeethChanged = useOdontogramaStore((state) => state.setTeethChanged);
  const handleCleanPatient = useOdontogramaStore((state) => state.handleCleanPatient);
  const handleCancelEdit = useOdontogramaStore((state) => state.handleCancelEdit);
  //region states
  const [openMenu, setOpenMenu] = useState(false);
  const { iddoctor, idProfesional } = getLocalStorageParams();

  const hasUnsaved = useMemo(() => {
    return !isEqualTeeth(
      sinProvisoriosDeTratamientosConCara(originalData),
      sinProvisoriosDeTratamientosConCara(teethIdsState),
    );
  }, [originalData, teethIdsState]);

  useEffect(() => {
    const shouldDisableSidebar = editOdontograma;
    setDisabledButtonSidebar({
      inicio: shouldDisableSidebar,
      turnos: shouldDisableSidebar,
      historial: shouldDisableSidebar,
      odontograma: shouldDisableSidebar,
      tablaGral: shouldDisableSidebar,
      turnosGrales: shouldDisableSidebar,
      informe: shouldDisableSidebar,
      informes: shouldDisableSidebar,
      usuarios: shouldDisableSidebar,
      configuracion: shouldDisableSidebar,
    });

    // Cleanup: cuando se desmonta el componente, resetear el sidebar
    return () => {
      setDisabledButtonSidebar({
        inicio: false,
        turnos: false,
        historial: false,
        odontograma: false,
        tablaGral: false,
        turnosGrales: false,
        informe: false,
        informes: false,
        usuarios: false,
        configuracion: false,
      });
    };
  }, [editOdontograma, setDisabledButtonSidebar]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;

      if (contextMenu !== null) {
        setContextMenu(null);
        return;
      }

      if (openMenu) {
        setOpenMenu(false);
        return;
      }

      if (editOdontograma) {
        if (teethChanged.length > 0) {
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
              handleCancelEdit();
            }
          });
        } else {
          setEditOdontograma(false);
        }
        return;
      }

      handleCleanPatient();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu, editOdontograma, teethChanged.length, contextMenu]);

  function handleCloseMenu() {
    setOpenMenu(false);
  }

  //region return
  return (
    <>
      <TitleView title="Odontograma" />

      <BusquedaPacienteCard />

      <div className="w-full my-2 border border-gray-300"></div>

      {/* botones */}
      <BotonesDeAcciones
        handleCancelEdit={handleCancelEdit}
        hasUnsaved={hasUnsaved}
        iddoctor={iddoctor}
        idProfesional={idProfesional}
      />

      {/* dientes */}
      <DienteCard editOdontogram={editOdontograma} setOpenMenu={setOpenMenu} />
      {
        // region modal
      }
      {openMenu && (
        <ModalSeleccionDeCara
          show={openMenu}
          onClose={handleCloseMenu}
          numeroDiente={toothSelect}
          setFace={(caraNombre) =>
            setTeethIdsState((prev) => {
              const list = prev[toothSelect] || [];
              if (list.length === 0) return prev;

              const lastIndex = list.length - 1;
              const [, idtrat, hab] = list[lastIndex];

              const nuevaTupla: [number, number, 0 | 1] = [
                ID_CARA_BY_NAME[caraNombre as keyof typeof ID_CARA_BY_NAME],
                idtrat,
                hab,
              ];
              setTeethChanged((prev) => [
                ...prev,
                [toothSelect, ID_CARA_BY_NAME[caraNombre], idtrat, hab],
              ]);

              return {
                ...prev,
                [toothSelect]: [...list.slice(0, lastIndex), nuevaTupla],
              };
            })
          }
        />
      )}
    </>
  );
}
