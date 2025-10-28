import { ActionButton } from "@/frontend-resourses/components";
import { FaEdit, FaRegEye } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useHistorialClinicoStore } from "../store/HistoriaClinicaStore";

export default function BotoneraAccionesCard() {
  const dataPaciente = useHistorialClinicoStore((state) => state.dataPaciente);
  const hasConfirmed = useHistorialClinicoStore((state) => state.hasConfirmed);
  const uiLoading = useHistorialClinicoStore((state) => state.uiLoading);
  const errorState = useHistorialClinicoStore((state) => state.errorState);
  const hcSelected = useHistorialClinicoStore((state) => state.hcSelected);
  const setEditMode = useHistorialClinicoStore((state) => state.setEditMode);
  const setShowModal = useHistorialClinicoStore((state) => state.setShowModal);
  const setPreviewOpen = useHistorialClinicoStore((state) => state.setPreviewOpen);

  const hasValidPatient = Boolean(dataPaciente?.paciente.dni);
  const canEdit = hasValidPatient && hasConfirmed && !uiLoading && !errorState;
  const idDoctorStorage = localStorage.getItem("_iddoc");
  const tusuarioStorage = localStorage.getItem("_tu");
  const hoyString = getHoyString();
  const esHoy = hcSelected?.fecha === hoyString;
  const esMismoDoctor = idDoctorStorage === String(hcSelected?.iddoctor);
  const esGerente = tusuarioStorage === "4";
  const esAdmin = tusuarioStorage === "5";
  const puedeEditar = ((esHoy && esMismoDoctor) || esGerente || esAdmin) && !!hcSelected;

  function getHoyString() {
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, "0");
    const dd = String(hoy.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  return (
    <div className="w-full h-9 flex items-center justify-between  ">
      {" "}
      <ActionButton
        text="Agregar Registro"
        icon={<IoMdAdd />}
        disabled={!canEdit}
        onClick={() => {
          setEditMode(false);
          setShowModal(true);
        }}
        addClassName="!rounded h-8"
        color="green-mtm"
      />
      <div className="flex gap-2">
        <ActionButton
          text="Editar"
          disabled={!hcSelected || !puedeEditar}
          icon={<FaEdit />}
          onClick={() => {
            setEditMode(true);
            setShowModal(true);
          }}
          addClassName="!rounded h-8"
          color="customGray"
          customColorText="primaryGreen"
        />
        <ActionButton
          text="Ver Archivos"
          disabled={!hcSelected?.idopera}
          icon={<FaRegEye />}
          onClick={() => setPreviewOpen?.(true)}
          addClassName="!rounded h-8"
          color="customGray"
          customColorText="primaryBlue"
        />
      </div>
    </div>
  );
}
