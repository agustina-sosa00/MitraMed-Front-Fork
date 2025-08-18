import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import Cookies from "js-cookie";
import Swal from "sweetalert2";

import { ContainView } from "@/components/features/PanelProfessional/ContainView";
import { SearchPatient } from "@/components/features/PanelProfessional/SearchPatient";
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
import { useMedicalHistoryContext } from "../../../context/MedicalHistoryContext";

export default function Odontogram() {
  //region cookies
  const idProfesional = Cookies.get("idProfesional");

  //region context
  const { dniOdontogram, setDniOdontogram } = useMedicalHistoryContext();
  console.log(dniOdontogram);
  //region states
  const [contextMenu, setContextMenu] = useState<number | null>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [toothSelect, setToothSelect] = useState(0);
  const [teethIdsState, setTeethIdsState] = useState<TeethIdsState>({});
  const [teethChanged, setTeethChanged] = useState<ToothChangeTuple[]>([]);
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

  //region mutate
  const { mutate: mutateFindPatient } = useMutation({
    mutationFn: getOdontogram,
    onSuccess: (data: typeof infoUser) => {
      setInfoUser(data);
      const raw = (data?.data?.odontograma || []) as RawRow[];
      setTeethIdsState(buildIdsState(raw));
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
      }
    },
    onError: (err) => console.log(err),
  });

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

  //region return
  return (
    <ContainView title="Odontograma" onClick={() => setContextMenu(null)}>
      {idProfesional !== "3" && (
        <div className="flex items-end justify-between w-full gap-1 py-1 min-h-20 ">
          <SearchPatient
            data={infoUser?.data?.paciente || {}}
            labelSearch="DNI"
            // setShowData={setShowButtons}
            handleFindPatient={handleFindPatient}
            viewImg
            odontogram={false}
            state={dniOdontogram}
            setState={setDniOdontogram}
            // setStateModal={setShowButtons}
            editOdontogram={editOdontogram}
            setEditOdontogram={setEditOdontogram}
            handleSave={handleSave}
          />
        </div>
      )}
      <div className="flex flex-wrap w-full h-1/2">
        {box.slice(0, 4).map((box) => (
          <div
            key={box.name}
            className={`w-1/2 h-1/2 p-2 gap-1  ${
              box.name.includes("arriba") ? "border-b" : "border-t"
            } ${
              box.ladoVisual === "izquierda"
                ? "border-r flex flex-row-reverse items-end"
                : "border-l flex items-end"
            } justify-start ${
              editOdontogram ? "border-gray-400" : "border-gray-300"
            }`}
          >
            {box.numbers.map((toothNumber) => (
              <div key={toothNumber} className="flex flex-col items-center">
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
                ? "border-r flex flex-row-reverse items-start"
                : "border-l flex items-start"
            } justify-start ${
              editOdontogram ? "border-gray-400" : "border-gray-300"
            } `}
          >
            {box.numbers.map((toothNumber) => (
              <div key={toothNumber} className="flex flex-col items-center">
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
