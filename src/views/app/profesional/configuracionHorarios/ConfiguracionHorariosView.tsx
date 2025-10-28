import { useState } from "react";
import ActionsButtonsCard from "../turnos/turnosGenerales/components/ActionsButtonsCard";
import CardTablas from "./components/CardTablas";
import { Modal } from "../../_components/ui/modals/Modal";
import CardModal from "./components/CardModal";
import { useConfiguracionHorariosStore } from "./store/ConfiguracionHorariosStore";
import TitleView from "../../_components/features/TitleView";

export default function ConfiguracionHorariosView() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalName, setModalName] = useState<string>("");

  const horarioSeleccionadoId = useConfiguracionHorariosStore((s) => s.horarioSeleccionadoId);
  const eliminarHorario = useConfiguracionHorariosStore((s) => s.eliminarHorario);
  const setEditingHorario = useConfiguracionHorariosStore((s) => s.setEditingHorario);

  const handleBoxButton = (label: string) => {
    if (label === "Alta Horario") {
      setEditingHorario(null);
      setModalName("Alta Horario");
      setOpenModal(true);
    } else if (label === "Modificar") {
      if (!horarioSeleccionadoId) return alert("Seleccioná un horario primero");
      setModalName("Modificar"); // abrís el modal en modo edición
      setOpenModal(true);
    } else if (label === "Eliminar") {
      if (!horarioSeleccionadoId) return alert("Seleccioná un horario primero");
      eliminarHorario(horarioSeleccionadoId);
    }
  };

  // const handleOpenModal = (item: string) => {
  //   setModalName(item);
  //   setOpenModal(!openModal);
  // };

  return (
    <>
      <TitleView title="Configuración de Horarios" />
      <div className="flex justify-between w-full">
        <ActionsButtonsCard
          buttonBox1={["Alta Horario", "Modificar", "Eliminar"]}
          handleButton={handleBoxButton}
        />
      </div>

      <CardTablas />
      {openModal && modalName && (
        <Modal close={() => setOpenModal(!openModal)} title={modalName}>
          <CardModal key={modalName} modo={modalName === "Modificar" ? "editar" : "alta"} />
        </Modal>
      )}
    </>
  );
}
