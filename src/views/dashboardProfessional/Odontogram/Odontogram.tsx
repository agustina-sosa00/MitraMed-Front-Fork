import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import Cookies from "js-cookie";
import Swal from "sweetalert2";

import { ContainView } from "@/components/features/PanelProfessional/ContainView";
import { Tooth } from "./Tooth";
import { ModalSelectFaceTooth } from "./ModalSelectFaceTooth";
import { box, ID_CARA_BY_NAME } from "../../../utils/odontogram.lookups";
import {
  InfoUser,
  RawRow,
  TeethIdsState,
  ToothChangeTuple,
} from "@/types/index";
import { buildIdsState } from "@/utils/buildTeethState";
import {
  getOdontogram,
  postSaveOdontogram,
} from "@/services/odontogramServices";
import { useOdontogramContext } from "../../../context/OdontogramContext";
import SearchPatient from "@/components/features/PanelProfessional/SearchPatient";

export default function Odontogram() {
  //region cookies
  const idProfesional = Cookies.get("idProfesional");

  //region context
  const { dniOdontogram, setDniOdontogram, originalData, setOriginalData } =
    useOdontogramContext();
  //region states
  const [contextMenu, setContextMenu] = useState<number | null>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [toothSelect, setToothSelect] = useState(0);
  const [teethIdsState, setTeethIdsState] = useState<TeethIdsState>({});
  console.log("guardados", teethIdsState);

  const [teethChanged, setTeethChanged] = useState<ToothChangeTuple[]>([]);
  console.log("cambiados", teethChanged);
  const [infoUser, setInfoUser] = useState<InfoUser>({
    code: 0,
    data: {
      odontograma: [] as RawRow[],
      paciente: {
        nombre: "",
        apellido: "",
        dni: "",
        fnacim: "",
        edad: "",
        idosocial: 0,
        nosocial: null,
        idplan: 0,
        nplan: null,
      },
    },
    message: "",
    status: false,
  });
  const [dniPatient, setDniPatient] = useState("");
  // const [showButtons, setShowButtons] = useState(false);
  const [editOdontogram, setEditOdontogram] = useState(false);
  const [errorState, setErrorState] = useState("");
  console.log(errorState);
  const infoUserEmpty: InfoUser = {
    code: 0,
    data: {
      odontograma: [],
      paciente: {
        nombre: "",
        apellido: "",
        dni: "",
        fnacim: "",
        edad: "",
        idosocial: 0,
        nosocial: null,
        idplan: 0,
        nplan: null,
      },
    },
    message: "",
    status: false,
  };

  //region mutate
  const { mutate: mutateFindPatient } = useMutation({
    mutationFn: getOdontogram,
    onSuccess: (data: typeof infoUser) => {
      console.log(data);
      if (data?.data === null) {
        setErrorState(data?.message || "Paciente inexistente");
        setInfoUser(infoUserEmpty);
        setTeethIdsState({});
        setOriginalData({});
        return;
      }
      setInfoUser(data);
      const raw = (data?.data?.odontograma || []) as RawRow[];
      setTeethIdsState(buildIdsState(raw));
      setOriginalData(buildIdsState(raw));
    },
    onError: (err) => console.log(err),
  });

  const { mutate: mutateSaveOdontogram } = useMutation({
    mutationFn: postSaveOdontogram,
    onSuccess: (data: { status: string }) => {
      if (data.status === "success") {
        setTeethChanged([]);
        Swal.fire({
          icon: "success",
          title: "Cambios guardados con éxito",
          confirmButtonColor: "#518915",
        });
        setEditOdontogram(false);
        getOdontogram({ dni: dniPatient });
      }
    },
    onError: (err) => console.log(err),
  });

  //region useEffect
  useEffect(() => {
    async function onKey(e: KeyboardEvent) {
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
          const res = await Swal.fire({
            title: "Hay cambios sin guardar",
            icon: "warning",
            showCancelButton: true,
            showDenyButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: "Descartar",
            cancelButtonText: "Seguir editando",
            confirmButtonColor: "#518915",
            denyButtonColor: "#d33",
            cancelButtonColor: "#022539",
          });

          if (res.isConfirmed) {
            handleSave();
          } else if (res.isDenied) {
            handleCancelEdit();
          }
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

  function handleFindPatient(dni: string) {
    // setShowButtons(true);
    setDniPatient(dni);
    mutateFindPatient({ dni });
  }

  function handleSave() {
    Swal.fire({
      title: "¿Desea guardar los cambios?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#518915",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        mutateSaveOdontogram({ dni: dniPatient, data: teethChanged });
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
    setDniOdontogram("");
    setTeethIdsState({});
    setInfoUser(infoUserEmpty);
  }

  //region return
  return (
    <ContainView
      title="Odontograma"
      padding="py-3"
      gapChildren="gap-3"
      sizeTitle="text-3xl"
      classContainer="relative"
      onClick={() => setContextMenu(null)}
    >
      {idProfesional !== "3" && (
        <div className="flex items-end justify-between w-full gap-1 min-h-20">
          <SearchPatient
            data={infoUser?.data?.paciente || {}}
            handleDeletePatient={handleDeletePatient}
            labelSearch="DNI"
            handleFindPatient={handleFindPatient}
            viewImg
            odontogram={false}
            state={dniOdontogram}
            setState={setDniOdontogram}
            editOdontogram={editOdontogram}
            setEditOdontogram={setEditOdontogram}
            handleSave={handleSave}
            handleCancel={handleCancelEdit}
            changes={Boolean(teethChanged.length)}
            errorState={errorState}
            setErrorState={setErrorState}
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
                  className={`text-xs  ${
                    editOdontogram ? "text-[#6e6d6d]" : "text-[#b6b5b5]"
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
                  className={`text-xs  ${
                    editOdontogram ? "text-[#6e6d6d]" : "text-[#b6b5b5]"
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
