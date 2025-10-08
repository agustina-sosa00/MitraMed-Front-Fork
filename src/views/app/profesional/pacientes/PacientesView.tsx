import TitleView from "../../_components/features/TitleView";
import FormCard from "./components/FormCard";
import HeaderCard from "./components/HeaderCard";
import { usePacientesStore } from "./store/pacientesStore";
import { useState } from "react";
import { Modal } from "../../_components/ui/modals/Modal";
import BusquedaPacienteModal from "./components/BusquedaPacienteModal";

export default function PacientesView() {
  const dataPaciente = usePacientesStore((state) => state.dataPaciente);

  const setDataPaciente = usePacientesStore((state) => state.setDataPaciente);
  const setDataPacientesModal = usePacientesStore((state) => state.setDataPacientesModal);

  const [openModal, setOpenModal] = useState(false);

  function handleInputChange(field, value) {
    setDataPaciente({
      ...dataPaciente,
      [field]: value,
    });
  }

  function handleOpenModalSearch() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setDataPacientesModal(null);
    setOpenModal(false);
  }

  return (
    <>
      <TitleView title="Pacientes" />
      <div className="flex flex-col w-full gap-5">
        <HeaderCard handleOpenModalSearch={handleOpenModalSearch} />
        <FormCard handleInputChange={handleInputChange} />
        {openModal && (
          <Modal close={handleCloseModal} title="Consultar Paciente" modalWidth="w-[1000px]">
            <BusquedaPacienteModal handleCloseModal={handleCloseModal} />
          </Modal>
        )}
      </div>
    </>
  );
}
