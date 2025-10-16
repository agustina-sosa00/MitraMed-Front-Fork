import ModalInputsHeader from "./ModalInputsHeader";
import ModalInputsTable from "./ModalInputsTable";

export default function BusquedaModalInputs({ handleCloseModalInput }) {
  return (
    <div className="w-full h-[300px] flex flex-col">
      <ModalInputsHeader handleCloseModalInput={handleCloseModalInput} />
      <ModalInputsTable />
    </div>
  );
}
