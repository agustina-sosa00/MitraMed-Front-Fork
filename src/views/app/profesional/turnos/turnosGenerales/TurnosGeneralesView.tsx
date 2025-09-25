import { IFormState } from "../turnosProfesional/mock/arrayTableProfessional";
import { useState } from "react";
import { Modal } from "@/views/app/_components/ui/modals/Modal";
import { ContainView } from "@/views/app/_components/features/ContainView";
import Swal from "sweetalert2";
import TablasCard from "./components/TablasCard";
import AltaTurnoModal from "./components/AltaTurnoModal";
import ActionsButtonsCard from "./components/ActionsButtonsCard";
import SearchCard from "../_components/SearchCard";
import { useTurnosGeneralesStore } from "./store/turnosGeneralesStore";

export default function TurnosGeneralesView() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalName, setModalName] = useState<string>("");

  const { diaSeleccionado, setDiaSeleccionado, turnoSeleccionado, turnosData, setTurnosData } =
    useTurnosGeneralesStore();

  const handleBoxButton = (labelButton: string) => {
    if (labelButton === "Alta Turno") {
      if (!turnoSeleccionado) return;

      if (turnoSeleccionado.npaciente !== null) {
        Swal.fire({
          icon: "warning",
          title: "Este turno ya está asignado a un paciente",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#518915",
        });
        return; // importante: salir
      }

      handleOpenModal(labelButton);
      return;
    } else if (labelButton === "Presentación") handlePresentacion();
    else if (labelButton === "Facturación") handleFacturacion();
    else if (labelButton === "Anular Turno") handleAnularTurno();
  };

  const handleOpenModal = (item: string) => {
    setModalName(item);
    setOpenModal(!openModal);
  };

  const handleChangeDataTurn = (form: IFormState) => {
    if (!turnoSeleccionado || !form) return;
    const updatedArray = turnosData?.map((item) =>
      item.idhorario === turnoSeleccionado.idhorario
        ? { ...item, npaciente: form.name, obs: form.obs, saco: "MIT" }
        : item,
    );
    setTurnosData(updatedArray);
    setOpenModal(!openModal);
  };

  function handlePresentacion() {
    Swal.fire({
      icon: "question",
      title: "¿Confirama la Presencia del Paciente?",
      confirmButtonText: "Si",
      confirmButtonColor: "#518915",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (!turnoSeleccionado) return;
        const updatedArray = turnosData?.map((item) =>
          item.idhorario === turnoSeleccionado.idhorario ? { ...item, nestado: "Presente" } : item,
        );
        setTurnosData(updatedArray);
      }
    });
  }

  function handleFacturacion() {
    Swal.fire({
      icon: "question",
      title: "¿Desea Cambiar el Estado a Factura Pendiente?",
      confirmButtonText: "Si",
      confirmButtonColor: "#518915",
      cancelButtonText: "No",
      cancelButtonColor: "#d33",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (!turnoSeleccionado) return;

        const updatedArray = turnosData?.map((item) =>
          item.idhorario === turnoSeleccionado.idhorario
            ? { ...item, nestado: "Factura pendiente" }
            : item,
        );
        setTurnosData(updatedArray);
      }
    });
  }

  function handleAnularTurno() {
    Swal.fire({
      icon: "question",
      title: "¿Confirma la Anulación del Turno?",
      confirmButtonText: "Si",
      confirmButtonColor: "#518915",
      cancelButtonText: "No",
      cancelButtonColor: "#d33",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (!turnoSeleccionado) return;

        const updatedArray = turnosData?.map((item) =>
          item.idhorario === turnoSeleccionado.idhorario
            ? { ...item, npaciente: null, nestado: "" }
            : item,
        );
        setTurnosData(updatedArray);
      }
    });
  }

  //region return
  return (
    <ContainView title="turnos">
      {/* Filtros y Botones */}
      <div className="flex items-end justify-between w-full">
        <SearchCard diaSeleccionado={diaSeleccionado} setDiaSeleccionado={setDiaSeleccionado} />

        <ActionsButtonsCard
          disabled={!turnoSeleccionado ? "disabled" : ""}
          handleButton={handleBoxButton}
          buttonBox1={["Alta Turno", "Presentación", "Facturación"]}
          buttonBox2={["Anular Turno"]}
        />
        {/* <div className="flex flex-1"></div> */}
      </div>

      {/* Tablas */}
      <TablasCard />

      {openModal && modalName === "Alta Turno" && (
        <Modal close={() => setOpenModal(!openModal)} title="Alta Turno">
          <AltaTurnoModal
            handleChange={handleChangeDataTurn}
            close={() => setOpenModal(!openModal)}
          />
        </Modal>
      )}
    </ContainView>
  );
}
