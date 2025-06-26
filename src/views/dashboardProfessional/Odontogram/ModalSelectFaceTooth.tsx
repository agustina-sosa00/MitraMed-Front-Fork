import React from "react";

interface ModalSelectFaceToothProps {
  show: boolean;
  onClose: () => void;
  setAction: (arg: string) => void;
  setFace: (arg: string) => void;
  action: string;
}

export const ModalSelectFaceTooth: React.FC<ModalSelectFaceToothProps> = ({
  show,
  onClose,

  setFace,
}) => {
  if (!show) return null;

  const buttons = ["vesibular", "mesial", "palatino", "distal", "oclusal"];
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
      onClick={onClose}
    >
      <div className="flex flex-col items-center w-full max-w-2xl p-8 bg-white rounded shadow-xl">
        <h3 className="mb-6 text-2xl font-semibold text-center text-blue">
          Seleccione la cara del diente
        </h3>

        <div className="flex flex-wrap items-center justify-center w-full gap-2">
          {buttons.map((item) => (
            <button
              key={item}
              onClick={() => {
                setFace(item);

                onClose();
              }}
              className="px-3 py-2 text-sm text-white capitalize transition-all duration-300 rounded bg-green hover:bg-greenHover"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
