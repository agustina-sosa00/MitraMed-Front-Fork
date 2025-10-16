import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useOdontogramContext } from "../../../../context/OdontogramContext";
import { RawRow, ToothChangeTuple } from "./types/odontogramaTypes";
import { getOdontogram, grabarOdontogramaService } from "./service/odontogramaService";
import { buildIdsState } from "./utils/buildTeethState";
import {
  box,
  ID_CARA_BY_NAME,
  isEqualTeeth,
  sinProvisoriosDeTratamientosConCara,
} from "./utils/odontogram.lookups";
import { getLocalStorageParams } from "@/utils/index";
import { OutletContext } from "@/context/types";
import SearchPatientCard from "@/views/app/profesional/_components/features/SearchPatientCard";
import Diente from "./components/Diente";
import ModalSeleccionDeCara from "./components/ModalSeleccionDeCara";
import Swal from "sweetalert2";
import TitleView from "../../_components/features/TitleView";
import { RiSave3Line } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { ActionButton } from "@/frontend-resourses/components";

export default function OdontogramView() {
  const { setDisabledButtonSidebar } = useOutletContext<OutletContext>();
  // const queryClient = useQueryClient();

  const {
    // dniOdontogram,
    setDniOdontogram,
    originalData,
    setOriginalData,
    teethIdsState,
    setTeethIdsState,
    hasConfirmed,
    setHasConfirmed,
    uiLoading,
    setUiLoading,
    dniInput,
    setDniInput,
    odontogramaData,
    setOdontogramaData,
  } = useOdontogramContext();

  //region states
  const [contextMenu, setContextMenu] = useState<number | null>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [toothSelect, setToothSelect] = useState(0);
  const [teethChanged, setTeethChanged] = useState<ToothChangeTuple[]>([]);
  const [editOdontogram, setEditOdontogram] = useState(false);
  const [errorState, setErrorState] = useState("");
  const [idPaciente, setIdPaciente] = useState("");

  const { iddoctor, idProfesional } = getLocalStorageParams();
  const tusuarioStorage = localStorage.getItem("_tu");
  const hasValidPatient = Boolean(odontogramaData?.data?.paciente?.dni);
  const canEdit = hasValidPatient && hasConfirmed && !uiLoading && !errorState;
  const isActive = editOdontogram && contextMenu === toothSelect;
  const hasUnsaved = useMemo(() => {
    return !isEqualTeeth(
      sinProvisoriosDeTratamientosConCara(originalData),
      sinProvisoriosDeTratamientosConCara(teethIdsState),
    );
  }, [originalData, teethIdsState]);

  const dientesCambios = useMemo(() => {
    const A = sinProvisoriosDeTratamientosConCara(originalData);
    const B = sinProvisoriosDeTratamientosConCara(teethIdsState);

    const cambiados = new Set<number>();
    const todos = new Set<number>([...Object.keys(A).map(Number), ...Object.keys(B).map(Number)]);

    for (const num of todos) {
      const antes = A[num] || [];
      const ahora = B[num] || [];
      if (JSON.stringify(antes) !== JSON.stringify(ahora)) {
        cambiados.add(num);
      }
    }
    return cambiados;
  }, [originalData, teethIdsState]);

  const { mutate: obtenerOdontograma } = useMutation({
    mutationFn: getOdontogram,
    onError: (err) => console.log(err),
    onSuccess: (data: any) => {
      if (!data.data) {
        setErrorState(data.message || "Paciente inexistente");
        return;
      }
      const raw = (data.data.odontograma || []) as RawRow[];
      const dientes = buildIdsState(raw);

      setHasConfirmed(true);

      setOdontogramaData(data);

      setIdPaciente(data.data.paciente.idpaciente);
      setOriginalData(dientes);
      setTeethIdsState(dientes);
      // if (Object.keys(originalData).length === 0)
      // if (Object.keys(teethIdsState).length === 0)
    },
  });

  const { mutate: grabarOdontograma } = useMutation({
    mutationFn: grabarOdontogramaService,
    onSuccess: (data: { status: string }) => {
      if (data.status === "success") {
        setOriginalData(teethIdsState);
        setTeethChanged([]);
        setEditOdontogram(false);
      }
    },
    onError: (err) => console.log(err),
  });

  useEffect(() => {
    const shouldDisableSidebar = editOdontogram;
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
  }, [editOdontogram, setDisabledButtonSidebar]);

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

      if (editOdontogram) {
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
          setEditOdontogram(false);
        }
        return;
      }

      handleCleanPatient();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu, editOdontogram, teethChanged.length, contextMenu]);

  function handleSearch(dni: string) {
    setUiLoading(true);

    setTimeout(() => {
      obtenerOdontograma({ dni });
      setUiLoading(false);
      setDniOdontogram(dni.trim());
    }, 800);
  }

  function handleSave() {
    if (!hasUnsaved) {
      setEditOdontogram(false);
      return;
    }
    Swal.fire({
      title: "¿Desea Grabar los Cambios?",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      confirmButtonColor: "#518915",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        grabarOdontograma({ idPaciente, iddoctor, idProfesional, data: teethChanged });
      }
    });
  }

  function handleCloseMenu() {
    setOpenMenu(false);
  }

  function handleCancelEdit() {
    setTeethChanged([]);
    setTeethIdsState(originalData);
    setEditOdontogram(false);
  }

  function handleCleanPatient() {
    setHasConfirmed(false);
    setUiLoading(false);
    setDniOdontogram("");
    setDniInput("");
    setIdPaciente("");
    setTeethIdsState({});
    setOriginalData({});
  }

  function handleCancelButton() {
    if (!hasUnsaved) {
      handleCancelEdit?.();
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
          handleCancelEdit?.();
        }
      });
    }
  }
  //region return
  return (
    <>
      <TitleView title="Odontograma" />
      <div
        className="flex items-center justify-start w-full gap-1 py-1 min-h-24"
        onClick={() => setContextMenu(null)}
      >
        <SearchPatientCard
          data={hasConfirmed ? odontogramaData?.data?.paciente : null}
          dniInput={dniInput}
          setDniInput={setDniInput}
          onSearch={handleSearch}
          handleCleanPatient={handleCleanPatient}
          editOdontogram={editOdontogram}
          handleCancel={handleCancelEdit}
          errorState={errorState}
          setErrorState={setErrorState}
          hasConfirmed={hasConfirmed}
          loading={uiLoading}
        />
      </div>

      <div className="w-full my-2 border border-gray-300"></div>

      {/* botones */}
      <div className="absolute bottom-7 right-3 flex items-center gap-2 p-2 ">
        {editOdontogram ? (
          <div className="flex flex-col gap-2">
            <ActionButton
              disabled={isActive || !hasUnsaved}
              onClick={handleSave}
              icon={<RiSave3Line />}
              text="Guardar"
              color="green-mtm"
              addClassName="!rounded w-32"
            />

            <ActionButton
              disabled={isActive}
              onClick={handleCancelButton}
              icon={<MdCancel />}
              text="Cancelar"
              color="red"
              addClassName="!rounded w-32"
            />
          </div>
        ) : !(
            tusuarioStorage === "3" ||
            tusuarioStorage === "4" ||
            tusuarioStorage === "5"
          ) ? null : (
          <ActionButton
            disabled={!canEdit}
            onClick={() => setEditOdontogram && setEditOdontogram(true)}
            icon={<FaRegEdit />}
            text="Editar"
            color="green-mtm"
            addClassName="!rounded w-32"
          />
        )}
      </div>

      {
        // region render tooth
      }
      <div className="flex flex-wrap w-full ">
        {box.slice(0, 4).map((box) => (
          <div
            key={box.name}
            className={`w-1/2 h-1/2 p-1 gap-1  ${
              box.name.includes("arriba") ? "border-b" : "border-t"
            } ${
              box.ladoVisual === "izquierda"
                ? "border-r flex  justify-end"
                : "border-l flex items-end"
            } justify-start ${editOdontogram ? "border-gray-400" : "border-gray-300"}`}
          >
            {box.numbers.map((toothNumber) => (
              <div
                key={toothNumber}
                className={`flex  items-center ${
                  box.name.includes("abajo") ? "flex-col-reverse" : "flex-col"
                }`}
              >
                <p
                  className={`text-sm  ${editOdontogram ? "text-[#6e6d6d]" : "text-[#b6b5b5]"} ${
                    dientesCambios.has(toothNumber) && "text-[#ff9e00] font-bold"
                  } `}
                >
                  {toothNumber}
                </p>
                <Diente
                  toothNumber={toothNumber}
                  isActive={editOdontogram && contextMenu === toothNumber}
                  setContextMenu={setContextMenu}
                  handle={() => setOpenMenu(true)}
                  toothSelectState={toothSelect}
                  setToothSelectState={setToothSelect}
                  dataIds={teethIdsState[toothNumber] || []}
                  clearTooth={() => setTeethIdsState((prev) => ({ ...prev, [toothNumber]: [] }))}
                  updateToothIds={(tuple) =>
                    setTeethIdsState((prev) => ({
                      ...prev,
                      [toothNumber]: [...(prev[toothNumber] || []), tuple],
                    }))
                  }
                  stateTeethChanged={setTeethChanged}
                  styleDisabled={editOdontogram}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {
        // region render tooth niños
      }
      <div className="flex flex-wrap w-full h-1/2">
        {box.slice(4).map((box) => (
          <div
            key={box.name}
            className={`w-1/2 h-1/2 p-2 gap-1  ${
              box.name.includes("arriba") ? "border-b" : "border-t"
            } ${
              box.ladoVisual === "izquierda"
                ? "border-r flex  justify-end"
                : "border-l flex items-start"
            } justify-start ${editOdontogram ? "border-gray-400" : "border-gray-300"} `}
          >
            {box.numbers.map((toothNumber) => (
              <div
                key={toothNumber}
                className={`flex  items-center ${
                  box.name.includes("abajo") ? "flex-col-reverse" : "flex-col"
                }`}
              >
                <p
                  className={`text-sm  ${editOdontogram ? "text-[#6e6d6d]" : "text-[#b6b5b5]"} ${
                    dientesCambios.has(toothNumber) && "text-[#ff9e00] font-bold"
                  } `}
                >
                  {toothNumber}
                </p>
                <Diente
                  toothNumber={toothNumber}
                  isActive={editOdontogram && contextMenu === toothNumber}
                  setContextMenu={setContextMenu}
                  handle={() => setOpenMenu(true)}
                  toothSelectState={toothSelect}
                  setToothSelectState={setToothSelect}
                  dataIds={teethIdsState[toothNumber] || []}
                  clearTooth={() => setTeethIdsState((prev) => ({ ...prev, [toothNumber]: [] }))}
                  updateToothIds={(tuple) =>
                    setTeethIdsState((prev) => ({
                      ...prev,
                      [toothNumber]: [...(prev[toothNumber] || []), tuple],
                    }))
                  }
                  stateTeethChanged={setTeethChanged}
                  styleDisabled={editOdontogram}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
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
