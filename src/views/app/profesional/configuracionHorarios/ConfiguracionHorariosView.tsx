import { useState } from "react";
import { ContainView } from "../../_components/features/ContainView";
import ActionsButtonsCard from "../turnos/turnosGenerales/components/ActionsButtonsCard";
import CardTablas from "./components/CardTablas";
import { Modal } from "../../_components/ui/modals/Modal";
import CardModal from "./components/CardModal";
import { useConfiguracionHorariosStore } from "./store/ConfiguracionHorariosStore";

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
    <ContainView
      title="Configuración de Horarios"
      padding="py-3 2xl:py-3 px-5"
      gapChildren="gap-1"
      sizeTitle="text-3xl 2xl:text-4xl"
      classContainer="gap-6 py-3 "
    >
      <div className="flex justify-between w-full">
        <ActionsButtonsCard
          buttonBox1={["Alta Horario", "Modificar", "Eliminar"]}
          handleButton={handleBoxButton}
        />
      </div>

      <CardTablas />
      {openModal && modalName && (
        <Modal close={() => setOpenModal(!openModal)} title={modalName}>
          <CardModal key={modalName} mode={modalName === "Modificar" ? "editar" : "crear"} />
        </Modal>
      )}
    </ContainView>
  );
}
