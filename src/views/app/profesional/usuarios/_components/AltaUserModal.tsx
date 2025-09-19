import { FaUserPlus, FaTimes } from "react-icons/fa";
import { useUsuariosProfesionalStore } from "../store/usuariosProfesionalesStore";
import FormCard from "./FormCard";

interface AltaUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AltaUserModal({ isOpen, onClose, onSuccess }: AltaUserModalProps) {
  if (!isOpen) return null;

  const { dataDoctores, alta, setAlta } = useUsuariosProfesionalStore();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative flex flex-col max-w-2xl w-full mx-4 max-h-[90vh] bg-white rounded-lg shadow-xl overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Cerrar modal"
        >
          <FaTimes size={20} />
        </button>

        <div className="flex justify-center items-center p-6 border-b">
          <FaUserPlus size={20} className="inline mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Alta de Usuario</h2>
        </div>

        <div className="flex justify-center w-full pb-5">
          <FormCard
            dataDoctores={dataDoctores}
            alta={alta}
            setAlta={setAlta}
            onCloseModal={onClose}
            onSuccessModal={onSuccess}
          />
        </div>
      </div>
    </div>
  );
}
