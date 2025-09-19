import { Modal } from "@/views/app/_components/ui/modals/Modal";

interface ModalSeleccionDeCaraProps {
  show: boolean;
  onClose: () => void;
  setFace: (cara: "vesibular" | "mesial" | "palatino" | "distal" | "oclusal") => void;
  numeroDiente: number;
}

export default function ModalSeleccionDeCara({
  show,
  onClose,
  setFace,
  numeroDiente,
}: ModalSeleccionDeCaraProps) {
  if (!show) return null;
  const botonesModal = ["vesibular", "mesial", "palatino", "distal", "oclusal"] as const;

  return (
    <Modal title={`Seleccionar Cara Diente: N° ${numeroDiente}`} close={onClose}>
      <div className="flex flex-wrap items-center justify-center w-full gap-2">
        {botonesModal.map((item) => (
          <button
            key={item}
            onClick={() => {
              setFace(item);
              onClose();
            }}
            className="px-3 py-2 text-sm text-white capitalize transition-all duration-300 rounded bg-primaryGreen hover:bg-greenHover"
          >
            {item}
          </button>
        ))}
      </div>
    </Modal>
  );
}
