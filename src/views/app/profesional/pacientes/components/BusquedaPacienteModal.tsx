import ModalHeader from "./ModalHeader";
import ModalTable from "./ModalTable";

export default function BusquedaPacienteModal({ handleCloseModal }) {
  return (
    <div className="w-full flex flex-col gap-2">
      <ModalHeader handleCloseModal={handleCloseModal} />
      <ModalTable />
    </div>
  );
}
