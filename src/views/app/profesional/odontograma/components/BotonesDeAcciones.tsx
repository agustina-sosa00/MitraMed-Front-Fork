import { ActionButton } from "@/frontend-resourses/components";
import { useOdontogramaStore } from "../store/OdontogramaStore";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { grabarOdontogramaService } from "../service/odontogramaService";
import { RiSave3Line } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

export default function BotonesDeAcciones({
  handleCancelEdit,
  hasUnsaved,
  iddoctor,
  idProfesional,
}) {
  const editOdontograma = useOdontogramaStore((state) => state.editOdontograma);
  const setEditOdontograma = useOdontogramaStore((state) => state.setEditOdontograma);
  const contextMenu = useOdontogramaStore((state) => state.contextMenu);
  const toothSelect = useOdontogramaStore((state) => state.toothSelect);
  const isActive = editOdontograma && contextMenu === toothSelect;
  const setOriginalData = useOdontogramaStore((state) => state.setOriginalData);
  const teethIdsState = useOdontogramaStore((state) => state.teethIdsState);
  const setTeethChanged = useOdontogramaStore((state) => state.setTeethChanged);
  const idPaciente = useOdontogramaStore((state) => state.idPaciente);
  const teethChanged = useOdontogramaStore((state) => state.teethChanged);
  const odontogramaData = useOdontogramaStore((state) => state.odontogramaData);
  const hasConfirmed = useOdontogramaStore((state) => state.hasConfirmed);
  const uiLoading = useOdontogramaStore((state) => state.uiLoading);
  const errorState = useOdontogramaStore((state) => state.errorState);

  const tusuarioStorage = localStorage.getItem("_tu");
  const hasValidPatient = Boolean(odontogramaData?.data?.paciente?.dni);

  const canEdit = hasValidPatient && hasConfirmed && !uiLoading && !errorState;

  const { mutate: grabarOdontograma } = useMutation({
    mutationFn: grabarOdontogramaService,
    onSuccess: (data: { status: string }) => {
      if (data.status === "success") {
        setOriginalData(teethIdsState);
        setTeethChanged([]);
        setEditOdontograma(false);
      }
    },
    onError: (err) => console.log(err),
  });

  function handleSave() {
    if (!hasUnsaved) {
      setEditOdontograma(false);
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
  return (
    <div className="absolute bottom-7 right-3 flex items-center gap-2 p-2 ">
      {editOdontograma ? (
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
          onClick={() => setEditOdontograma && setEditOdontograma(true)}
          icon={<FaRegEdit />}
          text="Editar"
          color="green-mtm"
          addClassName="!rounded w-32"
        />
      )}
    </div>
  );
}
