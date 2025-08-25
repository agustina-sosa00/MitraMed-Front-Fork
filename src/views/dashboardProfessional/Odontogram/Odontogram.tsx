import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import { ContainView } from "@/components/features/PanelProfessional/ContainView";
import { Tooth } from "./Tooth";
import { ModalSelectFaceTooth } from "./ModalSelectFaceTooth";
import {
  box,
  ID_CARA_BY_NAME,
  isEqualTeeth,
  sinProvisoriosDeTratamientosConCara,
} from "../../../utils/odontogram.lookups";
import { ContextType, RawRow, ToothChangeTuple } from "@/types/index";
import {
  getOdontogram,
  postSaveOdontogram,
} from "@/services/odontogramServices";
import { useOdontogramContext } from "../../../context/OdontogramContext";
import SearchPatient from "@/components/features/PanelProfessional/SearchPatient";
import { buildIdsState } from "@/utils/buildTeethState";
import { useOutletContext } from "react-router-dom";

export default function Odontogram() {
  const { setDisabledButton, disabledButton } = useOutletContext<ContextType>();
  const queryClient = useQueryClient();
  //region cookies
  const idProfesional = Cookies.get("idProfesional");

  //region context
  const {
    dniOdontogram,
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
  } = useOdontogramContext();
  console.log("originalData", originalData);
  console.log("teethIdsState", teethIdsState);
  //region states
  const [contextMenu, setContextMenu] = useState<number | null>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [toothSelect, setToothSelect] = useState(0);
  const [teethChanged, setTeethChanged] = useState<ToothChangeTuple[]>([]);
  const [editOdontogram, setEditOdontogram] = useState(false);
  const [errorState, setErrorState] = useState("");

  //region mutate / query
  const { data: infoUser } = useQuery({
    queryKey: ["odontogram", dniOdontogram],
    queryFn: () => getOdontogram({ dni: dniOdontogram }),
    enabled: hasConfirmed && !!dniOdontogram,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    gcTime: Infinity,
    initialData: () => queryClient.getQueryData(["odontogram", dniOdontogram]),
  });

  const { mutate: mutateSaveOdontogram } = useMutation({
    mutationFn: postSaveOdontogram,
    onSuccess: (data: { status: string }) => {
      if (data.status === "success") {
        setOriginalData(teethIdsState);
        setTeethChanged([]);
        setEditOdontogram(false);
        queryClient.invalidateQueries({
          queryKey: ["odontogram", dniOdontogram],
        });
      }
    },
    onError: (err) => console.log(err),
  });

  //region useEffect

  useEffect(() => {
    if (editOdontogram) {
      setDisabledButton({
        inicio: true,
        turnos: true,
        historial: true,
        odontograma: false,
      });
    } else {
      setDisabledButton({
        inicio: false,
        turnos: false,
        historial: false,
        odontograma: false,
      });
    }
  }, [disabledButton, editOdontogram, setDisabledButton]);

  useEffect(() => {
    if (!hasConfirmed || uiLoading || !infoUser) return;

    if (infoUser.data === null) {
      setErrorState(infoUser.message || "Paciente inexistente");
      return;
    }

    const raw = (infoUser.data.odontograma || []) as RawRow[];
    const built = buildIdsState(raw);

    if (Object.keys(originalData).length === 0) setOriginalData(built);
    if (Object.keys(teethIdsState).length === 0) setTeethIdsState(built);
  }, [
    hasConfirmed,
    uiLoading,
    infoUser,
    originalData,
    teethIdsState,
    setOriginalData,
    setTeethIdsState,
  ]);

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
            cancelButtonColor: "#022539",
            confirmButtonText: "Si, Salir",
            cancelButtonText: "Seguir Editando",
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

      handleDeletePatient();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu, editOdontogram, teethChanged.length, contextMenu]);

  //region function

  function handleSearch(dni: string) {
    setUiLoading(true);

    setTimeout(() => {
      setHasConfirmed(true);
      setUiLoading(false);
      setDniOdontogram(dni.trim());
    }, 2000);
  }

  const hasUnsaved = useMemo(() => {
    return !isEqualTeeth(
      sinProvisoriosDeTratamientosConCara(originalData),
      sinProvisoriosDeTratamientosConCara(teethIdsState)
    );
  }, [originalData, teethIdsState]);

  function handleSave() {
    if (!hasUnsaved) {
      setEditOdontogram(false);
      return;
    }
    Swal.fire({
      title: "¿Desea Guardar los Cambios?",
      showCancelButton: true,
      confirmButtonText: "Si, Guardar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#518915",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        mutateSaveOdontogram({ dni: dniOdontogram, data: teethChanged });
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

  function handleDeletePatient() {
    setHasConfirmed(false);
    setUiLoading(false);
    setDniOdontogram("");
    setDniInput("");
    setTeethIdsState({});
    setOriginalData({});
  }

  const dientesCambiados = useMemo(() => {
    const A = sinProvisoriosDeTratamientosConCara(originalData);
    const B = sinProvisoriosDeTratamientosConCara(teethIdsState);

    const cambiados = new Set<number>();
    const todos = new Set<number>([
      ...Object.keys(A).map(Number),
      ...Object.keys(B).map(Number),
    ]);

    for (const num of todos) {
      const antes = A[num] || [];
      const ahora = B[num] || [];
      if (JSON.stringify(antes) !== JSON.stringify(ahora)) {
        cambiados.add(num);
      }
    }
    return cambiados;
  }, [originalData, teethIdsState]);

  //region return
  return (
    <ContainView
      title="Odontograma"
      padding="py-3 2xl:py-20"
      gapChildren="gap-2"
      sizeTitle="text-3xl 2xl:text-4xl"
      classContainer="relative"
      onClick={() => setContextMenu(null)}
    >
      {idProfesional !== "3" && (
        <div className="flex items-end justify-between w-full gap-1 min-h-20">
          <SearchPatient
            data={!dniOdontogram ? undefined : infoUser?.data?.paciente}
            handleDeletePatient={handleDeletePatient}
            labelSearch="DNI"
            onSearch={handleSearch}
            odontogram={false}
            state={dniInput}
            setState={setDniInput}
            editOdontogram={editOdontogram}
            setEditOdontogram={setEditOdontogram}
            handleSave={handleSave}
            handleCancel={handleCancelEdit}
            errorState={errorState}
            setErrorState={setErrorState}
            isActive={editOdontogram && contextMenu === toothSelect}
            changes={hasUnsaved}
            hasConfirmed={hasConfirmed}
            loading={uiLoading}
          />
        </div>
      )}

      <div className="w-full my-2 border border-gray-300"></div>
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
            } justify-start ${
              editOdontogram ? "border-gray-400" : "border-gray-300"
            }`}
          >
            {box.numbers.map((toothNumber) => (
              <div
                key={toothNumber}
                className={`flex  items-center ${
                  box.name.includes("abajo") ? "flex-col-reverse" : "flex-col"
                }`}
              >
                <p
                  className={`text-sm  ${
                    editOdontogram ? "text-[#6e6d6d]" : "text-[#b6b5b5]"
                  } ${
                    dientesCambiados.has(toothNumber) &&
                    "text-[#ff9e00] font-bold"
                  } `}
                >
                  {toothNumber}
                </p>
                <Tooth
                  toothNumber={toothNumber}
                  isActive={editOdontogram && contextMenu === toothNumber}
                  setState={setContextMenu}
                  handle={() => setOpenMenu(true)}
                  toothSelectState={toothSelect}
                  setToothSelectState={setToothSelect}
                  dataIds={teethIdsState[toothNumber] || []}
                  clearTooth={() =>
                    setTeethIdsState((prev) => ({ ...prev, [toothNumber]: [] }))
                  }
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
        // region render tooth
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
            } justify-start ${
              editOdontogram ? "border-gray-400" : "border-gray-300"
            } `}
          >
            {box.numbers.map((toothNumber) => (
              <div
                key={toothNumber}
                className={`flex  items-center ${
                  box.name.includes("abajo") ? "flex-col-reverse" : "flex-col"
                }`}
              >
                <p
                  className={`text-sm  ${
                    editOdontogram ? "text-[#6e6d6d]" : "text-[#b6b5b5]"
                  } ${
                    dientesCambiados.has(toothNumber) &&
                    "text-[#ff9e00] font-bold"
                  } `}
                >
                  {toothNumber}
                </p>
                <Tooth
                  toothNumber={toothNumber}
                  isActive={editOdontogram && contextMenu === toothNumber}
                  setState={setContextMenu}
                  handle={() => setOpenMenu(true)}
                  toothSelectState={toothSelect}
                  setToothSelectState={setToothSelect}
                  dataIds={teethIdsState[toothNumber] || []}
                  clearTooth={() =>
                    setTeethIdsState((prev) => ({ ...prev, [toothNumber]: [] }))
                  }
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
        <ModalSelectFaceTooth
          show={openMenu}
          onClose={handleCloseMenu}
          toothNumber={toothSelect}
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
                [
                  toothSelect,
                  ID_CARA_BY_NAME[caraNombre],
                  idtrat,
                  hab,
                  Number(idProfesional),
                ],
              ]);

              return {
                ...prev,
                [toothSelect]: [...list.slice(0, lastIndex), nuevaTupla],
              };
            })
          }
        />
      )}
    </ContainView>
  );
}
